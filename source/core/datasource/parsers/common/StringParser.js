import AbstractParser from "../AbstractParser";

class StringParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);
        resultParent[this.name] = token;
    }
}

export default StringParser;
