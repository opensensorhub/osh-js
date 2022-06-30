import AbstractParser from "../AbstractParser";

class DecimalParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let val;
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);
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
