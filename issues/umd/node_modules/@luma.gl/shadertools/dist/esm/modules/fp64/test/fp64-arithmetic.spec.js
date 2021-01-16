import test from 'tape-catch';
import { testcase, gl } from './fp64-test-utils';
test('fp64#sum_fp64', function (t) {
  testcase(gl, {
    glslFunc: 'sum_fp64',
    binary: true,
    op: function op(a, b) {
      return a + b;
    },
    t: t
  });
});
test('fp64#sub_fp64', function (t) {
  testcase(gl, {
    glslFunc: 'sub_fp64',
    binary: true,
    op: function op(a, b) {
      return a - b;
    },
    t: t
  });
});
test('fp64#mul_fp64', function (t) {
  testcase(gl, {
    glslFunc: 'mul_fp64',
    binary: true,
    op: function op(a, b) {
      return a * b;
    },
    limit: 128,
    t: t
  });
});
test('fp64#div_fp64', function (t) {
  testcase(gl, {
    glslFunc: 'div_fp64',
    binary: true,
    op: function op(a, b) {
      return a / b;
    },
    limit: 128,
    t: t
  });
});
test('fp64#sqrt_fp64', function (t) {
  testcase(gl, {
    glslFunc: 'sqrt_fp64',
    op: function op(a) {
      return Math.sqrt(a);
    },
    limit: 128,
    t: t
  });
});
//# sourceMappingURL=fp64-arithmetic.spec.js.map