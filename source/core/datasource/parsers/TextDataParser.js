import AbstractParser from "./AbstractParser";
import AbstractDataChoiceParser from "./common/DataChoiceParser";
import GenericParser from "./GenericParser";

class StringParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        resultParent[this.name] = tokens[props.index++];
    }
}
class BooleanParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let token = tokens[props.index++];
        resultParent[this.name] = token === '0' || token.toLowerCase() === 'true';
    }
}

class TimeParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        resultParent[this.name] = tokens[props.index++];
    }
}

class CountParser  extends AbstractParser {
    build(element) {
        if('value' in element) {
            this.value = parseInt(element['value']);
        }
    }

    parse(tokens, props, resultParent) {
        let value = (this.value) ? this.value : parseInt(tokens[props.index++]);
        super.checkIdValue(value);
        resultParent[this.name] = value;
    }
}

class DecimalParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let val;
        let token = tokens[props.index++];
        if ("INF" === token || "+INF" === token)
            val = Number.POSITIVE_INFINITY;
        else if ("-INF" === token)
            val = Number.NEGATIVE_INFINITY;
        else
            val = parseFloat(token);

        resultParent[this.name] = val;
    }
}

class DataChoiceParser extends AbstractDataChoiceParser {
    parse(tokens, props, resultParent) {
        let itemName = tokens[props.index++];
        const itemResult = {};
        this.itemToParserMap[itemName].parse(tokens, props, itemResult);
        resultParent[itemName] = itemResult;
    }
}

class TextDataParser extends GenericParser {

    constructor(rootElement, encoding) {
        super(rootElement, {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'Time': () => new TimeParser(),
                'Category': () => new StringParser(),
                'Quantity': () => new DecimalParser(),
                'Count': () => new CountParser(),
                'Boolean': () => new BooleanParser(),
                'DataChoice': () => new DataChoiceParser(),
            },
            refs: {},
        });
        this.resultEncoding = encoding;
        this.parser.init(rootElement, this.props);
    }

    parseDataBlock(input) {
        let dataBlock;
        if(input instanceof ArrayBuffer) {
            dataBlock = this.textDecoder.decode(input);
        } else {
            dataBlock = input;
        }

        const blocks = dataBlock.split(this.resultEncoding.blockSeparator);
        //split 1 record
        let results = [];
        for(let block of blocks) {
            if(block.length > 0) {
                const tokens = dataBlock.split(this.resultEncoding.tokenSeparator);
                const res = {};
                const props = {
                    time: undefined,
                    index: 0
                }
                this.parser.parse(tokens, props, res);
                res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime();
                results.push(res);
            }
        }
        return results;
    }
}

export default TextDataParser;
