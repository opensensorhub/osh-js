import OmJsonParser from "../common/OmJsonParser.parser";
import SweApiResultParser from "./SweApiResult.parser";
import SweJsonParser from "../common/SweJsonParser.parser";
import SweBinaryParser from "../common/SweBinaryParser.parser";
import SweCsvParser from "../common/SweCsvParser.parser";

class SweApiResultControlParser extends SweApiResultParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonParser(schema.commandSchema);
        } else if(format === 'application/swe+json') {
            //recordSchema
            this.parsers[format].parser  = new SweJsonParser(schema.commandSchema);
        } /*else if(format === 'application/swe+xml') {
            //recordSchema
            this.parsers[format].parser = new SweXmlParser(schema.recordSchema);
        }*/ else if(format === 'application/swe+binary') {
            //recordSchema
            this.parsers[format].parser = new SweBinaryParser(schema.commandSchema, schema.commandEncoding);
        } else if(format === 'application/swe+csv') {
            //recordSchema
            this.parsers[format].parser = new SweCsvParser(schema.commandSchema, schema.commandEncoding);
        } else {
            throw Error(`Not supported parser format: ${format}`);
        }
    }
}

export default SweApiResultControlParser;
