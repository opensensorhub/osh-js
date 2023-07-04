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
import { isDefined } from "../utils/Utils";
var AbstractParser = /** @class */ (function () {
    function AbstractParser() {
        this.stack = [];
        this.time = undefined;
        this.idRef = undefined;
    }
    AbstractParser.prototype.init = function (element, props, path) {
        this.props = props;
        this.name = element.name;
        this.path = path;
        this.checkTime(element);
        this.checkId(element);
        this.build(element);
    };
    AbstractParser.prototype.parseElement = function (element, path) {
        var parser;
        if (isDefined(path)) {
            this.path = path;
        }
        if (isDefined(this.path) && this.path in this.props.refs) {
            parser = new RefParser(this.props.refs[this.path]);
        }
        else if (element.name in this.props.refs) {
            parser = new RefParser(this.props.refs[element.name]);
        }
        else if (element.type in this.props.registeredParser) {
            parser = this.props.registeredParser[element.type]();
        }
        else if (element.hasOwnProperty('href')) {
            if ('href' in this.props.registeredParser) {
                parser = this.props.registeredParser['href']();
            }
            else {
                parser = new HRefParser();
            }
        }
        else if (element.type === 'DataRecord') {
            parser = new DataRecordParser(element, this.props);
        }
        else if (element.type === 'Vector') {
            parser = new VectorParser(element, this.props);
        }
        else if (element.type === 'DataArray') {
            parser = new DataArrayParser(element, this.props);
        }
        if (parser) {
            parser.init(element, this.props, this.path);
            this.stack.push(parser);
        }
    };
    AbstractParser.prototype.build = function (element) {
    };
    AbstractParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        for (var _i = 0, _a = this.stack; _i < _a.length; _i++) {
            var parser = _a[_i];
            parser.parse(dataTypeParser, props, resultParent);
        }
    };
    AbstractParser.prototype.checkId = function (element) {
        if ('id' in element) {
            this.idRef = element['id'];
            this.props.nodesId[this.idRef] = this;
        }
    };
    AbstractParser.prototype.checkIdValue = function (value) {
        if (this.idRef) {
            this.props.nodesIdValue[this.idRef] = value;
        }
    };
    // To be overridden by Time parser
    AbstractParser.prototype.checkTime = function (element) { };
    AbstractParser.prototype.getTimePropertyName = function () {
        if (!this.time) {
            // sub element, first level
            for (var _i = 0, _a = this.stack; _i < _a.length; _i++) {
                var parser = _a[_i];
                this.time = parser.getTimePropertyName();
                if (this.time) {
                    break;
                }
            }
        }
        return this.time;
    };
    AbstractParser.prototype.splitRefName = function (ref) {
        var split = ref.split('/');
        if (split.length > 0) {
            return split[split.length - 1];
        }
        else {
            return ref;
        }
    };
    return AbstractParser;
}());
export default AbstractParser;
var RefParser = /** @class */ (function (_super) {
    __extends(RefParser, _super);
    function RefParser(parser) {
        var _this = _super.call(this) || this;
        _this.parser = parser;
        return _this;
    }
    RefParser.prototype.build = function (element) {
        if (this.parser && this.parser.name) {
            this.name = this.parser.name;
        }
    };
    RefParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        this.parser.parse(dataTypeParser, props, resultParent);
    };
    return RefParser;
}(AbstractParser));
var DataRecordParser = /** @class */ (function (_super) {
    __extends(DataRecordParser, _super);
    function DataRecordParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataRecordParser.prototype.build = function (element) {
        // DataRecords + fields
        var fieldName = undefined;
        if (element.hasOwnProperty('fields')) {
            fieldName = 'fields';
        }
        else if (element.hasOwnProperty('field')) {
            fieldName = 'field';
        }
        if (!fieldName) {
            return;
        }
        var currentPath = (this.path) ? this.path + '/' : '/';
        if (Array.isArray(element[fieldName])) {
            for (var _i = 0, _a = element[fieldName]; _i < _a.length; _i++) {
                var field = _a[_i];
                this.parseElement(field, currentPath + field.name);
            }
        }
        else {
            this.parseElement(element[fieldName], currentPath + element[fieldName].name);
        }
    };
    DataRecordParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        if (!this.name) {
            _super.prototype.parse.call(this, dataTypeParser, props, resultParent);
        }
        else {
            // parse size of the array
            var result = {};
            for (var _i = 0, _a = this.stack; _i < _a.length; _i++) {
                var parser = _a[_i];
                parser.parse(dataTypeParser, props, result);
            }
            resultParent[this.name] = result;
        }
    };
    return DataRecordParser;
}(AbstractParser));
var DataArrayParser = /** @class */ (function (_super) {
    __extends(DataArrayParser, _super);
    function DataArrayParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataArrayParser.prototype.build = function (element) {
        // find elementCount parser
        this.parseElement(element['elementCount']);
        this.parseElement(element['elementType']);
    };
    DataArrayParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        // parse size of the array
        var objectSize = {};
        this.stack[0].parse(dataTypeParser, props, objectSize);
        var size = Object.values(objectSize)[0];
        var elementTypeParser = this.stack[1];
        var dataarrayResults = [];
        for (var i = 0; i < size; i++) {
            var subResult = {};
            elementTypeParser.parse(dataTypeParser, props, subResult);
            dataarrayResults.push(subResult);
        }
        resultParent[this.name] = dataarrayResults;
    };
    return DataArrayParser;
}(AbstractParser));
var VectorParser = /** @class */ (function (_super) {
    __extends(VectorParser, _super);
    function VectorParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VectorParser.prototype.build = function (element) {
        // Vector + coordinate
        var coordinatePropertyName = 'coordinates';
        if ('coordinate' in element) {
            coordinatePropertyName = 'coordinate';
        }
        var currentPath = (this.path) ? this.path + '/' : '/';
        for (var _i = 0, _a = element[coordinatePropertyName]; _i < _a.length; _i++) {
            var coordinate = _a[_i];
            this.parseElement(coordinate, currentPath + coordinate.name);
        }
    };
    VectorParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        // parse size of the array
        var coordinates = {};
        for (var _i = 0, _a = this.stack; _i < _a.length; _i++) {
            var parser = _a[_i];
            parser.parse(dataTypeParser, props, coordinates);
        }
        resultParent[this.name] = coordinates;
    };
    return VectorParser;
}(AbstractParser));
var HRefParser = /** @class */ (function (_super) {
    __extends(HRefParser, _super);
    function HRefParser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HRefParser.prototype.build = function (element) {
        // find into href tree
        var hashLink = element.href;
        if (hashLink[0] !== '#') {
            throw Error("Href should start with #: ".concat(hashLink));
        }
        // remove first #
        var id = hashLink.slice(1);
        if (!(id in this.props.nodesId)) {
            throw Error("id ".concat(id, " not found in the id Tree"));
        }
        this.id = id;
        this.parser = this.props.nodesId[id];
    };
    HRefParser.prototype.parse = function (dataTypeParser, props, resultParent) {
        // if (!(this.id in this.props.nodesIdValue)) {
        //     throw Error(`id ${this.id} not found in the idValue Tree`);
        // }
        // resultParent[this.parser.name] = this.props.nodesIdValue[this.id];
        if (this.id in this.props.nodesIdValue) {
            resultParent[this.parser.name] = this.props.nodesIdValue[this.id];
        }
        else {
            this.parser.parse(dataTypeParser, props, resultParent);
        }
    };
    return HRefParser;
}(AbstractParser));
//# sourceMappingURL=AbstractParser.js.map