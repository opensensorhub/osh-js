//http://www.opengis.net/def/dataType/OGC/0/signedInt
class BinaryIntegerDataTypeDecoder {
    decode(arrayBuffer, props) {
        const result = new DataView(arrayBuffer).getUint32(props.offset, props.littleEndian);
        props.offset += 4;
        return result;
    }
}
export default BinaryIntegerDataTypeDecoder;
