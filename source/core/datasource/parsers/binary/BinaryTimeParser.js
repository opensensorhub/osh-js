import TimeParser from "../common/TimeParser";

class BinaryTimeParser extends TimeParser {
    parse(tokens, props, resultParent) {
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);
        resultParent[this.name] = new Date(token * 1000).toISOString();
    }
}

export default BinaryTimeParser;
