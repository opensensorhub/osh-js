import SensorWebApiFilter from "../../../sweapi/Filter";
import {isDefined} from "../../../utils/Utils";

class SweApiResultParser  {
    constructor(dataObject) {
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
                        const jsonSchema = await this.dataObject.getSchema(new SensorWebApiFilter({
                            obsFormat: format
                        }));
                        this.init(jsonSchema, format);
                        resolve();
                    } catch (ex) {
                      console.error(ex);
                      reject(ex);
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
        throw new Error('Unsupported Operation')
    }

    async parseDataBlock(arrayBuffer, format = 'application/om+json') {
        const parser = await this.checkParser(format);
        return parser.parseDataBlock(arrayBuffer);
    }
}

export default SweApiResultParser;
