import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";

class ConSysApiControlStreamStatusParser extends ConSysApiCollectionObjectParser {
    constructor(networkProperties) {
        super(networkProperties);
        this.textDecoder = new TextDecoder();
    }

    parseData(data, format) {
        let res;
        if(format === 'arraybuffer') {
            res = this.textDecoder.decode(data);
        } else {
            res = data;
        }

        if (typeof res === 'string') {
            try {
                res = JSON.parse(res);
            } catch (e) {
                console.warn('Failed to parse JSON:', e);
            }
        }

        return res;
    }
}

export default ConSysApiControlStreamStatusParser;
