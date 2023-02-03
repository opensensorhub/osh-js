import RootParser from "./common/RootParser";
var GenericParser = /** @class */ (function () {
    function GenericParser(rootElement, props) {
        this.textDecoder = new TextDecoder();
        this.nodesId = {};
        this.parsers = [];
        this.count = 0;
        this.props = props;
        this.parser = new RootParser();
    }
    GenericParser.prototype.decode = function (input) {
        if (input instanceof ArrayBuffer) {
            return JSON.parse(this.textDecoder.decode(input));
        }
        else {
            try {
                return JSON.parse(input);
            }
            catch (e) {
                return input;
            }
        }
    };
    return GenericParser;
}());
export default GenericParser;
//# sourceMappingURL=GenericParser.js.map