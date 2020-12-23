import DataSourceParser from "../../../../source/osh/datareceiver/parsers/DataSourceParser";

class EQParser extends DataSourceParser {

    constructor() {
        super();
    }
    parseTimeStamp(data) {
        return Date.parse(data.time)/1000;
    }

    parseData(data) {
        return data;
    }

    buildUrl(properties= {}) {
        return properties.topicName;
    }
}

export default  EQParser;
