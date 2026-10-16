import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
import Control from "../../../sweapi/control/Control";

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
