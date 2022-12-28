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

import {isDefined, randomUUID} from "../../utils/Utils.js";
import Layer from "./Layer.js";

/**
 * Enumeration of the ways that the camera's position and orientation can be
 * specified for a draped image.
 */
 const ImageDrapingPositionMode = Object.freeze({
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
const GimbalEulerAngleOrder = Object.freeze({
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
     * @param {Function} properties.getImageSrc -
     *
     * @param properties
     */
    constructor(properties) {
        super(properties);
        this.type = 'drapedImage';
    }
    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            cameraModel : null,
            imageSrc : null,
            getSnapshot : null,
            platformLocation : null,
            platformOrientation : null,
            gimbalOrientation : null,
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
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('platformLocation',await this.getFunc('getPlatformLocation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getPlatformLocation'), fn);
        }

        if (isDefined(properties.getPlatformOrientation)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('platformOrientation',await this.getFunc('getPlatformOrientation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getPlatformOrientation'), fn);
        }

        if (isDefined(properties.getGimbalOrientation)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('gimbalOrientation',await this.getFunc('getGimbalOrientation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getGimbalOrientation'), fn);
        }

        if (isDefined(properties.getCameraModel)) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('cameraModel',await this.getFunc('getCameraModel')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getCameraModel'), fn);
        }

        if (this.checkFn("getImageSrc")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('imageSrc',await this.getFunc('getImageSrc')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getImageSrc'), fn);
        }
    }
}

export default  ImageDrapingLayer;
export { ImageDrapingPositionMode, GimbalEulerAngleOrder };