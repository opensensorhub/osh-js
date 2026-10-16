import AbstractParser from "../AbstractParser";

class RootParser extends AbstractParser {
    build(element) {
        this.parseElement(element);
    }
}

export default RootParser;
