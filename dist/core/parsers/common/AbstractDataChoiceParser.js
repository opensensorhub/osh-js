var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import AbstractParser from "../AbstractParser";
var AbstractDataChoiceParser = /** @class */ (function (_super) {
    __extends(AbstractDataChoiceParser, _super);
    function AbstractDataChoiceParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AbstractDataChoiceParser.prototype.build = function (element) {
        var itemName = undefined;
        if (element.hasOwnProperty('items')) {
            itemName = 'items';
        }
        else if (element.hasOwnProperty('item')) {
            itemName = 'item';
        }
        this.itemToParserMap = {};
        for (var _i = 0, _a = element[itemName]; _i < _a.length; _i++) {
            var item = _a[_i];
            this.parseElement(item);
        }
        // index parser depending on input name
        for (var _b = 0, _c = this.stack; _b < _c.length; _b++) {
            var parser = _c[_b];
            this.itemToParserMap[parser.name] = parser;
        }
    };
    AbstractDataChoiceParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        throw new Error('Unsupported Operation');
    };
    return AbstractDataChoiceParser;
}(AbstractParser));
export default AbstractDataChoiceParser;
//# sourceMappingURL=AbstractDataChoiceParser.js.map