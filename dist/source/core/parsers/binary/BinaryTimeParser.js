import TimeParser from "../common/TimeParser";

class BinaryTimeParser extends TimeParser {
    constructor() {
        super();
    }
    parse(dataTypeParser, props, resultParent) {
        let token = dataTypeParser.nextToken(this.path);
        resultParent[this.name] = new Date(token * 1000).toISOString();
    }
}

export default BinaryTimeParser;
