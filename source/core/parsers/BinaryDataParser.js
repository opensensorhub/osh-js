import GenericParser from "./GenericParser";
import SkipParser from "./common/SkipParser";
import BinaryEncodingParser from "./binary/BinaryEncodingParser";
import MemberParser from "./binary/MemberParser";
import ComponentParser from "./binary/ComponentParser";
import BlockParser from "./binary/BlockParser";
import BinaryDataTypeDecoder from "./binary/dataType/BinaryDataTypeDecoder";
import StringParser from "./common/StringParser";
import DecimalParser from "./common/DecimalParser";
import CountParser from "./common/CountParser";
import BooleanParser from "./common/BooleanParser";
import DataChoiceParser from "./common/DataChoiceParser";
import BinaryTimeParser from "./binary/BinaryTimeParser";
import RootParser from "./common/RootParser";

class BinaryDataParser extends GenericParser {

    constructor(rootElement, encoding, properties = {timeShift : 0}) {
        super(rootElement, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {},
            refs: {},
            ...properties
        });
        this.resultEncoding = encoding;
        this.binaryDataTypeDecoder = new BinaryDataTypeDecoder({
            ...encoding,
            littleEndian: encoding.byteOrder === 'littleEndian'
        });

        const propsEncoding = {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'member': () => new MemberParser(),
                'Component': () => new ComponentParser(this.binaryDataTypeDecoder),
                'Block': () => new BlockParser(this.binaryDataTypeDecoder),
                'BinaryEncoding': () => new BinaryEncodingParser()
            },
            refs: {},
        };
        // parse ResultEncoding
        const rootElementEncoding = new RootParser();
        rootElementEncoding.init(encoding,propsEncoding);

        // parse schema
        this.props.registeredParser = {
            'Time': () => new BinaryTimeParser(),
            'Category': () => new StringParser(),
            'Quantity': () => new DecimalParser(),
            'Count': () => new CountParser(),
            'Boolean': () => new BooleanParser(),
            'DataChoice': () => new DataChoiceParser(),
            'href': () => new SkipParser()
        };
        //
        this.parser.init(rootElement, {
            ...this.props,
            refs: propsEncoding.refs
        }, '');
    }

    parseDataBlock(arrayBuffer) {
        this.binaryDataTypeDecoder.setData(arrayBuffer);
        let results = [];
        while(this.binaryDataTypeDecoder.hasNextBlock()) {
            const res = {};
            this.parser.parse(this.binaryDataTypeDecoder, {}, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime() + this.props.timeShift;
            results.push(res);
        }
        return results;
    }
}

export default BinaryDataParser;
