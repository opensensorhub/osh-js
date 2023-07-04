var BinaryBlockDataTypeDecoder = /** @class */ (function () {
    function BinaryBlockDataTypeDecoder() {
    }
    BinaryBlockDataTypeDecoder.prototype.decode = function (dataView, offset, littleEndian) {
        if (littleEndian === void 0) { littleEndian = false; }
        var pktLength = dataView.getUint32(offset, littleEndian);
        // integer | 4 bytes | 32 bits
        var data = new Uint8Array(dataView.buffer.slice(offset + 4, offset + 4 + pktLength));
        this.length = function () { return pktLength + 4; };
        return data;
    };
    BinaryBlockDataTypeDecoder.prototype.length = function () {
        return 0;
    };
    return BinaryBlockDataTypeDecoder;
}());
export default BinaryBlockDataTypeDecoder;
//# sourceMappingURL=BinaryBlockDataTypeDecoder.js.map