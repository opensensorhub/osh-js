const DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
const MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;
export function parseMIMEType(mimeString) {
  if (typeof mimeString !== 'string') {
    return '';
  }

  const matches = mimeString.match(MIME_TYPE_PATTERN);

  if (matches) {
    return matches[1];
  }

  return mimeString;
}
export function parseMIMETypeFromURL(dataUrl) {
  if (typeof dataUrl !== 'string') {
    return '';
  }

  const matches = dataUrl.match(DATA_URL_PATTERN);

  if (matches) {
    return matches[1];
  }

  return '';
}
//# sourceMappingURL=mime-type-utils.js.map