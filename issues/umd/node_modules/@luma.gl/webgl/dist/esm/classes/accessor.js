import _construct from "@babel/runtime/helpers/esm/construct";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { getTypedArrayFromGLType } from '../webgl-utils';
import { checkProps, assert } from '../utils';
var DEFAULT_ACCESSOR_VALUES = {
  offset: 0,
  stride: 0,
  type: 5126,
  size: 1,
  divisor: 0,
  normalized: false,
  integer: false
};
var PROP_CHECKS = {
  deprecatedProps: {
    instanced: 'divisor',
    isInstanced: 'divisor'
  }
};

var Accessor = function () {
  _createClass(Accessor, null, [{
    key: "getBytesPerElement",
    value: function getBytesPerElement(accessor) {
      var ArrayType = getTypedArrayFromGLType(accessor.type || 5126);
      return ArrayType.BYTES_PER_ELEMENT;
    }
  }, {
    key: "getBytesPerVertex",
    value: function getBytesPerVertex(accessor) {
      assert(accessor.size);
      var ArrayType = getTypedArrayFromGLType(accessor.type || 5126);
      return ArrayType.BYTES_PER_ELEMENT * accessor.size;
    }
  }, {
    key: "resolve",
    value: function resolve() {
      for (var _len = arguments.length, accessors = new Array(_len), _key = 0; _key < _len; _key++) {
        accessors[_key] = arguments[_key];
      }

      return _construct(Accessor, [DEFAULT_ACCESSOR_VALUES].concat(accessors));
    }
  }]);

  function Accessor() {
    var _this = this;

    _classCallCheck(this, Accessor);

    for (var _len2 = arguments.length, accessors = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      accessors[_key2] = arguments[_key2];
    }

    accessors.forEach(function (accessor) {
      return _this._assign(accessor);
    });
    Object.freeze(this);
  }

  _createClass(Accessor, [{
    key: "toString",
    value: function toString() {
      return JSON.stringify(this);
    }
  }, {
    key: "_assign",
    value: function _assign() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      props = checkProps('Accessor', props, PROP_CHECKS);

      if (props.type !== undefined) {
        this.type = props.type;

        if (props.type === 5124 || props.type === 5125) {
          this.integer = true;
        }
      }

      if (props.size !== undefined) {
        this.size = props.size;
      }

      if (props.offset !== undefined) {
        this.offset = props.offset;
      }

      if (props.stride !== undefined) {
        this.stride = props.stride;
      }

      if (props.normalized !== undefined) {
        this.normalized = props.normalized;
      }

      if (props.integer !== undefined) {
        this.integer = props.integer;
      }

      if (props.divisor !== undefined) {
        this.divisor = props.divisor;
      }

      if (props.buffer !== undefined) {
        this.buffer = props.buffer;
      }

      if (props.index !== undefined) {
        if (typeof index === 'boolean') {
          this.index = props.index ? 1 : 0;
        } else {
          this.index = props.index;
        }
      }

      if (props.instanced !== undefined) {
        this.divisor = props.instanced ? 1 : 0;
      }

      if (props.isInstanced !== undefined) {
        this.divisor = props.isInstanced ? 1 : 0;
      }

      return this;
    }
  }, {
    key: "BYTES_PER_ELEMENT",
    get: function get() {
      return Accessor.getBytesPerElement(this);
    }
  }, {
    key: "BYTES_PER_VERTEX",
    get: function get() {
      return Accessor.getBytesPerVertex(this);
    }
  }]);

  return Accessor;
}();

export { Accessor as default };
export { DEFAULT_ACCESSOR_VALUES };
//# sourceMappingURL=accessor.js.map