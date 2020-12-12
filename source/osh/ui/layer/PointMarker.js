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

import {
	assertArray,
	assertFunction,
	assertObject,
	assertPositive,
	assertString,
	hasValue,
	isDefined
} from "../../utils/Utils.js";
import Layer from "./Layer.js";

/**
 * @extends Layer
 * @example
 *
 * import PointMarker from 'osh/ui/layer/PointMarker.js';
 *
 * let pointMarker = new PointMarker({
        location : {
            x : 1.42376557,
            y : 43.61758626,
            z : 100
        },
        getLocation : {
            dataSourceIds : [androidPhoneGpsDataSource.getId()],
            handler : function(rec) {
                return {
                    x : rec.lon,
                    y : rec.lat,
                    z : rec.alt
                };
            }
        },
        getOrientation : {
            dataSourceIds : [androidPhoneOrientationDataSource.getId()],
            handler : function(rec) {
                return {
                    heading : rec.heading
                };
            }
        },
        icon : 'images/cameralook.png',
        getIcon : {
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
class PointMarker extends Layer {
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
		* @param {Function} [properties.getLocation] -
		* @param {Function} [properties.getOrientation] -
		* @param {Function} [properties.getIcon] -
		* @param {Function} [properties.getLabel] -
		* @param {Function} [properties.getLabelColor] -
		* @param {Function} [properties.getLabelSize] -
	  * @param {Function} [properties.onLeftClick] - trigger onLeftClick marker event
	  * @param {Function} [properties.onRightClick] - trigger onRightClick marker event
	  * @param {Function} [properties.onHover] - trigger onHover marker event
	  * @param {Function} [properties.getMarkerId] - map an id to a unique marker
	 	* @param {Number} [properties.zoomLevel=15] - Set the default zoom level
	  * @param {Boolean} [properties.defaultToTerrainElevation=false] - Set the default to terrain elevation
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
		this.markerId = 'marker';

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

		// must be first to assign correctly the first location to the right id if it is defined
		if (this.checkFn("getMarkerId")) {
			let fn = function(rec,timeStamp,options) {
				that.markerId = properties.getMarkerId.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getMarkerId.dataSourceIds,fn);
		}

		if (this.checkFn("getLocation")) {
			let fn = function(rec,timeStamp,options) {
				that.location = properties.getLocation.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getLocation.dataSourceIds,fn);
		}

		if (this.checkFn("getOrientation")) {
			let fn = function(rec,timeStamp,options) {
				that.orientation = properties.getOrientation.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getOrientation.dataSourceIds,fn);
		}

		if (this.checkFn("getIcon")) {
			let fn = function(rec,timeStamp,options) {
				that.icon = properties.getIcon.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getIcon.dataSourceIds,fn);
		}

		if (this.checkFn("getLabel")) {
			let fn = function(rec,timeStamp,options) {
				that.label = properties.getLabel.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getLabel.dataSourceIds,fn);
		}

		if (this.checkFn("getLabelColor")) {
			let fn = function(rec,timeStamp,options) {
				that.labelColor = properties.getLabelColor.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getLabelColor.dataSourceIds,fn);
		}

		if (this.checkFn("getLabelSize")) {
			let fn = function(rec,timeStamp,options) {
				that.labelSize = properties.getLabelSize.handler(rec,timeStamp,options);
			};
			this.addFn(properties.getLabelSize.dataSourceIds,fn);
		}

		if (isDefined(properties.onLeftClick) && assertFunction(properties.onLeftClick)) {
			this.onLeftClick = properties.onLeftClick;
		}

		if (isDefined(properties.onRightClick) && assertFunction(properties.onRightClick)) {
			this.onRightClick = properties.onRightClick;
		}

		if (isDefined(properties.onHover) && assertFunction(properties.onHover)) {
			this.onHover = properties.onHover;
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
