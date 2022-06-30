import AbstractDataChoiceParser from "./AbstractDataChoiceParser";

class DataChoiceParser extends AbstractDataChoiceParser {
    parse(tokens, props, resultParent) {
        let itemName = this.dataTypeDecoder.decode(tokens,props, this.path);

        this.itemToParserMap[itemName].parse(tokens, props, resultParent);
    }
}
export default DataChoiceParser;
