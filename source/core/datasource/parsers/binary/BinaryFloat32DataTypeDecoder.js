//http://www.opengis.net/def/dataType/OGC/0/float32
class BinaryFloat32DataTypeDecoder {
    decode(arrayBuffer, props) {
        const result = new DataView(arrayBuffer).getFloat32(props.offset, props.littleEndian);
        props.offset += 4;
        return result;
    }
}
export default BinaryFloat32DataTypeDecoder;
