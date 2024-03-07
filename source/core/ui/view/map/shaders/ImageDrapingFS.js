export default `
layout (location = 2) out vec3 v_positionEC;
layout (location = 3) out vec3 v_normalEC;
layout (location = 4) out vec2 v_st;

vec4 windowToEye(vec4 fragCoord)
{
    vec2 uv = fragCoord.xy / czm_viewport.zw;
    float z_window = czm_unpackDepth(texture(czm_globeDepthTexture, uv));

    //
    if (z_window == 0.0)
        discard;

    vec4 eyeCoordinate = czm_windowToEyeCoordinates(fragCoord.xy, z_window);
    //
    return eyeCoordinate / eyeCoordinate.w;
}

// Camera model and frames are based on OpenCV conventions:
// http://docs.opencv.org/2.4/modules/calib3d/doc/camera_calibration_and_3d_reconstruction.html
// we pass in a normalized intrinsic matrix as uniform so we can compute the normalized texture coordinates directly

void main()
{

}`;
