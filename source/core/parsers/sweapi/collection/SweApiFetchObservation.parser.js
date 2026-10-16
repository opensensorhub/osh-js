import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
import Observation from "../../../sweapi/observation/Observation";

class SweApiFetchObservationParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new Observation(
            data,
            this.networkProperties
        );
    }
}

export default SweApiFetchObservationParser;
