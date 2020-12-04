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
 * @classdesc
 * @class OSH.UI.Styler.Curve
 * @type {OSH.UI.Style}
 * @augments OSH.UI.Styler
 */
OSH.UI.Styler.Curve = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.xLabel = "";
		this.yLabel = "";
		this.color = "#000000";
		this.stroke = 1;
		this.x = 0;
		this.y = [];
		
		if(typeof(properties.stroke) != "undefined"){
			this.stroke = properties.stroke;
		} 
		
		if(typeof(properties.color) != "undefined"){
			this.color = properties.color;
		} 
		
		if(typeof(properties.x) != "undefined"){
			this.x = properties.x;
		} 
		
		if(typeof(properties.y) != "undefined"){
			this.y = properties.y;
		} 
		
		if(typeof(properties.strokeFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.stroke = properties.strokeFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.strokeFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.colorFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				this.color = properties.colorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.colorFunc.dataSourceIds,fn);
		}
		
		if(typeof(properties.valuesFunc) != "undefined") {
			var fn = function(rec,timeStamp,options) {
				var values = properties.valuesFunc.handler(rec,timeStamp,options);
				this.x = values.x;
				this.y = values.y;
			}.bind(this);
			this.addFn(properties.valuesFunc.dataSourceIds,fn);
		}
	},

	/**
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @instance
	 * @memberof OSH.UI.Styler.Curve
	 */
	setData: function(dataSourceId,rec,view,options) {
		if(this._super(dataSourceId,rec,view,options)) {
			//if(typeof(view) != "undefined" && view.hasOwnProperty('updateMarker')){
			if(typeof(view) != "undefined") {
				view.updateCurve(this,rec.timeStamp,options);
			}
		}
	}
});