export function dirname(url) {
  const slashIndex = url && url.lastIndexOf('/');
  return slashIndex >= 0 ? url.substr(0, slashIndex) : '';
}
//# sourceMappingURL=path.js.map