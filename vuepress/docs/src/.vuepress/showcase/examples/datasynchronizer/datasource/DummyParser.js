import DataSourceParser from "../../../../source/osh/datareceiver/parsers/DataSourceParser";
import {randomUUID} from "../../../../source/osh/utils/Utils";

class DummyParser extends DataSourceParser {

    constructor() {
        super();
    }
    parseTimeStamp(data) {
        return data.timeStamp;
    }

    parseData(data) {
        return data.data;
    }

    buildUrl(properties= {}) {
        return properties.topicName;
    }
}

export default  DummyParser;
