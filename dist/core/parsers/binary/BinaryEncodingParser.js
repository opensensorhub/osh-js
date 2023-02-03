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
var BinaryEncodingParser = /** @class */ (function (_super) {
    __extends(BinaryEncodingParser, _super);
    function BinaryEncodingParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BinaryEncodingParser.prototype.build = function (element) {
        // iterate over member
        // old SOS property name
        var memberPropertyName = 'member';
        // new SWE property name
        if ('members' in element) {
            memberPropertyName = 'members';
        }
        for (var _i = 0, _a = element[memberPropertyName]; _i < _a.length; _i++) {
            var member = _a[_i];
            this.parseElement(member);
        }
    };
    return BinaryEncodingParser;
}(AbstractParser));
export default BinaryEncodingParser;
//# sourceMappingURL=BinaryEncodingParser.js.map