/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Botts Innovative Research, Inc. All Rights Reserved.

 Author: Nicolas Garay <nic.garay@botts-inc.com>

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
import { isDefined } from "../../utils/Utils.js";
import Layer from "./Layer.js";
/**
 * This polygon layer class defines the constructs necessary to create render-able polygons
 *
 * @extends Layer
 * @example
 import PolygonLayer from 'core/ui/layer/PolygonLayer.js';

 let boundedDrapingLayer = new PolygonLayer({
           getVertices : {
                dataSourceIds: [boundsDatasource.getId()],
                handler: (rec) => {
                    return [
                        rec.ulc.lon,
                        rec.ulc.lat,
                        rec.urc.lon,
                        rec.urc.lat,
                        rec.llc.lon,
                        rec.llc.lat,
                        rec.lrc.lon,
                        rec.lrc.lat,
                    ];
                }
            },
    });
 */
var PolygonLayer = /** @class */ (function (_super) {
    __extends(PolygonLayer, _super);
    /**
     * Creates the PolygonLayer
     *
     * @param {Object} properties
     * @param {Number[]} [properties.vertices] - defines the default vertices as an array of lat, lon e.g. [lat0, lon0, lat1, lon2, ... , latN, lonN]
     * @param {Function} [properties.getVertices] - defines a function to return the vertices as an array of lat, lon
     *      e.g. [lat0, lon0, lat1, lon2, ... , latN, lonN]
     * @param {String} [properties.outlineColor=rgb(0,0,0)] - defines the weight of the polyline
     * @param {Number} [properties.outlineWidth=1] - defines the weight of the polyline
     * @param {String} [properties.color=rgb(255,0,0)] - defines the color of the polyline
     * @param {Number} [properties.opacity=1] - defines the opacity of the polyline
     * @param {Boolean} [properties.clampToGround=false] - defines if the line has to be clamped to ground
     * @param {Function} [properties.getColor] - defines a function to return the color
     * @param {Function} [properties.getOpacity] - defines a function to return the opacity
     * @param {Function} [properties.getOutlineColor] - defines a function to return the outline color
     * @param {Function} [properties.getOutlineWidth] - defines a function to return the outline width
     * @param {Function} [properties.getPolygonId] - map an id to a unique polygon
     */
    function PolygonLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'polygon';
        return _this;
    }
    // call by super class
    PolygonLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            vertices: null,
            color: 'rgb(255,0,0)',
            outlineColor: 'rgb(0,0,0)',
            outlineWidth: 1,
            opacity: 1,
            clampToGround: false
        };
        if (isDefined(properties.vertices)) {
            props.vertices = properties.vertices;
        }
        if (isDefined(properties.color)) {
            props.color = properties.color;
        }
        if (isDefined(properties.outlineWidth)) {
            props.outlineWidth = properties.outlineWidth;
        }
        if (isDefined(properties.outlineColor)) {
            props.outlineColor = properties.outlineColor;
        }
        if (isDefined(properties.opacity)) {
            props.opacity = properties.opacity;
        }
        if (isDefined(properties.clampToGround)) {
            props.clampToGround = properties.clampToGround;
        }
        this.definedId('polygonId', props);
        if (isDefined(properties.getVertices)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['vertices'];
                            return [4 /*yield*/, this.getFunc('getVertices')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getVertices'), fn);
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
        if (isDefined(properties.getOutlineWidth)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['outlineWidth'];
                            return [4 /*yield*/, this.getFunc('getOutlineWidth')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getOutlineWidth'), fn);
        }
        if (isDefined(properties.getOutlineColor)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['outlineColor'];
                            return [4 /*yield*/, this.getFunc('getOutlineColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getOutlineColor'), fn);
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
    };
    return PolygonLayer;
}(Layer));
export default PolygonLayer;
//# sourceMappingURL=PolygonLayer.js.map