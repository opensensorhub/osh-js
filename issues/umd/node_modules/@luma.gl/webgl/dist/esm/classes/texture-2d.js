import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import Texture from './texture';
import { assertWebGLContext } from '../webgl-utils';
import { loadImage } from '../utils/load-file';

var Texture2D = function (_Texture) {
  _inherits(Texture2D, _Texture);

  _createClass(Texture2D, null, [{
    key: "isSupported",
    value: function isSupported(gl, opts) {
      return Texture.isSupported(gl, opts);
    }
  }]);

  function Texture2D(gl) {
    var _this;

    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Texture2D);

    assertWebGLContext(gl);

    if (props instanceof Promise || typeof props === 'string') {
      props = {
        data: props
      };
    }

    if (typeof props.data === 'string') {
      props = Object.assign({}, props, {
        data: loadImage(props.data)
      });
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Texture2D).call(this, gl, Object.assign({}, props, {
      target: 3553
    })));

    _this.initialize(props);

    Object.seal(_assertThisInitialized(_this));
    return _this;
  }

  return Texture2D;
}(Texture);

export { Texture2D as default };
//# sourceMappingURL=texture-2d.js.map