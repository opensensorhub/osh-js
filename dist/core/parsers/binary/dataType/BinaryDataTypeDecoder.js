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
import AbstractDataTypeDecoder from "../../AbstractDataTypeDecoder";
var BinaryDataTypeDecoder = /** @class */ (function (_super) {
    __extends(BinaryDataTypeDecoder, _super);
    function BinaryDataTypeDecoder(props) {
        var _this = _super.call(this, props) || this;
        _this.decoders = {};
        _this.componentsLength = 0;
        return _this;
    }
    BinaryDataTypeDecoder.prototype.init = function () {
        this.data = new DataView(this.data);
        this.componentIdx = 0;
        this.tokenOffset = 0;
    };
    BinaryDataTypeDecoder.prototype.nextToken = function (path) {
        var decoder = this.decoders[path];
        // block Offset + token Offset
        var token = decoder.decode(this.data, this.tokenOffset, this.props.littleEndian);
        this.tokenOffset += decoder.length();
        return token;
    };
    BinaryDataTypeDecoder.prototype.hasNextBlock = function () {
        return this.tokenOffset < this.data.buffer.byteLength;
    };
    BinaryDataTypeDecoder.prototype.addRef = function (ref, decoder) {
        this.decoders[ref] = decoder;
        this.componentsLength += decoder.length();
    };
    return BinaryDataTypeDecoder;
}(AbstractDataTypeDecoder));
export default BinaryDataTypeDecoder;
//# sourceMappingURL=BinaryDataTypeDecoder.js.map