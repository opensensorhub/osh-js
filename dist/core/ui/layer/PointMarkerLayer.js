/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

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
import { assertArray, assertNumber, assertObject, assertPositive, assertString, assertBoolean, hasValue, isDefined } from "../../utils/Utils.js";
import Layer from "./Layer.js";
/**
 * @extends Layer
 * @example
 *
 * import PointMarkerLayer from 'core/ui/layer/PointMarkerLayer.js';
 *
 * let pointMarkerLayer = new PointMarkerLayer({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        getLocation : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        getOrientation : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        getIcon : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });
 */
var initialStates = {};
var PointMarkerLayer = /** @class */ (function (_super) {
    __extends(PointMarkerLayer, _super);
    /**
     * Create the PointMarker
     * @param {Object} properties
     * @param {Number[]} properties.location - [x,y,z]
     * @param {Number} [properties.orientation=0] -
     * @param {String} properties.icon -
     * @param {Number} [properties.iconScale=1] - the icon scale size
     * @param {String} [properties.iconColor="#000000"] - the icon color
     * @param {Number[]} [properties.iconAnchor=[16,16]] -
     * @param {Number[]} [properties.iconSize=[16,16]] -
     * @param {Number} [properties.iconOpacity=0.75] - icon opacity
     * @param {String} [properties.label=""] - the label to display
     * @param {String} [properties.labelColor="#000000"] - color
     * @param {String} [properties.labelOutlineColor=undefined] - color
     * @param {String} [properties.labelBackgroundColor=undefined] -  color
     * @param {Number} [properties.labelSize=16] -
     * @param {Number} [properties.labelScale=1.0] - label scale
     * @param {Number[]} [properties.labelOffset=[0,0]] -
     * @param {Number} [properties.zIndex=0] - z-ordering of markers
     * @param {Number} [properties.allowBillboardRotation=true] - allow billboard rotation
     * @param {Function} [properties.getLocation] -
     * @param {Function} [properties.getDescription] -
     * @param {Function} [properties.getOrientation] -
     * @param {Function} [properties.getIcon] -
     * @param {Function} [properties.getIconColor] -
     * @param {Function} [properties.getIconScale] -
     * @param {Function} [properties.getLabel] -
     * @param {Function} [properties.getLabelColor] -
     * @param {Function} [properties.getLabelSize] -
     * @param {Function} [properties.getZindex] - z-ordering of markers
     * @param {Function} [properties.getMarkerId] - map an id to a unique marker
     * @param {Number} [properties.zoomLevel=15] - Set the default zoom level
     * @param {Boolean} [properties.defaultToTerrainElevation=false] - Set the default to terrain elevation
     *
     */
    function PointMarkerLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'marker';
        return _this;
    }
    // call by super class
    PointMarkerLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            markerId: function () { return _this.getId(); },
            location: null,
            orientation: { heading: 0 },
            icon: null,
            iconAnchor: [16, 16],
            iconSize: [16, 16],
            iconScale: 1.0,
            iconColor: undefined,
            iconOpacity: 0.75,
            label: null,
            labelColor: undefined,
            labelOutlineColor: undefined,
            labelBackgroundColor: undefined,
            labelSize: 16,
            labelScale: 1.0,
            labelOffset: [0, 0],
            zoomLevel: 15,
            defaultToTerrainElevation: false,
            zIndex: 0,
            allowBillboardRotation: true,
            options: {}
        };
        if (isDefined(properties.defaultToTerrainElevation)) {
            props.defaultToTerrainElevation = properties.defaultToTerrainElevation;
        }
        if (hasValue(properties.location)) {
            assertObject(properties.location, "location");
            props.location = properties.location;
        }
        if (hasValue(properties.orientation)) {
            assertObject(properties.orientation, "orientation");
            props.orientation = properties.orientation;
        }
        if (hasValue(properties.icon)) {
            assertString(properties.icon, "icon");
            props.icon = properties.icon;
        }
        if (hasValue(properties.iconAnchor)) {
            assertArray(properties.iconAnchor, "iconAnchor");
            props.iconAnchor = properties.iconAnchor;
        }
        if (hasValue(properties.iconSize)) {
            assertArray(properties.iconSize, "iconSize");
            props.iconSize = properties.iconSize;
        }
        if (hasValue(properties.iconScale)) {
            assertPositive(properties.iconScale, "iconScale");
            props.iconScale = properties.iconScale;
        }
        if (hasValue(properties.iconColor)) {
            assertString(properties.iconColor, "iconColor");
            props.iconColor = properties.iconColor;
        }
        if (hasValue(properties.iconOpacity)) {
            assertString(properties.iconOpacity, "iconOpacity");
            props.iconOpacity = properties.iconOpacity;
        }
        if (hasValue(properties.label)) {
            assertString(properties.label, "label");
            props.label = properties.label;
        }
        if (hasValue(properties.labelColor)) {
            assertString(properties.labelColor, "labelColor");
            props.labelColor = properties.labelColor;
        }
        if (hasValue(properties.labelOutlineColor)) {
            assertString(properties.labelOutlineColor, "labelOutlineColor");
            props.labelOutlineColor = properties.labelOutlineColor;
        }
        if (hasValue(properties.labelBackgroundColor)) {
            assertString(properties.labelBackgroundColor, "labelBackgroundColor");
            props.labelBackgroundColor = properties.labelBackgroundColor;
        }
        if (hasValue(properties.labelSize)) {
            assertPositive(properties.labelSize, "labelSize");
            props.labelSize = properties.labelSize;
        }
        if (hasValue(properties.labelScale)) {
            assertPositive(properties.labelScale, "labelScale");
            props.labelScale = properties.labelScale;
        }
        if (hasValue(properties.labelOffset)) {
            assertArray(properties.labelOffset, "labelOffset");
            props.labelOffset = properties.labelOffset;
        }
        if (hasValue(properties.zoomLevel)) {
            assertPositive(properties.zoomLevel, "zoomLevel");
            props.zoomLevel = properties.zoomLevel;
        }
        if (hasValue(properties.zIndex)) {
            assertNumber(properties.zIndex, "zIndex");
            props.zIndex = properties.zIndex;
        }
        if (hasValue(properties.allowBillboardRotation)) {
            assertBoolean(properties.allowBillboardRotation, "allowBillboardRotation");
            props.allowBillboardRotation = properties.allowBillboardRotation;
        }
        this.definedId('markerId', props);
        if (this.checkFn("getLocation")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['location'];
                            return [4 /*yield*/, this.getFunc('getLocation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLocation'), fn);
        }
        if (this.checkFn("getOrientation")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['orientation'];
                            return [4 /*yield*/, this.getFunc('getOrientation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getOrientation'), fn);
        }
        if (this.checkFn("getIcon")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['icon'];
                            return [4 /*yield*/, this.getFunc('getIcon')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getIcon'), fn);
        }
        if (this.checkFn("getIconColor")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['iconColor'];
                            return [4 /*yield*/, this.getFunc('getIconColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getIconColor'), fn);
        }
        if (this.checkFn("getIconScale")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['iconScale'];
                            return [4 /*yield*/, this.getFunc('getIconScale')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getIconScale'), fn);
        }
        if (this.checkFn("getLabel")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['label'];
                            return [4 /*yield*/, this.getFunc('getLabel')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLabel'), fn);
        }
        if (this.checkFn("getLabelColor")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['labelColor'];
                            return [4 /*yield*/, this.getFunc('getLabelColor')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLabelColor'), fn);
        }
        if (this.checkFn("getLabelSize")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['labelSize'];
                            return [4 /*yield*/, this.getFunc('getLabelSize')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getLabelSize'), fn);
        }
        if (this.checkFn("getZindex")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['zIndex'];
                            return [4 /*yield*/, this.getFunc('getZindex')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getZindex'), fn);
        }
    };
    return PointMarkerLayer;
}(Layer));
export default PointMarkerLayer;
//# sourceMappingURL=PointMarkerLayer.js.map