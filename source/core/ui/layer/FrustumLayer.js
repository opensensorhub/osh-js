import Layer from "../../../../source/core/ui/layer/Layer";
import {isDefined, randomUUID} from "../../../../source/core/utils/Utils";

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
        this.props.frustumId = randomUUID();

        // Default position mode is LONLATALT_EULER_ANGLES, if not specified.
        // Old code should continue to work as-is.
        this.props.positionMode = this.properties.positionMode || FrustumPositionMode.LONLATALT_EULER_ANGLES;

        this.initDynamicProp("color", "rgb(255,0,0)");
        this.initDynamicProp("opacity", 0.5);
        this.initDynamicProp("origin");
        this.initDynamicProp("fov");
        this.initDynamicProp("aspectRatio", 4/3);
        this.initDynamicProp("range");
        this.initDynamicProp("rangeNear", 1);
        this.initDynamicProp("platformOrientation");
        this.initDynamicProp("sensorOrientation");

        this.saveState();
    }
}

export default FrustumLayer;
export { FrustumPositionMode };
