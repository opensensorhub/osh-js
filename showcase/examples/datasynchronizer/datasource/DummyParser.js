import DataSourceParser from 'osh/core/datasource/parsers/DataSourceParser';

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
