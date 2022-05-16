import DataSourceParser from "../../../parsers/DataSourceParser";
import Control from "../../../../sweapi/control/Control";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiFetchControlParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new Control(
            data,
            {
                streamProtocol: 'ws', // default streaming
                ...this.networkProperties
            }
        );
    }
}

export default SweApiFetchControlParser;
