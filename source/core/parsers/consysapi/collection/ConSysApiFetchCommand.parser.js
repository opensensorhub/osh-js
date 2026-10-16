import ConSysApiCollectionObjectParser from "./ConSysApiCollectionObjectParser";
import Command from "../../../consysapi/command/Command";

class ConSysApiFetchCommandParser extends ConSysApiCollectionObjectParser {
    constructor(networkProperties) {
        super(networkProperties);
    }

    parseData(data) {
        return new Command(
            {
                ...data,
            },
            this.networkProperties
        );
    }
}

export default ConSysApiFetchCommandParser;
