import DataSourceParser from "../../../../source/core/datasource/parsers/DataSourceParser";
import {randomUUID} from "../../../../source/core/utils/Utils";

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
