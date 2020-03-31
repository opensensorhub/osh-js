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

import {View} from "../../../../osh/ui/view/View";
import EventManager from "../../../../osh/events/EventManager";
import {isDefined} from "../../../../osh/utils/Utils";
import "../../resources/css/noUISlider.css";
import * as noUiSlider from 'nouislider';
import 'nouislider/distribute/nouislider.min.css';
import * as wNumb from 'wnumb';

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 */
export default class RangeSliderView extends View {
	constructor(parentElementDivId, options) {
		super(parentElementDivId, [], options);

		this.slider = document.createElement("div");
		let activateButtonDiv = document.createElement("div");
		let aTagActivateButton = document.createElement("a");
		activateButtonDiv.appendChild(aTagActivateButton);


		this.slider.setAttribute("class","osh-rangeslider-slider");
		activateButtonDiv.setAttribute("class","osh-rangeslider-control");

		let self = this;

		activateButtonDiv.addEventListener("click",function(event) {
			if(activateButtonDiv.className.indexOf("osh-rangeslider-control-select") > -1) {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control");
				self.deactivate();
			} else {
				activateButtonDiv.setAttribute("class","osh-rangeslider-control-select");
				self.activate();
			}
		});
		document.getElementById(this.divId).appendChild(this.slider);
		document.getElementById(this.divId).appendChild(activateButtonDiv);

		let startTime = new Date().getTime();
		this.endTime = new Date("2055-01-01T00:00:00Z").getTime(); //01/01/2055
		this.slider.setAttribute('disabled', true);

		this.dataSourcesId = [];

		this.multi = false;
		// compute a refresh rate
		this.dataCount = 0;
		this.refreshRate = 10;

		if(isDefined(options)) {
			if(isDefined(options.startTime)) {
				startTime = new Date(options.startTime).getTime();
				//slider.removeAttribute('disabled');
			}

			if(isDefined(options.endTime)) {
				this.endTime = new Date(options.endTime).getTime();
			}

			if(isDefined(options.dataSourcesId)) {
				this.dataSourcesId = options.dataSourcesId;
			}
			if(isDefined(options.refreshRate)) {
				this.refreshRate = options.refreshRate;
			}

		}

		noUiSlider.create(this.slider, {
			start: [startTime,this.endTime]/*,timestamp("2015-02-16T08:09:00Z")]*/,
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
					edit:function( value ){
						let date = new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
						return date.split("T")[1].split("Z")[0];
					}
				}),
				wNumb({
					decimals: 1,
					edit:function( value ){
						let date = new Date(parseInt(value)).toISOString().replace(".000Z", "Z");
						return date.split("T")[1].split("Z")[0];
					}
				})
			],
			pips: {
				mode: 'positions',
				values: [5,25,50,75],
				density: 1,
				//stepped: true,
				format: wNumb({
					edit:function( value ){
						return new Date(parseInt(value)).toISOString().replace(".000Z", "Z")
							.split("T")[1].split("Z")[0];
					}
				})
			}
		});

		//noUi-handle noUi-handle-lower
		// start->update->end
		this.slider.noUiSlider.on("slide", function (values, handle) {
			self.update = true;
		});

		this.slider.noUiSlider.on("end", function (values, handle) {
			self.onChange(values[0], values[1]);
		});
		// listen for DataSourceId
		EventManager.observe(EventManager.EVENT.CURRENT_MASTER_TIME, function (event) {
			let filterOk = true;

			if(self.dataSourcesId.length > 0) {
				if(self.dataSourcesId.indexOf(event.dataSourceId) < 0) {
					filterOk = false;
				}
            }

			if(filterOk && !self.lock && ((++self.dataCount)%self.refreshRate == 0)) {
				self.slider.noUiSlider.set([event.timeStamp]);
				self.dataCount = 0;
			}
		});
	}


	/**
	 * @instance
	 * @memberof RangeSlider
	 */
	deactivate() {
		this.slider.setAttribute('disabled', true);
		this.lock = false;
		if(this.update) {
			let values = this.slider.noUiSlider.get();
			EventManager.fire(EventManager.EVENT.DATASOURCE_UPDATE_TIME, {
				startTime: new Date(parseInt(values[0])).toISOString(),
				endTime: new Date(parseInt(values[1])).toISOString()
			});
		}
		this.update = false;
	}

	/**
	 * @instance
	 * @memberof RangeSlider
	 */
	activate() {
		this.slider.removeAttribute('disabled');
		this.lock = true;
	}

	setData(dataSourceId, data) {
		if(!this.lock && ((++this.dataCount)%this.refreshRate === 0)) {
			this.slider.noUiSlider.set([data.timeStamp]);
			this.dataCount = 0;
		}
	}

	onChange(startTime, endTime) {}
}
