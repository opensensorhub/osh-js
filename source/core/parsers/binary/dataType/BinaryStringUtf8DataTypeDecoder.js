// http://www.opengis.net/def/dataType/OGC/0/string-utf-8
DataView.prototype.getString = function(offset, length,littleEndian){
    let end = typeof length == 'number' ? offset + length : this.byteLength;
    let text = '';
    let val = -1;

    while (offset < this.byteLength && offset < end){
        val = this.getUint8(offset++, littleEndian);
        if (val === 0) break;
        text += String.fromCharCode(val);
    }

    return text;
};

const decoderForStringDataTypeDecoder = new TextDecoder("utf-8");

class BinaryStringDataTypeDecoder {
    decode(dataView, offset, littleEndian = false) {
        this.strLength = dataView.getUint16(offset, littleEndian);
        return decoderForStringDataTypeDecoder.decode(new DataView(dataView.buffer,offset+2, this.strLength));
    }
    length() {
        // 2 = size of the strLength at the beginning of the string = getUint16()
        return this.strLength+2;
    }
}
export default BinaryStringDataTypeDecoder;
