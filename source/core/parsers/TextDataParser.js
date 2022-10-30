import GenericParser from "./GenericParser";
import TimeParser from "./common/TimeParser";
import StringParser from "./common/StringParser";
import DecimalParser from "./common/DecimalParser";
import CountParser from "./common/CountParser";
import BooleanParser from "./common/BooleanParser";
import DataChoiceParser from "./common/DataChoiceParser";
import TextDataTypeDecoder from "./text/TextDataTypeDecoder";

class TextDataParser extends GenericParser {

    constructor(rootElement, encoding, properties = {timeShift : 0}) {
        super(rootElement, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {},
            refs: {},
            ...properties
        });
        this.resultEncoding = encoding;
        this.textDataTypeDecoder = new TextDataTypeDecoder(this.resultEncoding);
        this.props.registeredParser = {
            'Time': () => new TimeParser(),
            'Category': () => new StringParser(),
            'Quantity': () => new DecimalParser(),
            'Count': () => new CountParser(),
            'Boolean': () => new BooleanParser(),
            'DataChoice': () => new DataChoiceParser(),
        };

        this.parser.init(rootElement, this.props, '');
    }

    parseDataBlock(input) {
        let dataBlocks;
        if(input instanceof ArrayBuffer) {
            dataBlocks = this.textDecoder.decode(input);
        } else {
            dataBlocks = input;
        }
        this.textDataTypeDecoder.setData(dataBlocks);
        let results = [];
        while(this.textDataTypeDecoder.hasNextBlock()) {
            const res = {};
            this.parser.parse(this.textDataTypeDecoder, {}, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime() + this.props.timeShift;
            results.push(res);
        }
        return results;
    }
}

export default TextDataParser;
