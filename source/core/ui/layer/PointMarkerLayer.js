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
	assertFunction, assertNumber,
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
 * import PointMarkerLayer from 'core/ui/layer/PointMarkerLayer.js';
 *
 * let pointMarkerLayer = new PointMarkerLayer({
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
class PointMarkerLayer extends Layer {
	/**
		* Create the PointMarker
		* @param {Object} properties
		* @param {Number[]} properties.location - [x,y,z]
  	* @param {Number} [properties.orientation=0] -
		* @param {String} properties.icon -
	  * @param {String} [properties.iconScale=1] - the icon scale size
	  * @param {String} [properties.iconColor="#000000"] - the icon color
		* @param {Number[]} [properties.iconAnchor=[16,16]] -
		* @param {Number[]} [properties.iconSize=[16,16]] -
		* @param {String} properties.label -
		* @param {String} [properties.labelColor="#000000"] - HTML color
		* @param {Number} [properties.labelSize=16] -
		* @param {Number[]} [properties.labelOffset=[0,0]] -
	  * @param {Number} [properties.zIndex=] - z-ordering of markers
		* @param {Function} [properties.getLocation] -
	  * @param {Function} [properties.getDescription] -
		* @param {Function} [properties.getOrientation] -
		* @param {Function} [properties.getIcon] -
	  * @param {Function} [properties.getIconColor] -
	  * @param {Function} [properties.getIconScale] -
		* @param {Function} [properties.getLabel] -
		* @param {Function} [properties.getLabelColor] -
		* @param {Function} [properties.getLabelSize] -
	  * @param {Function} [properties.getZindex] - z-ordering of markers
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
		this.type = 'marker';

		this.props.location = null;
		this.props.orientation = {heading:0};
		this.props.icon = null;
		this.props.iconAnchor = [16,16];
		this.props.iconSize = [16,16];
		this.props.iconScale = 1;
		this.props.iconColor = "#000000";
		this.props.label = null;
		this.props.labelColor = "#000000";
		this.props.labelSize = 16;
		this.props.labelOffset = [0,0];
		this.props.zoomLevel = 15;
		this.props.color = '#000000';
		this.props.defaultToTerrainElevation = false;
		this.props.zIndex = 0;
		this.props.options = {};
		this.props.markerId = 'marker';

		if(isDefined(properties.defaultToTerrainElevation)) {
			this.props.defaultToTerrainElevation = properties.defaultToTerrainElevation;
		}

		if (hasValue(properties.location)) {
			assertObject(properties.location, "location");
			this.props.location = properties.location;
		}

		if (hasValue(properties.orientation)) {
			assertObject(properties.orientation, "orientation");
			this.props.orientation = properties.orientation;
		}

		if (hasValue(properties.icon)) {
			assertString(properties.icon, "icon");
			this.props.icon = properties.icon;
		}

		if (hasValue(properties.iconAnchor)) {
			assertArray(properties.iconAnchor, "iconAnchor");
			this.props.iconAnchor = properties.iconAnchor;
		}

		if (hasValue(properties.iconSize)) {
			assertArray(properties.iconSize, "iconSize");
			this.props.iconSize = properties.iconSize;
		}

		if (hasValue(properties.iconScale)) {
			assertPositive(properties.iconScale, "iconScale");
			this.props.iconScale = properties.iconScale;
		}

		if (hasValue(properties.iconColor)) {
			assertString(properties.iconColor, "iconColor");
			this.props.iconColor = properties.iconColor;
		}

		if (hasValue(properties.label)) {
			assertString(properties.label, "label");
			this.props.label = properties.label;
		}

		if (hasValue(properties.labelColor)) {
			assertString(properties.labelColor, "labelColor");
			this.props.labelColor = properties.labelColor;
		}

		if (hasValue(properties.labelSize)) {
			assertPositive(properties.labelSize, "labelSize");
			this.props.labelSize = properties.labelSize;
		}

		if (hasValue(properties.labelOffset)) {
			assertArray(properties.labelOffset, "labelOffset");
			this.props.labelOffset = properties.labelOffset;
		}


		if (hasValue(properties.zoomLevel)) {
			assertPositive(properties.zoomLevel, "zoomLevel");
			this.props.zoomLevel = properties.zoomLevel;
		}

		if (hasValue(properties.zIndex)) {
			assertNumber(properties.zIndex, "zIndex");
			this.props.zIndex = properties.zIndex;
		}

		const that = this;

		// must be first to assign correctly the first location to the right id if it is defined
		if (this.checkFn("getMarkerId")) {
			let fn = function(rec,timeStamp,options) {
				that.props.markerId = that.getFunc('getMarkerId')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getMarkerId'),fn);
		}

		if (this.checkFn("getLocation")) {
			let fn = function(rec,timeStamp,options) {
				that.props.location = that.getFunc('getLocation')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getLocation'),fn);
		}

		if (this.checkFn("getOrientation")) {
			let fn = function(rec,timeStamp,options) {
				that.props.orientation = that.getFunc('getOrientation')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getOrientation'),fn);
		}

		if (this.checkFn("getDescription")) {
			let fn = function(rec,timeStamp,options) {
				that.props.description = that.getFunc('getDescription')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getDescription'),fn);
		}

		if (this.checkFn("getIcon")) {
			let fn = function(rec,timeStamp,options) {
				that.props.icon = that.getFunc('getIcon')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getIcon'),fn);
		}

		if (this.checkFn("getIconColor")) {
			let fn = function(rec,timeStamp,options) {
				that.props.iconColor = that.getFunc('getIconColor')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getIconColor'),fn);
		}

		if (this.checkFn("getIconScale")) {
			let fn = function(rec,timeStamp,options) {
				that.props.iconScale = that.getFunc('getIconScale')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getIconScale'),fn);
		}

		if (this.checkFn("getLabel")) {
			let fn = function(rec,timeStamp,options) {
				that.props.label = that.getFunc('getLabel')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getLabel'),fn);
		}

		if (this.checkFn("getLabelColor")) {
			let fn = function(rec,timeStamp,options) {
				that.props.labelColor = that.getFunc('getLabelColor')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getLabelColor'),fn);
		}

		if (this.checkFn("getLabelSize")) {
			let fn = function(rec,timeStamp,options) {
				that.props.labelSize = that.getFunc('getLabelSize')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getLabelSize'),fn);
		}

		if (this.checkFn("getZindex")) {
			let fn = function(rec,timeStamp,options) {
				that.props.zIndex = that.getFunc('getZindex')(rec,timeStamp,options);
			};
			this.addFn(that.getDataSourcesIdsByProperty('getZindex'),fn);
		}

		if (isDefined(properties.onLeftClick) && assertFunction(properties.onLeftClick)) {
			this.props.onLeftClick = properties.onLeftClick;
		}

		if (isDefined(properties.onRightClick) && assertFunction(properties.onRightClick)) {
			this.props.onRightClick = properties.onRightClick;
		}

		if (isDefined(properties.onHover) && assertFunction(properties.onHover)) {
			this.props.onHover = properties.onHover;
		}

		this.saveState();
	}
}

export default PointMarkerLayer;
