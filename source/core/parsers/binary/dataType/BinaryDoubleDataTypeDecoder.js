// http://www.opengis.net/def/dataType/OGC/0/double
class BinaryDoubleDataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        return dataView.getFloat64(offset, littleEndian);
    }

    length() {
        return 8;
    }
}
export default BinaryDoubleDataTypeDecoder;
