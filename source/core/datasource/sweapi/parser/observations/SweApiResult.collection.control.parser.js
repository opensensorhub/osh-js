import OmJsonCollectionParser from "../collection/CollectionOmJsonParser.parser";
import SweApiResultParser from "./SweApiResult.parser";

class SweApiResultCollectionControlParser extends SweApiResultParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonCollectionParser(schema.commandSchema);
        } else {
            super.init(schema, format);
        }
    }
}

export default SweApiResultCollectionControlParser;
