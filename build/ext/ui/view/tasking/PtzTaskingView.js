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
import View from "../../../../core/ui/view/View.js";
import { isDefined, randomUUID } from "../../../../core/utils/Utils.js";
import "../../../resources/css/tasking.css";
export var htmlTaskingComponent = "\n        <div class=\"ptz-zoom\">\n           <div class=\"ptz-zoom-in\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></div>\n           <div class=\"ptz-zoom-bar\"></div>\n           <div class=\"ptz-zoom-out\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></div>\n        </div>\n        <div class=\"ptz\">\n           <div tag=\"0\" class='moveUp' name=\"\"></div>\n           <div tag=\"91\" class='moveTopLeft' name=\"\"></div>\n           <div tag=\"90\" class=\"moveTopRight\" name=\"\"></div>\n           <div tag=\"6\" class=\"moveLeft\" name=\"\"></div>\n           <div cmd=\"ptzReset\" class=\"reset\" title=\"Center\" name=\"\"></div>\n           <div tag=\"4\" class=\"moveRight\" name=\"\"></div>\n           <div tag=\"93\" class=\"moveBottomLeft\" name=\"\"></div>\n           <div tag=\"92\" class=\"moveBottomRight\" name=\"\"></div>\n           <div tag=\"2\" class=\"moveDown\" name=\"\"></div>\n        </div>\n        <div class=\"ptz-right\">\n            <ul>\n                        <li>\n                            <label>Presets:</label>\n                            <div class=\"ptz-select-style\">\n                                 <select class=\"ptz-presets\" required pattern=\"^(?!Select a Preset).*\">\n                                     <option value=\"\" disabled selected>Select a Preset</option>\n                                 </select>\n                            </div>\n                        </li>\n            </ul>\n        </div>";
/**
 * This class is in charge of creating the Ptz tasking View.
 * @extends View
 */
var PtzTaskingView = /** @class */ (function (_super) {
    __extends(PtzTaskingView, _super);
    /**
     *
     * @param {String} divId -
     * @param {Object} options -
     * @param {String} [options.width="640"] -
     * @param {String} [options.height="480"] -
     * @param {String} [options.css='tasking'] -
     * @param {String} options.cssSelected - the css to apply when selected
     * @param {String} options.dataSenderId -
     */
    function PtzTaskingView(divId, options) {
        var _this = _super.call(this, divId, [], options) || this;
        var width = "640";
        var height = "480";
        _this.css = "tasking";
        _this.cssSelected = "";
        if (isDefined(options)) {
            if (isDefined(options.width)) {
                width = options.width;
            }
            if (isDefined(options.height)) {
                height = options.height;
            }
            if (isDefined(options.css)) {
                _this.css += options.css;
            }
            if (isDefined(options.cssSelected)) {
                _this.cssSelected = options.cssSelected;
            }
            if (isDefined(options.dataSenderId)) {
                _this.dataSenderId = options.dataSenderId;
            }
        }
        // creates video tag element
        _this.rootTag = document.createElement("div");
        _this.rootTag.setAttribute("height", height);
        _this.rootTag.setAttribute("width", width);
        _this.rootTag.setAttribute("class", _this.css);
        _this.rootTag.setAttribute("id", "dataview-" + randomUUID());
        // appends <img> tag to <div>
        document.getElementById(_this.divId).appendChild(_this.rootTag);
        _this.rootTag.innerHTML = htmlTaskingComponent;
        _this.pan = 0;
        _this.tilt = 0;
        _this.zoom = 0;
        var increment = 5;
        _this.observers = [];
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveUp").onclick = function () {
            this.onTiltClick(increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveTopLeft").onclick = function () {
            this.onTiltPanClick(-1 * increment, increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveTopRight").onclick = function () {
            this.onTiltPanClick(increment, increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveRight").onclick = function () {
            this.onPanClick(increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveLeft").onclick = function () {
            this.onPanClick(-1 * increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveDown").onclick = function () {
            this.onTiltClick(-1 * increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveBottomLeft").onclick = function () {
            this.onTiltPanClick(-1 * increment, -1 * increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz > .moveBottomRight").onclick = function () {
            this.onTiltPanClick(increment, -1 * increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-in").onclick = function () {
            this.onZoomClick(increment);
        }.bind(_this);
        document.querySelector('#' + _this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-out").onclick = function () {
            this.onZoomClick(-1 * increment);
        }.bind(_this);
        // add presets if any
        if (isDefined(options) && (isDefined(options.presets))) {
            _this.addPresets(options.presets);
            // add listeners
            document.querySelector('#' + _this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets").onchange = _this.onSelectedPresets.bind(_this);
        }
        return _this;
    }
    /**
     * @private
     * @param presets array
     */
    PtzTaskingView.prototype.addPresets = function (presetsArr) {
        var selectTag = document.querySelector('#' + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets");
        for (var i in presetsArr) {
            var option = document.createElement("option");
            option.text = presetsArr[i];
            option.value = presetsArr[i];
            selectTag.add(option);
        }
    };
    /**
     *
     * @param {Object} event - HTML event
     * @event
     */
    PtzTaskingView.prototype.onSelectedPresets = function (event) {
        var serverTag = document.querySelector('#' + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets");
        var option = serverTag.options[serverTag.selectedIndex];
        this.onChange(null, null, null, option.value);
    };
    /**
     * @private
     * @param interval
     */
    PtzTaskingView.prototype.removeInterval = function (interval) {
        if (this.timerIds.length > 0) {
            setTimeout(clearInterval(this.timerIds.pop()), interval + 50);
        }
    };
    /**
     * Changes the value on click
     * @private
     * @event
     * @param {Number} value - the new tilt value
     */
    PtzTaskingView.prototype.onTiltClick = function (value) {
        this.tilt += value;
        this.onChange(null, value, null, null);
    };
    /**
     * @private
     * @param  {Number} tiltValue - the titl value
     * @param  {Number} panValue -  the panValue value
     * @event
     */
    PtzTaskingView.prototype.onTiltPanClick = function (tiltValue, panValue) {
        this.tilt += tiltValue;
        this.pan += panValue;
        this.onChange(tiltValue, panValue, null, null);
    };
    /**
     *
     * @private
     * @param value
     */
    PtzTaskingView.prototype.onPanClick = function (value) {
        this.pan += value;
        this.onChange(value, null, null, null);
    };
    /**
     * @private
     * @param value
     */
    PtzTaskingView.prototype.onZoomClick = function (value) {
        this.zoom += value;
        this.onChange(null, null, value, null);
    };
    /**
     * Event caught after clicking onto control buttons.
     * @event
     * @param {Number} rpan -
     * @param {Number} rtilt -
     * @param {Number} rzoom -
     */
    PtzTaskingView.prototype.onChange = function (rpan, rtilt, rzoom, preset) { };
    return PtzTaskingView;
}(View));
export default PtzTaskingView;
//# sourceMappingURL=PtzTaskingView.js.map