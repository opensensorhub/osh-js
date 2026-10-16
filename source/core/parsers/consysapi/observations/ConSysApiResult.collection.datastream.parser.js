import OmJsonCollectionParser from "../collection/CollectionOmJsonParser.parser";
import ConSysApiResultDatastreamParser from "./ConSysApiResult.datastream.parser";

class ConSysApiResultCollectionDatastreamParser extends ConSysApiResultDatastreamParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonCollectionParser(schema.resultSchema);
        } else if(format === 'application/swe+xml') {
            //resultSchema
            throw new Error(`Format not supported ${format}`);
        } else {
            super.init(schema, format);
        }
    }
}

export default ConSysApiResultCollectionDatastreamParser;
