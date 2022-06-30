import AbstractParser from "../AbstractParser";

class BooleanParser extends AbstractParser {
    parse(tokens, props, resultParent) {
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);
        resultParent[this.name] = token === '0' || token.toLowerCase() === 'true';
    }
}
export default BooleanParser;
