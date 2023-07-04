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
import TraverseParser from "./common/TraverseParser";
import GenericParser from "./GenericParser";
import TimeParser from "./common/TimeParser";
var JsonDataParser = /** @class */ (function (_super) {
    __extends(JsonDataParser, _super);
    function JsonDataParser(rootElement, properties) {
        if (properties === void 0) { properties = { timeShift: 0 }; }
        var _this = _super.call(this, rootElement, __assign({ nodesId: {}, nodesIdValue: {}, registeredParser: {
                'Time': function () { return new TimeParser(); },
                'Category': function () { return new TraverseParser(); },
                'Quantity': function () { return new TraverseParser(); },
                'Count': function () { return new TraverseParser(); },
                'Boolean': function () { return new TraverseParser(); },
                'DataChoice': function () { return new TraverseParser(); },
            }, refs: {} }, properties)) || this;
        _this.parser.init(rootElement, _this.props);
        return _this;
    }
    JsonDataParser.prototype.getTimeField = function () {
        return this.parser.getTimePropertyName();
    };
    JsonDataParser.prototype.parseDataBlock = function (input) {
        var jsonData;
        if (input instanceof ArrayBuffer) {
            jsonData = JSON.parse(this.textDecoder.decode(input));
        }
        else {
            try {
                jsonData = JSON.parse(input);
            }
            catch (e) {
                jsonData = input;
            }
        }
        if (Array.isArray(jsonData)) {
            for (var _i = 0, jsonData_1 = jsonData; _i < jsonData_1.length; _i++) {
                var d = jsonData_1[_i];
                d['timestamp'] = new Date(d[this.getTimeField()]).getTime() + this.props.timeShift;
            }
            return jsonData;
        }
        else {
            jsonData['timestamp'] = new Date(jsonData[this.getTimeField()]).getTime() + this.props.timeShift;
            return [jsonData];
        }
    };
    return JsonDataParser;
}(GenericParser));
export default JsonDataParser;
//# sourceMappingURL=JsonDataParser.js.map