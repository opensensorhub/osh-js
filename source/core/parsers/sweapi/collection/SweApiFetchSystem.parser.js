import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
import System from "../../../sweapi/system/System";

class SweApiFetchSystemParser extends SweApiCollectionObjectParser {
    parseData(data) {
        return new System(
            data,
            this.networkProperties
        );
    }
}

export default SweApiFetchSystemParser;
