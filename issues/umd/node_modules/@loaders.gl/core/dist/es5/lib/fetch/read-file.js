"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readFileSync = readFileSync;

var _loaderUtils = require("@loaders.gl/loader-utils");

var node = _interopRequireWildcard(require("../../node/read-file-sync.node"));

var _readFile = require("./read-file.browser");

function readFileSync(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  url = (0, _loaderUtils.resolvePath)(url);

  if (!_loaderUtils.isBrowser && node.readFileSync) {
    return node.readFileSync(url, options);
  }

  return (0, _readFile.readFileSyncBrowser)(url, options);
}
//# sourceMappingURL=read-file.js.map