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
import SweApiCollectionObjectParser from "./SweApiCollectionObjectParser";
var SweApiControlStatus = /** @class */ (function (_super) {
    __extends(SweApiControlStatus, _super);
    function SweApiControlStatus(networkProperties) {
        var _this = _super.call(this, networkProperties) || this;
        _this.textDecoder = new TextDecoder();
        return _this;
    }
    SweApiControlStatus.prototype.parseData = function (data, format) {
        var res;
        if (format === 'arraybuffer') {
            res = this.textDecoder.decode(data);
        }
        else {
            res = JSON.parse(data);
        }
        return JSON.parse(res);
    };
    return SweApiControlStatus;
}(SweApiCollectionObjectParser));
export default SweApiControlStatus;
//# sourceMappingURL=SweApiControlStatus.parser.js.map