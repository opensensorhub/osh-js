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
import View from "../../../../osh/ui/view/View.js";
import { isDefined } from "../../../../osh/utils/Utils.js";
import "../../../resources/css/noUISlider.css";
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import * as wNumb from 'wnumb';
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
var RangeSliderView = /** @class */ (function (_super) {
    __extends(RangeSliderView, _super);
    /**
        * Create the discoveryView
   * @param {Object} [properties={}] - the properties of the view
   * @param {String} properties.container - The div element to attach to
   * @param {Object[]}  [properties.layers=[]] - The initial layers to add
        * @param {Number} properties.startTime - The start time
        * @param {Number} properties.endTime - The end time
        * @param {String} properties.dataSource - The dataSourceObject
    * @param {Number} [properties.debounce=0] - Debounce time after updating the slider
    * @param {Boolean} properties.disabled - disabled the range slider
    * @param {Object} properties.timeSync - a data synchronizer to get current data time for this set of datasources
        */
    function RangeSliderView(properties) {
        var _this = _super.call(this, __assign(__assign({}, properties), { supportedLayers: ['data'] })) || this;
        _this.slider = document.createElement("div");
        _this.slider.setAttribute("class", "core-rangeslider-slider");
        document.getElementById(_this.divId).appendChild(_this.slider);
        var startTime = new Date().getTime();
        _this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
        _this.update = false;
        _this.dataSourceObject = null;
        _this.debounce = 0;
        _this.options = {};
        _this.sliding = false;
        if (isDefined(properties)) {
            if (isDefined(properties.startTime)) {
                startTime = new Date(properties.startTime).getTime();
            }
            if (isDefined(properties.endTime)) {
                _this.endTime = new Date(properties.endTime).getTime();
            }
            if (isDefined(properties.timeSync)) {
                _this.dataSourceObject = properties.timeSync;
            }
            if (isDefined(properties.dataSource)) {
                _this.dataSourceObject = properties.dataSource;
            }
            if (isDefined(properties.debounce)) {
                _this.debounce = parseInt(properties.debounce);
            }
            if (isDefined(properties.options)) {
                _this.options = properties.options;
            }
            if (isDefined(properties.disabled)) {
                _this.slider.setAttribute('disabled', properties.disabled);
            }
        }
        noUiSlider.create(_this.slider, __assign({ start: [startTime, _this.endTime] /*,timestamp("2015-02-16T08:09:00Z")]*/, range: {
                min: startTime,
                max: _this.endTime
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
        _this.createEvents();
        if (isDefined(_this.dataSourceObject)) {
            // listen for BC
            var bc = new BroadcastChannel(_this.dataSourceObject.getTimeTopicId());
            bc.onmessage = function (message) {
                if (!_this.update) {
                    _this.slider.noUiSlider.set([message.data.timestamp]);
                    _this.onChange(message.data.timestamp, parseInt(_this.slider.noUiSlider.get()[1]), 'data');
                }
            };
        }
        return _this;
    }
    RangeSliderView.prototype.createActivateButton = function () {
        var activateButtonDiv = document.createElement("div");
        var aTagActivateButton = document.createElement("a");
        activateButtonDiv.appendChild(aTagActivateButton);
        activateButtonDiv.setAttribute("class", "core-rangeslider-control");
        var self = this;
        activateButtonDiv.addEventListener("click", function (event) {
            if (activateButtonDiv.className.indexOf("core-rangeslider-control-select") > -1) {
                activateButtonDiv.setAttribute("class", "core-rangeslider-control");
                self.deactivate();
            }
            else {
                activateButtonDiv.setAttribute("class", "core-rangeslider-control-select");
                self.activate();
            }
        });
        document.getElementById(this.divId).appendChild(activateButtonDiv);
    };
    RangeSliderView.prototype.createEvents = function () {
        var that = this;
        //noUi-handle noUi-handle-lower
        // start->update->end
        this.slider.noUiSlider.on("start", function (values, handle) {
            that.update = true;
            that.sliding = true;
            var st = parseInt(values[0]);
            var end = parseInt(values[1]) || parseInt(that.endTime);
            that.onChange(st, end, 'start');
        });
        this.slider.noUiSlider.on("slide", function (values, handle) {
            that.sliding = true;
            that.update = true;
            var st = parseInt(values[0]);
            var end = parseInt(values[1]) || parseInt(that.endTime);
            that.onChange(st, end, 'slide');
        });
        this.slider.noUiSlider.on("end", function (values, handle) {
            if (that.sliding) {
                that.sliding = false;
                var st = parseInt(values[0]);
                var end = parseInt(values[1]) || parseInt(that.endTime);
                that.onChange(st, end, 'end');
                // that.update = false;
                setTimeout(function () { return that.update = false; }, that.debounce);
            }
        });
    };
    /**
     * Deactivate the timeline bar
     */
    RangeSliderView.prototype.deactivate = function () {
        this.slider.setAttribute('disabled', true);
    };
    /**
     * Activate the timeline nar
     */
    RangeSliderView.prototype.activate = function () {
        this.slider.removeAttribute('disabled');
    };
    RangeSliderView.prototype.setData = function (dataSourceId, data) {
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            if (!this.update) {
                this.slider.noUiSlider.set([values[i].timeStamp]);
            }
        }
    };
    RangeSliderView.prototype.setStartTime = function (timestamp) {
        if (!this.update) {
            this.slider.noUiSlider.set([timestamp]);
        }
    };
    RangeSliderView.prototype.setTime = function (startTimestamp, endTimestamp) {
        if (!this.update) {
            this.slider.noUiSlider.set([startTimestamp, endTimestamp]);
        }
    };
    RangeSliderView.prototype.onChange = function (startTime, endTime, type) {
        if (type === 'end') {
            this.dataSourceObject.setTimeRange(new Date(startTime).toISOString(), new Date(endTime).toISOString(), this.dataSourceObject.properties.replaySpeed, true);
        }
    };
    return RangeSliderView;
}(View));
export default RangeSliderView;
//# sourceMappingURL=RangeSliderView.js.map
