class BinaryBlockDataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        const pktLength = dataView.getUint32(offset, littleEndian);
        // integer | 4 bytes | 32 bits
        const data =  new Uint8Array(dataView.buffer.slice(offset + 4, offset + 4 + pktLength));
        this.length = () => pktLength + 4;
        return data;
    }

    length() {
        return 0;
    }
}
export default BinaryBlockDataTypeDecoder;
