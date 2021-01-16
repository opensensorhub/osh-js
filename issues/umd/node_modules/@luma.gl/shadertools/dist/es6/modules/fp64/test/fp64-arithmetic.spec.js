import test from 'tape-catch';
import { testcase, gl } from './fp64-test-utils';
test('fp64#sum_fp64', t => {
  testcase(gl, {
    glslFunc: 'sum_fp64',
    binary: true,
    op: (a, b) => a + b,
    t
  });
});
test('fp64#sub_fp64', t => {
  testcase(gl, {
    glslFunc: 'sub_fp64',
    binary: true,
    op: (a, b) => a - b,
    t
  });
});
test('fp64#mul_fp64', t => {
  testcase(gl, {
    glslFunc: 'mul_fp64',
    binary: true,
    op: (a, b) => a * b,
    limit: 128,
    t
  });
});
test('fp64#div_fp64', t => {
  testcase(gl, {
    glslFunc: 'div_fp64',
    binary: true,
    op: (a, b) => a / b,
    limit: 128,
    t
  });
});
test('fp64#sqrt_fp64', t => {
  testcase(gl, {
    glslFunc: 'sqrt_fp64',
    op: a => Math.sqrt(a),
    limit: 128,
    t
  });
});
//# sourceMappingURL=fp64-arithmetic.spec.js.map