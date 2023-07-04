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
import GenericParser from "./GenericParser";
import TimeParser from "./common/TimeParser";
import StringParser from "./common/StringParser";
import DecimalParser from "./common/DecimalParser";
import CountParser from "./common/CountParser";
import BooleanParser from "./common/BooleanParser";
import DataChoiceParser from "./common/DataChoiceParser";
import TextDataTypeDecoder from "./text/TextDataTypeDecoder";
var TextDataParser = /** @class */ (function (_super) {
    __extends(TextDataParser, _super);
    function TextDataParser(rootElement, encoding, properties) {
        if (properties === void 0) { properties = { timeShift: 0 }; }
        var _this = _super.call(this, rootElement, __assign({ nodesId: {}, nodesIdValue: {}, registeredParser: {}, refs: {} }, properties)) || this;
        _this.resultEncoding = encoding;
        _this.textDataTypeDecoder = new TextDataTypeDecoder(_this.resultEncoding);
        _this.props.registeredParser = {
            'Time': function () { return new TimeParser(); },
            'Category': function () { return new StringParser(); },
            'Quantity': function () { return new DecimalParser(); },
            'Count': function () { return new CountParser(); },
            'Boolean': function () { return new BooleanParser(); },
            'DataChoice': function () { return new DataChoiceParser(); },
        };
        _this.parser.init(rootElement, _this.props, '');
        return _this;
    }
    TextDataParser.prototype.parseDataBlock = function (input) {
        var dataBlocks;
        if (input instanceof ArrayBuffer) {
            dataBlocks = this.textDecoder.decode(input);
        }
        else {
            dataBlocks = input;
        }
        this.textDataTypeDecoder.setData(dataBlocks);
        var results = [];
        while (this.textDataTypeDecoder.hasNextBlock()) {
            var res = {};
            this.parser.parse(this.textDataTypeDecoder, {}, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime() + this.props.timeShift;
            results.push(res);
        }
        return results;
    };
    return TextDataParser;
}(GenericParser));
export default TextDataParser;
//# sourceMappingURL=TextDataParser.js.map