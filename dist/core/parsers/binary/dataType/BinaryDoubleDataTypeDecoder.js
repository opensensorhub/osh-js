// http://www.opengis.net/def/dataType/OGC/0/double
var BinaryDoubleDataTypeDecoder = /** @class */ (function () {
    function BinaryDoubleDataTypeDecoder() {
    }
    BinaryDoubleDataTypeDecoder.prototype.decode = function (dataView, offset, littleEndian) {
        if (littleEndian === void 0) { littleEndian = false; }
        return dataView.getFloat64(offset, littleEndian);
    };
    BinaryDoubleDataTypeDecoder.prototype.length = function () {
        return 8;
    };
    return BinaryDoubleDataTypeDecoder;
}());
export default BinaryDoubleDataTypeDecoder;
//# sourceMappingURL=BinaryDoubleDataTypeDecoder.js.map