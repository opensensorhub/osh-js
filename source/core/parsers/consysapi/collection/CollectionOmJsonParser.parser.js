import OmJsonParser from "../common/OmJsonParser.parser";

class OmJsonCollectionParser extends OmJsonParser {
    constructor(rootElement) {
        super(rootElement);
    }
    getTimeField() {
        return 'phenomenonTime';
    }

    parseDataBlock(arrayBuffer) {
        let dataBlock = this.textDecoder.decode(arrayBuffer);
        const jsonData = JSON.parse(dataBlock);
        const result = [];

        if (jsonData == null || jsonData.items == null) {
            return result;
        }
        for(let d of jsonData.items) {
            if (d == null) continue;
            d['timestamp'] = new Date(d[this.getTimeField()]).getTime();
            result.push(d);
        }
        return result;
    }
}

export default OmJsonCollectionParser;
