import OmJsonParser from "../common/OmJsonParser.parser";
import SweApiResultParser from "./SweApiResult.parser";
import SweJsonParser from "../common/SweJsonParser.parser";
import SweBinaryParser from "../common/SweBinaryParser.parser";
import SweCsvParser from "../common/SweCsvParser.parser";
import {isDefined} from "../../../utils/Utils";

class SweApiResultDatastreamParser extends SweApiResultParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format in this.parsers && isDefined(this.parsers[format].parser)) {
            return this.parsers[format].parser;
        }
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonParser(schema.resultSchema);
        } else if(format === 'application/swe+json') {
            //recordSchema
            this.parsers[format].parser  = new SweJsonParser(schema.recordSchema);
        } /*else if(format === 'application/swe+xml') {
            //recordSchema
            this.parsers[format].parser = new SweXmlParser(schema.recordSchema);
        }*/ else if(format === 'application/swe+binary') {
            //recordSchema
            this.parsers[format].parser = new SweBinaryParser(schema.recordSchema, schema.recordEncoding);
        } else if(format === 'application/swe+csv') {
            //recordSchema
            this.parsers[format].parser = new SweCsvParser(schema.recordSchema, schema.recordEncoding);
        } else {
            throw Error(`Not supported parser format: ${format}`);
        }
    }
}

export default SweApiResultDatastreamParser;
