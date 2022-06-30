// http://www.opengis.net/def/dataType/OGC/0/double
class BinaryDoubleDataTypeDecoder {
    decode(arrayBuffer, props) {
        const result = new DataView(arrayBuffer).getFloat64(props.offset, props.littleEndian);
        props.offset += 8;
        return result;
    }
}
export default BinaryDoubleDataTypeDecoder;
