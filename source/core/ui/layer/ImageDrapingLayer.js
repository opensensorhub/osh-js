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
      imageSrc: videoCanvas
    });
 */
class ImageDrapingLayer extends Layer {
    /**
     * @param {Object} properties
     *
     * @param {Number} [properties.positionMode] An ImageDrapingPositionMode value indicating how the camera's
     *   position and orientation will be specified. If left unspecified, defaults to LONLATALT_WITH_EULER_ANGLES.
     *
     * @param {Cartesian3} [properties.platformLocation] Location of the camera. The values are either
     *   lon/lat/alt or ECEF, depending on the value of positionMode. Either this property or getPlatformLocation
     *   must be specified.
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}} [properties.getPlatformLocation]
     * 
     * @param {Matrix3|{heading:number,pitch:number,roll:number}} [properties.platformOrientation] Orientation of the
     *   platform that carries the imaging sensor (camera). Depending on the positionMode, this can either be a
     *   matrix expressing a rotation in ECEF space or an object with heading, pitch, and roll expressed in degrees.
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}} [properties.getPlatformOrientation]
     *
     * @param {Matrix3|{heading:number,pitch:number,roll:number}} [properties.gimbalOrientation]
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}} [properties.getGimbalOrientation]
     *
     * @param {Object} [properties.cameraModel]
     * @param {Matrix3} properties.cameraModel.camProj 3x3 matrix that has f_x, f_y, and 1 on the main diagonal, and
     *   c_x, c_y, and 1 as the rightmost column. f_x and f_y are the focal length, in pixels, in the x and y direction.
     *   c_x and c_y are the coordinates of the principal point.
     * @param {Cartesian3} properties.cameraModel.camDistR Radial distortion coefficients.
     * @param {Cartesian2} properties.cameraModel.camDistT Tangential distortion coefficients.
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}} [properties.getCameraModel]
     *
     * @param {HTMLElement} [properties.imageSrc] Source canvas
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}} [properties.getImageSrc]
     *
     * @param {boolean} [properties.snapshot] If true, each new image frame will result in a new geometry being added
     *   to the 3-D scene. (Use caution with this property as it can easily overwhelm the renderer.)
     * @param {Function} [properties.getSnapshot]
     *
     * @param properties
     */
    constructor(properties) {
        super(properties);
        this.type = 'drapedImage';
        this.props.drapedImageId = 'drapedImageId';

        // Default position mode is LONLATALT_WITH_EULER_ANGLES, if not specified.
        this.props.positionMode = this.properties.positionMode || ImageDrapingPositionMode.LONLATALT_WITH_EULER_ANGLES;

        this.initDynamicProp("platformLocation", null);
        this.initDynamicProp("platformOrientation", null);
        this.initDynamicProp("gimbalOrientation", null);
        this.initDynamicProp("cameraModel", null);
        this.initDynamicProp("imageSrc", null);
        this.initDynamicProp("snapshot", false);

        this.saveState();
    }
}

export default ImageDrapingLayer;
export { ImageDrapingPositionMode };
