export function dirname(url) {
  var slashIndex = url && url.lastIndexOf('/');
  return slashIndex >= 0 ? url.substr(0, slashIndex) : '';
}
//# sourceMappingURL=path.js.map