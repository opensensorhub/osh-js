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
import BinaryDoubleDataTypeDecoder from "./dataType/BinaryDoubleDataTypeDecoder";
import BinaryIntegerDataTypeDecoder from "./dataType/BinaryIntegerDataTypeDecoder";
import BinaryShortDataTypeDecoder from "./dataType/BinaryShortDataTypeDecoder";
import BinaryFloat32DataTypeDecoder from "./dataType/BinaryFloat32DataTypeDecoder";
var ComponentParser = /** @class */ (function (_super) {
    __extends(ComponentParser, _super);
    function ComponentParser(binaryDataTypeDecoder) {
        var _this = _super.call(this) || this;
        _this.refs = {};
        _this.binaryDataTypeDecoder = binaryDataTypeDecoder;
        return _this;
    }
    ComponentParser.prototype.build = function (element) {
        this.name = this.splitRefName(element.ref);
        if (element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/double') {
            this.refs[element.ref] = new BinaryDoubleDataTypeDecoder();
        }
        else if (element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedInt') {
            this.refs[element.ref] = new BinaryIntegerDataTypeDecoder();
        }
        else if (element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/signedShort') {
            this.refs[element.ref] = new BinaryShortDataTypeDecoder();
        }
        else if (element.dataType === 'http://www.opengis.net/def/dataType/OGC/0/float32') {
            this.refs[element.ref] = new BinaryFloat32DataTypeDecoder();
        }
        if (element.ref in this.refs) {
            this.binaryDataTypeDecoder.addRef(element.ref, this.refs[element.ref]);
        }
    };
    return ComponentParser;
}(AbstractParser));
export default ComponentParser;
//# sourceMappingURL=ComponentParser.js.map