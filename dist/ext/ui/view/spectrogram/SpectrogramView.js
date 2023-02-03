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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import View from '../../../../core/ui/view/View.js';
import * as d3 from 'd3/dist/d3.js';
/**
 * @extends View
 */
var SpectrogramView = /** @class */ (function (_super) {
    __extends(SpectrogramView, _super);
    /**
     *
     * @param {Object} [properties={}] - the properties of the view
*    * @param {String} properties.isSim - Enable simulation mode
     */
    function SpectrogramView(properties) {
        var _this = _super.call(this, __assign(__assign({ supportedLayers: ['data'], dataSourceId: properties.dataSource.id }, properties), { visible: true })) || this;
        // Data Vars
        _this.spectrogramData = [];
        _this.powerRange = [-80, 250];
        _this.minDate = Date.now();
        _this.maxDate = Date.now() + 60000;
        _this.freqUnit = 'Hz';
        _this.minFreq = 0;
        _this.maxFreq = 4000;
        _this.numBands = 10;
        _this.maxDataPoints = 1000;
        _this.isSim = false;
        _this.tickArray = [];
        for (var i = 0; i <= _this.numBands; i++) {
            var interval = (_this.maxFreq - _this.minFreq) / _this.numBands;
            var tickVal = i * interval;
            _this.tickArray.push(tickVal);
        }
        // Layout Vars
        var thisDiv = document.getElementById(_this.divId);
        thisDiv.style.height = thisDiv.parentElement.getBoundingClientRect().height + 'px';
        // this.width = thisDiv.getBoundingClientRect().width;
        // this.height = thisDiv.getBoundingClientRect().height;
        _this.width = 500;
        _this.height = 350;
        _this.xOffset = (0.10 * _this.width);
        _this.yOffset = (0.90 * _this.height);
        _this.yOffsetBottom = 10;
        // Draw Spectrogram
        // The div that will be the root of the D3JS Chart
        _this.container = d3.select('#' + _this.divId);
        _this.width = parseInt(_this.container.style('width'), 10);
        _this.height = parseInt(_this.container.style('height'), 10);
        _this.aspect = _this.width / _this.height;
        _this.svg = _this.container.append('svg')
            .classed('spec-svg', true)
            .attr("viewBox", "0 0 ".concat(_this.width, " ").concat(_this.height))
            .attr('preserveAspectRatio', 'xMinYMid')
            .call(_this.makeResponsive);
        // Setup Scales
        _this.initXScale = d3.scaleTime()
            .domain([_this.minDate, _this.maxDate])
            .range([_this.xOffset, _this.width - 100]);
        _this.initXAxis = d3.axisBottom(_this.initXScale);
        _this.initYScale = d3.scaleLinear()
            .domain([_this.minFreq, _this.maxFreq])
            .range([_this.yOffset, _this.yOffsetBottom]); // TODO: name {bottomOffset} something better
        // this.initYAxis = d3.axisLeft(this.initYScale).ticks(this.numBands).tickFormat((d, i) => d + this.freqUnit);
        _this.initYAxis = d3.axisLeft(_this.initYScale).tickValues(_this.tickArray).tickFormat(function (d, i) { return d + _this.freqUnit; });
        _this.initZScale = d3.scaleSequential(d3.interpolateOrRd).domain(_this.powerRange);
        // Add Axes to Chart
        _this.xBar = _this.svg.append('g')
            .attr('class', ' x axis')
            .attr('transform', 'translate(' + (0) + ',' + (_this.yOffset) + ')')
            .call(_this.initXAxis);
        _this.yBar = _this.svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (_this.xOffset) + ',' + (0) + ')')
            .call(_this.initYAxis);
        if (properties.hasOwnProperty('isSim')) {
            _this.isSim = properties.isSim;
        }
        if (_this.isSim) {
            console.info("Simulating Spectrogram");
            setInterval(function () {
                // this.spectrogramData = this.spectrogramData.concat(this.createDataEntries());
                _this.spectrogramData = __spreadArray(__spreadArray([], _this.spectrogramData, true), _this.createDataEntries(), true);
                _this.draw();
            }, 1000);
        }
        return _this;
    }
    SpectrogramView.prototype.setData = function (dataSourceId, data) {
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            var d = values[i];
            if (data.type === 'spectrogram') {
                this.updateSpectrogram(d);
            }
        }
    };
    /**
     * Updates the spectrogram data and redraw.
     * @param {Spectogram.props} props - The layer properties allowing the update of the spectrogram
     */
    SpectrogramView.prototype.updateSpectrogram = function (data) {
        // push layer data into Spectrogram Data Object
        if (layer !== null)
            this.spectrogramData.push(layer.latestData);
        // redraw
        this.draw();
    };
    /**
     * Draws the spectrogram
     */
    SpectrogramView.prototype.draw = function () {
        var _this = this;
        // check for dataset size
        if (this.spectrogramData.length > this.maxDataPoints) {
            var pointsToCull = this.spectrogramData.length - this.maxDataPoints;
            this.spectrogramData = this.spectrogramData.slice(pointsToCull, this.spectrogramData.length);
        }
        this.minDate = this.spectrogramData[0].time;
        this.maxDate = Date.now();
        var tempXScale = d3
            .scaleTime()
            .domain([this.minDate, this.maxDate])
            .range([this.xOffset, this.width]);
        var newXAxis = d3.axisBottom(tempXScale).ticks(10);
        this.xBar = this.svg.select('g.x.axis')
            .call(newXAxis);
        var bandwidth = 10 * this.width / this.spectrogramData.length;
        this.svg.selectAll('rect')
            .data(this.spectrogramData)
            .join('rect')
            .attr('width', bandwidth)
            .attr('height', function (d) { return _this.initYScale(d.freqBand[0]) - _this.initYScale(d.freqBand[1]); })
            .attr('x', function (d) { return tempXScale(d.time); })
            .attr('y', function (d) { return _this.initYScale(d.freqBand[1]); })
            .style('fill', function (d) { return _this.initZScale(d.power); });
    };
    /**
     *
     */
    SpectrogramView.prototype.createDataEntries = function () {
        var tempDataArr = [];
        var freqCounter = 0;
        for (var i = 0; i < this.numBands; i++) {
            var randomPower = Math.random() * (this.powerRange[1] - this.powerRange[0]) + this.powerRange[0];
            tempDataArr.push({
                time: Date.now(),
                freqBand: [freqCounter, freqCounter + 400],
                power: randomPower
            });
            freqCounter += 400;
        }
        console.log(tempDataArr);
        return tempDataArr;
    };
    SpectrogramView.prototype.makeResponsive = function (svg) {
        // container will be the DOM element
        // that the svg is appended to
        // we then measure the container
        // and find its aspect ratio
        var container = d3.select(svg.node().parentNode), width = parseInt(svg.style('width'), 10), height = parseInt(svg.style('height'), 10), aspect = width / height;
        // set viewBox attribute to the initial size
        // control scaling with preserveAspectRatio
        // resize svg on inital page load
        svg.attr('viewBox', "0 0 ".concat(width, " ").concat(height))
            .attr('preserveAspectRatio', 'xMinYMid')
            .call(resize);
        // add a listener so the chart will be resized
        // when the window resizes
        // multiple listeners for the same event type
        // requires a namespace, i.e., 'click.foo'
        // api docs: https://goo.gl/F3ZCFr
        d3.select(window).on('resize.' + container.attr('id'), resize);
        // this is the code that resizes the chart
        // it will be called on load
        // and in response to window resizes
        // gets the width of the container
        // and resizes the svg to fill it
        // while maintaining a consistent aspect ratio
        function resize() {
            var w = parseInt(container.style('width'));
            svg.attr('width', w - 5);
            svg.attr('height', Math.round(w / aspect));
        }
    };
    return SpectrogramView;
}(View));
export default SpectrogramView;
//# sourceMappingURL=SpectrogramView.js.map