import SweApiResultControlParser from "./SweApiResult.control.parser";

class SweApiResultCollectionControlParser extends SweApiResultControlParser {
    constructor(dataObject) {
        super(dataObject);
    }

    init(schema, format) {
        if(format === 'application/swe+binary') {
            //resultSchema
            throw new Error(`Format not supported ${format}`);
        } else if(format === 'application/swe+xml') {
            //resultSchema
            throw new Error(`Format not supported ${format}`);
        } else {
            super.init(schema, format);
        }
    }
}

export default SweApiResultCollectionControlParser;
