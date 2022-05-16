import Observation from "../../../../sweapi/observation/Observation";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiFetchObservationParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new Observation(
            data,
            this.networkProperties
        );
    }
}

export default SweApiFetchObservationParser;
