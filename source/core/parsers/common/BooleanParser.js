import AbstractParser from "../AbstractParser";

class BooleanParser extends AbstractParser {
    parse(dataTypeParser, props, resultParent) {
        let token = dataTypeParser.nextToken(this.path);
        resultParent[this.name] = token === '0' || token.toLowerCase() === 'true';
    }
}
export default BooleanParser;
