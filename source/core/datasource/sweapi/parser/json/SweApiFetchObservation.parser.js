import DataSourceParser from "../../../parsers/DataSourceParser";
import Observation from "../../../../sweapi/observation/Observation";

class SweApiFetchObservationParser extends DataSourceParser {
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

        return new Observation(
            rec,
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
