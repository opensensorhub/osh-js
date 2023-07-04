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
var CountParser = /** @class */ (function (_super) {
    __extends(CountParser, _super);
    function CountParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CountParser.prototype.build = function (element) {
        if ('value' in element) {
            this.value = parseInt(element['value']);
        }
    };
    CountParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        var value = (this.value) ? this.value : parseInt(dataTypeParser.nextToken(this.path));
        _super.prototype.checkIdValue.call(this, value);
        resultParent[this.name] = value;
    };
    return CountParser;
}(AbstractParser));
export default CountParser;
//# sourceMappingURL=CountParser.js.map