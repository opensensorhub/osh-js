import DataSourceParser from "../../../parsers/DataSourceParser";
import DataStream from "../../../../sweapi/datastream/DataStream";

class SweApiDataStreamParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        let rec;
        if(data instanceof ArrayBuffer) {
            rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        } else {
            rec = data;
        }

        return new DataStream(
            {
                id: rec.id,
                name: rec.name,
                system: rec.system,
                validTime: rec.validTime,
                phenomenonTime: rec.phenomenonTime,
                resultTime: rec.resultTime,
                observedProperties: rec.observedProperties,
                formats: rec.formats
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