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
import { isDefined, randomUUID } from "../../utils/Utils.js";
/**
 * @extends Layer
 */
var CurveLayer = /** @class */ (function (_super) {
    __extends(CurveLayer, _super);
    /**
     * Create the CurveLayer
     * @param {Object} properties -
     * @param {String} [properties.xLabel=""] -
     * @param {String} [properties.yLabel=""] -
     * @param {String} [properties.color="#000000"] - color in hex or rgba value
     * @param {Number} [properties.stroke=1] -
     * @param {Number} [properties.x=0] -
     * @param {Number} [properties.y=[]] -
     * @param {Function} properties.getStroke -
     * @param {Function} properties.getColor -
     * @param {Function} properties.getValues -
     *
     */
    function CurveLayer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'curve';
        _this.props.xLabel = "";
        _this.props.yLabel = "";
        _this.props.color = "#399ca5";
        _this.props.stroke = 1;
        _this.props.curveId = randomUUID();
        _this.props.x = 0;
        _this.props.y = 0;
        if (isDefined(properties.stroke)) {
            _this.props.stroke = properties.stroke;
        }
        if (isDefined(properties.color)) {
            _this.props.color = properties.color;
        }
        if (isDefined(properties.x)) {
            _this.props.x = properties.x;
        }
        if (isDefined(properties.y)) {
            _this.props.y = properties.y;
        }
        var that = _this;
        if (isDefined(properties.getStroke)) {
            var fn = function (rec, timeStamp, options) {
                that.props.stroke = that.getFunc('getStroke')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getStroke'), fn);
        }
        if (isDefined(properties.getColor)) {
            var fn = function (rec, timeStamp, options) {
                that.props.color = that.getFunc('getColor')(rec, timeStamp, options);
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getColor'), fn);
        }
        if (isDefined(properties.getValues)) {
            var fn = function (rec, timeStamp, options) {
                var value = that.getFunc('getValues')(rec, timeStamp, options);
                that.props.x = value.x;
                that.props.y = value.y;
            };
            _this.addFn(that.getDataSourcesIdsByProperty('getValues'), fn);
        }
        _this.saveState();
        return _this;
    }
    return CurveLayer;
}(Layer));
export default CurveLayer;
//# sourceMappingURL=CurveLayer.js.map