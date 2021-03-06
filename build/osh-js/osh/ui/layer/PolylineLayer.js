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
var PolylineLayer = /** @class */ (function (_super) {
    __extends(PolylineLayer, _super);
    /**
        * Creates the PolylineLayer
        * @param {Object} properties
        * @param {Object[]} [properties.locations] - defines the default location of the polyline [lat, lon]
        * @param {Number} [properties.weight=1] - defines the weight of the polyline
      * @param {String} [properties.color='red'] - defines the color of the polyline
        * @param {Number} [properties.opacity=1] - defines the opacity of the polyline
        * @param {Number} [properties.smoothFactor=1] - defines the smoothFactor of the polyline
        * @param {Number} [properties.maxPoints=10] - defines a number max of points
      * @param {Boolean} [properties.clampToGround=false] - defines if the line has to be clamped to ground
        * @param {Function} [properties.getLocation] - defines a function to return the location
        * @param {Function} [properties.getColor] - defines a function to return the color
        * @param {Function} [properties.getWeight] - defines a function to return the weight
        * @param {Function} [properties.getOpacity] - defines a function to return the opacity
        * @param {Function} [properties.getSmoothFactor] - defines a function to return the smoothFactor
      * @param {Function} [properties.getPolylineId] - map an id to a unique polyline
        */
    function PolylineLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'polyline';
        _this.properties = properties;
        _this.props.locations = {};
        _this.props.color = 'red';
        _this.props.weight = 1;
        _this.props.opacity = 1;
        _this.props.smoothFactor = 1;
        _this.props.maxPoints = 10;
        _this.props.polylineId = 'polyline';
        _this.props.clampToGround = false;
        if (isDefined(properties.color)) {
            _this.props.color = properties.color;
        }
        if (isDefined(properties.weight)) {
            _this.props.weight = properties.weight;
        }
        if (isDefined(properties.opacity)) {
            _this.props.opacity = properties.opacity;
        }
        if (isDefined(properties.smoothFactor)) {
            _this.props.smoothFactor = properties.smoothFactor;
        }
        if (isDefined(properties.maxPoints)) {
            _this.props.maxPoints = properties.maxPoints;
        }
        if (isDefined(properties.clampToGround)) {
            _this.props.clampToGround = properties.clampToGround;
        }
        var that = _this;
        // must be first to assign correctly the first location to the right id if it is defined
        if (isDefined(properties.getPolylineId)) {
            var fn = function (rec) {
                that.props.polylineId = that.getFunc('getPolylineId')(rec);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getPolylineId'), fn);
        }
        if (isDefined(properties.getLocation)) {
            var fn = function (rec) {
                var loc = that.getFunc('getLocation')(rec);
                if (!(that.props.polylineId in that.props.locations)) {
                    that.props.locations[that.props.polylineId] = [];
                }
                that.props.locations[that.props.polylineId].push(loc);
                if (that.props.locations[that.props.polylineId].length > that.props.maxPoints) {
                    that.props.locations[that.props.polylineId].shift();
                }
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getLocation'), fn);
        }
        if (isDefined(properties.getColor)) {
            var fn = function (rec) {
                that.props.color = that.getFunc('getColor')(rec);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getColor'), fn);
        }
        if (isDefined(properties.getWeight)) {
            var fn = function (rec) {
                that.props.weight = that.getFunc('getWeight')(rec);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getWeight'), fn);
        }
        if (isDefined(properties.getOpacity)) {
            var fn = function (rec) {
                that.props.opacity = that.getFunc('getOpacity')(rec);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getOpacity'), fn);
        }
        if (isDefined(properties.getSmoothFactor)) {
            var fn = function (rec) {
                that.props.smoothFactor = that.getFunc('getSmoothFactor')(rec);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getSmoothFactor'), fn);
        }
        _this.saveState();
        return _this;
    }
    PolylineLayer.prototype.clear = function () {
        this.props.locations[this.props.polylineId] = [];
    };
    return PolylineLayer;
}(Layer));
export default PolylineLayer;
//# sourceMappingURL=PolylineLayer.js.map
