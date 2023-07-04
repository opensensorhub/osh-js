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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import View from "../../../../core/ui/view/View.js";
import { isDefined } from "../../../../core/utils/Utils.js";
import "../../../resources/css/noUISlider.css";
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import * as wNumb from 'wnumb';
import { EventType } from "../../../../core/event/EventType";
/**
 * @extends View
 * @example
 *
 * import RangeSliderView from 'ext/view/RangeSliderView.js';
 *
 * let rangeSlider = new RangeSliderView("rangeSlider",{
    dataSourceId: dataSource.id,
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z"
});
 */
var RangeSliderViewRealtime = /** @class */ (function (_super) {
    __extends(RangeSliderViewRealtime, _super);
    /**
        * Create the discoveryView
   * @param {Object} [properties={}] - the properties of the view
   * @param {String} properties.container - The div element to attach to
   * @param {Object[]}  [properties.layers=[]] - The initial layers to add
    * @param {String} properties.dataSource - The dataSourceObject
    * @param {Number} [properties.debounce=0] - Debounce time after updating the slider
    * @param {Boolean} properties.disabled - disabled the range slider
    * @param {Object} properties.dataSynchronizer - a data synchronizer to get current data time for this set of datasources
    * @param {Object} properties.startTimestamp - Starts the rangeSlider from this date
    */
    function RangeSliderViewRealtime(properties) {
        var _this = _super.call(this, __assign(__assign({}, properties), { supportedLayers: ['data'] })) || this;
        _this.slider = document.createElement("div");
        _this.slider.setAttribute("class", "core-rangeslider-slider");
        document.getElementById(_this.divId).appendChild(_this.slider);
        _this.update = false;
        _this.dataSourceObject = null;
        _this.debounce = 0;
        _this.options = {};
        _this.sliding = false;
        _this.startTimestamp = new Date().toISOString();
        if (isDefined(properties)) {
            if (isDefined(properties.dataSynchronizer)) {
                _this.dataSourceObject = properties.dataSynchronizer;
            }
            if (isDefined(properties.dataSource)) {
                _this.dataSourceObject = properties.dataSource;
            }
            if (isDefined(properties.debounce)) {
                _this.debounce = parseInt(properties.debounce);
            }
            if (isDefined(properties.startTimestamp)) {
                _this.startTimestamp = properties.startTimestamp;
            }
            if (isDefined(properties.options)) {
                _this.options = properties.options;
            }
            _this.slider.setAttribute('disabled', properties.disabled);
        }
        noUiSlider.create(_this.slider, __assign({ start: _this.startTimestamp /*,timestamp("2015-02-16T08:09:00Z")]*/, range: {
                min: _this.startTimestamp,
                max: _this.startTimestamp + 1000 * 60 * 60 * 2 //  2 hours
            }, 
            //step:  1000* 60* 60,
            format: wNumb({
                decimals: 0
            }), behaviour: 'drag', connect: true, animate: false, pips: {
                mode: 'positions',
                values: [5, 25, 50, 75],
                density: 1,
                //stepped: true,
                format: wNumb({
                    edit: function (value) {
                        return new Date(parseInt(value)).toISOString().replace(".000Z", "Z")
                            .split("T")[1].split("Z")[0].split(".")[0];
                    }
                })
            } }, _this.options));
        if (isDefined(_this.dataSourceObject)) {
            // listen for BC
            var bc = new BroadcastChannel(_this.dataSourceObject.getTimeTopicId());
            bc.onmessage = function (message) {
                if (!_this.update) {
                    if (message.data.type === EventType.MASTER_TIME) {
                        _this.slider.noUiSlider.set(message.data.timestamp);
                        _this.onChange(message.data.timestamp, 'data');
                    }
                }
            };
        }
        return _this;
    }
    RangeSliderViewRealtime.prototype.onChange = function (timestamp, event) { };
    RangeSliderViewRealtime.prototype.setData = function (dataSourceId, data) {
    };
    return RangeSliderViewRealtime;
}(View));
export default RangeSliderViewRealtime;
//# sourceMappingURL=RangeSliderView.realtime.js.map