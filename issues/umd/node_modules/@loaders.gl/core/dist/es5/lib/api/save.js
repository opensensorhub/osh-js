"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.save = save;
exports.saveSync = saveSync;

var _encode = require("./encode");

var _writeFile = require("../fetch/write-file");

function save(data, url, writer, options) {
  var encodedData = (0, _encode.encode)(data, writer, options, url);
  return (0, _writeFile.writeFile)(url, encodedData);
}

function saveSync(data, url, writer, options) {
  var encodedData = (0, _encode.encodeSync)(data, writer, options, url);
  return (0, _writeFile.writeFileSync)(url, encodedData);
}
//# sourceMappingURL=save.js.map