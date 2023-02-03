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

import View from '../../../../core/ui/view/View.js';
import * as d3 from 'd3/dist/d3.js';

/**
 * @extends View
 */
class SpectrogramView extends View {

    /**
     *
     * @param {Object} [properties={}] - the properties of the view
*    * @param {String} properties.isSim - Enable simulation mode
     */
    constructor(properties) {
        super({
            supportedLayers: ['data'],
            dataSourceId: properties.dataSource.id,
            ...properties,
            visible: true
        });

        // Data Vars
        this.spectrogramData = [];
        this.powerRange = [-80, 250];
        this.minDate = Date.now();
        this.maxDate = Date.now() + 60000;
        this.freqUnit = 'Hz';
        this.minFreq = 0;
        this.maxFreq = 4000;
        this.numBands = 10;
        this.maxDataPoints = 1000;
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
        this.width = 500;
        this.height = 350;
        this.xOffset = (0.10 * this.width);
        this.yOffset = (0.90 * this.height);
        this.yOffsetBottom = 10;

        // Draw Spectrogram
        // The div that will be the root of the D3JS Chart
        this.container = d3.select('#' + this.divId);
        this.width = parseInt(this.container.style('width'), 10);
        this.height = parseInt(this.container.style('height'), 10);
        this.aspect = this.width / this.height;

        this.svg = this.container.append('svg')
            .classed('spec-svg', true)
            .attr("viewBox", `0 0 ${this.width} ${this.height}`)
            .attr('preserveAspectRatio', 'xMinYMid')
            .call(this.makeResponsive);

        // Setup Scales
        this.initXScale = d3.scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width - 100]);
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

        if (properties.hasOwnProperty('isSim')) {
            this.isSim = properties.isSim;
        }

        if (this.isSim) {
            console.info("Simulating Spectrogram");
            setInterval(() => {
                // this.spectrogramData = this.spectrogramData.concat(this.createDataEntries());
                this.spectrogramData = [...this.spectrogramData, ...this.createDataEntries()];
                this.draw();
            }, 1000);
        }
    }

    setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0;i < values.length;i++) {
            const d = values[i];
            if(data.type === 'spectrogram') {
                this.updateSpectrogram(d);
            }
        }
    }

    /**
     * Updates the spectrogram data and redraw.
     * @param {Spectogram.props} props - The layer properties allowing the update of the spectrogram
     */
    updateSpectrogram(data) {
        // push layer data into Spectrogram Data Object
        if (layer !== null) this.spectrogramData.push(layer.latestData);

        // redraw
        this.draw();

    }

    /**
     * Draws the spectrogram
     */
    draw() {
        // check for dataset size
        if(this.spectrogramData.length > this.maxDataPoints){
            let pointsToCull = this.spectrogramData.length - this.maxDataPoints;
            this.spectrogramData = this.spectrogramData.slice(pointsToCull, this.spectrogramData.length);
        }

        this.minDate = this.spectrogramData[0].time;
        this.maxDate = Date.now();

        let tempXScale = d3
            .scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width]);
        let newXAxis = d3.axisBottom(tempXScale).ticks(10);

        this.xBar = this.svg.select('g.x.axis')
            .call(newXAxis);

        let bandwidth = 10* this.width/this.spectrogramData.length;

        this.svg.selectAll('rect')
            .data(this.spectrogramData)
            .join('rect')
            .attr('width', bandwidth)
            .attr('height', d => this.initYScale(d.freqBand[0]) - this.initYScale(d.freqBand[1]))
            .attr('x', d => tempXScale(d.time))
            .attr('y', d => this.initYScale(d.freqBand[1]))
            .style('fill', d => this.initZScale(d.power));
    }

    /**
     *
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

        console.log(tempDataArr)
        return tempDataArr;
    }


    makeResponsive(svg) {
        // container will be the DOM element
        // that the svg is appended to
        // we then measure the container
        // and find its aspect ratio
        const container = d3.select(svg.node().parentNode),
            width = parseInt(svg.style('width'), 10),
            height = parseInt(svg.style('height'), 10),
            aspect = width / height;

        // set viewBox attribute to the initial size
        // control scaling with preserveAspectRatio
        // resize svg on inital page load
        svg.attr('viewBox', `0 0 ${width} ${height}`)
            .attr('preserveAspectRatio', 'xMinYMid')
            .call(resize);

        // add a listener so the chart will be resized
        // when the window resizes
        // multiple listeners for the same event type
        // requires a namespace, i.e., 'click.foo'
        // api docs: https://goo.gl/F3ZCFr
        d3.select(window).on(
            'resize.' + container.attr('id'),
            resize
        );

        // this is the code that resizes the chart
        // it will be called on load
        // and in response to window resizes
        // gets the width of the container
        // and resizes the svg to fill it
        // while maintaining a consistent aspect ratio
        function resize() {
            const w = parseInt(container.style('width'));
            svg.attr('width', w - 5);
            svg.attr('height', Math.round(w / aspect));
        }
    }
}

export default SpectrogramView;
