class BinaryDataTypeDecoder {
    constructor() {
        this.decoders = {};
    }
    decode(values, props, path) {
        const decoder = this.decoders[path];
        return decoder.decode(values, props, path);
    }

    addRef(ref, decoder) {
        this.decoders[ref] = decoder;
    }
}
export default BinaryDataTypeDecoder;
