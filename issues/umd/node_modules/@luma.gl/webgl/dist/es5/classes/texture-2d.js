"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _texture = _interopRequireDefault(require("./texture"));

var _webglUtils = require("../webgl-utils");

var _loadFile = require("../utils/load-file");

var Texture2D = function (_Texture) {
  (0, _inherits2["default"])(Texture2D, _Texture);
  (0, _createClass2["default"])(Texture2D, null, [{
    key: "isSupported",
    value: function isSupported(gl, opts) {
      return _texture["default"].isSupported(gl, opts);
    }
  }]);

  function Texture2D(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck2["default"])(this, Texture2D);
    (0, _webglUtils.assertWebGLContext)(gl);

    if (props instanceof Promise || typeof props === 'string') {
      props = {
        data: props
      };
    }

    if (typeof props.data === 'string') {
      props = Object.assign({}, props, {
        data: (0, _loadFile.loadImage)(props.data)
      });
    }

    _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(Texture2D).call(this, gl, Object.assign({}, props, {
      target: 3553
    })));

    _this.initialize(props);

    Object.seal((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }

  return Texture2D;
}(_texture["default"]);

exports["default"] = Texture2D;
//# sourceMappingURL=texture-2d.js.map