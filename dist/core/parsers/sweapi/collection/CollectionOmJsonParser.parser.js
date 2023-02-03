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
import OmJsonParser from "../common/OmJsonParser.parser";
var OmJsonCollectionParser = /** @class */ (function (_super) {
    __extends(OmJsonCollectionParser, _super);
    function OmJsonCollectionParser(rootElement) {
        return _super.call(this, rootElement) || this;
    }
    OmJsonCollectionParser.prototype.getTimeField = function () {
        return 'phenomenonTime';
    };
    OmJsonCollectionParser.prototype.parseDataBlock = function (arrayBuffer) {
        var dataBlock = this.textDecoder.decode(arrayBuffer);
        var jsonData = JSON.parse(dataBlock);
        var result = [];
        for (var _i = 0, _a = jsonData.items; _i < _a.length; _i++) {
            var d = _a[_i];
            d['timestamp'] = new Date(d[this.getTimeField()]).getTime();
            result.push(d);
        }
        return result;
    };
    return OmJsonCollectionParser;
}(OmJsonParser));
export default OmJsonCollectionParser;
//# sourceMappingURL=CollectionOmJsonParser.parser.js.map