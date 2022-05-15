import OmJsonParser from "./OmJsonParser.parser";

class OmJsonCollectionParser extends OmJsonParser {
    constructor(rootElement) {
        super(rootElement);
    }
    getTimeField() {
        return 'phenomenonTime';
    }

    parseDataBlock(arrayBuffer) {
        let dataBlock = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
        const jsonData = JSON.parse(dataBlock);
        const result = [];

        for(let d of jsonData.items) {
            d['timestamp'] = new Date(d[this.getTimeField()]).getTime();
            result.push(d);
        }
        return result;
    }
}

export default OmJsonCollectionParser;
