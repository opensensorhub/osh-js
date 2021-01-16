"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dirname = dirname;

function dirname(url) {
  var slashIndex = url && url.lastIndexOf('/');
  return slashIndex >= 0 ? url.substr(0, slashIndex) : '';
}
//# sourceMappingURL=path.js.map