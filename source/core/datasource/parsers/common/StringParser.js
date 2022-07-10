import AbstractParser from "../AbstractParser";

class StringParser extends AbstractParser {
    parse(dataTypeParser, props, resultParent) {
        resultParent[this.name] = dataTypeParser.nextToken(this.path);
    }
}

export default StringParser;
