/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined} from "../../utils/Utils.js";
import Styler from "./Styler";

/**
 * @classdesc
 * @class ImageDraping
 * @type {Styler}
 * @augments Styler
 */
export default class ImageDraping extends Styler {
    constructor(properties) {
        super(properties);
        this.properties = properties;
        this.platformLocation = null;
        this.platformOrientation = null;
        this.gimbalOrientation = null;
        this.cameraModel = null;
        this.imageSrc = null;
        this.snapshotFunc = null;

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

    /**
     *
     * @param $super
     * @param dataSourceId
     * @param rec
     * @param view
     * @param options
     * @memberof  ImageDraping
     * @instance
     */
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
