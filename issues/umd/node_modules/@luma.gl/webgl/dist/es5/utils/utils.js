"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uid = uid;
exports.isPowerOfTwo = isPowerOfTwo;
exports.isObjectEmpty = isObjectEmpty;

var _assert = _interopRequireDefault(require("./assert"));

var uidCounters = {};

function uid() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'id';
  uidCounters[id] = uidCounters[id] || 1;
  var count = uidCounters[id]++;
  return "".concat(id, "-").concat(count);
}

function isPowerOfTwo(n) {
  (0, _assert["default"])(typeof n === 'number', 'Input must be a number');
  return n && (n & n - 1) === 0;
}

function isObjectEmpty(obj) {
  var isEmpty = true;

  for (var key in obj) {
    isEmpty = false;
    break;
  }

  return isEmpty;
}
//# sourceMappingURL=utils.js.map