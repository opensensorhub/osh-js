/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import Layer from "./Layer.js";
import { isDefined } from "../../utils/Utils.js";

/**
 * @extends Layer
 * @example
 *
 * import Polyline from 'osh/ui/layer/Polyline.js';
 *
 * let polylineLayer = new Polyline({
		getLocation : {
			dataSourceIds : [datasource.getId()],
			handler : function(rec) {
				return {
					x : rec.lon,
					y : rec.lat,
					z : rec.alt
				};
			}
		},
		color : 'rgba(0,0,255,0.5)',
		weight : 10,
		opacity : .5,
		smoothFactor : 1,
		maxPoints : 200
	});
 */
class Polyline extends Layer {
	/**
		* Creates the Polyline
		* @param {Object} properties
		* @param {Object[]} [properties.locations] - defines the default location of the polyline [lat, lon]
		* @param {Number} [properties.weight=1] - defines the weight of the polyline
	  * @param {String} [properties.color='red'] - defines the color of the polyline
		* @param {Number} [properties.opacity=1] - defines the opacity of the polyline
		* @param {Number} [properties.smoothFactor=1] - defines the smoothFactor of the polyline
		* @param {Number} [properties.maxPoints=10] - defines a number max of points
		* @param {Function} [properties.getLocation] - defines a function to return the location
		* @param {Function} [properties.getColor] - defines a function to return the color
		* @param {Function} [properties.getWeight] - defines a function to return the weight
		* @param {Function} [properties.getOpacity] - defines a function to return the opacity
		* @param {Function} [properties.getSmoothFactor] - defines a function to return the smoothFactor
	  * @param {Function} [properties.getPolylineId] - map an id to a unique polyline
		*/
	constructor(properties) {
		super(properties);
		this.properties = properties;
		this.locations = {};
		this.color = 'red';
		this.weight = 1;
		this.opacity = 1;
		this.smoothFactor = 1;
		this.maxPoints = 10;
		this.polylineId = 'polyline';

		if(isDefined(properties.color)){
			this.color = properties.color;
		}

		if(isDefined(properties.weight)){
			this.weight = properties.weight;
		}

		if(isDefined(properties.opacity)){
			this.opacity = properties.opacity;
		}

		if(isDefined(properties.smoothFactor)){
			this.smoothFactor = properties.smoothFactor;
		}

		if(isDefined(properties.maxPoints)){
			this.maxPoints = properties.maxPoints;
		}

		let that = this;
		// must be first to assign correctly the first location to the right id if it is defined
		if(isDefined(properties.getPolylineId)) {
			let fn = function(rec) {
				that.polylineId = properties.getPolylineId.handler(rec);
			};
			this.addFn(properties.getPolylineId.dataSourceIds,fn);
		}

		if(isDefined(properties.getLocation)) {
			let fn = function(rec) {
				let loc = properties.getLocation.handler(rec);
				if(!(that.polylineId in that.locations)) {
					that.locations[that.polylineId] = [];
				}
				that.locations[that.polylineId].push(loc);
				if(that.locations[that.polylineId].length > that.maxPoints) {
					that.locations[that.polylineId].shift();
				}
			};
			this.addFn(properties.getLocation.dataSourceIds,fn);
		}

		if(isDefined(properties.getColor)) {
			let fn = function(rec) {
				that.color = properties.getColor.handler(rec);
			};
			this.addFn(properties.getColor.dataSourceIds,fn);
		}

		if(isDefined(properties.getWeight)) {
			let fn = function(rec) {
				that.weight = properties.getWeight.handler(rec);
			};
			this.addFn(properties.getWeight.dataSourceIds,fn);
		}

		if(isDefined(properties.getOpacity)) {
			let fn = function(rec) {
				that.opacity = properties.getOpacity.handler(rec);
			};
			this.addFn(properties.getOpacity.dataSourceIds,fn);
		}

		if(isDefined(properties.getSmoothFactor)) {
			let fn = function(rec) {
				that.smoothFactor = properties.getSmoothFactor.handler(rec);
			};
			this.addFn(properties.getSmoothFactor.dataSourceIds,fn);
		}

	}

	setData(dataSourceId,rec,view,options) {
		if(super.setData(dataSourceId,rec,view,options)) {
			if(isDefined(view) && typeof view.updatePolyline === 'function'){
				view.updatePolyline(this);
				return true;
			}
		}
		return false;
	}

	clear() {
		this.locations[this.polylineId] = [];
	}
}

export default Polyline;
