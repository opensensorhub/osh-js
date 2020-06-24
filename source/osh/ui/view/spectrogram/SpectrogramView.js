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

import * as d3 from 'd3';

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

        // Setup Scales
        let xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([xoffset, containerWidth]);
        let xAxis = d3.axisBottom(xScale);

        let yScale = d3.scaleLinear()
            .domain([minFreq, maxFreq])
            .range([yOffset, bottomOffset]);    // TODO: name {bottomOffset} something better
        let yAxis = d3.axisLeft(yScale).ticks(numBands).tickFormat((d, i) => d + freqUnit);

        let zScale = d3.scaleSequential(d3.interpolateTurbo).domain(decibelRange);

        // Draw Spectrogram
        // The div that will be the root of the D3JS Chart
        let container = d3.select(this.divId);
        let svg = container.append('svg')
            .classed('spec-svg', true)
            .attr('width', container.attr('width'))
            .attr('height', container.attr('height'));

        // Add Axes to Chart
        let xBar = svg.append('g')
            .attr('class', ' x axis')
            .attr('transform', 'translate(' + (0) + ',' + (yOffset) + ')')
            .call(xAxis);
        let yBar = svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (xOffset) + ',' + (0) + ')')
            .call(yAxis);

        // the collections of audio frequency bands
        let group = svg.selectAll('g.band')
            // .data(FREQ_DATA_ARR)
            .data(BANDED_DATA)
            .enter().append('g')
            .attr('class', 'fBand');

// an individual band
        let rect = group.selectAll('rect')
            .data(data => {
                console.log(data);
                return data;
            })
            .enter().append('rect')
            .attr('width', 10)
            .attr('height', data => yScale(data.freq) - yScale(data.freq + data.freq1))
            .attr('x', data => xScale(data.time))
            .attr('y', data => yScale(data.freq + data.freq1))
            .style('fill', data => zScale(data.power));

    }

    /**
     *
     * @param {Spectrogram} styler
     * @param {Number} timestamp
     * @param {Object} options
     */
    updateSpectrogram(styler, timestamp, options) {

    }
}