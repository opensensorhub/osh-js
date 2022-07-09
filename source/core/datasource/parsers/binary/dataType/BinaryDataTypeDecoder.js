import AbstractDataTypeDecoder from "../../AbstractDataTypeDecoder";

class BinaryDataTypeDecoder extends AbstractDataTypeDecoder {
    constructor(props) {
        super(props);
        this.decoders = {};
        this.blockLength = 0;
    }

    init() {
        this.data = new DataView(this.data);
        this.blockIdx = 0;
        this.tokenOffset = 0;
        if(this.data.byteLength % this.blockLength !== 0){
            throw Error(`Total length ${this.data.byteLength} does not match to number of block length ${this.blockLength}`);
        }
        this.totalBlocks = this.data.byteLength / this.blockLength;
    }

    nextToken(path) {
        let decoder = this.decoders[path];
        // block Offset + token Offset
        const token = decoder.decode(this.data, (this.blockIdx*this.blockLength) + this.tokenOffset, this.props.littleEndian);
        this.tokenOffset += decoder.length();
        if(this.tokenOffset >= this.blockLength) {
            this.tokenOffset = 0;
            this.blockIdx++;
        }
        return token;
    }

    hasNextBlock() {
        return this.blockIdx < this.totalBlocks && this.tokenOffset < this.blockLength;
    }

    setRefs(refs) {
        this.decoders = refs;
        for(let key in this.decoders) {
            this.blockLength += this.decoders[key].length();
        }
    }
}
export default BinaryDataTypeDecoder;
