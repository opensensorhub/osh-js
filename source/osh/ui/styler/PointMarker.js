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

import {assertArray, assertObject, assertPositive, assertString, hasValue, isDefined} from "../../utils/Utils.js";
import Styler from "./Styler.js";

/**
 * @extends Styler
 * @example
 *
 * import PointMarker from 'osh/ui/styler/PointMarker.js';
 *
 * let pointMarker = new PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        locationFunc : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        orientationFunc : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        iconFunc : {
            dataSourceIds: [androidPhoneGpsDataSource.getId()],
            handler : function(rec,timeStamp,options) {
                if(options.selected) {
                    return 'images/cameralook-selected.png'
                } else {
                    return 'images/cameralook.png';
                };
            }
        }
    });
 */
class PointMarker extends Styler {
	/**
		* Create the PointMarker
		* @param {Object} properties
		* @param {Number[]} properties.location - [x,y,z]
  		* @param {Number} [properties.orientation=0] -
		* @param {String} properties.icon -
		* @param {Number[]} [properties.iconAnchor=[16,16]] -
		* @param {Number[]} [properties.iconSize=[16,16]] -
		* @param {String} properties.label -
		* @param {String} [properties.labelColor="#000000"] - HTML color
		* @param {Number} [properties.labelSize=16] -
		* @param {Number[]} [properties.labelOffset=[0,0]] -
		* @param {Function} properties.locationFunc -
		* @param {Function} properties.orientationFunc -
		* @param {Function} properties.iconFunc -
		* @param {Function} properties.labelFunc -
		* @param {Function} properties.labelColorFunc -
		* @param {Function} properties.labelSizeFunc -
	 	* @param {Number} [properties.zoomLevel=15] -
		*
		*/
	constructor(properties) {
		super(properties);
		this.properties = properties;
		this.location = null;
		this.orientation = {heading:0};
		this.icon = null;
		this.iconAnchor = [16,16];
		this.iconSize = [16,16];
		this.label = null;
		this.labelColor = "#000000";
		this.labelSize = 16;
		this.labelOffset = [0,0];
		this.zoomLevel = 15;
		this.color = null;
		this.defaultToTerrainElevation = false;

		this.options = {};

		if(isDefined(properties.defaultToTerrainElevation)) {
			this.defaultToTerrainElevation = properties.defaultToTerrainElevation;
		}

		if (hasValue(properties.location)) {
			assertObject(properties.location, "location");
			this.location = properties.location;
		}

		if (hasValue(properties.orientation)) {
			assertObject(properties.orientation, "orientation");
			this.orientation = properties.orientation;
		}

		if (hasValue(properties.icon)) {
			assertString(properties.icon, "icon");
			this.icon = properties.icon;
		}

		if (hasValue(properties.iconAnchor)) {
			assertArray(properties.iconAnchor, "iconAnchor");
			this.iconAnchor = properties.iconAnchor;
		}

		if (hasValue(properties.iconSize)) {
			assertArray(properties.iconSize, "iconSize");
			this.iconSize = properties.iconSize;
		}

		if (hasValue(properties.label)) {
			assertString(properties.label, "label");
			this.label = properties.label;
		}

		if (hasValue(properties.labelColor)) {
			assertString(properties.labelColor, "labelColor");
			this.labelColor = properties.labelColor;
		}

		if (hasValue(properties.labelSize)) {
			assertPositive(properties.labelSize, "labelSize");
			this.labelSize = properties.labelSize;
		}

		if (hasValue(properties.labelOffset)) {
			assertArray(properties.labelOffset, "labelOffset");
			this.labelOffset = properties.labelOffset;
		}


		if (hasValue(properties.zoomLevel)) {
			assertPositive(properties.zoomLevel, "zoomLevel");
			this.zoomLevel = properties.zoomLevel;
		}

		let that = this;
		if (this.checkFn("locationFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.location = properties.locationFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}

		if (this.checkFn("orientationFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.orientation = properties.orientationFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.orientationFunc.dataSourceIds,fn);
		}

		if (this.checkFn("iconFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.icon = properties.iconFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.iconFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.label = properties.labelFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.labelFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelColorFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.labelColor = properties.labelColorFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.labelColorFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelSizeFunc")) {
			let fn = function(rec,timeStamp,options) {
				that.labelSize = properties.labelSizeFunc.handler(rec,timeStamp,options);
			};
			this.addFn(properties.labelSizeFunc.dataSourceIds,fn);
		}

		/*if (this.checkFn("contextMenuFunction")) {
			let fn = function(rec,timeStamp,options) {
				that.contextMenuFunction = properties.contextMenuFunction.handler(rec,timeStamp,options);
			};
			this.addFn(properties.contextMenuFunction.dataSourceIds,fn);
		}*/
		if(properties.hasOwnProperty('contextMenuFunction')){
			this.contextMenuFunction  = properties.contextMenuFunction;
		}

		console.log(properties);
		if(properties.hasOwnProperty('clickFunction')){
			this.clickFunction = properties.clickFunction;
		}
	}

	init(view) {
		super.init(view);
		if (isDefined(view) && this.location !== null) {
			view.updateMarker(this,0,{});
		}
	}

	setData(dataSourceId,rec,view,options) {
		if (super.setData(dataSourceId,rec,view,options)) {
			if (isDefined(view) && this.location !== null) {
				view.updateMarker(this, rec.timeStamp, options);
				return true;
			}
		}
		return false;
	}
}

export default PointMarker;
