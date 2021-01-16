"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeFile = writeFile;
exports.writeFileSync = writeFileSync;

var _loaderUtils = require("@loaders.gl/loader-utils");

var node = _interopRequireWildcard(require("../../node/write-file.node"));

function writeFile(filePath, arrayBufferOrString, options) {
  filePath = (0, _loaderUtils.resolvePath)(filePath);

  if (!_loaderUtils.isBrowser && node.writeFile) {
    return node.writeFile(filePath, arrayBufferOrString, options);
  }

  return (0, _loaderUtils.assert)(false);
}

function writeFileSync(filePath, arrayBufferOrString, options) {
  filePath = (0, _loaderUtils.resolvePath)(filePath);

  if (!_loaderUtils.isBrowser && node.writeFileSync) {
    return node.writeFileSync(filePath, arrayBufferOrString, options);
  }

  return (0, _loaderUtils.assert)(false);
}
//# sourceMappingURL=write-file.js.map