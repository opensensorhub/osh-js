import isOldIE from './check-old-ie';
import WEBGL_FEATURES from './webgl-features-table';
import { assert } from '../utils';
var compiledGlslExtensions = {};
export default function canCompileGLGSExtension(gl, cap) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var feature = WEBGL_FEATURES[cap];
  assert(feature, cap);

  if (!isOldIE(options)) {
    return true;
  }

  if (cap in compiledGlslExtensions) {
    return compiledGlslExtensions[cap];
  }

  var extensionName = feature[0];
  var source = "#extension GL_".concat(extensionName, " : enable\nvoid main(void) {}");
  var shader = gl.createShader(35633);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var canCompile = gl.getShaderParameter(shader, 35713);
  gl.deleteShader(shader);
  compiledGlslExtensions[cap] = canCompile;
  return canCompile;
}
//# sourceMappingURL=check-glsl-extension.js.map