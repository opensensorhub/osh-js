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

import {isDefined} from "../../utils/Utils.js";
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
class ImageDrapingLayer extends Layer {
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
    constructor(properties) {
        super(properties);
        this.type = 'draping';

        this.properties = properties;
        this.props.cameraModel = null;
        this.props.imageSrc = null;
        this.props.getSnapshot = null;
        this.props.platformLocation = null;
        this.props.platformOrientation = null;
        this.props.gimbalOrientation = null;

        const that = this;

        if (isDefined(properties.platformLocation)) {
            this.props.platformLocation = properties.platformLocation;
        }

        if (isDefined(properties.platformOrientation)) {
            this.props.platformOrientation = properties.platformOrientation;
        }

        if (isDefined(properties.gimbalOrientation)) {
            this.props.gimbalOrientation = properties.gimbalOrientation;
        }

        if (isDefined(properties.cameraModel)) {
            this.props.cameraModel = properties.cameraModel;
        }

        if (isDefined(properties.imageSrc)) {
            this.props.imageSrc = properties.imageSrc;
        }

        if (isDefined(properties.getPlatformLocation)) {
            let fn = function (rec, timeStamp, options) {
                that.props.platformLocation = that.getFunc('getPlatformLocation')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPlatformLocation'), fn);
        }

        if (isDefined(properties.getPlatformOrientation)) {
            let fn = function (rec, timeStamp, options) {
                that.props.platformOrientation = that.getFunc('getPlatformOrientation')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPlatformOrientation'), fn);
        }

        if (isDefined(properties.getGimbalOrientation)) {
            let fn = function (rec, timeStamp, options) {
                that.props.gimbalOrientation = that.getFunc('getGimbalOrientation')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getGimbalOrientation'), fn);
        }

        if (isDefined(properties.getCameraModel)) {
            let fn = function (rec, timeStamp, options) {
                that.props.cameraModel = that.getFunc('getCameraModel')(rec,timeStamp,options);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getCameraModel'), fn);
        }

        if (isDefined(properties.getSnapshot)) {
            this.props.getSnapshot = properties.getSnapshot;
        }

        this.saveState();
    }
}

export default  ImageDrapingLayer;
