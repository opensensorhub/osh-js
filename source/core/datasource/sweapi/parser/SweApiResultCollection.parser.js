import OmJsonCollectionParser from "./CollectionOmJsonParser.parser";
import SweApiResultParser from "./SweApiResult.parser";

class SweApiResultCollectionParser extends SweApiResultParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonCollectionParser(schema.resultSchema);
        } else {
            super.init(schema, format);
        }
    }
}

export default SweApiResultCollectionParser;
