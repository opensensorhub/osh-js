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
var DecimalParser = /** @class */ (function (_super) {
    __extends(DecimalParser, _super);
    function DecimalParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DecimalParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        var token = dataTypeParser.nextToken(this.path);
        var val;
        if ("INF" === token || "+INF" === token)
            val = Number.POSITIVE_INFINITY;
        else if ("-INF" === token)
            val = Number.NEGATIVE_INFINITY;
        else
            val = parseFloat(token);
        resultParent[this.name] = val;
    };
    return DecimalParser;
}(AbstractParser));
export default DecimalParser;
//# sourceMappingURL=DecimalParser.js.map