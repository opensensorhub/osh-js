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
import { isDefined, randomUUID } from "../../utils/Utils.js";
/**
 * @extends Layer
 */
var CurveLayer = /** @class */ (function (_super) {
    __extends(CurveLayer, _super);
    /**
     * Create the CurveLayer
     * @param {Object} properties -
     * @param {String} [properties.xLabel=""] -
     * @param {String} [properties.yLabel=""] -
     * @param {String} [properties.lineColor="#000000"] - color in hex or rgba value
     * @param {String} [properties.backgroundColor="#000000"] - color in hex or rgba value
     * @param {String} [properties.fill=false] -
     * @param {Number} [properties.maxValues=10] - Defines the max values hold by the layer
     * @param {Number} [properties.stroke=1] -
     * @param {Number} [properties.x=0] -
     * @param {Number} [properties.y=[]] -
     * @param {Number} [properties.maxValues=10] - The maximum values to display
     * @param {Function} properties.getStroke -
     * @param {Function} properties.getLineColor -
     * @param {Function} properties.getValues -
     *
     */
    function CurveLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'curve';
        return _this;
    }
    // call by super class
    CurveLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            xLabel: "",
            yLabel: "",
            lineColor: "#399ca5",
            backgroundColor: "#399ca5",
            fill: false,
            stroke: 1,
            curveId: randomUUID(),
            x: 0,
            y: 0,
            maxValues: 10
        };
        if (isDefined(properties.stroke)) {
            props.stroke = properties.stroke;
        }
        if (isDefined(properties.maxValues)) {
            props.maxValues = properties.maxValues;
        }
        if (isDefined(properties.lineColor)) {
            props.lineColor = properties.lineColor;
        }
        if (isDefined(properties.backgroundColor)) {
            props.backgroundColor = properties.backgroundColor;
        }
        if (isDefined(properties.fill)) {
            props.fill = properties.fill;
        }
        if (isDefined(properties.x)) {
            props.x = properties.x;
        }
        if (isDefined(properties.y)) {
            props.y = properties.y;
        }
        this.definedId('curveId', props);
        if (isDefined(properties.getStroke)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['stroke'];
                            return [4 /*yield*/, this.getFunc('getStroke')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getStroke'), fn);
        }
        if (isDefined(properties.getLineColor)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['lineColor'];
                            return [4 /*yield*/, this.getFunc('getLineColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLineColor'), fn);
        }
        if (isDefined(properties.getBackgroundColor)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['backgroundColor'];
                            return [4 /*yield*/, this.getFunc('getBackgroundColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLineColor'), fn);
        }
        if (isDefined(properties.getValues)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var value;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getFunc('getValues')(rec, timestamp, options)];
                        case 1:
                            value = _a.sent();
                            this.updateProperty('x', value.x);
                            this.updateProperty('y', value.y);
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getValues'), fn);
        }
    };
    return CurveLayer;
}(Layer));
export default CurveLayer;
//# sourceMappingURL=CurveLayer.js.map