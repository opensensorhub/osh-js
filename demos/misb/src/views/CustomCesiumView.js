import CesiumView from "osh-js/core/ui/view/map/CesiumView";
import {
    ColorGeometryInstanceAttribute,
    HeadingPitchRange,
    Math as CesiumMath,
    Primitive,
    PrimitiveCollection,
    Cartesian3,
    Color,
    Math,
    Transforms,
    Matrix3,
    Matrix4,
    GeometryInstance,
    VertexFormat,
    Quaternion,
    PerspectiveFrustum,
    FrustumGeometry, MaterialAppearance, Material,
    HeadingPitchRoll
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
        if(!isDefined(props.origin) || !isDefined(props.fov) || !isDefined(props.frame) || !isDefined(props.orientation)) {
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

        const origin = Cartesian3.fromDegrees(properties.origin.x, properties.origin.y, properties.origin.z);

        const fixeFrame = Cartesian3.fromDegrees(properties.frame[0], properties.frame[1], 0);

        // -- Method 1 --
        // const rotation = new HeadingPitchRoll.fromDegrees(properties.orientation.heading, properties.orientation.pitch, properties.orientation.roll);
        // const orientation = Transforms.headingPitchRollQuaternion(origin, rotation);

        // -- Method 2 --
        const rotation = new HeadingPitchRoll.fromDegrees(properties.orientation.heading, properties.orientation.pitch, properties.orientation.roll);
        const mat = Transforms.headingPitchRollToFixedFrame(fixeFrame, rotation);

        const right = new Cartesian3(mat[0], mat[1], mat[2]);
        const direction = new Cartesian3(mat[4], mat[5], mat[6]);
        const up = new Cartesian3(mat[8], mat[9], mat[10]);

        let rot = new Matrix3();
        Matrix3.setColumn(rot, 0, right, rot);
        Matrix3.setColumn(rot, 1, up, rot);
        Matrix3.setColumn(rot, 2, direction, rot);

        const orientation = Quaternion.fromRotationMatrix(rot, new Quaternion())

        const frustum = new PerspectiveFrustum({
            fov : Math.toRadians(properties.fov),
            aspectRatio : 4 / 3,
            //twist:15,
            near : 1.0,
            far : 4000.0
        });

        const frustrumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum : frustum,
                origin : origin,
                orientation : orientation,
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
        // collection.add(polygonOutlinePrimitive);

        this.viewer.scene.primitives.add(collection);

        return collection;
    }

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(CesiumMath.toRadians(0),CesiumMath.toRadians(-90),2000));
    }
}
export default CustomCesiumView;
