import OmJsonCollectionParser from "./OmJsonCollectionParser.parser";
import SweApiResultParser from "./SweApiResult.parser";

class SweApiCollectionResultParser extends SweApiResultParser {
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

export default SweApiCollectionResultParser;
