import DataSourceParser from "../../../parsers/DataSourceParser";
import Command from "../../../../sweapi/command/Command";

class SweApiFetchCommandParser extends DataSourceParser {
    constructor(networkProperties, systemId) {
        super();
        this.networkProperties = networkProperties;
        this.systemId = systemId;
    }

    parseData(data) {
        let rec;
        if(data instanceof ArrayBuffer) {
            rec = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(data)));
        } else {
            rec = data;
        }

        return new Command(
            {
                ...rec,
                systemId: this.systemId
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

export default SweApiFetchCommandParser;
