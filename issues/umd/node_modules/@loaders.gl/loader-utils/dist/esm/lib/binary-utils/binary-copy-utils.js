import { padTo4Bytes } from './memory-copy-utils';
export function copyPaddedArrayBufferToDataView(dataView, byteOffset, sourceBuffer) {
  var paddedLength = padTo4Bytes(sourceBuffer.byteLength);
  var padLength = paddedLength - sourceBuffer.byteLength;

  if (dataView) {
    var targetArray = new Uint8Array(dataView.buffer, dataView.byteOffset + byteOffset, sourceBuffer.byteLength);
    var sourceArray = new Uint8Array(sourceBuffer);
    targetArray.set(sourceArray);

    for (var i = 0; i < padLength; ++i) {
      dataView.setUint8(byteOffset + sourceBuffer.byteLength + i, 0x20);
    }
  }

  byteOffset += paddedLength;
  return byteOffset;
}
export function copyPaddedStringToDataView(dataView, byteOffset, string) {
  var textEncoder = new TextEncoder();
  var stringBuffer = textEncoder.encode(string);
  byteOffset = copyPaddedArrayBufferToDataView(dataView, byteOffset, stringBuffer);
  return byteOffset;
}
//# sourceMappingURL=binary-copy-utils.js.map