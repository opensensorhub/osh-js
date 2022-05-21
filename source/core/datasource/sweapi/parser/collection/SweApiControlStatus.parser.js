import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiControlStatus extends SweApiCollectionObjectParser {
    constructor(networkProperties) {
        super(networkProperties);
        this.textDecoder = new TextDecoder();
    }

    parseData(data, format) {
        if(format === 'arraybuffer') {
            return this.textDecoder.decode(data);
        } else {
            return data;
        }
    }
}

export default SweApiControlStatus;
