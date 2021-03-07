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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { assertArray, assertFunction, assertObject, assertPositive, assertString, hasValue, isDefined } from "../../utils/Utils.js";
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
var PointMarkerLayer = /** @class */ (function (_super) {
    __extends(PointMarkerLayer, _super);
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
        * @param {Function} [properties.getLocation] -
      * @param {Function} [properties.getDescription] -
        * @param {Function} [properties.getOrientation] -
        * @param {Function} [properties.getIcon] -
      * @param {Function} [properties.getIconColor] -
      * @param {Function} [properties.getIconScale] -
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
    function PointMarkerLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'marker';
        _this.props.location = null;
        _this.props.orientation = { heading: 0 };
        _this.props.icon = null;
        _this.props.iconAnchor = [16, 16];
        _this.props.iconSize = [16, 16];
        _this.props.iconScale = 10;
        _this.props.iconColor = "#000000";
        _this.props.label = null;
        _this.props.labelColor = "#000000";
        _this.props.labelSize = 16;
        _this.props.labelOffset = [0, 0];
        _this.props.zoomLevel = 15;
        _this.props.color = '#000000';
        _this.props.defaultToTerrainElevation = false;
        _this.props.options = {};
        _this.props.markerId = 'marker';
        if (isDefined(properties.defaultToTerrainElevation)) {
            _this.props.defaultToTerrainElevation = properties.defaultToTerrainElevation;
        }
        if (hasValue(properties.location)) {
            assertObject(properties.location, "location");
            _this.props.location = properties.location;
        }
        if (hasValue(properties.orientation)) {
            assertObject(properties.orientation, "orientation");
            _this.props.orientation = properties.orientation;
        }
        if (hasValue(properties.icon)) {
            assertString(properties.icon, "icon");
            _this.props.icon = properties.icon;
        }
        if (hasValue(properties.iconAnchor)) {
            assertArray(properties.iconAnchor, "iconAnchor");
            _this.props.iconAnchor = properties.iconAnchor;
        }
        if (hasValue(properties.iconSize)) {
            assertArray(properties.iconSize, "iconSize");
            _this.props.iconSize = properties.iconSize;
        }
        if (hasValue(properties.iconScale)) {
            assertPositive(properties.iconScale, "iconScale");
            _this.props.iconScale = properties.iconScale;
        }
        if (hasValue(properties.iconColor)) {
            assertString(properties.iconColor, "iconColor");
            _this.props.iconColor = properties.iconColor;
        }
        if (hasValue(properties.label)) {
            assertString(properties.label, "label");
            _this.props.label = properties.label;
        }
        if (hasValue(properties.labelColor)) {
            assertString(properties.labelColor, "labelColor");
            _this.props.labelColor = properties.labelColor;
        }
        if (hasValue(properties.labelSize)) {
            assertPositive(properties.labelSize, "labelSize");
            _this.props.labelSize = properties.labelSize;
        }
        if (hasValue(properties.labelOffset)) {
            assertArray(properties.labelOffset, "labelOffset");
            _this.props.labelOffset = properties.labelOffset;
        }
        if (hasValue(properties.zoomLevel)) {
            assertPositive(properties.zoomLevel, "zoomLevel");
            _this.props.zoomLevel = properties.zoomLevel;
        }
        var that = _this;
        // must be first to assign correctly the first location to the right id if it is defined
        if (_this.checkFn("getMarkerId")) {
            var fn = function (rec, timeStamp, options) {
                that.props.markerId = that.getFunc('getMarkerId')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getMarkerId'), fn);
        }
        if (_this.checkFn("getLocation")) {
            var fn = function (rec, timeStamp, options) {
                that.props.location = that.getFunc('getLocation')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getLocation'), fn);
        }
        if (_this.checkFn("getOrientation")) {
            var fn = function (rec, timeStamp, options) {
                that.props.orientation = that.getFunc('getOrientation')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getOrientation'), fn);
        }
        if (_this.checkFn("getDescription")) {
            var fn = function (rec, timeStamp, options) {
                that.props.description = that.getFunc('getDescription')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getDescription'), fn);
        }
        if (_this.checkFn("getIcon")) {
            var fn = function (rec, timeStamp, options) {
                that.props.icon = that.getFunc('getIcon')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getIcon'), fn);
        }
        if (_this.checkFn("getIconColor")) {
            var fn = function (rec, timeStamp, options) {
                that.props.iconColor = that.getFunc('getIconColor')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getIconColor'), fn);
        }
        if (_this.checkFn("getIconScale")) {
            var fn = function (rec, timeStamp, options) {
                that.props.iconScale = that.getFunc('getIconScale')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getIconScale'), fn);
        }
        if (_this.checkFn("getLabel")) {
            var fn = function (rec, timeStamp, options) {
                that.props.label = that.getFunc('getLabel')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getLabel'), fn);
        }
        if (_this.checkFn("getLabelColor")) {
            var fn = function (rec, timeStamp, options) {
                that.props.labelColor = that.getFunc('getLabelColor')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getLabelColor'), fn);
        }
        if (_this.checkFn("getLabelSize")) {
            var fn = function (rec, timeStamp, options) {
                that.props.labelSize = that.getFunc('getLabelSize')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getLabelSize'), fn);
        }
        if (isDefined(properties.onLeftClick) && assertFunction(properties.onLeftClick)) {
            _this.props.onLeftClick = properties.onLeftClick;
        }
        if (isDefined(properties.onRightClick) && assertFunction(properties.onRightClick)) {
            _this.props.onRightClick = properties.onRightClick;
        }
        if (isDefined(properties.onHover) && assertFunction(properties.onHover)) {
            _this.props.onHover = properties.onHover;
        }
        _this.saveState();
        return _this;
    }
    return PointMarkerLayer;
}(Layer));
export default PointMarkerLayer;
//# sourceMappingURL=PointMarkerLayer.js.map
