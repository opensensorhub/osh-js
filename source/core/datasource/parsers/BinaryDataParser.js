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

    constructor(rootElement, encoding) {
        super(rootElement, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {},
            refs: {},
        });
        this.resultEncoding = encoding;
        let componentParser = new ComponentParser();
        const propsEncoding = {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'member': () => new MemberParser(),
                'Component': () => componentParser,
                'Block': () => new BlockParser(),
                'BinaryEncoding': () => new BinaryEncodingParser()
            },
            refs: {},
        };
        // parse ResultEncoding
        const rootElementEncoding = new RootParser();
        rootElementEncoding.init(encoding,propsEncoding);

        this.binaryDataTypeDecoder = new BinaryDataTypeDecoder({
            ...encoding,
            littleEndian: encoding.byteOrder === 'littleEndian'
        });
        this.binaryDataTypeDecoder.setRefs(componentParser.refs);

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
        this.parser.init(rootElement, this.props, '');
    }

    parseDataBlock(arrayBuffer) {
        this.binaryDataTypeDecoder.setData(arrayBuffer);
        let results = [];
        while(this.binaryDataTypeDecoder.hasNextBlock()) {
            const res = {};
            this.parser.parse(this.binaryDataTypeDecoder, {}, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime();
            results.push(res);
        }
        return results;
    }
}

export default BinaryDataParser;
