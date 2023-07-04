//http://www.opengis.net/def/dataType/OGC/0/float32
var BinaryFloat32DataTypeDecoder = /** @class */ (function () {
    function BinaryFloat32DataTypeDecoder() {
    }
    BinaryFloat32DataTypeDecoder.prototype.decode = function (dataView, offset, littleEndian) {
        if (littleEndian === void 0) { littleEndian = false; }
        return dataView.getFloat32(offset, littleEndian);
    };
    BinaryFloat32DataTypeDecoder.prototype.length = function () {
        return 4;
    };
    return BinaryFloat32DataTypeDecoder;
}());
export default BinaryFloat32DataTypeDecoder;
//# sourceMappingURL=BinaryFloat32DataTypeDecoder.js.map