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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import AbstractDataTypeDecoder from "../AbstractDataTypeDecoder";
var TextDataTypeDecoder = /** @class */ (function (_super) {
    __extends(TextDataTypeDecoder, _super);
    function TextDataTypeDecoder(props) {
        var _this = _super.call(this, __assign({ blockSeparator: ' ', collapseWhiteSpaces: true, decimalSeparator: '.', tokenSeparator: ',' }, props)) || this;
        _this.init();
        return _this;
    }
    TextDataTypeDecoder.prototype.init = function () {
        this.blocks = [];
        this.blocksIdx = -1;
        this.tokens = [];
        this.tokensIdx = 0;
    };
    TextDataTypeDecoder.prototype.checkInit = function () {
        if (this.blocksIdx === -1) {
            // split
            this.blocks = this.data.split(this.props.blockSeparator);
            this.blocksIdx = 0;
        }
    };
    TextDataTypeDecoder.prototype.nextToken = function () {
        this.checkInit();
        // if no more token in current block
        if (this.tokensIdx >= this.tokens.length) {
            // if no more block
            if (this.blocks.length === 0 || this.blocksIdx >= this.blocks.length) {
                return null;
            }
            // parse new token
            this.tokens = this.blocks[this.blocksIdx++].split(this.props.tokenSeparator);
            this.tokensIdx = 0;
        }
        return this.tokens[this.tokensIdx++];
    };
    TextDataTypeDecoder.prototype.hasNextBlock = function () {
        this.checkInit();
        return this.blocks.length > 0 && this.blocksIdx < this.blocks.length && this.blocks[this.blocksIdx] !== '';
    };
    return TextDataTypeDecoder;
}(AbstractDataTypeDecoder));
export default TextDataTypeDecoder;
//# sourceMappingURL=TextDataTypeDecoder.js.map