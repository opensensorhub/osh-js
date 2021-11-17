import DataSourceParser from "./DataSourceParser";
import Observation from "../../sensorwebapi/api/observation/Observation";

class SensorWebApiFetchObservationParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        return new Observation(
            {
                id: data.id,
                datastreamId: data.datastreamId,
                foiId: data.foiId,
                phenomenonTime: data.phenomenonTime,
                resultTime: data.resultTime,
                result: data.result
            },
            this.networkProperties
        );
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SensorWebApiFetchObservationParser;
