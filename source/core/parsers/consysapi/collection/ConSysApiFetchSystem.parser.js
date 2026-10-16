import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import System from "../../../consysapi/system/System";

class ConSysApiFetchSystemParser extends ConSysApiCollectionObjectParser {
    parseData(data) {
        return new System(
            data,
            this.networkProperties
        );
    }
}

export default ConSysApiFetchSystemParser;
