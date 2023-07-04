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
var StringParser = /** @class */ (function (_super) {
    __extends(StringParser, _super);
    function StringParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StringParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        resultParent[this.name] = dataTypeParser.nextToken(this.path);
    };
    return StringParser;
}(AbstractParser));
export default StringParser;
//# sourceMappingURL=StringParser.js.map