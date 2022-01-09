import DataSourceParser from "../../parsers/DataSourceParser";
import System from "../../../sweapi/system/System";

class SweApiFetchSystemParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        return new System(
            {
                id: data.id,
                type: data.type,
                ...data.properties,
            },
            this.networkProperties
        );
    }

    parseTimeStamp(data) {
        return 0;
    }

    buildUrl(properties) {
        //TODO
    }
}

export default SweApiFetchSystemParser;
