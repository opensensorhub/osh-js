/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

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
 * Enumeration of the ways that the camera's position and orientation can be
 * specified for a draped image.
 */
var ImageDrapingPositionMode = Object.freeze({
    /**
     * Constant indicating that the position provided to the draping layer is
     * in the form of a latitude (in degrees), longitude (in degrees), and
     * altitude above ellipsoid (in meters). This also indicates that platform
     * orientation is provided as heading, pitch, and roll, in degrees; and
     * gimbal orientation is provided as yaw, pitch, and roll, in degrees.
     */
    LONLATALT_WITH_EULER_ANGLES: 1,
    /**
     * Constant indicating that the position provided to the draping layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and gimbal orientations are provided as 3x3 rotation
     * matrices.
     */
    ECEF_WITH_MATRICES: 2,
    /**
     * Constant indicating that the position provided to the draping layer is
     * in the form of ECEF 3-D coordinates (in meters). This also indicates that
     * the platform and gimbal orientations are provided as quaternions.
     */
    ECEF_WITH_QUATERNIONS: 3,
});
/**
 * When gimbal orientation is applied, which order do we apply the rotations?
 * This only matters when the position mode is LONLATALT_WITH_EULER_ANGLES.
 */
var GimbalEulerAngleOrder = Object.freeze({
    YAW_PITCH_ROLL: 1,
    YAW_ROLL_PITCH: 2,
    PITCH_YAW_ROLL: 3,
    PITCH_ROLL_YAW: 4,
    ROLL_YAW_PITCH: 5,
    ROLL_PITCH_YAW: 6
});
/**
 * @extends Layer
 * @example
 import ImageDrapingLayer from 'core/ui/layer/ImageDrapingLayer.js';

 let imageDrapingLayer = new ImageDrapingLayer({
      getPlatformLocation: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      getPlatformOrientation: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      getGimbalOrientation: {
        dataSourceIds: [gimbalOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      cameraModel: {
        camProj: new Matrix3(747.963/1280.,     0.0,       650.66/1280.,
          0.0,        769.576/738.,  373.206/738.,
          0.0,            0.0,          1.0),
        camDistR: new Cartesian3(-2.644e-01, 8.4e-02, 0.0),
        camDistT: new Cartesian2(-8.688e-04, 6.123e-04)
      },
      icon: 'images/car-location.png',
      iconAnchor: [16, 40],
      imageSrc: videoCanvas
    });
 */
var ImageDrapingLayer = /** @class */ (function (_super) {
    __extends(ImageDrapingLayer, _super);
    /**
     * @param {Object} properties
     * @param {Number[]} properties.location - [x,y]
     * @param {Object} properties.orientation -
     * @param {Object} properties.gimbalOrientation -
     * @param {Object} properties.cameraModel -
     * @param {Matrix3} properties.cameraModel.camProj -
     * @param {Cartesian3} properties.cameraModel.camDistR -
     * @param {Cartesian2} properties.cameraModel.camDistT -
     * @param {String} properties.icon -
     * @param {Number[]} [properties.iconAnchor=[16,16]] -
     * @param {HTMLElement} properties.imageSrc - source canvas
     * @param {Function} properties.getPlatformLocation -
     * @param {Function} properties.getPlatformOrientation -
     * @param {Function} properties.getGimbalOrientation -
     * @param {Function} properties.getCameraModel -
     * @param {Function} properties.getSnapshot -
     * @param {Function} properties.getImageSrc -
     *
     * @param properties
     */
    function ImageDrapingLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'drapedImage';
        return _this;
    }
    // call by super class
    ImageDrapingLayer.prototype.init = function (properties) {
        var _this = this;
        if (properties === void 0) { properties = this.properties; }
        _super.prototype.init.call(this, properties);
        var props = {
            cameraModel: null,
            imageSrc: null,
            getSnapshot: null,
            platformLocation: null,
            platformOrientation: null,
            gimbalOrientation: null,
            positionMode: ImageDrapingPositionMode.LONLATALT_WITH_EULER_ANGLES,
            gimbalEulerAngleOrder: GimbalEulerAngleOrder.YAW_ROLL_PITCH
        };
        if (isDefined(properties.platformLocation)) {
            props.platformLocation = properties.platformLocation;
        }
        if (isDefined(properties.platformOrientation)) {
            props.platformOrientation = properties.platformOrientation;
        }
        if (isDefined(properties.gimbalOrientation)) {
            props.gimbalOrientation = properties.gimbalOrientation;
        }
        if (isDefined(properties.cameraModel)) {
            props.cameraModel = properties.cameraModel;
        }
        if (isDefined(properties.imageSrc)) {
            props.imageSrc = properties.imageSrc;
        }
        if (isDefined(properties.getSnapshot)) {
            props.getSnapshot = properties.getSnapshot;
        }
        if (isDefined(properties.positionMode)) {
            props.positionMode = properties.positionMode;
        }
        if (isDefined(properties.gimbalEulerAngleOrder)) {
            props.gimbalEulerAngleOrder = properties.gimbalEulerAngleOrder;
        }
        this.definedId('drapedImageId', props);
        if (isDefined(properties.getPlatformLocation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['platformLocation'];
                            return [4 /*yield*/, this.getFunc('getPlatformLocation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getPlatformLocation'), fn);
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
        if (isDefined(properties.getGimbalOrientation)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['gimbalOrientation'];
                            return [4 /*yield*/, this.getFunc('getGimbalOrientation')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getGimbalOrientation'), fn);
        }
        if (isDefined(properties.getCameraModel)) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['cameraModel'];
                            return [4 /*yield*/, this.getFunc('getCameraModel')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getCameraModel'), fn);
        }
        if (this.checkFn("getImageSrc")) {
            var fn = function (rec, timestamp, options) { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _a = this.updateProperty;
                            _b = ['imageSrc'];
                            return [4 /*yield*/, this.getFunc('getImageSrc')(rec, timestamp, options)];
                        case 1:
                            _a.apply(this, _b.concat([_c.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); };
            this.addFn(this.getDataSourcesIdsByProperty('getImageSrc'), fn);
        }
    };
    return ImageDrapingLayer;
}(Layer));
export default ImageDrapingLayer;
export { ImageDrapingPositionMode, GimbalEulerAngleOrder };
//# sourceMappingURL=ImageDrapingLayer.js.map