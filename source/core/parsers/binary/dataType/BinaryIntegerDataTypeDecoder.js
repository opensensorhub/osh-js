//http://www.opengis.net/def/dataType/OGC/0/signedInt
class BinaryIntegerDataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        return dataView.getUint32(offset, littleEndian);
    }

    length() {
        return 4;
    }
}
export default BinaryIntegerDataTypeDecoder;
