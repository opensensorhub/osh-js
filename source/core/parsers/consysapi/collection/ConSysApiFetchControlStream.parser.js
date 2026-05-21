import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import ControlStream from "../../../consysapi/controlstream/ControlStream";

class ConSysApiFetchControlStreamParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new ControlStream(
            data,
            {
                streamProtocol: 'ws', // default streaming
                ...this.networkProperties
            }
        );
    }
}

export default ConSysApiFetchControlStreamParser;
