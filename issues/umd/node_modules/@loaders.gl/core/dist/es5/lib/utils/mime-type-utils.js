"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMIMEType = parseMIMEType;
exports.parseMIMETypeFromURL = parseMIMETypeFromURL;
var DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
var MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;

function parseMIMEType(mimeString) {
  if (typeof mimeString !== 'string') {
    return '';
  }

  var matches = mimeString.match(MIME_TYPE_PATTERN);

  if (matches) {
    return matches[1];
  }

  return mimeString;
}

function parseMIMETypeFromURL(dataUrl) {
  if (typeof dataUrl !== 'string') {
    return '';
  }

  var matches = dataUrl.match(DATA_URL_PATTERN);

  if (matches) {
    return matches[1];
  }

  return '';
}
//# sourceMappingURL=mime-type-utils.js.map