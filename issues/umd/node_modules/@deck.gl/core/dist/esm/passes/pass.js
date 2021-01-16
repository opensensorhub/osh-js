import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";

var Pass = function () {
  function Pass(gl) {
    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Pass);

    var _props$id = props.id,
        id = _props$id === void 0 ? 'pass' : _props$id;
    this.id = id;
    this.gl = gl;
    this.props = {};
    Object.assign(this.props, props);
  }

  _createClass(Pass, [{
    key: "setProps",
    value: function setProps(props) {
      Object.assign(this.props, props);
    }
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "cleanup",
    value: function cleanup() {}
  }]);

  return Pass;
}();

export { Pass as default };
//# sourceMappingURL=pass.js.map