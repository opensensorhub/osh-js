export function* makeStringIterator(string, options = {}) {
  const {
    chunkSize = 256 * 1024
  } = options;
  let offset = 0;
  const textEncoder = new TextEncoder();

  while (offset < string.length) {
    const chunkLength = Math.min(string.length - offset, chunkSize);
    const chunk = string.slice(offset, offset + chunkLength);
    offset += chunkLength;
    yield textEncoder.encode(chunk);
  }
}
//# sourceMappingURL=string-iterator.js.map