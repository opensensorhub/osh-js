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
        this.decibelRange = [-100, 250];
        this.minDate = Date.now();
        this.maxDate = Date.now() + 60000;
        this.freqUnit = 'Hz';
        this.minFreq = 0;
        this.maxFreq = 24000;
        this.numBands = 10;


        // Layout Vars
        let thisDiv = document.getElementById(this.divId);
        this.width = thisDiv.getAttribute('width');
        this.height = thisDiv.getAttribute('height');
        this.xOffset = (0.95 * this.height) + 'px';
        this.yOffset = (0.90 * this.height) + 'px';
        this.yOffsetBottom = 10 + 'px';


        // Draw Spectrogram
        // The div that will be the root of the D3JS Chart
        this.container = d3.select(this.divId);
        this.svg = this.container.append('svg')
            .classed('spec-svg', true)
            .attr('width', container.attr('width'))
            .attr('height', container.attr('height'));


        // Setup Scales
        this.initXScale = d3.scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width]);
        this.initXAxis = d3.axisBottom(this.initXScale);

        this.initYScale = d3.scaleLinear()
            .domain([this.minFreq, this.maxFreq])
            .range([this.yOffset, this.yOffsetBottom]);    // TODO: name {bottomOffset} something better
        this.initYAxis = d3.axisLeft(this.initYScale).ticks(this.numBands).tickFormat((d, i) => d + this.freqUnit);

        this.initZScale = d3.scaleSequential(d3.interpolateTurbo).domain(this.decibelRange);


        // Add Axes to Chart
        this.xBar = this.svg.append('g')
            .attr('class', ' x axis')
            .attr('transform', 'translate(' + (0) + ',' + (this.yOffset) + ')')
            .call(this.initXAxis);
        this.yBar = this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (this.xOffset) + ',' + (0) + ')')
            .call(this.initYAxis);
    }

    /**
     *
     * @param {Spectrogram} styler
     * @param {Number} timestamp
     * @param {Object} options
     */
    updateSpectrogram(styler, timestamp, options) {
        // push styler data into Spectrogram Data Object
        if (styler !== null) this.spectrogramData.push(styler.latestData);

    }

    draw() {
        this.maxDate = Date.now();

        let tempXScale = d3
            .scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([xOffset, width]);
        let newXAxis = d3.axisBottom(tempXScale).ticks(10);

        this.xBar = svg.select('g.x.axis')
            .call(newXAxis);

        this.svg.selectAll('rect')
            .data(this.spectrogramData)
            .join('rect')
            .attr('width', '10')
            .attr('height', d => this.initYScale(d.freqBand[0]) - this.initYScale(d.freqBand[0] + d.freqBand[1]))
            .attr('x', d => tempXScale(d.time))
            .attr('y', d => this.initYScale(d.freqBand[0] + d.freqBand[1]))
            .style('fill', d => this.initZScale(d.power));
    }
}