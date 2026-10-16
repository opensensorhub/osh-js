import OmJsonParser from "../common/OmJsonParser.parser";
import ConSysApiResultParser from "./ConSysApiResult.parser";
import SweJsonParser from "../common/SweJsonParser.parser";
import SweBinaryParser from "../common/SweBinaryParser.parser";
import SweCsvParser from "../common/SweCsvParser.parser";
import {isDefined} from "../../../utils/Utils";

class ConSysApiResultControlStreamParser extends ConSysApiResultParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format in this.parsers && isDefined(this.parsers[format].parser)) {
            return this.parsers[format].parser;
        }
        if(format === 'application/json' || format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new OmJsonParser(schema.parametersSchema);
        } else if(format === 'application/swe+json') {
            //recordSchema
            this.parsers[format].parser  = new SweJsonParser(schema.parametersSchema);
        } /*else if(format === 'application/swe+xml') {
            //recordSchema
            this.parsers[format].parser = new SweXmlParser(schema.recordSchema);
        }*/ else if(format === 'application/swe+binary') {
            //recordSchema
            this.parsers[format].parser = new SweBinaryParser(schema.parametersSchema, schema.commandEncoding);
        } else if(format === 'application/swe+csv') {
            //recordSchema
            this.parsers[format].parser = new SweCsvParser(schema.parametersSchema, schema.commandEncoding);
        } else {
            throw Error(`Not supported parser format: ${format}`);
        }
    }
}

export default ConSysApiResultControlStreamParser;
