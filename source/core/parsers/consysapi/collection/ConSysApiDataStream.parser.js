import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import DataStream from "../../../consysapi/datastream/DataStream";

class ConSysApiDataStreamParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new DataStream(
            data,
            {
                streamProtocol: 'ws', // default streaming
                ...this.networkProperties
            }
        );
    }
}

export default ConSysApiDataStreamParser;
