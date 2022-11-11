import RootParser from "./common/RootParser";

class GenericParser {
    constructor(rootElement,  props) {
        this.textDecoder = new TextDecoder();
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;

        this.props = props;
        this.parser = new RootParser();
    }
    decode(input) {
        if(input instanceof ArrayBuffer) {
            return JSON.parse(this.textDecoder.decode(input));
        } else {
            try {
                return JSON.parse(input);
            }catch (e) {
                return input;
            }
        }
    }
}

export default GenericParser;
