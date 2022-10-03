import JsonDataParser from "../../../parsers/JsonDataParser";

class OmJsonParser extends JsonDataParser {
    constructor(rootElement) {
        super(rootElement);
    }
    getTimeField() {
        return 'phenomenonTime';
    }
}

export default OmJsonParser;
