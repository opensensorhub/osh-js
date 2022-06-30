//http://www.opengis.net/def/dataType/OGC/0/signedShort
class BinaryShortDataTypeDecoder {
    decode(arrayBuffer, props) {
        const result = new DataView(arrayBuffer).getInt16(props.offset, props.littleEndian);
        props.offset += 2;
        return result;
    }
}
export default BinaryShortDataTypeDecoder;
