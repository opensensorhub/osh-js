import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
import Command from "../../../sweapi/command/Command";

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
