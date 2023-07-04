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
import SkipParser from "./common/SkipParser";
import BinaryEncodingParser from "./binary/BinaryEncodingParser";
import MemberParser from "./binary/MemberParser";
import ComponentParser from "./binary/ComponentParser";
import BlockParser from "./binary/BlockParser";
import BinaryDataTypeDecoder from "./binary/dataType/BinaryDataTypeDecoder";
import StringParser from "./common/StringParser";
import DecimalParser from "./common/DecimalParser";
import CountParser from "./common/CountParser";
import BooleanParser from "./common/BooleanParser";
import DataChoiceParser from "./common/DataChoiceParser";
import BinaryTimeParser from "./binary/BinaryTimeParser";
import RootParser from "./common/RootParser";
var BinaryDataParser = /** @class */ (function (_super) {
    __extends(BinaryDataParser, _super);
    function BinaryDataParser(rootElement, encoding, properties) {
        if (properties === void 0) { properties = { timeShift: 0 }; }
        var _this = _super.call(this, rootElement, __assign({ nodesId: {}, nodesIdValue: {}, registeredParser: {}, refs: {} }, properties)) || this;
        _this.resultEncoding = encoding;
        _this.binaryDataTypeDecoder = new BinaryDataTypeDecoder(__assign(__assign({}, encoding), { littleEndian: encoding.byteOrder === 'littleEndian' }));
        var propsEncoding = {
            nodesId: {},
            nodesIdValue: {},
            registeredParser: {
                'member': function () { return new MemberParser(); },
                'Component': function () { return new ComponentParser(_this.binaryDataTypeDecoder); },
                'Block': function () { return new BlockParser(_this.binaryDataTypeDecoder); },
                'BinaryEncoding': function () { return new BinaryEncodingParser(); }
            },
            refs: {},
        };
        // parse ResultEncoding
        var rootElementEncoding = new RootParser();
        rootElementEncoding.init(encoding, propsEncoding);
        // parse schema
        _this.props.registeredParser = {
            'Time': function () { return new BinaryTimeParser(); },
            'Category': function () { return new StringParser(); },
            'Quantity': function () { return new DecimalParser(); },
            'Count': function () { return new CountParser(); },
            'Boolean': function () { return new BooleanParser(); },
            'DataChoice': function () { return new DataChoiceParser(); },
            'href': function () { return new SkipParser(); }
        };
        //
        _this.parser.init(rootElement, __assign(__assign({}, _this.props), { refs: propsEncoding.refs }), '');
        return _this;
    }
    BinaryDataParser.prototype.parseDataBlock = function (arrayBuffer) {
        this.binaryDataTypeDecoder.setData(arrayBuffer);
        var results = [];
        while (this.binaryDataTypeDecoder.hasNextBlock()) {
            var res = {};
            this.parser.parse(this.binaryDataTypeDecoder, {}, res);
            res['timestamp'] = new Date(res[this.parser.getTimePropertyName()]).getTime() + this.props.timeShift;
            results.push(res);
        }
        return results;
    };
    return BinaryDataParser;
}(GenericParser));
export default BinaryDataParser;
//# sourceMappingURL=BinaryDataParser.js.map