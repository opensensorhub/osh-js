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
import Layer from "./Layer.js";
import { isDefined } from "../../utils/Utils.js";
/**
 * @extends Layer
 * @example
 *
 * import PolylineLayer from 'core/ui/layer/PolylineLayer.js';
 *
 * let polylineLayer = new PolylineLayer({
        getLocation : {
            dataSourceIds : [datasource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        color : 'rgba(0,0,255,0.5)',
        weight : 10,
        opacity : .5,
        smoothFactor : 1,
        maxPoints : 200
    });
 */
var PolylineLayer = /** @class */ (function (_super) {
    __extends(PolylineLayer, _super);
    /**
        * Creates the PolylineLayer
        * @param {Object} properties
        * @param {Object[]} [properties.locations] - defines the default location of the polyline [lat, lon]
        * @param {Number} [properties.weight=1] - defines the weight of the polyline
        * @param {String} [properties.color='red'] - defines the color of the polyline
        * @param {Number} [properties.opacity=1] - defines the opacity of the polyline
        * @param {Number} [properties.smoothFactor=1] - defines the smoothFactor of the polyline
        * @param {Number} [properties.maxPoints=10] - defines a number max of points
        * @param {Boolean} [properties.clampToGround=true] - defines if the line has to be clamped to ground
        * @param {Function} [properties.getLocation] - defines a function to return the location
        * @param {Function} [properties.getColor] - defines a function to return the color
        * @param {Function} [properties.getWeight] - defines a function to return the weight
        * @param {Function} [properties.getOpacity] - defines a function to return the opacity
        * @param {Function} [properties.getSmoothFactor] - defines a function to return the smoothFactor
        * @param {Function} [properties.getPolylineId] - map an id to a unique polyline
     */
    function PolylineLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'polyline';
        return _this;
    }
    // call by super class
    PolylineLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            polylineId: function () { return _this.getId(); },
            locations: undefined,
            color: 'red',
            weight: 1,
            opacity: 1,
            smoothFactor: 1,
            maxPoints: 10,
            clampToGround: true
        };
        if (isDefined(properties.color)) {
            props.color = properties.color;
        }
        if (isDefined(properties.weight)) {
            props.weight = properties.weight;
        }
        if (isDefined(properties.opacity)) {
            props.opacity = properties.opacity;
        }
        if (isDefined(properties.smoothFactor)) {
            props.smoothFactor = properties.smoothFactor;
        }
        if (isDefined(properties.maxPoints)) {
            props.maxPoints = properties.maxPoints;
        }
        if (isDefined(properties.clampToGround)) {
            props.clampToGround = properties.clampToGround;
        }
        this.definedId('polylineId', props);
        if (isDefined(properties.getLocation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var loc, currentProps;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getFunc('getLocation')(rec, timestamp, options)];
                        case 1:
                            loc = _a.sent();
                            currentProps = this.getCurrentProps();
                            if (!currentProps.locations) {
                                currentProps.locations = [];
                            }
                            currentProps.locations.push(loc);
                            if (currentProps.locations.length > currentProps.maxPoints) {
                                currentProps.locations.shift();
                            }
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLocation'), fn);
        }
        if (isDefined(properties.getColor)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['color'];
                            return [4 /*yield*/, this.getFunc('getColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getColor'), fn);
        }
        if (isDefined(properties.getWeight)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['weight'];
                            return [4 /*yield*/, this.getFunc('getWeight')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getWeight'), fn);
        }
        if (isDefined(properties.getOpacity)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['opacity'];
                            return [4 /*yield*/, this.getFunc('getOpacity')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getOpacity'), fn);
        }
        if (isDefined(properties.getSmoothFactor)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['smoothFactor'];
                            return [4 /*yield*/, this.getFunc('getSmoothFactor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getSmoothFactor'), fn);
        }
    };
    PolylineLayer.prototype.clear = function () {
        var currentProps = this.getCurrentProps();
        currentProps.locations = [];
    };
    return PolylineLayer;
}(Layer));
export default PolylineLayer;
//# sourceMappingURL=PolylineLayer.js.map