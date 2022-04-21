export default class AbstractParser {
    constructor() {
        this.stack = [];
        this.time = undefined;
        this.idRef = undefined;
    }
    init(element, props) {
        this.props = props;
        this.name = element.name;
        this.checkTime(element);
        this.checkId(element);
        this.build(element);
    }

    parseElement(element) {
        let parser;
        if(element.name in this.props.refs) {
            parser = new RefParser(this.props.refs[element.name]);
        } else if(element.type in this.props.registeredParser){
            parser = this.props.registeredParser[element.type]();
        } else if(element.hasOwnProperty('href')) {
            parser = new HRefParser();
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
            parser.init(element, this.props);
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

    checkId(element) {
        if('id' in element) {
            this.idRef = element['id'];
            this.props.nodesId[this.idRef] = this;
        }
    }

    checkIdValue(value) {
        if(this.idRef) {
            this.props.nodesIdValue[this.idRef] = value;
        }
    }

    checkTime(element) {
        if('definition' in element
            &&
            (element['definition'] === 'http://www.opengis.net/def/property/OGC/0/SamplingTime' ||
                element['definition'] === 'http://www.opengis.net/def/property/OGC/0/PhenomenonTime')) {
            this.time = this.name;
            this.name = 'timestamp';
        }
    }

    getTimePropertyName() {
        if(!this.time) {
            // sub element, first level
            let timeProperty;
            for (let parser of this.stack) {
                timeProperty = parser.getTimePropertyName();
                if (timeProperty) {
                    break;
                }
            }
            this.time = timeProperty;
        }
        return this.time;
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

class RefParser extends AbstractParser {
    constructor(parser) {
        super();
        this.parser = parser;
    }
    build(element) {
        if(this.parser && this.parser.name) {
            this.name = this.parser.name;
        }
    }

    parse(tokens, props, resultParent) {
        resultParent[this.name] = this.parser.parse(tokens, props, resultParent);
    }
}

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

class DataRecordParser extends AbstractParser {
    build(element) {
        // DataRecords + fields
        let fieldName = undefined;
        if(element.hasOwnProperty('fields')) {
            fieldName = 'fields'
        } else if(element.hasOwnProperty('field')) {
            fieldName = 'field'
        }
        if(!fieldName) {
            return;
        }
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
    init(element, props) {
        super.init(element, props);
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
class DataArrayParser extends AbstractParser {
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
class TimeParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        resultParent[this.name] = new Date(tokens[props.index++]).getTime();
    }
}
class VectorParser extends AbstractParser {
    build(element) {
        // Vector + coordinate
        let coordinatePropertyName = 'coordinates';

        if('coordinate' in element) {
            coordinatePropertyName = 'coordinate';
        }

        for (let coordinate of element[coordinatePropertyName]) {
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
class HRefParser extends AbstractParser {
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
