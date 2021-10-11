import CesiumView from "osh-js/core/ui/view/map/CesiumView";
import {
    ColorGeometryInstanceAttribute,
    HeadingPitchRange,
    Math as CesiumMath,
    Primitive,
    PrimitiveCollection,
    Cartesian3,
    Color,
    Math as MathCesium,
    Transforms,
    Matrix3,
    Matrix4,
    GeometryInstance,
    VertexFormat,
    Quaternion,
    PerspectiveFrustum,
    FrustumGeometry, FrustumOutlineGeometry,
    MaterialAppearance, Material,
    IntersectionTests,
    HeadingPitchRoll,
    Ellipsoid, Ray,
    CircleGeometry
} from "cesium";
import {isDefined} from "osh-js/core/utils/Utils";

class CustomCesiumView extends CesiumView {


    constructor(properties) {
        super(
            {
                ...properties,
                supportedLayers: ['marker', 'draping', 'polyline', 'ellipse', 'polygon', 'coplanarPolygon', 'frustrum']
            });

        this.layerIdToFrustrum= {};
        
        this.tmpHPR = new HeadingPitchRoll();
        this.nedQuat = new Quaternion();
        this.platformQuat = new Quaternion(0,0,0,1);
        this.sensorQuat = new Quaternion(0,0,0,1);
        this.camQuat = Quaternion.fromRotationMatrix(Matrix3.fromRowMajorArray(
            [0, 0, 1,
             1, 0, 0,
             0, 1, 0])); // frustum is along Z
    }

    addFrustrumToLayer(props, frustrum) {
        const currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToFrustrum)) {
            this.layerIdToFrustrum[props.id] = {};
        }
        this.layerIdToFrustrum[props.id][props.frustrumId] = frustrum;
    }

    getFrustrums() {
        const array = [];
        for(let id in this.layerIdToFrustrum) {
            for(let frustrumId in this.layerIdToFrustrum[id]) {
                array.push(this.layerIdToFrustrum[id][frustrumId]);
            }
        }
        return array;
    }

    getFrustrum(props) {
        if(!(props.id in  this.layerIdToFrustrum)) {
            return null;
        }
        return this.layerIdToFrustrum[props.id][props.frustrumId];
    }

    removeAllFromLayer(layer) {
        super.removeAllFromLayer(layer);
        this.removeFrustrums(layer);
    }

    removeFrustrums(layer) {
        if(isDefined(layer.props.frustrumId)) {
            const frustrumMap = this.layerIdToFrustrum[layer.props.id];
            if(isDefined(frustrumMap)) {
                for(let frustrumId in frustrumMap) {
                    const frustrum = frustrumMap[frustrumId];
                    this.removeFrustrumFromLayer(frustrum);
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToFrustrum[layer.props.id];
        }
    }

    removeFrustrumFromLayer(frustrum) {}

    setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0;i < values.length;i++) {
            const d = values[i];
            if(data.type === 'frustrum') {
                this.updateFrustrum(d);
            } else {
                super.setData(dataSourceId, data);
            }
        }
    }

    updateFrustrum(props) {
        if(!isDefined(props.origin) || !isDefined(props.fov) || !isDefined(props.range) || !isDefined(props.sensorOrientation)) {
            return;
        }
        let frustrumPrimitiveCollection = this.getFrustrum(props);
        if (isDefined(frustrumPrimitiveCollection)) {
            frustrumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustrumPrimitiveCollection);
        }

        this.addFrustrumToLayer(props, this.addFrustrum(props));
    }

    addFrustrum(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.frustrumId;

        // NED rotation
        const origin = Cartesian3.fromDegrees(properties.origin.x, properties.origin.y, properties.origin.z);
        Transforms.headingPitchRollQuaternion(origin, new HeadingPitchRoll(0,0,0), Ellipsoid.WGS84, Transforms.northEastDownToFixedFrame, this.nedQuat);
        
        // platform attitude w/r NED
        // see doc of Quaternion.fromHeadingPitchRoll, heading and roll are about negative z and y axes respectively
        const platformHPR = properties.platformOrientation;
        HeadingPitchRoll.fromDegrees(-platformHPR.heading, -platformHPR.pitch, platformHPR.roll, this.tmpHPR);
        Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.platformQuat);
        
        // sensor orientation w/r platform
        const sensorYPR = properties.sensorOrientation;
        HeadingPitchRoll.fromDegrees(-sensorYPR.yaw, -sensorYPR.pitch, sensorYPR.roll, this.tmpHPR);
        Quaternion.fromHeadingPitchRoll(this.tmpHPR, this.sensorQuat);
        
        // compute combined transform
        // goal is to get orientation of frustum in ECEF directly, knowing that the frustum direction is along the Z axis
        Quaternion.multiply(this.nedQuat, this.platformQuat, this.platformQuat); // result is plaformQuat w/r ECEF
        Quaternion.multiply(this.platformQuat, this.sensorQuat, this.sensorQuat); // result is sensorQuat w/r ECEF 
        const quat = Quaternion.multiply(this.sensorQuat, this.camQuat, this.sensorQuat); // result is frustum quat w/r ECEF 
        
        const frustum = new PerspectiveFrustum({
            fov : MathCesium.toRadians(properties.fov),
            aspectRatio : 4 / 3,
            near : 1.0,
            far : properties.range
        });

        const frustrumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum : frustum,
                origin : origin,
                orientation : quat,
                vertexFormat : VertexFormat.POSITION_ONLY
            }),
            id: id,
        });

        const frustrumPrimitive = new Primitive({
            geometryInstances : frustrumInstance,
            appearance : new MaterialAppearance({
                material: new Material({
                    fabric: {
                        type: 'Color',
                        uniforms: {
                            color:  Color.fromCssColorString(properties.color).withAlpha(properties.opacity)
                        }
                    }
                }),
            }),
            asynchronous: false,
            show: properties.visible
        });

        const collection = new PrimitiveCollection();
        collection.add(frustrumPrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    }

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(CesiumMath.toRadians(0),CesiumMath.toRadians(-90),2000));
    }
}
export default CustomCesiumView;
