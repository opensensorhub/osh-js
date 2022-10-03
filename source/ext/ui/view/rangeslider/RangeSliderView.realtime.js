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
import {EventType} from "../../../../core/event/EventType";

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
class RangeSliderViewRealtime extends View {
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
  constructor(properties) {
    super({
      ...properties,
      supportedLayers: ['data']
    });

    this.slider = document.createElement("div");
    this.slider.setAttribute("class", "core-rangeslider-slider");
    document.getElementById(this.divId).appendChild(this.slider);

    this.update = false;
    this.dataSourceObject = null;
    this.debounce = 0;
    this.options = {};
    this.sliding = false;
    this.startTimestamp = new Date().toISOString();

    if (isDefined(properties)) {
      if (isDefined(properties.dataSynchronizer)) {
        this.dataSourceObject = properties.dataSynchronizer;
      }

      if (isDefined(properties.dataSource)) {
        this.dataSourceObject = properties.dataSource;
      }

      if (isDefined(properties.debounce)) {
        this.debounce = parseInt(properties.debounce);
      }

      if (isDefined(properties.startTimestamp)) {
        this.startTimestamp = properties.startTimestamp;
      }

      if(isDefined(properties.options)) {
        this.options = properties.options;
      }

      this.slider.setAttribute('disabled', properties.disabled);
    }

    noUiSlider.create(this.slider, {
      start: this.startTimestamp/*,timestamp("2015-02-16T08:09:00Z")]*/,
      range: {
        min: this.startTimestamp,
        max: this.startTimestamp + 1000 * 60 * 60 * 2 //  2 hours
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

    if(isDefined(this.dataSourceObject)) {
      // listen for BC
      const bc = new BroadcastChannel(this.dataSourceObject.getTimeTopicId());
      bc.onmessage = (message) => {
        if (!this.update) {
          if(message.data.type === EventType.MASTER_TIME) {
            this.slider.noUiSlider.set(message.data.timestamp);
            this.onChange(message.data.timestamp, 'data');
          }
        }
      }
    }
  }

  onChange(timestamp, event) {}

  setData(dataSourceId, data) {
  }
}

export default RangeSliderViewRealtime;
