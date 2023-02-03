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
/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2021 Botts Innovative Research, Inc. All Rights Reserved.
 Author: Drew Botts <drew@botts-inc.com>
 ******************************* END LICENSE BLOCK ***************************/
import Layer from "./Layer.js";
import { assertNumber, hasValue, isDefined } from "../../utils/Utils";
/**
 * @extends Layer
 * @example
 *
 * import EllipseLayer from 'osh-js/core/ui/layer/EllipseLayer';
 *
 * let ellipse = new EllipseLayer({
        dataSourceId: gpsDataSource.id,
        getPosition: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat,
            z: rec.location.alt
        }),
        color: 'rgba(255,74,22, 0.5)',
        semiMinorAxis: 100,
        semiMajorAxis: 200,
        name: "Android Phone GPS Path"
    });
 */
var EllipseLayer = /** @class */ (function (_super) {
    __extends(EllipseLayer, _super);
    /**
     * Creates the EllipseLayer
     * @param {Object} properties
     * @param {Object[]} [properties.position] - defines the default location of the ellipse [lat, lon, alt]
     * @param {Number} [properties.semiMajorAxis=null] - defines the semi-major axis of the ellipse
     * @param {Number} [properties.semiMinorAxis=null] - defines the semi-minor axis of the ellipse
     * @param {Number} [properties.rotation=null] - defines the rotation of the ellipse counter-clockwise from north.
     * @param {Boolean} [properties.clampToGround=false] - defines if the line has to be clamped to ground
     * @param {String} [properties.color='red'] - defines the color property of the ellipse
     * @param {Number} [properties.zIndex=0] - z-ordering of ellipses
     * @param {Function} [properties.getPosition] - defines a function to return the location
     * @param {Function} [properties.getColor] - defines a function to return the color
     * @param {Function} [properties.getSemiMajorAxis] - defines a function to return the semiMajorAxis
     * @param {Function} [properties.getSemiMinorAxis] - defines a function to return the semiMinorAxis
     * @param {Function} [properties.getHeight] - defines a function to return the height of the ellipse above the ellipsoid
     * @param {Function} [properties.getRotation] - defines a function to return the rotation of the ellipse
     * @param {Function} [properties.getEllipseID] - map an id to a unique ellipse
     */
    function EllipseLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'ellipse';
        return _this;
    }
    // call by super class
    EllipseLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            position: {},
            semiMajorAxis: null,
            semiMinorAxis: null,
            rotation: null,
            clampToGround: false,
            color: 'red',
            ellipseId: 'ellipse',
            zIndex: 0,
        };
        if (isDefined(properties.color)) {
            props.color = properties.color;
        }
        if (isDefined(properties.clampToGround)) {
            props.clampToGround = properties.clampToGround;
        }
        if (isDefined(properties.rotation)) {
            props.rotation = properties.rotation;
        }
        if (isDefined(properties.semiMinorAxis)) {
            props.semiMinorAxis = properties.semiMinorAxis;
        }
        if (isDefined(properties.semiMajorAxis)) {
            props.semiMajorAxis = properties.semiMajorAxis;
        }
        if (isDefined(properties.position)) {
            props.position = properties.position;
        }
        if (hasValue(properties.zIndex)) {
            assertNumber(properties.zIndex, "zIndex");
            props.zIndex = properties.zIndex;
        }
        this.definedId('ellipseID', props);
        if (isDefined(properties.getPosition)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['position'];
                            return [4 /*yield*/, this.getFunc('getPosition')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getPosition'), fn);
        }
        if (isDefined(properties.getSemiMajorAxis)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['semiMajorAxis'];
                            return [4 /*yield*/, this.getFunc('getSemiMajorAxis')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getSemiMajorAxis'), fn);
        }
        if (isDefined(properties.getSemiMinorAxis)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['semiMinorAxis'];
                            return [4 /*yield*/, this.getFunc('getSemiMinorAxis')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getSemiMinorAxis'), fn);
        }
        if (isDefined(properties.getHeight)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['height'];
                            return [4 /*yield*/, this.getFunc('getHeight')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getHeight'), fn);
        }
        if (isDefined(properties.getRotation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['rotation'];
                            return [4 /*yield*/, this.getFunc('getRotation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getRotation'), fn);
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
    };
    return EllipseLayer;
}(Layer));
export default EllipseLayer;
//# sourceMappingURL=EllipseLayer.js.map