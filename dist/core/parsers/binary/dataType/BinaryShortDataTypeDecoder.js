//http://www.opengis.net/def/dataType/OGC/0/signedShort
var BinaryShortDataTypeDecoder = /** @class */ (function () {
    function BinaryShortDataTypeDecoder() {
    }
    BinaryShortDataTypeDecoder.prototype.decode = function (dataView, offset, littleEndian) {
        if (littleEndian === void 0) { littleEndian = false; }
        return dataView.getInt16(offset, littleEndian);
    };
    BinaryShortDataTypeDecoder.prototype.length = function () {
        return 2;
    };
    return BinaryShortDataTypeDecoder;
}());
export default BinaryShortDataTypeDecoder;
//# sourceMappingURL=BinaryShortDataTypeDecoder.js.map