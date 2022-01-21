import DataSourceParser from "../../../parsers/DataSourceParser";
import Observation from "../../../../sweapi/observation/Observation";

class SweApiFetchObservationParser extends DataSourceParser {
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

    parseTimeStamp(data) {
        return 0;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SweApiFetchObservationParser;
