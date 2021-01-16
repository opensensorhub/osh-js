"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _tapeCatch = _interopRequireDefault(require("tape-catch"));

var _fp64TestUtils = require("./fp64-test-utils");

(0, _tapeCatch["default"])('fp64#sum_fp64', function (t) {
  (0, _fp64TestUtils.testcase)(_fp64TestUtils.gl, {
    glslFunc: 'sum_fp64',
    binary: true,
    op: function op(a, b) {
      return a + b;
    },
    t: t
  });
});
(0, _tapeCatch["default"])('fp64#sub_fp64', function (t) {
  (0, _fp64TestUtils.testcase)(_fp64TestUtils.gl, {
    glslFunc: 'sub_fp64',
    binary: true,
    op: function op(a, b) {
      return a - b;
    },
    t: t
  });
});
(0, _tapeCatch["default"])('fp64#mul_fp64', function (t) {
  (0, _fp64TestUtils.testcase)(_fp64TestUtils.gl, {
    glslFunc: 'mul_fp64',
    binary: true,
    op: function op(a, b) {
      return a * b;
    },
    limit: 128,
    t: t
  });
});
(0, _tapeCatch["default"])('fp64#div_fp64', function (t) {
  (0, _fp64TestUtils.testcase)(_fp64TestUtils.gl, {
    glslFunc: 'div_fp64',
    binary: true,
    op: function op(a, b) {
      return a / b;
    },
    limit: 128,
    t: t
  });
});
(0, _tapeCatch["default"])('fp64#sqrt_fp64', function (t) {
  (0, _fp64TestUtils.testcase)(_fp64TestUtils.gl, {
    glslFunc: 'sqrt_fp64',
    op: function op(a) {
      return Math.sqrt(a);
    },
    limit: 128,
    t: t
  });
});
//# sourceMappingURL=fp64-arithmetic.spec.js.map