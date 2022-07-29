import Layer from "../../../../source/core/ui/layer/Layer";
import {isDefined, randomUUID} from "../../../../source/core/utils/Utils";

/**
 * Enumeration of orientation modes that indicate how the frustum's location and
 * orientation are provided by the layer.
 */
const OrientationMode = Object.freeze({
    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of a latitude (in degrees), longitude (in degrees), and
     * altitude above ellipsoid (in meters). This also indicates that platform
     * orientation is provided as heading, pitch, and roll, in degrees; and
     * sensor orientation is provided as yaw, pitch, and roll, in degrees.
     */
    LONLATALT_EULER_ANGLES: 1,

    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as 3x3 rotation
     * matrices.
     */
    ECEF_MATRICES: 2,

    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as quaternions.
     */
    ECEF_QUATERNIONS: 3,
});

class FrustumLayer extends Layer {
    /**
     */
    constructor(properties) {
        super(properties);
        this.type = 'frustum';

        this.properties = properties;
        this.props.frustumId = randomUUID();
        this.props.color = 'rgb(255,0,0)';
        this.opacity = 0.5;
        this.origin = null;
        this.fov = null;
        this.near = 0.009;
        this.range = null;
        this.platformOrientation = {heading: 0.0, pitch: 0.0, roll: 0.0};
        this.sensorOrientation = {yaw: 0.0, pitch: 0.0, roll: 0.0};
        // Make sure there's a valid orientation mode set on this.properties
        // by defaulting to LONLATALT_EULER_ANGLES.
        this.properties.orientationMode = this.properties.orientationMode || OrientationMode.LONLATALT_EULER_ANGLES;

        const that = this;

        if(isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if(isDefined(properties.opacity)){
            this.props.opacity = properties.opacity;
        }

        if(isDefined(properties.getColor)) {
            let fn = async (rec) => {
                that.props.color = await  that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOrigin)) {
            let fn = async (rec) => {
                that.props.origin = await that.getFunc('getOrigin')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOrigin'),fn);
        }

        if(isDefined(properties.getFov)) {
            let fn = async (rec) => {
                that.props.fov = await that.getFunc('getFov')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getFov'),fn);
        }

        if(isDefined(properties.getRange)) {
            let fn = async (rec) => {
                that.props.range = await that.getFunc('getRange')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getRange'),fn);
        }

        if(isDefined(properties.getPlatformOrientation)) {
            let fn = async (rec) => {
                that.props.platformOrientation = await that.getFunc('getPlatformOrientation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPlatformOrientation'),fn);
        }

        if(isDefined(properties.getSensorOrientation)) {
            let fn = async (rec) => {
                that.props.sensorOrientation = await that.getFunc('getSensorOrientation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSensorOrientation'),fn);
        }

        this.saveState();
    }
}

export default FrustumLayer;
export { OrientationMode };
