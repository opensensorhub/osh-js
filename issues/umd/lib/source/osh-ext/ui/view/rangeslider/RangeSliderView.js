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

import View from "../../../../osh-js/ui/view/View.js";
import {isDefined} from "../../../../osh-js/utils/Utils.js";
import "../../../resources/css/noUISlider.css";
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import * as wNumb from 'wnumb';

/**
 * @extends View
 * @example
 *
 * import RangeSliderView from 'osh-ext/view/RangeSliderView.js';
 *
 * let rangeSlider = new RangeSliderView("rangeSlider",{
    dataSourceId: dataSource.id,
    startTime: "2015-12-19T21:04:30Z",
    endTime: "2015-12-19T21:09:19Z"
});
 */
class RangeSliderView extends View {
	/**
		* Create the discoveryView
   * @param {Object} [properties={}] - the properties of the view
   * @param {String} properties.container - The div element to attach to
   * @param {Object[]}  [properties.layers=[]] - The initial layers to add
		* @param {Number} properties.startTime - The start time
		* @param {Number} properties.endTime - The end time
		* @param {String} properties.dataSourcesId - The dataSource id which are sync with master time
    * @param {Boolean} properties.disabled - disabled the range slider
    * @param {Object} properties.dataSynchronizer - a data synchronizer to get current data time for this set of datasources
		*/
  constructor(properties) {
    super({
      ...properties,
      supportedLayers: ['data']
    });

    this.slider = document.createElement("div");
    this.slider.setAttribute("class", "osh-rangeslider-slider");
    document.getElementById(this.divId).appendChild(this.slider);

    let startTime = new Date().getTime();
    this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055

    this.dataSourcesId = [];
    this.multi = false;
    this.dataSynchonizer = null;
    this.options = {};

    if (isDefined(properties)) {
      if (isDefined(properties.startTime)) {
        startTime = new Date(properties.startTime).getTime();
      }

      if (isDefined(properties.endTime)) {
        this.endTime = new Date(properties.endTime).getTime();
      }

      if (isDefined(properties.dataSourcesId)) {
        this.dataSourcesId = properties.dataSourcesId;
      }

      if (isDefined(properties.dataSynchronizer)) {
        this.dataSynchonizer = properties.dataSynchronizer;
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
      tooltips: [
        wNumb({
          decimals: 1,
          edit: function (value) {
            let date = new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
            return date.split("T")[1].split("Z")[0].split(".")[0];
          }
        }),
        wNumb({
          decimals: 1,
          edit: function (value) {
            let date = new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
            return date.split("T")[1].split("Z")[0].split(".")[0];
          }
        })
      ],
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
  }

  createActivateButton() {
    let activateButtonDiv = document.createElement("div");
    let aTagActivateButton = document.createElement("a");
    activateButtonDiv.appendChild(aTagActivateButton);

    activateButtonDiv.setAttribute("class", "osh-rangeslider-control");
    let self = this;

    activateButtonDiv.addEventListener("click", function (event) {
      if (activateButtonDiv.className.indexOf("osh-rangeslider-control-select") > -1) {
        activateButtonDiv.setAttribute("class", "osh-rangeslider-control");
        self.deactivate();
      } else {
        activateButtonDiv.setAttribute("class", "osh-rangeslider-control-select");
        self.activate();
      }
    });
    document.getElementById(this.divId).appendChild(activateButtonDiv);

  }

  createEvents() {
    const that = this;
    //noUi-handle noUi-handle-lower
    // start->update->end
    this.slider.noUiSlider.on("slide", function (values, handle) {
      that.update = true;
    });

    this.slider.noUiSlider.on("end", function (values, handle) {
      that.onChange(values[0], values[1]);
      that.update = false;
    });

    if (this.dataSynchonizer !== null) {
      this.interval = setInterval(async ()=> {
        this.dataSynchonizer.getCurrentTime().then(time => {
          this.slider.noUiSlider.set([time]);
        });
      },100);
    }
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
      if (this.dataSourcesId.length === 0 && !this.update) {
        for (let i = 0; i < values.length; i++) {
          this.slider.noUiSlider.set([values[i].timeStamp]);
        }
      }
    }
  }

  onChange(startTime, endTime) {

  }

  destroy() {
    super.destroy();

    if(isDefined(this.interval)) {
      clearInterval(this.interval);
    }
  }
}

export default RangeSliderView;
