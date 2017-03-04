/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @class OSH.UI.Styler.Polyline
 * @classdesc
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 * @example
 * var polylineStyler = new OSH.UI.Styler.Polyline({
		locationFunc : {
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
OSH.UI.Styler.Polyline = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.locations = [];
     	this.color = 'red';
		this.weight = 1;
		this.opacity = 1;
		this.smoothFactor = 1;
		this.maxPoints = 10;
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.weight) != "undefined"){
			this.weight = properties.weight;
		} 
		
		if(typeof(properties.opacity) != "undefined"){
			this.opacity = properties.opacity;
		} 
		
		if(typeof(properties.smoothFactor) != "undefined"){
			this.smoothFactor = properties.smoothFactor;
		} 
		
		if(typeof(properties.maxPoints) != "undefined"){
			this.maxPoints = properties.maxPoints;
		} 
		
		if(typeof(properties.locationFunc) != "undefined") {
			var fn = function(rec) {
				var loc = properties.locationFunc.handler(rec);
				this.locations.push(loc);
				if(this.locations.length > this.maxPoints) {
					this.locations.shift();
				}
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec) {
				this.color = properties.colorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.weightFunc) != "undefined") {
			var fn = function(rec) {
				this.weight = properties.weightFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.weightFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.opacityFunc) != "undefined") {
			var fn = function(rec) {
				this.opacity = properties.opacityFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.opacityFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.smoothFactorFunc) != "undefined") {
			var fn = function(rec) {
				this.smoothFactor = properties.smoothFactorFunc.handler(rec);
			}.bind(this);
			this.addFn(properties.smoothFactorFunc.dataSourceIds,fn);
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Polyline
	 */
	setData: function(dataSourceId,rec,view,options) {
		if(this._super(dataSourceId,rec,view,options)) {
			if(typeof(view) != "undefined" && typeof view.updatePolyline === 'function'){
				view.updatePolyline(this);
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @instance
	 * @memberof OSH.UI.Styler.Polyline
	 */
	clear: function($super) {
		this.locations = [];
	}
});