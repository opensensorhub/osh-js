//http://www.opengis.net/def/dataType/OGC/0/signedShort
class BinaryShortDataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        return dataView.getInt16(offset, littleEndian);
    }

    length() {
        return 2;
    }
}
export default BinaryShortDataTypeDecoder;
