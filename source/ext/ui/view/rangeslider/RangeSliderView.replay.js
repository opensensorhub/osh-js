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
import {isDefined} from "../../../../core/utils/Utils.js";
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
class RangeSliderViewReplay extends View {
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
    * @param {Object} properties.dataSynchronizer - a data synchronizer to get current data time for this set of datasources
    */
  constructor(properties) {
    super({
      ...properties,
      supportedLayers: ['data']
    });

    this.slider = document.createElement("div");
    this.slider.setAttribute("class", "core-rangeslider-slider");
    document.getElementById(this.divId).appendChild(this.slider);

    let startTime = new Date().getTime();
    this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055

    this.update = false;
    this.dataSourceObject = null;
    this.debounce = 0;
    this.options = {};
    this.sliding = false;

    if (isDefined(properties)) {
      if (isDefined(properties.startTime)) {
        startTime = new Date(properties.startTime).getTime();
      }

      if (isDefined(properties.endTime)) {
        this.endTime = new Date(properties.endTime).getTime();
      }

      if (isDefined(properties.dataSynchronizer)) {
        this.dataSourceObject = properties.dataSynchronizer;
      }

      if (isDefined(properties.dataSource)) {
        this.dataSourceObject = properties.dataSource;
      }

      if (isDefined(properties.debounce)) {
        this.debounce = parseInt(properties.debounce);
      }

      if(isDefined(properties.options)) {
        this.options = properties.options;
      }

      if(isDefined(properties.disabled)) {
        this.slider.setAttribute('disabled', properties.disabled);
      }
    }

    noUiSlider.create(this.slider, {
      start: [startTime, this.endTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
      range: {
        min: startTime,
        max: this.endTime
      },
      //step:  1000* 60* 60,
      format: wNumb({
        decimals: 0
      }),
      behaviour: 'drag',
      connect: true,
      animate: false,
      pips: {
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
      },
      ...this.options
    });

    this.createEvents();

    if(isDefined(this.dataSourceObject)) {
      // listen for BC
      const bc = new BroadcastChannel(this.dataSourceObject.getTimeTopicId());
      bc.onmessage = (message) => {
        if (!this.update) {
          this.slider.noUiSlider.set([message.data.timestamp]);
          this.onChange(message.data.timestamp, parseInt(this.slider.noUiSlider.get()[1]), 'data');
        }
      }
    }
  }

  createActivateButton() {
    let activateButtonDiv = document.createElement("div");
    let aTagActivateButton = document.createElement("a");
    activateButtonDiv.appendChild(aTagActivateButton);

    activateButtonDiv.setAttribute("class", "core-rangeslider-control");
    let self = this;

    activateButtonDiv.addEventListener("click", function (event) {
      if (activateButtonDiv.className.indexOf("core-rangeslider-control-select") > -1) {
        activateButtonDiv.setAttribute("class", "core-rangeslider-control");
        self.deactivate();
      } else {
        activateButtonDiv.setAttribute("class", "core-rangeslider-control-select");
        self.activate();
      }
    });
    document.getElementById(this.divId).appendChild(activateButtonDiv);
  }

  createEvents() {
    const that = this;
    //noUi-handle noUi-handle-lower
    // start->update->end
    this.slider.noUiSlider.on("start", function (values, handle) {
      that.update = true;
      that.sliding = true;
      const st = parseInt(values[0]);
      const end = parseInt(values[1]) || parseInt(that.endTime);
      that.onChange(st, end, 'start');
    });

    this.slider.noUiSlider.on("slide", function (values, handle) {
      that.sliding = true;
      that.update = true;
      const st = parseInt(values[0]);
      const end = parseInt(values[1]) || parseInt(that.endTime);
      that.onChange(st, end, 'slide');
    });

    this.slider.noUiSlider.on("end", function (values, handle) {
      if(that.sliding) {
        that.sliding = false;
        const st = parseInt(values[0]);
        const end = parseInt(values[1]) || parseInt(that.endTime);
        that.onChange(st, end, 'end');
        // that.update = false;
        setTimeout(() => that.update = false, that.debounce);
      }
    });
  }

  /**
   * Deactivate the timeline bar
   */
  deactivate() {
    this.slider.setAttribute('disabled', true);
  }

  /**
   * Activate the timeline nar
   */
  activate() {
    this.slider.removeAttribute('disabled');
  }

  setData(dataSourceId, data) {
    const values = data.values;
    for(let i=0; i < values.length;i++) {
      if(!this.update) {
        this.slider.noUiSlider.set([values[i].timestamp]);
      }
    }
  }

  setStartTime(timestamp) {
    if(!this.update) {
      this.slider.noUiSlider.set([timestamp]);
    }
  }

  setTime(startTimestamp, endTimestamp) {
    if(!this.update) {
      this.slider.noUiSlider.set([startTimestamp, endTimestamp]);
    }
  }

  onChange(startTime, endTime, type) {
    if(type === 'end') {
      this.dataSourceObject.setTimeRange(new Date(startTime).toISOString(),
                                    new Date(endTime).toISOString(), this.dataSourceObject.properties.replaySpeed, true);
    }
  }

}

export default RangeSliderViewReplay;
