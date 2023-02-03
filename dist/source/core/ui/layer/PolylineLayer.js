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
 * import PolylineLayer from 'core/ui/layer/PolylineLayer.js';
 *
 * let polylineLayer = new PolylineLayer({
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
class PolylineLayer extends Layer {
	/**
		* Creates the PolylineLayer
		* @param {Object} properties
	 	* @param {Object[]} [properties.locations] - defines the default location of the polyline [lat, lon]
	 	* @param {Number} [properties.weight=1] - defines the weight of the polyline
	  	* @param {String} [properties.color='red'] - defines the color of the polyline
		* @param {Number} [properties.opacity=1] - defines the opacity of the polyline
		* @param {Number} [properties.smoothFactor=1] - defines the smoothFactor of the polyline
		* @param {Number} [properties.maxPoints=10] - defines a number max of points
	  	* @param {Boolean} [properties.clampToGround=true] - defines if the line has to be clamped to ground
		* @param {Function} [properties.getLocation] - defines a function to return the location
		* @param {Function} [properties.getColor] - defines a function to return the color
		* @param {Function} [properties.getWeight] - defines a function to return the weight
		* @param {Function} [properties.getOpacity] - defines a function to return the opacity
		* @param {Function} [properties.getSmoothFactor] - defines a function to return the smoothFactor
	  	* @param {Function} [properties.getPolylineId] - map an id to a unique polyline
	 */
	constructor(properties) {
		super(properties);
		this.type = 'polyline';
	}
	// call by super class
	init(properties=this.properties) {
		super.init(properties);
		const props = {
			polylineId: () => this.getId(),
			locations: undefined,
			color: 'red',
			weight: 1,
			opacity: 1,
			smoothFactor: 1,
			maxPoints: 10,
			clampToGround: true
		};

		if(isDefined(properties.color)){
			props.color = properties.color;
		}

		if(isDefined(properties.weight)){
			props.weight = properties.weight;
		}

		if(isDefined(properties.opacity)){
			props.opacity = properties.opacity;
		}

		if(isDefined(properties.smoothFactor)){
			props.smoothFactor = properties.smoothFactor;
		}

		if(isDefined(properties.maxPoints)){
			props.maxPoints = properties.maxPoints;
		}

		if(isDefined(properties.clampToGround)){
			props.clampToGround = properties.clampToGround;
		}

		this.definedId('polylineId', props);

		if(isDefined(properties.getLocation)) {
			let fn = async (rec, timestamp, options) => {
				let loc = await this.getFunc('getLocation')(rec, timestamp, options);
				const currentProps = this.getCurrentProps();
				if(!currentProps.locations) {
					currentProps.locations = [];
				}
				currentProps.locations.push(loc);
				if(currentProps.locations.length > currentProps.maxPoints ) {
					currentProps.locations.shift();
				}
			};
			this.addFn(this.getDataSourcesIdsByProperty('getLocation'),fn);
		}

		if(isDefined(properties.getColor)) {
			let fn = async (rec, timestamp, options) => {
				this.updateProperty('color',await this.getFunc('getColor')(rec, timestamp, options));
			};
			this.addFn(this.getDataSourcesIdsByProperty('getColor'),fn);
		}

		if(isDefined(properties.getWeight)) {
			let fn = async (rec, timestamp, options) => {
				this.updateProperty('weight',await this.getFunc('getWeight')(rec, timestamp, options));
			};
			this.addFn(this.getDataSourcesIdsByProperty('getWeight'),fn);
		}

		if(isDefined(properties.getOpacity)) {
			let fn = async (rec, timestamp, options) => {
				this.updateProperty('opacity',await this.getFunc('getOpacity')(rec, timestamp, options));
			};
			this.addFn(this.getDataSourcesIdsByProperty('getOpacity'),fn);
		}

		if(isDefined(properties.getSmoothFactor)) {
			let fn = async (rec, timestamp, options) => {
				this.updateProperty('smoothFactor',await this.getFunc('getSmoothFactor')(rec, timestamp, options));
			};
			this.addFn(this.getDataSourcesIdsByProperty('getSmoothFactor'),fn);
		}
	}

	clear() {
		const currentProps = this.getCurrentProps();
		currentProps.locations = [];
	}
}

export default PolylineLayer;
