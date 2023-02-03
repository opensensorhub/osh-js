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
import Layer from "../../../../source/core/ui/layer/Layer";
import { isDefined } from "../../utils/Utils";
/**
 * Enumeration of the ways that the frustum's position and orientation can be
 * specified.
 */
var FrustumPositionMode = Object.freeze({
    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of a latitude (in degrees), longitude (in degrees), and
     * altitude above ellipsoid (in meters). This also indicates that platform
     * orientation is provided as heading, pitch, and roll, in degrees; and
     * sensor orientation is provided as yaw, pitch, and roll, in degrees.
     */
    LONLATALT_WITH_EULER_ANGLES: 1,
    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as 3x3 rotation
     * matrices.
     */
    ECEF_WITH_MATRICES: 2,
    /**
     * Constant indicating that the position provided to the frustum layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and sensor orientations are provided as quaternions.
     */
    ECEF_WITH_QUATERNIONS: 3,
});
var frustumLayer = /** @class */ (function (_super) {
    __extends(frustumLayer, _super);
    /**
     */
    function frustumLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'frustum';
        return _this;
    }
    // call by super class
    frustumLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            color: 'rgb(255,0,0)',
            opacity: 0.5,
            origin: null,
            fov: null,
            near: 0.009,
            range: null,
            platformOrientation: { heading: 0.0, pitch: 0.0, roll: 0.0 },
            sensorOrientation: { yaw: 0.0, pitch: 0.0, roll: 0.0 },
            positionMode: FrustumPositionMode.LONLATALT_WITH_EULER_ANGLES,
            aspectRatio: 4 / 3
        };
        if (isDefined(properties.color)) {
            props.color = properties.color;
        }
        if (isDefined(properties.opacity)) {
            props.opacity = properties.opacity;
        }
        if (isDefined(properties.near)) {
            props.near = properties.near;
        }
        if (isDefined(properties.range)) {
            props.range = properties.range;
        }
        if (isDefined(properties.fov)) {
            props.fov = properties.fov;
        }
        if (isDefined(properties.positionMode)) {
            props.positionMode = properties.positionMode;
        }
        if (isDefined(properties.aspectRatio)) {
            props.aspectRatio = properties.aspectRatio;
        }
        this.definedId('frustumId', props);
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
        if (isDefined(properties.getOrigin)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['origin'];
                            return [4 /*yield*/, this.getFunc('getOrigin')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getOrigin'), fn);
        }
        if (isDefined(properties.getFov)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['fov'];
                            return [4 /*yield*/, this.getFunc('getFov')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getFov'), fn);
        }
        if (isDefined(properties.getRange)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['range'];
                            return [4 /*yield*/, this.getFunc('getRange')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getRange'), fn);
        }
        if (isDefined(properties.getPlatformOrientation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['platformOrientation'];
                            return [4 /*yield*/, this.getFunc('getPlatformOrientation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getPlatformOrientation'), fn);
        }
        if (isDefined(properties.getSensorOrientation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['sensorOrientation'];
                            return [4 /*yield*/, this.getFunc('getSensorOrientation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getSensorOrientation'), fn);
        }
        if (isDefined(properties.getAspectRatio)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['aspectRatio'];
                            return [4 /*yield*/, this.getFunc('getAspectRatio')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getAspectRatio'), fn);
        }
    };
    return frustumLayer;
}(Layer));
export default frustumLayer;
export { FrustumPositionMode };
//# sourceMappingURL=FrustumLayer.js.map