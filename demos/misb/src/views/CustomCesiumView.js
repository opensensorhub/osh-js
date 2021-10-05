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
        // const rotation = new HeadingPitchRoll.fromDegrees(properties.orientation.heading, properties.orientation.pitch, properties.orientation.roll);
        // const mat = Transforms.headingPitchRollToFixedFrame(fixeFrame, rotation);
        //
        // const right = new Cartesian3(mat[0], mat[1], mat[2]);
        // const direction = new Cartesian3(mat[4], mat[5], mat[6]);
        // const up = new Cartesian3(mat[8], mat[9], mat[10]);
        //
        // let rot = new Matrix3();
        // Matrix3.setColumn(rot, 0, right, rot);
        // Matrix3.setColumn(rot, 1, up, rot);
        // Matrix3.setColumn(rot, 2, direction, rot);
        //
        // const orientation = Quaternion.fromRotationMatrix(rot, new Quaternion())

        // -- Method 3 -- https://community.cesium.com/t/a-way-to-orient-and-place-frustum-outline/10487
        //deg to rad
        let heading = properties.orientation.heading * Math.PI/180;
        let pitch = properties.orientation.pitch * Math.PI/180;
        let roll = properties.orientation.roll *Math.PI/180;

        //declare shortcuts
        let til= pitch+(Math.PI/2);roll*=-1;
        let ch = Math.cos(heading);let sh = Math.sin(heading);
        let ct = Math.cos(til);let st = Math.sin(til);
        let cr = Math.cos(roll);let sr = Math.sin(roll);

        //calc rot mat in terms of local ENU frame
        let myrig=new Cartesian3(ch*cr+sh*ct*sr,sh*cr*-1+ch*ct*sr,st*sr);
        let mydir=new Cartesian3(sh*st,ch*st,ct*-1);
        let myup=new Cartesian3(sh*ct*cr+ch*sr*-1,ch*ct*cr+sh*sr,st*cr);

        //transform rot mat to world coordinates
        let GD_transform = Transforms.eastNorthUpToFixedFrame(origin, this.viewer.scene.globe.ellipsoid, new Matrix4());//rot-tran
        let GD_rotmat = Matrix4.getMatrix3(GD_transform, new Matrix3());
        Matrix3.multiplyByVector(GD_rotmat, myrig, myrig);
        Matrix3.multiplyByVector(GD_rotmat, mydir, mydir);
        Matrix3.multiplyByVector(GD_rotmat, myup, myup);
        let rot = [myrig.x,myrig.y,myrig.z,mydir.x,mydir.y,mydir.z,myup.x,myup.y,myup.z];
        const zeroPt = new Cartesian3(0,0,0);

        const frustum = new PerspectiveFrustum({
            fov : MathCesium.toRadians(properties.fov),
            aspectRatio : 4 / 3,
            //twist:15,
            near : 1.0,
            far : 4000.0
        });

        const frustrumInstance = new GeometryInstance({
            geometry: new FrustumGeometry({
                frustum : frustum,
                origin : zeroPt,
                orientation : {x:0,y:0,z:0,w:1},
                vertexFormat : VertexFormat.POSITION_ONLY
            }),
            modelMatrix :[1,0,0,0, 0,0,-1,0, 0,1,0,0, 0,0,0,1],
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

        //place and orient primitive
        frustrumPrimitive.modelMatrix=
            [rot[0],rot[1],rot[2],0, rot[3],rot[4],rot[5],0, rot[6],rot[7],rot[8],0,
                origin.x,origin.y,origin.z,1];

        return collection;
    }

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(CesiumMath.toRadians(0),CesiumMath.toRadians(-90),2000));
    }
}
export default CustomCesiumView;
