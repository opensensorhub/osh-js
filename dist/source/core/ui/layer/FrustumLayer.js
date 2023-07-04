import Layer from "../../../../source/core/ui/layer/Layer";
import {isDefined} from "../../utils/Utils";

/**
 * Enumeration of the ways that the frustum's position and orientation can be
 * specified.
 */
 const FrustumPositionMode = Object.freeze({
    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of a latitude (in degrees), longitude (in degrees), and
     * altitude above ellipsoid (in meters). This also indicates that platform
     * orientation is provided as heading, pitch, and roll, in degrees; and
     * sensor orientation is provided as yaw, pitch, and roll, in degrees.
     */
    LONLATALT_WITH_EULER_ANGLES: 1,

    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as 3x3 rotation
     * matrices.
     */
    ECEF_WITH_MATRICES: 2,

    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as quaternions.
     */
    ECEF_WITH_QUATERNIONS: 3,
});

class frustumLayer extends Layer {
    /**
     */
    constructor(properties) {
        super(properties);
        this.type = 'frustum';
    }
    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            color : 'rgb(255,0,0)',
            opacity : 0.5,
            origin : null,
            fov : null,
            near : 0.009,
            range : null,
            platformOrientation : {heading: 0.0, pitch: 0.0, roll: 0.0},
            sensorOrientation : {yaw: 0.0, pitch: 0.0, roll: 0.0},
            positionMode: FrustumPositionMode.LONLATALT_WITH_EULER_ANGLES,
            aspectRatio: 4/3
        };

        if(isDefined(properties.color)){
            props.color = properties.color;
        }

        if(isDefined(properties.opacity)){
            props.opacity = properties.opacity;
        }

        if (isDefined(properties.near)) {
            props.near = properties.near;
        }

        if (isDefined(properties.range)) {
            props.range = properties.range;
        }

        if (isDefined(properties.fov)) {
            props.fov = properties.fov;
        }

        if (isDefined(properties.positionMode)) {
            props.positionMode = properties.positionMode;
        }

        if (isDefined(properties.aspectRatio)) {
            props.aspectRatio = properties.aspectRatio;
        }

        this.definedId('frustumId', props);

        if(isDefined(properties.getColor)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('color',await this.getFunc('getColor')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOrigin)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('origin',await this.getFunc('getOrigin')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getOrigin'),fn);
        }

        if(isDefined(properties.getFov)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('fov',await this.getFunc('getFov')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getFov'),fn);
        }

        if(isDefined(properties.getRange)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('range',await this.getFunc('getRange')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getRange'),fn);
        }

        if(isDefined(properties.getPlatformOrientation)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('platformOrientation',await this.getFunc('getPlatformOrientation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getPlatformOrientation'),fn);
        }

        if(isDefined(properties.getSensorOrientation)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('sensorOrientation',await this.getFunc('getSensorOrientation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getSensorOrientation'),fn);
        }
        if (isDefined(properties.getAspectRatio)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('aspectRatio',await this.getFunc('getAspectRatio')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getAspectRatio'), fn);
        }
    }
}

export default  frustumLayer;
export { FrustumPositionMode };