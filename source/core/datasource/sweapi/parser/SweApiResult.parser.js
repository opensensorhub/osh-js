import TimeSeriesParser from "../../parsers/TimeSeriesParser.parser";
import TextDataParser from "../../parsers/TextDataParser";
import {assertDefined, assertTrue, isDefined} from "../../../utils/Utils";
import SWEXmlStreamParser from "../../../parsers/SWEXmlStreamParser";
import JsonDataParser from "../../parsers/JsonDataParser";
import BinaryDataParser from "../../parsers/BinaryDataParser";
import SweJsonParser from "./SweJsonParser.parser";
import SweXmlParser from "./SweXmlParser.parser";
import SweBinaryParserParser from "./SweBinaryParser.parser";
import SweBinaryParser from "./SweBinaryParser.parser";
import SweCsvParser from "./SweCsvParser.parser";
import SensorWebApiFilter from "../../../sweapi/Filter";

class SweApiResultParser extends TimeSeriesParser {
    constructor(dataObject) {
        super();
        this.dataObject = dataObject;
        this.parsers = {
            'application/om+json' : {
                schemaPromise: undefined,
                parser: undefined
            },
            'application/swe+json' : {
                schemaPromise: undefined,
                parser: undefined
            },
            'application/swe+xml' : {
                schemaPromise: undefined,
                parser: undefined
            },
            'application/swe+csv' : {
                schemaPromise: undefined,
                parser: undefined
            },
            'application/swe+binary' : {
                schemaPromise: undefined,
                parser: undefined
            }
        }
    }

    async checkParser(format) {
        if(!(format in this.parsers)) {
            throw new Error(`Not support format ${format}`);
        }

        const parser = this.parsers[format];
        if(!isDefined(parser.parser)) {
            if(!isDefined(parser.schemaPromise)) {
                this.parsers[format].schemaPromise = new Promise(async (resolve, reject) => {
                    try {
                        const arrayBufferSchema = await this.dataObject.getSchema(new SensorWebApiFilter({
                            obsFormat: format
                        }));
                        const schema = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(arrayBufferSchema)));
                        this.init(schema, format);
                        resolve();
                    } catch (ex) {
                      console.error(ex);
                      reject();
                    }
                });
            }
            await parser.schemaPromise;
            return this.parsers[format].parser;
        } else {
            return parser.parser;
        }
    }

    init(schema, format) {
        if(format === 'application/om+json') {
            //resultSchema
            this.parsers[format].parser = new JsonDataParser(schema.resultSchema);
        } else if(format === 'application/swe+json') {
            //recordSchema
            this.parsers[format].parser  = new SweJsonParser(schema.recordSchema);
        } else if(format === 'application/swe+xml') {
            //recordSchema
            this.parsers[format].parser = new SweXmlParser(schema.recordSchema);
        } else if(format === 'application/swe+binary') {
            //recordSchema
            this.parsers[format].parser = new SweBinaryParser(schema.recordSchema, schema.recordEncoding);
        } else if(format === 'application/swe+csv') {
            //recordSchema
            this.parsers[format].parser = new SweCsvParser(schema.recordSchema, schema.recordEncoding);
        } else {
            throw Error(`Not supported parser format: ${this.format}`);
        }
    }

    async parseDataBlock(arrayBuffer, format = 'application/om+json') {
        const parser = await this.checkParser(format);
        return parser.parseDataBlock(arrayBuffer);
    }
}

export default SweApiResultParser;
