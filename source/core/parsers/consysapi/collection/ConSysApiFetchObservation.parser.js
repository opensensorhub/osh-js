import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import Observation from "../../../consysapi/observation/Observation";

class ConSysApiFetchObservationParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new Observation(
            data,
            this.networkProperties
        );
    }
}

export default ConSysApiFetchObservationParser;
