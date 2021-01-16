"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var fs = "uniform float brightness;\nuniform float contrast;\n\nvec4 brightnessContrast_filterColor(vec4 color) {\n  color.rgb += brightness;\n  if (contrast > 0.0) {\n    color.rgb = (color.rgb - 0.5) / (1.0 - contrast) + 0.5;\n  } else {\n    color.rgb = (color.rgb - 0.5) * (1.0 + contrast) + 0.5;\n  }\n  return color;\n}\n\nvec4 brightnessContrast_filterColor(vec4 color, vec2 texSize, vec2 texCoords) {\n  return brightnessContrast_filterColor(color);\n}\n";
var uniforms = {
  brightness: {
    value: 0,
    min: -1,
    max: 1
  },
  contrast: {
    value: 0,
    min: -1,
    max: 1
  }
};
var _default = {
  name: 'brightnessContrast',
  uniforms: uniforms,
  fs: fs,
  passes: [{
    filter: true
  }]
};
exports["default"] = _default;
//# sourceMappingURL=brightnesscontrast.js.map