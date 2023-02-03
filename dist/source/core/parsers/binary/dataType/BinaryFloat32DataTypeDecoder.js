//http://www.opengis.net/def/dataType/OGC/0/float32
class BinaryFloat32DataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        return dataView.getFloat32(offset, littleEndian);
    }
    length() {
        return 4;
    }
}
export default BinaryFloat32DataTypeDecoder;
