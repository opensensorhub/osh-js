import TraverseParser from "./common/TraverseParser";
import GenericParser from "./GenericParser";
import TimeParser from "./common/TimeParser";

class JsonDataParser extends GenericParser {

    constructor(rootElement,properties = {timeShift : 0}) {
        super(rootElement,{
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'Time': () => new TimeParser(),
                'Category': () => new TraverseParser(),
                'Quantity': () => new TraverseParser(),
                'Count': () => new TraverseParser(),
                'Boolean': () => new TraverseParser(),
                'DataChoice': () => new TraverseParser(),
            },
            refs: {},
            ...properties
        });
        this.parser.init(rootElement, this.props);
    }

    getTimeField() {
        return this.parser.getTimePropertyName();
    }

    parseDataBlock(input) {
        let jsonData;
        if(input instanceof ArrayBuffer) {
            jsonData = JSON.parse(this.textDecoder.decode(input));
        } else {
            try {
                jsonData = JSON.parse(input);
            }catch (e) {
                jsonData = input;
            }
        }

        if(Array.isArray(jsonData)) {
            for(let d of jsonData) {
                d['timestamp'] = new Date(d[this.getTimeField()]).getTime() + this.props.timeShift;
            }
            return jsonData;
        } else {
            jsonData['timestamp'] = new Date(jsonData[this.getTimeField()]).getTime() + this.props.timeShift;
            return [jsonData];
        }
    }
}

export default JsonDataParser;
