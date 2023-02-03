/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { assertArray, assertDefined, assertFunction, hasValue, isDefined, isFunction, randomUUID, capitalizeFirstLetter } from "../../utils/Utils.js";
/**
 * This class is in charge of defining a Layer object.
 */
var Layer = /** @class */ (function () {
    /**
     *
     * @param {Object} properties - contains a list of properties
     * @param {string} properties.name - default name
     * @param {string} properties.description - default description
     * @param {string} properties.dataSourceId - default dataSourceId
     * @param {boolean} properties.visible - defines if the layer is visible
     * @param {Number} properties.timestamp - defines the timestamp of the data
     * @param {Function} properties.getTimestamp - function which defines the timestamp of the data
     * @param {Function} properties.onLeftClick - trigger onLeftClick marker event
     * @param {Function} properties.onRightClick - trigger onRightClick marker event
     * @param {Function} properties.onHover - trigger onHover marker event
     */
    function Layer(properties) {
        this.properties = properties;
        this.init(properties);
    }
    /**
     * Inits the layer.
     */
    Layer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        this.data = [];
        this.propsById = {};
        this.dataSourcesToFn = undefined;
        this.props = {
            id: "layer-" + randomUUID(),
            filter: true,
            name: '',
            description: '',
            visible: true,
            timestamp: true
        };
        this.dataSourceIds = undefined;
        if (isDefined(properties.name)) {
            this.props.name = properties.name;
        }
        if (isDefined(properties.description)) {
            this.props.description = properties.description;
        }
        if (isDefined(properties.dataSourceId)) {
            this.dataSourceIds = [properties.dataSourceId];
        }
        if (isDefined(properties.dataSourceIds)) {
            this.dataSourceIds = properties.dataSourceIds;
        }
        if (!this.dataSourceIds) {
            this.dataSourceIds = [];
        }
        // assertDefined(this.dataSourceIds, '[Layer] dataSourceIds[] or dataSourceId');
        if (isDefined(properties.visible)) {
            this.props.visible = properties.visible;
        }
        if (isDefined(properties.timestamp)) {
            this.props.timestamp = properties.timestamp;
        }
        if (isDefined(properties.onLeftClick) && assertFunction(properties.onLeftClick)) {
            this.props.onLeftClick = properties.onLeftClick;
        }
        if (isDefined(properties.onRightClick) && assertFunction(properties.onRightClick)) {
            this.props.onRightClick = properties.onRightClick;
        }
        if (isDefined(properties.onHover) && assertFunction(properties.onHover)) {
            this.props.onHover = properties.onHover;
        }
        this.initEvents();
        if (this.checkFn("filter")) {
            var fn = function (rec, timestamp, options) {
                _this.props.filter = _this.getFunc('filter')(rec, timestamp, options);
            };
            this.addFn(this.getDataSourcesIdsByProperty('filter'), fn);
        }
        else {
            this.properties.filter = function (rec, timestamp, options) {
                return true;
            };
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = this.props;
                            return [4 /*yield*/, this.getFunc('filter')(rec, timestamp, options)];
                        case 1:
                            _a.filter = _b.sent();
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('filter'), fn);
        }
        if (this.checkFn("getVisible")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['visible'];
                            return [4 /*yield*/, this.getFunc('getVisible')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getVisible'), fn);
        }
        if (this.checkFn("getTimestamp")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['timestamp'];
                            return [4 /*yield*/, this.getFunc('getTimestamp')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getTimestamp'), fn);
        }
        if (this.checkFn("getName")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['name'];
                            return [4 /*yield*/, this.getFunc('getName')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getName'), fn);
        }
        if (this.checkFn("getDescription")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['description'];
                            return [4 /*yield*/, this.getFunc('getDescription')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getDescription'), fn);
        }
    };
    Layer.prototype.getFunc = function (funcName) {
        return this.properties[funcName].handler || this.properties[funcName];
    };
    /**
     * @private
     * @param funcName
     * @return {*}
     */
    Layer.prototype.checkFn = function (funcName) {
        var func = this.properties[funcName];
        if (isFunction(func)) {
            assertDefined(this.dataSourceIds, 'dataSourceIds');
            return true;
        }
        else {
            var isSet = hasValue(func);
            if (isSet) {
                assertArray(func.dataSourceIds, funcName + ".dataSourceIds");
                assertFunction(func.handler, funcName + ".handler");
            }
            return isSet;
        }
    };
    /**
     * @private
     */
    Layer.prototype.initEvents = function () {
    };
    /**
     * Clear the layer.
     */
    Layer.prototype.clear = function () {
    };
    /**
     * Gets the layer id.
     * @return {String} the layer id
     */
    Layer.prototype.getId = function () {
        return this.props.id;
    };
    /**
     * Selects the datasource contained into the list
     * @param {Array} dataSourceIds the list of datasources
     */
    Layer.prototype.select = function (dataSourceIds) {
    };
    /**
     * Adds a function associated to a list of dataSource ids
     * @param {String[]} dataSourceIds - the list of datasources
     * @param {Function} fn - the function to add
     * @param {Boolean} [first=false] - set at the first position
     */
    Layer.prototype.addFn = function (dataSourceIds, fn, first) {
        if (first === void 0) { first = false; }
        if (!isDefined(this.dataSourcesToFn)) {
            this.dataSourcesToFn = {};
        }
        for (var i = 0; i < dataSourceIds.length; i++) {
            var dataSourceId = dataSourceIds[i];
            if (!isDefined(this.dataSourcesToFn[dataSourceId])) {
                this.dataSourcesToFn[dataSourceId] = [];
            }
            if (first) {
                this.dataSourcesToFn[dataSourceId].unshift(fn);
            }
            else {
                this.dataSourcesToFn[dataSourceId].push(fn);
            }
        }
    };
    /**
     *
     * @param dataSourceId
     * @param {Object[]} records
     * @param options
     */
    Layer.prototype.setData = function (dataSourceId, records, options) {
        if (options === void 0) { options = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var fnArr, j, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // store data into data props
                        this.data = [];
                        options.dataSourceId = dataSourceId;
                        if (!isDefined(this.dataSourcesToFn)) return [3 /*break*/, 7];
                        if (!(dataSourceId in this.dataSourcesToFn)) return [3 /*break*/, 7];
                        fnArr = this.dataSourcesToFn[dataSourceId];
                        this.props.filter = true;
                        j = 0;
                        _a.label = 1;
                    case 1:
                        if (!(j < records.length)) return [3 /*break*/, 7];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < fnArr.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, fnArr[i](records[j].data, records[j].data.timestamp, options)];
                    case 3:
                        _a.sent();
                        if (!this.props.filter) {
                            return [3 /*break*/, 5];
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (this.props.filter) {
                            this.data.push(__assign(__assign({}, this.props), this.propsById[this.getId()]));
                        }
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 1];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    /**
     *
     * @return {String[]} The list of dataSource ids
     */
    Layer.prototype.getDataSourcesIds = function () {
        if (isDefined(this.dataSourcesToFn)) {
            var res = [];
            for (var i in this.dataSourcesToFn) {
                res.push(i);
            }
            return res;
        }
        else {
            assertDefined(this.dataSourceIds, 'dataSourceId must be defined');
            return this.dataSourceIds;
        }
    };
    Layer.prototype.getDataSourcesIdsByProperty = function (name) {
        return this.properties[name].dataSourceIds || this.dataSourceIds;
    };
    /**
     * Clone current layer properties
     * @return {Object} a shallow copy of current properties
     */
    Layer.prototype.getProps = function () {
        return {
            type: this.type,
            values: this.data
        };
    };
    /**
     * Reset to default Layer values
     */
    Layer.prototype.reset = function () {
        this.init(this.properties);
    };
    Layer.prototype.updateProperty = function (propertyName, value) {
        this.propsById[this.getId()][propertyName] = value;
    };
    Layer.prototype.checkExistingProps = function (id) {
        return (id in this.propsById);
    };
    Layer.prototype.setProps = function (id, props) {
        this.propsById[id] = props;
    };
    Layer.prototype.setId = function (id, defaultProps) {
        this.props.id = id;
        if (!this.checkExistingProps(id)) {
            this.setProps(id, defaultProps());
        }
    };
    Layer.prototype.definedId = function (idName, props) {
        var _this = this;
        if (this.checkFn("get".concat(capitalizeFirstLetter(idName)))) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getFunc("get".concat(capitalizeFirstLetter(idName)))(rec, timestamp, options)];
                        case 1:
                            id = _a.sent();
                            this.setId(id, function () {
                                var _a;
                                return (__assign(__assign({}, props), (_a = {}, _a[idName] = id, _a)));
                            });
                            return [2 /*return*/];
                    }
                });
            }); };
            // must be first to assign correctly the first location to the right id if it is defined
            this.addFn(this.getDataSourcesIdsByProperty("get".concat(capitalizeFirstLetter(idName))), fn, true);
        }
        else {
            this.setId(this.getId(), function () {
                var _a;
                return (__assign(__assign({}, props), (_a = {}, _a[idName] = _this.getId(), _a)));
            });
        }
    };
    Layer.prototype.getCurrentProps = function () {
        return this.propsById[this.getId()];
    };
    Layer.prototype.getIds = function () {
        return Object.keys(this.propsById);
    };
    return Layer;
}());
export default Layer;
//# sourceMappingURL=Layer.js.map