import JsonDataParser from "../../JsonDataParser";

class OmJsonParser extends JsonDataParser {
    constructor(rootElement) {
        super(rootElement);
    }
    getTimeField() {
        return 'phenomenonTime';
    }
}

export default OmJsonParser;
