import SWEXmlStreamParser from "../../source/core/parsers/SWEXmlStreamParser";

class AbstractParser {
    constructor(element, props) {
        this.element = element;
        this.props = props;
        this.stack = [];
        this.name = element.name;
        this.checkId();
        this.build(element);
    }

    parseElement(element) {
        let parser;
        if(element.hasOwnProperty('href')) {
            parser = new HRefParser(element, this.props);
        } else if(element.type === 'DataRecord') {
            parser = new DataRecordParser(element, this.props);
        } else if(element.type === 'Time') {
            parser = new TimeParser(element, this.props);
        } else if(element.type === 'Category') {
            parser = new StringParser(element, this.props);
        } else if(element.type === 'Quantity') {
            parser = new DecimalParser(element, this.props);
        } else if(element.type === 'Count') {
            parser = new CountParser(element, this.props);
        } else if(element.type === 'Boolean') {
            parser = new BooleanParser(element, this.props);
        } else if(element.type === 'Vector') {
            parser = new VectorParser(element, this.props);
        } else if(element.type === 'DataArray') {
            parser = new DataArrayParser(element, this.props);
        } else if(element.type === 'DataChoice') {
            parser = new DataChoiceParser(element, this.props);
        }

        if(parser) {
            this.stack.push(parser);
        }
    }

    build(element) {
    }

    parse(tokens, props, resultParent) {
        for(let parser of this.stack) {
            parser.parse(tokens, props, resultParent);
        }
    }

    checkId() {
        if('id' in this.element) {
            this.props.nodesId[this.element['id']] = this;
        }
    }

    checkIdValue(value) {
        if('id' in this.element) {
            this.props.nodesIdValue[this.element['id']] = value;
        }
    }

}

class VectorParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    build(element) {
        // Vector + coordinate
        for (let coordinate of element['coordinates']) {
            this.parseElement(coordinate)
        }
    }

    parse(tokens, props, resultParent) {
        // parse size of the array
        const coordinates = {}
        for(let parser of this.stack) {
            parser.parse(tokens, props, coordinates);
        }
        resultParent[this.name] = coordinates;
    }
}
class DecimalParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

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
class TimeParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    parse(tokens, props, resultParent) {
        resultParent[this.name] = new Date(tokens[props.index++]).getTime();
    }
}
class StringParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    parse(tokens, props, resultParent) {
        resultParent[this.name] = tokens[props.index++];
    }
}
class BooleanParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    parse(tokens, props, resultParent) {
        let token = tokens[props.index++];
        resultParent[this.name] = token === '0' || token.toLowerCase() === 'true';
    }
}
class DataArrayParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }
    build(element) {
        // find elementCount parser
        this.parseElement(element['elementCount']);
        this.parseElement(element['elementType']);
    }
    parse(tokens, props, resultParent) {
        // parse size of the array
        const objectSize = {};
        this.stack[0].parse(tokens, props, objectSize);
        const size = Object.values(objectSize)[0];
        const elementTypeParser =  this.stack[1];
        let dataarrayResults = [];
        for(let i=0;i < size; i++) {
            const subResult = {};
            elementTypeParser.parse(tokens, props, subResult);
            dataarrayResults.push(subResult);
        }
        resultParent[this.name] = dataarrayResults;
    }
}
class HRefParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    build(element) {
        // find into href tree
        const hashLink = element.href;
        if (hashLink[0] !== '#') {
            throw Error(`Href should start with #: ${hashLink}`);
        }
        // remove first #
        const id = hashLink.slice(1);
        if (!(id in this.props.nodesId)) {
            throw Error(`id ${id} not found in the id Tree`);
        }
        this.id = id;
        this.parser = this.props.nodesId[id];
    }

    parse(tokens, props, resultParent) {
         if (!(this.id in this.props.nodesIdValue)) {
            throw Error(`id ${this.id} not found in the idValue Tree`);
        }
        resultParent[this.parser.name] = this.props.nodesIdValue[this.id];
    }
}

class DataRecordParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

    build(element) {
        // DataRecords + fields
        let fieldName = element.hasOwnProperty('fields') ? 'fields' : 'field';
        if(Array.isArray(element[fieldName])) {
            for (let field of element[fieldName]) {
                this.parseElement(field)
            }
        } else {
            this.parseElement(element[fieldName]);
        }
    }
}
class DataChoiceParser extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }
    build(element) {
        this.itemToParserMap = {};
        for(let item of element['item']) {
            this.parseElement(item);
        }
        // index parser depending on input name
        for(let parser of this.stack){
            this.itemToParserMap[parser.name] = parser;
        }
    }
    parse(tokens, props, resultParent) {
        let itemName = tokens[props.index++];
        const itemResult = {};
        this.itemToParserMap[itemName].parse(tokens, props, itemResult);
        resultParent[itemName] = itemResult;
    }
}

class CountParser  extends AbstractParser {
    constructor(element, props) {
        super(element, props);
    }

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

class SosParser extends AbstractParser {
    constructor(element) {
        super(element, {
            nodesId: {},
            nodesIdValue: {},
        });
    }
    build(element) {
        this.parseElement(element.resultStructure);
    }
}

class SweApiParser extends AbstractParser {
    constructor(element) {
        super(element, {
            nodesId: {},
            nodesIdValue: {},
        });
    }
    build(element) {
        this.parseElement(element.resultSchema);
    }
}

class TextDataParser {

    constructor() {
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
    }

    setSchema(schema, xml = false) {
        let respSchema = schema;
        if(xml) {
            let sweXmlParser = new SWEXmlStreamParser(schema);
            respSchema = sweXmlParser.toJson();
            this.parser = new SosParser(respSchema);
        } else {
            this.parser = new SweApiParser(respSchema);
        }
        this.resultEncoding = respSchema.resultEncoding;
    }

    parseData(data) {
        const blocks = data.split(this.resultEncoding.blockSeparator);
        //split 1 record
        let results = [];
        for(let block of blocks) {
            if(block.length > 0) {
                const tokens = data.split(this.resultEncoding.tokenSeparator);
                const res = {};
                this.parser.parse(tokens, {
                    index: 0
                }, res);
                results.push(res);
            }
        }
        return results;
    }
}

export default TextDataParser;
