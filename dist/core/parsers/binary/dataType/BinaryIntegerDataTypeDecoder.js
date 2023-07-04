//http://www.opengis.net/def/dataType/OGC/0/signedInt
var BinaryIntegerDataTypeDecoder = /** @class */ (function () {
    function BinaryIntegerDataTypeDecoder() {
    }
    BinaryIntegerDataTypeDecoder.prototype.decode = function (dataView, offset, littleEndian) {
        if (littleEndian === void 0) { littleEndian = false; }
        return dataView.getUint32(offset, littleEndian);
    };
    BinaryIntegerDataTypeDecoder.prototype.length = function () {
        return 4;
    };
    return BinaryIntegerDataTypeDecoder;
}());
export default BinaryIntegerDataTypeDecoder;
//# sourceMappingURL=BinaryIntegerDataTypeDecoder.js.map