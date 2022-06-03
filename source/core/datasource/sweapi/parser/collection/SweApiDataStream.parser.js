import DataStream from "../../../../sweapi/datastream/DataStream";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiDataStreamParser extends SweApiCollectionObjectParser {
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

export default SweApiDataStreamParser;
