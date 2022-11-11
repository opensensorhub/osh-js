import AbstractParser from "../AbstractParser";

class AbstractDataChoiceParser extends AbstractParser {
    build(element) {
        let itemName = undefined;
        if(element.hasOwnProperty('items')) {
            itemName = 'items'
        } else if(element.hasOwnProperty('item')) {
            itemName = 'item'
        }

        this.itemToParserMap = {};
        for(let item of element[itemName]) {
            this.parseElement(item);
        }
        // index parser depending on input name
        for(let parser of this.stack){
            this.itemToParserMap[parser.name] = parser;
        }
    }
    parse(dataTypeParser, props, resultParent) {
        throw new Error('Unsupported Operation');
    }
}

export default AbstractDataChoiceParser;
