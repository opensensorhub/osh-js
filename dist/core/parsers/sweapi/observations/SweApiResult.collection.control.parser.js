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
import SweApiResultControlParser from "./SweApiResult.control.parser";
var SweApiResultCollectionControlParser = /** @class */ (function (_super) {
    __extends(SweApiResultCollectionControlParser, _super);
    function SweApiResultCollectionControlParser(dataObject) {
        return _super.call(this, dataObject) || this;
    }
    SweApiResultCollectionControlParser.prototype.init = function (schema, format) {
        if (format === 'application/swe+binary') {
            //resultSchema
            throw new Error("Format not supported ".concat(format));
        }
        else if (format === 'application/swe+xml') {
            //resultSchema
            throw new Error("Format not supported ".concat(format));
        }
        else {
            _super.prototype.init.call(this, schema, format);
        }
    };
    return SweApiResultCollectionControlParser;
}(SweApiResultControlParser));
export default SweApiResultCollectionControlParser;
//# sourceMappingURL=SweApiResult.collection.control.parser.js.map