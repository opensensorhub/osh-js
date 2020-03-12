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
 * @class OSH.UI.Styler.PointMarker
 * @type {OSH.UI.Styler}
 * @augments OSH.UI.Styler
 * @example
 * var pointMarker = new OSH.UI.Styler.PointMarker({
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
OSH.UI.Styler.PointMarker = OSH.UI.Styler.extend({
	initialize : function(properties) {
		this._super(properties);
		this.properties = properties;
		this.location = null;
		this.orientation = {heading:0};
		this.icon = null;
		this.iconAnchor = [16,16];
		this.label = null;
		this.labelColor = "#000000";
		this.labelSize = 16;
		this.labelOffset = [0,0];

		this.color = "#000000";
		this.defaultToTerrainElevation = false;

		this.options = {};

		if(typeof(properties.defaultToTerrainElevation) != "undefined") {
			this.defaultToTerrainElevation = properties.defaultToTerrainElevation;
		}

		if (OSH.Utils.hasValue(properties.location)) {
			OSH.Utils.assertObject(properties.location, "location");
			this.location = properties.location;
		}

		if (OSH.Utils.hasValue(properties.orientation)) {
			OSH.Utils.assertObject(properties.orientation, "orientation");
			this.orientation = properties.orientation;
		}

		if (OSH.Utils.hasValue(properties.icon)) {
			OSH.Utils.assertString(properties.icon, "icon");
			this.icon = properties.icon;
		}

		if (OSH.Utils.hasValue(properties.iconAnchor)) {
			OSH.Utils.assertArray(properties.iconAnchor, "iconAnchor");
			this.iconAnchor = properties.iconAnchor;
		}

		if (OSH.Utils.hasValue(properties.label)) {
			OSH.Utils.assertString(properties.label, "label");
			this.label = properties.label;
		}

		if (OSH.Utils.hasValue(properties.labelColor)) {
			OSH.Utils.assertString(properties.labelColor, "labelColor");
			this.labelColor = properties.labelColor;
		}

		if (OSH.Utils.hasValue(properties.labelSize)) {
			OSH.Utils.assertPositive(properties.labelSize, "labelSize");
			this.labelSize = properties.labelSize;
		}

		if (OSH.Utils.hasValue(properties.labelOffset)) {
			OSH.Utils.assertArray(properties.labelOffset, "labelOffset");
			this.labelOffset = properties.labelOffset;
		}

		if (this.checkFn("locationFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.location = properties.locationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.locationFunc.dataSourceIds,fn);
		}

		if (this.checkFn("orientationFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.orientation = properties.orientationFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.orientationFunc.dataSourceIds,fn);
		}

		if (this.checkFn("iconFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.icon = properties.iconFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.iconFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.label = properties.labelFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.labelFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelColorFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.labelColor = properties.labelColorFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.labelColorFunc.dataSourceIds,fn);
		}

		if (this.checkFn("labelSizeFunc")) {
			var fn = function(rec,timeStamp,options) {
				this.labelSize = properties.labelSizeFunc.handler(rec,timeStamp,options);
			}.bind(this);
			this.addFn(properties.labelSizeFunc.dataSourceIds,fn);
		}
	},

	/**
	 *
	 * @param $super
	 * @param view
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	init: function(view) {
		this._super(view);
		if (OSH.Utils.isDefined(view) && this.location != null) {
			view.updateMarker(this,0,{});
		}
	},

	/**
	 *
	 * @param $super
	 * @param dataSourceId
	 * @param rec
	 * @param view
	 * @param options
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	setData: function(dataSourceId,rec,view,options) {
		if (this._super(dataSourceId,rec,view,options)) {
			if (OSH.Utils.isDefined(view) && this.location != null) {
				view.updateMarker(this, rec.timeStamp, options);
			}
		}
	},

	/**
	 *
	 * @param $super
	 * @memberof OSH.UI.Styler.PointMarker
	 * @instance
	 */
	clear:function($super){
	}

});
