import System from "../../../../sweapi/system/System";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiFetchSystemParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new System(
            data,
            this.networkProperties
        );
    }
}

export default SweApiFetchSystemParser;
