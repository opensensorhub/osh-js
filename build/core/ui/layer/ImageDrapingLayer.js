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
import { isDefined } from "../../utils/Utils.js";
import Layer from "./Layer.js";
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
     *
     * @param properties
     */
    function ImageDrapingLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'draping';
        _this.properties = properties;
        _this.props.cameraModel = null;
        _this.props.imageSrc = null;
        _this.props.getSnapshot = null;
        _this.props.platformLocation = null;
        _this.props.platformOrientation = null;
        _this.props.gimbalOrientation = null;
        var that = _this;
        if (isDefined(properties.platformLocation)) {
            _this.props.platformLocation = properties.platformLocation;
        }
        if (isDefined(properties.platformOrientation)) {
            _this.props.platformOrientation = properties.platformOrientation;
        }
        if (isDefined(properties.gimbalOrientation)) {
            _this.props.gimbalOrientation = properties.gimbalOrientation;
        }
        if (isDefined(properties.cameraModel)) {
            _this.props.cameraModel = properties.cameraModel;
        }
        if (isDefined(properties.imageSrc)) {
            _this.props.imageSrc = properties.imageSrc;
        }
        if (isDefined(properties.getPlatformLocation)) {
            var fn = function (rec, timeStamp, options) {
                that.props.platformLocation = that.getFunc('getPlatformLocation')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getPlatformLocation'), fn);
        }
        if (isDefined(properties.getPlatformOrientation)) {
            var fn = function (rec, timeStamp, options) {
                that.props.platformOrientation = that.getFunc('getPlatformOrientation')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getPlatformOrientation'), fn);
        }
        if (isDefined(properties.getGimbalOrientation)) {
            var fn = function (rec, timeStamp, options) {
                that.props.gimbalOrientation = that.getFunc('getGimbalOrientation')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getGimbalOrientation'), fn);
        }
        if (isDefined(properties.getCameraModel)) {
            var fn = function (rec, timeStamp, options) {
                that.props.cameraModel = that.getFunc('getCameraModel')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getCameraModel'), fn);
        }
        if (isDefined(properties.getSnapshot)) {
            _this.props.getSnapshot = properties.getSnapshot;
        }
        _this.saveState();
        return _this;
    }
    return ImageDrapingLayer;
}(Layer));
export default ImageDrapingLayer;
//# sourceMappingURL=ImageDrapingLayer.js.map