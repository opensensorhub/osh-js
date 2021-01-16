import { padTo4Bytes } from './memory-copy-utils';
export function copyPaddedArrayBufferToDataView(dataView, byteOffset, sourceBuffer) {
  const paddedLength = padTo4Bytes(sourceBuffer.byteLength);
  const padLength = paddedLength - sourceBuffer.byteLength;

  if (dataView) {
    const targetArray = new Uint8Array(dataView.buffer, dataView.byteOffset + byteOffset, sourceBuffer.byteLength);
    const sourceArray = new Uint8Array(sourceBuffer);
    targetArray.set(sourceArray);

    for (let i = 0; i < padLength; ++i) {
      dataView.setUint8(byteOffset + sourceBuffer.byteLength + i, 0x20);
    }
  }

  byteOffset += paddedLength;
  return byteOffset;
}
export function copyPaddedStringToDataView(dataView, byteOffset, string) {
  const textEncoder = new TextEncoder();
  const stringBuffer = textEncoder.encode(string);
  byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, stringBuffer);
  return byteOffset;
}
//# sourceMappingURL=binary-copy-utils.js.map