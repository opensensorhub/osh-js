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

import {
	Cartesian3,
} from 'cesium';

import {isDefined} from "../../../core/utils/Utils.js";
import Layer from "../../../core/ui/layer/Layer.js";

/**
 * Nexrad Layer.
 * @extends Layer
 */
class Nexrad extends Layer {
	/**
		* Creates the Layer.
		* @param {Object} properties
		* @param {Number[]} properties.location - [x,y]
		* @param {Object} radialData
		* @param {Function} properties.getLocation -
		* @param {Function} properties.getRadialData -
		*
		*/
	constructor(properties) {
		super(properties);
		this.properties = properties;
		this.location = null;
		this.radialData = null;

		this.options = {};

		let that = this;
		if (isDefined(properties.location)){
			this.location = properties.location;
		}

		if (isDefined(properties.radialData)){
			this.radialData = properties.radialData;
		}

		if (isDefined(properties.getLocation)) {
			let fn = function(rec,timeStamp,options) {
				that.location = properties.getLocation.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getLocation.dataSourceIds,fn);
		}

		if (isDefined(properties.getRadialData)) {
			let fn = function(rec,timeStamp,options) {
				that.radialData = properties.getRadialData.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getRadialData.dataSourceIds,fn);
		}

		this.reflectivityColorMap = [
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(204, 255, 255),
			Cesium.Color.fromBytes(204, 153, 204),
			Cesium.Color.fromBytes(153, 102, 153),
			Cesium.Color.fromBytes(102,  51, 102),
			Cesium.Color.fromBytes(204, 204, 153),
			Cesium.Color.fromBytes(153, 153, 102),
			Cesium.Color.fromBytes(100, 100, 100),
			Cesium.Color.fromBytes(  4, 233, 231),
			Cesium.Color.fromBytes(  1, 159, 244),
			Cesium.Color.fromBytes(  3,   0, 244),
			Cesium.Color.fromBytes(  2, 253,   2),
			Cesium.Color.fromBytes(  1, 197,   1),
			Cesium.Color.fromBytes(  0, 142,   0),
			Cesium.Color.fromBytes(253, 248,   2),
			Cesium.Color.fromBytes(229, 188,   0),
			Cesium.Color.fromBytes(253, 149,   0),
			Cesium.Color.fromBytes(253,   0,   0),
			Cesium.Color.fromBytes(212,   0,   0),
			Cesium.Color.fromBytes(188,   0,   0),
			Cesium.Color.fromBytes(248,   0, 253),
			Cesium.Color.fromBytes(152,  84, 198),
			Cesium.Color.fromBytes(253, 253, 253)
		];

		this.pointCollection = new Cesium.PointPrimitiveCollection();
		this.radialCount = 0;
	}

	setData(dataSourceId,rec,view,options) {
		if (super.setData(dataSourceId,rec,view,options)) {
			if (isDefined(view)) {

				let DTR = Math.PI/180;

				// keep only first elevation
				if (rec.data.elevation > 0.7) {
					return false;
				}

				// draw directly in Cesium view
				let radarLoc = Cesium.Cartesian3.fromDegrees(this.location.x, this.location.y, this.location.z);
				let quat = Cesium.Transforms.headingPitchRollQuaternion(radarLoc, (rec.data.azimuth-90)*DTR, rec.data.elevation*DTR, 0.0);
				let rotM = Cesium.Matrix3.fromQuaternion(quat);

				let points = new Cesium.PointPrimitiveCollection();
				let dist0 = rec.data.rangeToCenterOfFirstRefGate;
				let step = rec.data.refGateSize;
				for (let i=0; i<rec.data.reflectivity.length; i++) {

					let val = rec.data.reflectivity[i];

					// skip points that are out of range
					if (val < -32 || val > 94.5) {
						continue;
					}

					let gatePos = new Cesium.Cartesian3(dist0 + i*step, 0, 0);
					Cesium.Matrix3.multiplyByVector(rotM, gatePos, gatePos);

					// apply color map and add point to collection
					this.pointCollection.add({
						position : Cesium.Cartesian3.add(radarLoc, gatePos, gatePos),
						color : this.getReflectivityColor(val),
						pixelSize : 3
					});
				}

				this.radialCount++;
				if (this.radialCount === 100) {
					view.viewer.scene.primitives.add(this.pointCollection);
					this.pointCollection = new Cesium.PointPrimitiveCollection();
					this.radialCount = 0;
				}
			}
			return true;
		}
		return false;
	}

	/**
	 *
	 * @private
	 */
	getReflectivityColor(val) {
		let index = Math.floor((val + 30) / 5) + 1;
		return this.reflectivityColorMap[index];
	}
}

export default Nexrad;
