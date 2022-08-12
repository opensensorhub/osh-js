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
  LONLATALT_EULER_ANGLES: 1,

  /**
   * Constant indicating that the position provided to the draping layer is
   * in the form of ECEF 3-D coordinates (in meters). This also indicates that
   * the platform and gimbal orientations are provided as 3x3 rotation
   * matrices.
   */
  ECEF_MATRICES: 2,

  /**
   * Constant indicating that the position provided to the draping layer is
   * in the form of ECEF 3-D coordinates (in meters). This also indicates that
   * the platform and gimbal orientations are provided as quaternions.
   */
  ECEF_QUATERNIONS: 3,
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
     * @param {Number|undefined} positionMode An ImageDrapingPositionMode value indicating how the camera's position
     *   and orientation will be specified. If left unspecified, defaults to LONLATALT_EULER_ANGLES.
     *
     * @param {Cartesian3|undefined} properties.platformLocation Location of the camera. The values are either
     *   lon/lat/alt or ECEF, depending on the value of positionMode.
     * @param {Function|{handler:Function,dataSourceIds:Array<string>}|undefined} properties.getPlatformLocation
     * 
     * @param {Matrix3|{heading:number,pitch:number,roll:number}|undefined} properties.platformOrientation
     * @param {Function|undefined} properties.getPlatformOrientation
     *
     * @param {Matrix3|{heading:number,pitch:number,roll:number}|undefined} properties.gimbalOrientation
     * @param {Function} properties.getGimbalOrientation
     *
     * @param {Object} properties.cameraModel
     * @param {Matrix3} properties.cameraModel.camProj 3x3 matrix that has f_x, f_y, and 1 on the main diagonal, and
     *   c_x, c_y, and 1 as the rightmost column. f_x and f_y are the focal length, in pixels, in the x and y direction.
     *   c_x and c_y are the coordinates of the principal point.
     * @param {Cartesian3} properties.cameraModel.camDistR Radial distortion coefficients.
     * @param {Cartesian2} properties.cameraModel.camDistT Tangential distortion coefficients.
     * @param {Function} properties.getCameraModel
     *
     * @param {HTMLElement} properties.imageSrc Source canvas
     * @param {Function} properties.getImageSrc
     *
     * @param {boolean|undefined} snapshot
     * @param {Function} properties.getSnapshot
     *
     * @param properties
     */
    constructor(properties) {
        super(properties);
        this.type = 'drapedImage';

        this.properties = properties;
        this.props.cameraModel = null;
        this.props.imageSrc = null;
        this.props.getSnapshot = null;
        this.props.platformLocation = null;
        this.props.platformOrientation = null;
        this.props.gimbalOrientation = null;
        this.props.drapedImageId = 'drapedImageId';

        // Default position mode is LONLATALT_EULER_ANGLES, if not specified.
        // Old code should continue to work as-is.
        this.props.positionMode = this.properties.positionMode || ImageDrapingPositionMode.LONLATALT_EULER_ANGLES;

        this.initDynamicProp("platformLocation");
        this.initDynamicProp("platformOrientation");
        this.initDynamicProp("gimbalOrientation");
        this.initDynamicProp("cameraModel");
        this.initDynamicProp("imageSrc");
        this.initDynamicProp("snapshot");

        this.saveState();
    }
}

export default ImageDrapingLayer;
export { ImageDrapingPositionMode };
