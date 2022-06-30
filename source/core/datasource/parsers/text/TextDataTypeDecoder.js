class TextDataTypeDecoder {
    decode(values, props, path) {
        return values[props.index++];
    }
}
export default TextDataTypeDecoder;
