import AbstractParser from "../AbstractParser";

class DecimalParser extends AbstractParser {
    parse(dataTypeParser, props, resultParent) {
        let token = dataTypeParser.nextToken(this.path);

        let val;
        if ("INF" === token || "+INF" === token)
            val = Number.POSITIVE_INFINITY;
        else if ("-INF" === token)
            val = Number.NEGATIVE_INFINITY;
        else
            val = parseFloat(token);

        resultParent[this.name] = val;
    }
}

export default DecimalParser;
