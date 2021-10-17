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
                supportedLayers: ['marker', 'draping', 'polyline', 'ellipse', 'polygon', 'coplanarPolygon', 'frustum']
            });

        this.layerIdToFrustum= {};

        this.tmpHPR = new HeadingPitchRoll();
        this.nedQuat = new Quaternion();
        this.platformQuat = new Quaternion(0,0,0,1);
        this.sensorQuat = new Quaternion(0,0,0,1);
        this.camQuat = Quaternion.fromRotationMatrix(Matrix3.fromRowMajorArray(
            [0, 0, 1,
             1, 0, 0,
             0, 1, 0])); // frustum is along Z
    }

    addFrustumToLayer(props, frustum) {
        const currentLayer = this.getLayer(props);
        // associate the list of markers owning by a specific marker
        if(!(props.id in this.layerIdToFrustum)) {
            this.layerIdToFrustum[props.id] = {};
        }
        this.layerIdToFrustum[props.id][props.frustumId] = frustum;
    }

    getFrustums() {
        const array = [];
        for(let id in this.layerIdToFrustum) {
            for(let frustumId in this.layerIdToFrustum[id]) {
                array.push(this.layerIdToFrustum[id][frustumId]);
            }
        }
        return array;
    }

    getFrustum(props) {
        if(!(props.id in  this.layerIdToFrustum)) {
            return null;
        }
        return this.layerIdToFrustum[props.id][props.frustumId];
    }

    removeAllFromLayer(layer) {
        super.removeAllFromLayer(layer);
        this.removeFrustums(layer);
    }

    removeFrustums(layer) {
        if(isDefined(layer.props.frustumId)) {
            const frustumMap = this.layerIdToFrustum[layer.props.id];
            if(isDefined(frustumMap)) {
                for(let frustumId in frustumMap) {
                    const frustum = frustumMap[frustumId];
                    this.removeFrustumFromLayer(frustum);
                }
            }

            // remove markers ids from Layer map
            delete this.layerIdToFrustum[layer.props.id];
        }
    }

    removeFrustumFromLayer(frustumPrimitiveCollection) {
        if (isDefined(frustumPrimitiveCollection)) {
            frustumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
        }
    }

    setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0;i < values.length;i++) {
            const d = values[i];
            if(data.type === 'frustum') {
                this.updateFrustum(d);
            } else {
                super.setData(dataSourceId, data);
            }
        }
    }

    updateFrustum(props) {
        if(!isDefined(props.origin) || !isDefined(props.fov) || !isDefined(props.range)
            || !isDefined(props.sensorOrientation) || !isDefined(props.platformOrientation)) {
            return;
        }
        let frustumPrimitiveCollection = this.getFrustum(props);
        if (isDefined(frustumPrimitiveCollection)) {
            frustumPrimitiveCollection.removeAll();
            this.viewer.scene.primitives.remove(frustumPrimitiveCollection);
        }

        this.addFrustumToLayer(props, this.addFrustum(props));
    }

    addFrustum(properties) {
        // bind the object to the callback property
        const id = properties.id + "$" + properties.frustumId;

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

        const frustumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum : frustum,
                origin : origin,
                orientation : quat,
                vertexFormat : VertexFormat.POSITION_ONLY
            }),
            id: id,
        });

        const frustumPrimitive = new Primitive({
            geometryInstances : frustumInstance,
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
        collection.add(frustumPrimitive);
        this.viewer.scene.primitives.add(collection);
        return collection;
    }

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(CesiumMath.toRadians(0),CesiumMath.toRadians(-90),2000));
    }
}
export default CustomCesiumView;
