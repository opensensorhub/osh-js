import DataSourceParser from "../../parsers/DataSourceParser";
import DataStream from "../../../sweapi/datastream/DataStream";

class SweApiDataStreamParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        return new DataStream(
            {
                id: data.id,
                name: data.name,
                system: data.system,
                validTime: data.validTime,
                phenomenonTime: data.phenomenonTime,
                resultTime: data.resultTime,
                observedProperties: data.observedProperties,
                formats: data.formats
            },
            {
                stream: 'ws', // default streaming
                ...this.networkProperties
            }
        );
    }

    parseTimeStamp(data) {
        return 0;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SweApiDataStreamParser;
