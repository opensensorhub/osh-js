import AbstractDataTypeDecoder from "../../AbstractDataTypeDecoder";

class BinaryDataTypeDecoder extends AbstractDataTypeDecoder {
    constructor(props) {
        super(props);
        this.decoders = {};
        this.componentsLength = 0;
    }

    init() {
        this.data = new DataView(this.data);
        this.componentIdx = 0;
        this.tokenOffset = 0;
    }

    nextToken(path) {
        let decoder = this.decoders[path];
        // block Offset + token Offset
        const token = decoder.decode(this.data, this.tokenOffset, this.props.littleEndian);
        this.tokenOffset += decoder.length();
        return token;
    }

    hasNextBlock() {
        return this.tokenOffset < this.data.buffer.byteLength;
    }

    addRef(ref, decoder) {
        this.decoders[ref] = decoder;
        this.componentsLength += decoder.length();
    }
}
export default BinaryDataTypeDecoder;
