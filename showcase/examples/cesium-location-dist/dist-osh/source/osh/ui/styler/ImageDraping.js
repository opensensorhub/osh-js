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

import {isDefined} from "../../utils/Utils";
import Styler from "./Styler";

/**
 * @extends Styler
 * @example
 let imageDrapingMarker = new ImageDraping({
      platformLocationFunc: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
          return {
            x: rec.loc.lon,
            y: rec.loc.lat,
            z: rec.loc.alt - 184
          };
        }
      },
      platformOrientationFunc: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
          return {
            heading : rec.attitude.yaw,
            pitch: rec.attitude.pitch,
            roll: rec.attitude.roll
          };
        }
      },
      gimbalOrientationFunc: {
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
class ImageDraping extends Styler {
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
     * @param {Function} properties.platformLocationFunc -
     * @param {Function} properties.platformOrientationFunc -
     * @param {Function} properties.gimbalOrientationFunc -
     * @param {Function} properties.cameraModelFunc -
     * @param {Function} properties.snapshotFunc -
     *
     * @param properties
     */
    constructor(properties) {
        super(properties);
        this.properties = properties;
        this.cameraModel = null;
        this.imageSrc = null;
        this.snapshotFunc = null;
        this.platformLocation = null;
        this.platformOrientation = null;
        this.gimbalOrientation = null;

        this.options = {};
        var that = this;

        if (isDefined(properties.platformLocation)) {
            this.platformLocation = properties.platformLocation;
        }

        if (isDefined(properties.platformOrientation)) {
            this.platformOrientation = properties.platformOrientation;
        }

        if (isDefined(properties.gimbalOrientation)) {
            this.gimbalOrientation = properties.gimbalOrientation;
        }

        if (isDefined(properties.cameraModel)) {
            this.cameraModel = properties.cameraModel;
        }

        if (isDefined(properties.imageSrc)) {
            this.imageSrc = properties.imageSrc;
        }

        if (isDefined(properties.platformLocationFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.platformLocation = properties.platformLocationFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.platformLocationFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.platformOrientationFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.platformOrientation = properties.platformOrientationFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.platformOrientationFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.gimbalOrientationFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.gimbalOrientation = properties.gimbalOrientationFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.gimbalOrientationFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.cameraModelFunc)) {
            let fn = function (rec, timeStamp, options) {
                that.cameraModel = properties.cameraModelFunc.handler(rec, timeStamp, options);
            };
            this.addFn(properties.cameraModelFunc.dataSourceIds, fn);
        }

        if (isDefined(properties.snapshotFunc)) {
            this.snapshotFunc = properties.snapshotFunc;
        }
    }

    setData(dataSourceId, rec, view, options) {
        if (super.setData(dataSourceId, rec, view, options)) {

            let enabled = true;
            let snapshot = false;
            if (this.snapshotFunc !== null) {
                snapshot = this.snapshotFunc();
            }

            if (isDefined(view) && enabled &&
              this.platformLocation !== null &&
              this.platformOrientation !== null &&
              this.gimbalOrientation !== null &&
              this.cameraModel !== null &&
              this.imageSrc !== null) {
                view.updateDrapedImage(this, rec.timeStamp, options, snapshot);
                return true;
            }
        }
        return false;
    }
}

export default  ImageDraping;
