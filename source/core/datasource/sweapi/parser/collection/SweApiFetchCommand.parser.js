import DataSourceParser from "../../../parsers/DataSourceParser";
import Command from "../../../../sweapi/command/Command";
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";

class SweApiFetchCommandParser extends SweApiCollectionObjectParser {
    constructor(networkProperties, systemId) {
        super(networkProperties);
        this.systemId = systemId;
    }

    parseData(data) {
        return new Command(
            {
                ...data,
                systemId: this.systemId
            },
            this.networkProperties
        );
    }
}

export default SweApiFetchCommandParser;
