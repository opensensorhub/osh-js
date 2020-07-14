/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2020 Ian Patterson. All Rights Reserved.

 Author: Ian Patterson <cr31.dev@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import View from '../View.js';
import * as d3 from 'd3/dist/d3.js';

/**
 * @extends View
 */
class SpectrogramView extends View {

    /**
     *
     * @param parentElementDivID
     * @param viewItems
     * @param options
     */
    constructor(parentElementDivID, viewItems, options) {
        super(parentElementDivID, viewItems, options);

        // Data Vars
        this.spectrogramData = [];
        this.powerRange = [-80, 250];
        this.minDate = Date.now();
        this.maxDate = Date.now() + 60000;
        this.freqUnit = 'Hz';
        this.minFreq = 0;
        this.maxFreq = 4000;
        this.numBands = 10;
        this.isSim = false;
        this.tickArray = [];
        for (let i = 0; i <= this.numBands; i++) {
            let interval = (this.maxFreq - this.minFreq) / this.numBands;
            let tickVal = i * interval;
            this.tickArray.push(tickVal);
        }


        // Layout Vars
        let thisDiv = document.getElementById(this.divId);
        thisDiv.style.height = thisDiv.parentElement.getBoundingClientRect().height + 'px';
        // this.width = thisDiv.getBoundingClientRect().width;
        // this.height = thisDiv.getBoundingClientRect().height;
        this.width = 550;
        this.height = 305;
        this.xOffset = (0.15 * this.width);
        this.yOffset = (0.90 * this.height);
        this.yOffsetBottom = 10;

        // Draw Spectrogram
        // The div that will be the root of the D3JS Chart
        this.container = d3.select('#' + this.divId);

        this.svg = this.container.append('svg')
            .classed('spec-svg', true)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`);
        // .attr('width', this.width + 'px')
        // .attr('height', this.height + 'px');
        console.log(this.svg);

        // Setup Scales
        this.initXScale = d3.scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width - 5]);
        this.initXAxis = d3.axisBottom(this.initXScale);

        this.initYScale = d3.scaleLinear()
            .domain([this.minFreq, this.maxFreq])
            .range([this.yOffset, this.yOffsetBottom]);    // TODO: name {bottomOffset} something better
        // this.initYAxis = d3.axisLeft(this.initYScale).ticks(this.numBands).tickFormat((d, i) => d + this.freqUnit);
        this.initYAxis = d3.axisLeft(this.initYScale).tickValues(this.tickArray).tickFormat((d, i) => d + this.freqUnit);

        this.initZScale = d3.scaleSequential(d3.interpolateOrRd).domain(this.powerRange);


        // Add Axes to Chart
        this.xBar = this.svg.append('g')
            .attr('class', ' x axis')
            .attr('transform', 'translate(' + (0) + ',' + (this.yOffset) + ')')
            .call(this.initXAxis);
        this.yBar = this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (this.xOffset) + ',' + (0) + ')')
            .call(this.initYAxis);

        if (options.hasOwnProperty('isSim')) {
            this.isSim = options.isSim;
        }

        if (this.isSim) {
            console.log("Simulating Spectrogram")
            setInterval(() => {
                this.spectrogramData = this.spectrogramData.concat(this.createDataEntries())
                this.draw();
            }, 1000)
        }
    }

    /**
     * Updates the spectrogram dataset and redraws the image
     * @param {Spectrogram} styler
     * @param {Number} timestamp
     * @param {Object} options
     */
    updateSpectrogram(styler, timestamp, options) {
        // push styler data into Spectrogram Data Object
        if (styler !== null) this.spectrogramData.push(styler.latestData);

        // redraw
        this.draw();

    }

    /**
     * Draws the spectrogram
     */
    draw() {
        this.maxDate = Date.now();

        let tempXScale = d3
            .scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width]);
        let newXAxis = d3.axisBottom(tempXScale).ticks(10);

        this.xBar = this.svg.select('g.x.axis')
            .call(newXAxis);

        this.svg.selectAll('rect')
            .data(this.spectrogramData)
            .join('rect')
            .attr('width', '5')
            .attr('height', d => this.initYScale(d.freqBand[0]) - this.initYScale(d.freqBand[1]))
            .attr('x', d => tempXScale(d.time))
            .attr('y', d => this.initYScale(d.freqBand[1]))
            .style('fill', d => this.initZScale(d.power));
    }

    /**
     *
     * @returns {[]}
     */
    createDataEntries() {
        let tempDataArr = [];
        let freqCounter = 0;

        for (let i = 0; i < this.numBands; i++) {
            let randomPower = Math.random() * (this.powerRange[1] - this.powerRange[0]) + this.powerRange[0];
            tempDataArr.push({
                time: Date.now(),
                freqBand: [freqCounter, freqCounter + 400],
                power: randomPower
            });
            freqCounter += 400;
        }

        return tempDataArr;
    }
}

export default SpectrogramView;