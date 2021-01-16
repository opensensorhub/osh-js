"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _model = _interopRequireDefault(require("../lib/model"));

var _geometry = _interopRequireDefault(require("../geometry/geometry"));

var CLIPSPACE_VERTEX_SHADER = "attribute vec2 aClipSpacePosition;\nattribute vec2 aTexCoord;\nattribute vec2 aCoordinate;\n\nvarying vec2 position;\nvarying vec2 coordinate;\nvarying vec2 uv;\n\nvoid main(void) {\n  gl_Position = vec4(aClipSpacePosition, 0., 1.);\n  position = aClipSpacePosition;\n  coordinate = aCoordinate;\n  uv = aTexCoord;\n}\n";
var POSITIONS = [-1, -1, 1, -1, -1, 1, 1, 1];

var ClipSpace = function (_Model) {
  (0, _inherits2["default"])(ClipSpace, _Model);

  function ClipSpace(gl, opts) {
    var _this;

    (0, _classCallCheck2["default"])(this, ClipSpace);
    var TEX_COORDS = POSITIONS.map(function (coord) {
      return coord === -1 ? 0 : coord;
    });
    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(ClipSpace).call(this, gl, Object.assign({}, opts, {
      vs: CLIPSPACE_VERTEX_SHADER,
      geometry: new _geometry["default"]({
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
}(_model["default"]);

exports["default"] = ClipSpace;
//# sourceMappingURL=clip-space.js.map