import AbstractParser from "../AbstractParser";

class CountParser  extends AbstractParser {
    build(element) {
        if('value' in element) {
            this.value = parseInt(element['value']);
        }
    }

    parse(tokens, props, resultParent) {
        let token = this.dataTypeDecoder.decode(tokens,props, this.path);

        let value = (this.value) ? this.value : parseInt(token);
        super.checkIdValue(value);
        resultParent[this.name] = value;
    }
}
export default CountParser;
