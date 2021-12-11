import DataSourceParser from "../DataSourceParser";
import DataStream from "../../../sensorwebapi/api/datastream/DataStream";

class SensorWebApiDataStreamParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        console.log(data)
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
            this.networkProperties
        );
    }

    parseTimeStamp(data) {
        return 0;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SensorWebApiDataStreamParser;
