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

import View from "../../../../core/ui/view/View.js";
import {isDefined, randomUUID} from "../../../../core/utils/Utils.js";
import "../../../resources/css/tasking.css";

export const htmlTaskingComponent=`
        <div class=\"ptz-zoom\">
           <div class=\"ptz-zoom-in\"><i class=\"fa fa-plus-circle\" aria-hidden=\"true\"></i></div>
           <div class=\"ptz-zoom-bar\"></div>
           <div class=\"ptz-zoom-out\"><i class=\"fa fa-minus-circle\" aria-hidden=\"true\"></i></div>
        <\/div>
        <div class=\"ptz\">
           <div tag=\"0\" class='moveUp' name=\"\"><\/div>
           <div tag=\"91\" class='moveTopLeft' name=\"\"><\/div>
           <div tag=\"90\" class=\"moveTopRight\" name=\"\"><\/div>
           <div tag=\"6\" class=\"moveLeft\" name=\"\"><\/div>
           <div cmd=\"ptzReset\" class=\"reset\" title=\"Center\" name=\"\"><\/div>
           <div tag=\"4\" class=\"moveRight\" name=\"\"><\/div>
           <div tag=\"93\" class=\"moveBottomLeft\" name=\"\"><\/div>
           <div tag=\"92\" class=\"moveBottomRight\" name=\"\"><\/div>
           <div tag=\"2\" class=\"moveDown\" name=\"\"><\/div>
        <\/div>
        <div class=\"ptz-right\">
            <ul>
                        <li>
                            <label>Presets:<\/label>
                            <div class=\"ptz-select-style\">
                                 <select class=\"ptz-presets\" required pattern=\"^(?!Select a Preset).*\">
                                     <option value=\"\" disabled selected>Select a Preset<\/option>
                                 <\/select>
                            <\/div>
                        <\/li>
            </ul>
        <\/div>`;

/**
 * This class is in charge of creating the Ptz tasking View.
 * @extends View
 */
class PtzTaskingView extends View {
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
    constructor(divId, options) {
        super(divId, [], options);
        let width = "640";
        let height = "480";
        this.css = "tasking";

        this.cssSelected = "";

        if (isDefined(options)) {
            if (isDefined(options.width)) {
                width = options.width;
            }

            if (isDefined(options.height)) {
                height = options.height;
            }

            if (isDefined(options.css)) {
                this.css += options.css;
            }

            if (isDefined(options.cssSelected)) {
                this.cssSelected = options.cssSelected;
            }

            if (isDefined(options.dataSenderId)) {
                this.dataSenderId = options.dataSenderId;
            }
        }

        // creates video tag element
        this.rootTag = document.createElement("div");
        this.rootTag.setAttribute("height", height);
        this.rootTag.setAttribute("width", width);
        this.rootTag.setAttribute("class", this.css);
        this.rootTag.setAttribute("id", "dataview-" + randomUUID());

        // appends <img> tag to <div>
        document.getElementById(this.divId).appendChild(this.rootTag);

        this.rootTag.innerHTML = htmlTaskingComponent;

        this.pan = 0;
        this.tilt = 0;
        this.zoom = 0;

        let increment = 5;

        this.observers = [];

        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveUp").onclick = function () {
            this.onTiltClick(increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveTopLeft").onclick = function () {
            this.onTiltPanClick(-1 * increment, increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveTopRight").onclick = function () {
            this.onTiltPanClick(increment, increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveRight").onclick = function () {
            this.onPanClick(increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveLeft").onclick = function () {
            this.onPanClick(-1 * increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveDown").onclick = function () {
            this.onTiltClick(-1 * increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveBottomLeft").onclick = function () {
            this.onTiltPanClick(-1 * increment, -1 * increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz > .moveBottomRight").onclick = function () {
            this.onTiltPanClick(increment, -1 * increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-in").onclick = function () {
            this.onZoomClick(increment)
        }.bind(this);
        document.querySelector('#' + this.rootTag.id + " >  .ptz-zoom > .ptz-zoom-out").onclick = function () {
            this.onZoomClick(-1 * increment)
        }.bind(this);

        // add presets if any
        if (isDefined(options) && (isDefined(options.presets))) {
            this.addPresets(options.presets);

            // add listeners
            document.querySelector('#' + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets").onchange = this.onSelectedPresets.bind(this);
        }
    }

    /**
     * @private
     * @param presets array
     */
    addPresets(presetsArr) {
        let selectTag = document.querySelector('#' + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets");
        for (let i in presetsArr) {
            let option = document.createElement("option");
            option.text = presetsArr[i];
            option.value = presetsArr[i];
            selectTag.add(option);
        }
    }

    /**
     *
     * @param {Object} event - HTML event
     * @event
     */
    onSelectedPresets(event) {
        let serverTag = document.querySelector('#' + this.rootTag.id + "  .ptz-right  .ptz-select-style  .ptz-presets");
        let option = serverTag.options[serverTag.selectedIndex];
        this.onChange(null, null, null, option.value);
    }

    /**
     * @private
     * @param interval
     */
    removeInterval(interval) {
        if (this.timerIds.length > 0) {
            setTimeout(clearInterval(this.timerIds.pop()), interval + 50);
        }
    }

    /**
     * Changes the value on click
     * @private
     * @event
     * @param {Number} value - the new tilt value
     */
    onTiltClick(value) {
        this.tilt += value;
        this.onChange(null, value, null, null);
    }

    /**
     * @private
     * @param  {Number} tiltValue - the titl value
     * @param  {Number} panValue -  the panValue value
     * @event
     */
    onTiltPanClick(tiltValue, panValue) {
        this.tilt += tiltValue;
        this.pan += panValue;

        this.onChange(tiltValue, panValue, null, null);
    }

    /**
     *
     * @private
     * @param value
     */
    onPanClick(value) {
        this.pan += value;
        this.onChange(value, null, null, null);
    }

    /**
     * @private
     * @param value
     */
    onZoomClick(value) {
        this.zoom += value;
        this.onChange(null, null, value, null);
    }

    /**
     * Event caught after clicking onto control buttons.
     * @event
     * @param {Number} rpan -
     * @param {Number} rtilt -
     * @param {Number} rzoom -
     */
    onChange(rpan, rtilt, rzoom, preset) {}

}

export default PtzTaskingView;
