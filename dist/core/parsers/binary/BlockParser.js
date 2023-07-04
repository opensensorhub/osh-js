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
import BinaryBlockDataTypeDecoder from "./dataType/BinaryBlockDataTypeDecoder";
var BlockParser = /** @class */ (function (_super) {
    __extends(BlockParser, _super);
    function BlockParser(binaryDataTypeDecoder) {
        var _this = _super.call(this) || this;
        _this.binaryDataTypeDecoder = binaryDataTypeDecoder;
        return _this;
    }
    BlockParser.prototype.build = function (element) {
        this.staticProps = {};
        // check for static props
        for (var prop in element) {
            if (prop !== 'ref' && prop !== 'type') {
                this.staticProps[prop] = element[prop];
            }
        }
        this.name = this.splitRefName(element.ref);
        this.path = element.ref;
        this.props.refs[element.ref] = this;
        this.binaryDataTypeDecoder.addRef(element.ref, new BinaryBlockDataTypeDecoder());
        this.binaryDataTypeDecoder.hasBlock = true;
    };
    BlockParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        // everytime a binaryblock is defined in the binary encoding, there will be a 4-bytes length field before it
        var block = {
            data: dataTypeParser.nextToken(this.path)
        };
        for (var prop in this.staticProps) {
            block[prop] = this.staticProps[prop];
        }
        resultParent[this.name] = block;
    };
    return BlockParser;
}(AbstractParser));
export default BlockParser;
//# sourceMappingURL=BlockParser.js.map