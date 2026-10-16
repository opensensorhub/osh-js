import AbstractDataChoiceParser from "./AbstractDataChoiceParser";

class DataChoiceParser extends AbstractDataChoiceParser {
    parse(dataTypeParser, props, resultParent) {
        let itemName = dataTypeParser.nextToken(this.path);
        this.itemToParserMap[itemName].parse(dataTypeParser, props, resultParent);
    }
}
export default DataChoiceParser;
