import {isDefined} from "../utils/Utils";

export default class AbstractParser {
    constructor() {
        this.stack = [];
        this.time = undefined;
        this.idRef = undefined;
    }
    init(element, props, path) {
        this.props = props;
        this.name = element.name;
        this.path = path;
        this.checkTime(element);
        this.checkId(element);
        this.build(element);
    }

    parseElement(element, path) {
        let parser;
        if(isDefined(path)) {
            this.path = path;
        }
        if(isDefined(this.path) && this.path in this.props.refs) {
            parser = new RefParser(this.props.refs[this.path]);
        } else if(element.name in this.props.refs) {
            parser = new RefParser(this.props.refs[element.name]);
        } else if(element.type in this.props.registeredParser){
            parser = this.props.registeredParser[element.type]();
        } else if(element.hasOwnProperty('href')) {
            if('href' in this.props.registeredParser) {
                parser = this.props.registeredParser['href']();
            } else {
                parser = new HRefParser();
            }
        } else if(element.type === 'DataRecord') {
            parser = new DataRecordParser(element, this.props);
        } else if(element.type === 'Vector') {
            parser = new VectorParser(element, this.props);
        } else if(element.type === 'DataArray') {
            parser = new DataArrayParser(element, this.props);
        }

        if(parser) {
            parser.init(element, this.props, this.path);
            this.stack.push(parser);
        }
    }

    build(element) {
    }

    parse(dataTypeParser, props, resultParent) {
        for(let parser of this.stack) {
            parser.parse(dataTypeParser, props, resultParent);
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

    // To be overridden by Time parser
    checkTime(element) {}

    getTimePropertyName() {
        if(!this.time) {
            // sub element, first level
            for (let parser of this.stack) {
                this.time = parser.getTimePropertyName();
                if (this.time) {
                    break;
                }
            }
        }
        return this.time;
    }

    splitRefName(ref) {
        const split = ref.split('/');
        if(split.length > 0) {
            return split[split.length - 1];
        } else {
            return ref;
        }
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

    parse(dataTypeParser, props, resultParent) {
        this.parser.parse(dataTypeParser, props, resultParent);
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
        let currentPath = (this.path) ? this.path + '/' : '/';
        if(Array.isArray(element[fieldName])) {
            for (let field of element[fieldName]) {
                this.parseElement(field, currentPath + field.name)
            }
        } else {
            this.parseElement(element[fieldName], currentPath + element[fieldName].name);
        }
    }

    parse(dataTypeParser, props, resultParent) {
        if(!this.name) {
            super.parse(dataTypeParser, props, resultParent);
        } else {
            // parse size of the array
            const result = {}
            for (let parser of this.stack) {
                parser.parse(dataTypeParser, props, result);
            }
            resultParent[this.name] = result;
        }
    }
}

class DataArrayParser extends AbstractParser {
    build(element) {
        // find elementCount parser
        this.parseElement(element['elementCount']);
        this.parseElement(element['elementType']);
    }
    parse(dataTypeParser, props, resultParent) {
        // parse size of the array
        const objectSize = {};
        this.stack[0].parse(dataTypeParser, props, objectSize);
        const size = Object.values(objectSize)[0];
        const elementTypeParser =  this.stack[1];
        let dataarrayResults = [];
        for(let i=0;i < size; i++) {
            const subResult = {};
            elementTypeParser.parse(dataTypeParser, props, subResult);
            dataarrayResults.push(subResult);
        }
        resultParent[this.name] = dataarrayResults;
    }
}

class VectorParser extends AbstractParser {
    build(element) {
        // Vector + coordinate
        let coordinatePropertyName = 'coordinates';

        if('coordinate' in element) {
            coordinatePropertyName = 'coordinate';
        }

        let currentPath = (this.path) ? this.path + '/' : '/';
        for (let coordinate of element[coordinatePropertyName]) {
            this.parseElement(coordinate, currentPath + coordinate.name)
        }
    }

    parse(dataTypeParser, props, resultParent) {
        // parse size of the array
        const coordinates = {}
        for(let parser of this.stack) {
            parser.parse(dataTypeParser, props, coordinates);
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

    parse(dataTypeParser, props, resultParent) {
        // if (!(this.id in this.props.nodesIdValue)) {
        //     throw Error(`id ${this.id} not found in the idValue Tree`);
        // }
        // resultParent[this.parser.name] = this.props.nodesIdValue[this.id];
        if (this.id in this.props.nodesIdValue) {
            resultParent[this.parser.name] = this.props.nodesIdValue[this.id];
        } else {
            this.parser.parse(dataTypeParser, props,resultParent);
        }
    }
}


