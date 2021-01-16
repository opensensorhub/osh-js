"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeIterator = makeIterator;

var _stringIterator = require("./string-iterator");

var _arrayBufferIterator = require("./array-buffer-iterator");

var _blobIterator = require("./blob-iterator");

var _loaderUtils = require("@loaders.gl/loader-utils");

var _streamIterator = require("./stream-iterator");

var _isType = require("../../javascript-utils/is-type");

function makeIterator(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof data === 'string') {
    return (0, _stringIterator.makeStringIterator)(data, options);
  }

  if (data instanceof ArrayBuffer) {
    return (0, _arrayBufferIterator.makeArrayBufferIterator)(data, options);
  }

  if ((0, _isType.isBlob)(data)) {
    return (0, _blobIterator.makeBlobIterator)(data, options);
  }

  if ((0, _isType.isReadableStream)(data)) {
    return (0, _streamIterator.makeStreamIterator)(data);
  }

  if ((0, _isType.isResponse)(data)) {
    return (0, _streamIterator.makeStreamIterator)(data.body);
  }

  return (0, _loaderUtils.assert)(false);
}
//# sourceMappingURL=make-iterator.js.map