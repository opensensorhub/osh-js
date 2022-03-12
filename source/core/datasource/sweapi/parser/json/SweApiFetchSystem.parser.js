import DataSourceParser from "../../../parsers/DataSourceParser";
import System from "../../../../sweapi/system/System";

class SweApiFetchSystemParser extends DataSourceParser {
    constructor(networkProperties) {
        super();
        this.networkProperties = networkProperties;
    }

    parseData(data) {
        let rec;
        if(data instanceof ArrayBuffer) {
            rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        } else {
            rec = data;
        }

        return new System(
            rec,
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
