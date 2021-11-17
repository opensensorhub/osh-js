import DataSourceParser from "./DataSourceParser";
import DataStream from "../../sensorwebapi/api/datastream/DataStream";

class SensorWebApiFetchDataStreamParser extends DataSourceParser {
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
            this.networkProperties
        );
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SensorWebApiFetchDataStreamParser;
