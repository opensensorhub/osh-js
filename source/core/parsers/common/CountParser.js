import AbstractParser from "../AbstractParser";

class CountParser  extends AbstractParser {
    build(element) {
        if('value' in element) {
            this.value = parseInt(element['value']);
        }
    }

    parse(dataTypeParser, props, resultParent) {
        let value = (this.value) ? this.value : parseInt(dataTypeParser.nextToken(this.path));
        super.checkIdValue(value);
        resultParent[this.name] = value;
    }
}
export default CountParser;
