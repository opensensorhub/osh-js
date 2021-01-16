import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import Model from '../lib/model';
import Geometry from '../geometry/geometry';
var CLIPSPACE_VERTEX_SHADER = "attribute vec2 aClipSpacePosition;\nattribute vec2 aTexCoord;\nattribute vec2 aCoordinate;\n\nvarying vec2 position;\nvarying vec2 coordinate;\nvarying vec2 uv;\n\nvoid main(void) {\n  gl_Position = vec4(aClipSpacePosition, 0., 1.);\n  position = aClipSpacePosition;\n  coordinate = aCoordinate;\n  uv = aTexCoord;\n}\n";
var POSITIONS = [-1, -1, 1, -1, -1, 1, 1, 1];

var ClipSpace = function (_Model) {
  _inherits(ClipSpace, _Model);

  function ClipSpace(gl, opts) {
    var _this;

    _classCallCheck(this, ClipSpace);

    var TEX_COORDS = POSITIONS.map(function (coord) {
      return coord === -1 ? 0 : coord;
    });
    _this = _possibleConstructorReturn(this, _getPrototypeOf(ClipSpace).call(this, gl, Object.assign({}, opts, {
      vs: CLIPSPACE_VERTEX_SHADER,
      geometry: new Geometry({
        drawMode: 5,
        vertexCount: 4,
        attributes: {
          aClipSpacePosition: {
            size: 2,
            value: new Float32Array(POSITIONS)
          },
          aTexCoord: {
            size: 2,
            value: new Float32Array(TEX_COORDS)
          },
          aCoordinate: {
            size: 2,
            value: new Float32Array(TEX_COORDS)
          }
        }
      })
    })));

    _this.setVertexCount(4);

    return _this;
  }

  return ClipSpace;
}(Model);

export { ClipSpace as default };
//# sourceMappingURL=clip-space.js.map