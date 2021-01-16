import { getContextInfo, hasFeatures, canCompileGLGSExtension, FEATURES } from '../utils/webgl-info';
export function getPlatformShaderDefines(gl) {
  var debugInfo = getContextInfo(gl);

  switch (debugInfo.gpuVendor.toLowerCase()) {
    case 'nvidia':
      return "#define NVIDIA_GPU\n// Nvidia optimizes away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n";

    case 'intel':
      return "#define INTEL_GPU\n// Intel optimizes away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n// Intel's built-in 'tan' function doesn't have acceptable precision\n#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1\n// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow\n#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1\n";

    case 'amd':
      return "#define AMD_GPU\n";

    default:
      return "#define DEFAULT_GPU\n// Prevent driver from optimizing away the calculation necessary for emulated fp64\n#define LUMA_FP64_CODE_ELIMINATION_WORKAROUND 1\n// Intel's built-in 'tan' function doesn't have acceptable precision\n#define LUMA_FP32_TAN_PRECISION_WORKAROUND 1\n// Intel GPU doesn't have full 32 bits precision in same cases, causes overflow\n#define LUMA_FP64_HIGH_BITS_OVERFLOW_WORKAROUND 1\n";
  }
}
export function getVersionDefines(gl, glslVersion, isFragment) {
  var versionDefines = "#if (__VERSION__ > 120)\n\n# define FRAG_DEPTH\n# define DERIVATIVES\n# define DRAW_BUFFERS\n# define TEXTURE_LOD\n\n#endif // __VERSION\n";

  if (hasFeatures(gl, FEATURES.GLSL_FRAG_DEPTH)) {
    versionDefines += "// FRAG_DEPTH => gl_FragDepth is available\n#ifdef GL_EXT_frag_depth\n#extension GL_EXT_frag_depth : enable\n# define FRAG_DEPTH\n# define gl_FragDepth gl_FragDepthEXT\n#endif\n";
  }

  if (hasFeatures(gl, FEATURES.GLSL_DERIVATIVES) && canCompileGLGSExtension(gl, FEATURES.GLSL_DERIVATIVES)) {
    versionDefines += "// DERIVATIVES => dxdF, dxdY and fwidth are available\n#ifdef GL_OES_standard_derivatives\n#extension GL_OES_standard_derivatives : enable\n# define DERIVATIVES\n#endif\n";
  }

  if (hasFeatures(gl, FEATURES.GLSL_FRAG_DATA) && canCompileGLGSExtension(gl, FEATURES.GLSL_FRAG_DATA, {
    behavior: 'require'
  })) {
    versionDefines += "// DRAW_BUFFERS => gl_FragData[] is available\n#ifdef GL_EXT_draw_buffers\n#extension GL_EXT_draw_buffers : require\n#define DRAW_BUFFERS\n#endif\n";
  }

  if (hasFeatures(gl, FEATURES.GLSL_TEXTURE_LOD)) {
    versionDefines += "// TEXTURE_LOD => texture2DLod etc are available\n#ifdef GL_EXT_shader_texture_lod\n#extension GL_EXT_shader_texture_lod : enable\n# define TEXTURE_LOD\n#define texture2DLod texture2DLodEXT\n#define texture2DProjLod texture2DProjLodEXT\n#define texture2DProjLod texture2DProjLodEXT\n#define textureCubeLod textureCubeLodEXT\n#define texture2DGrad texture2DGradEXT\n#define texture2DProjGrad texture2DProjGradEXT\n#define texture2DProjGrad texture2DProjGradEXT\n#define textureCubeGrad textureCubeGradEXT\n#endif\n";
  }

  return versionDefines;
}
//# sourceMappingURL=platform-defines.js.map