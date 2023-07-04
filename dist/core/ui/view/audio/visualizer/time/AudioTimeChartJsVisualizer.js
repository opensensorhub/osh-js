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
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';
import { isDefined, merge } from "../../../../../utils/Utils";
import AudioChartVisualizer from "../AudioChartVisualizer";
/**
 * Class to visualize audio time domain using Chart.js framework
 */
var AudioTimeChartJsVisualizer = /** @class */ (function (_super) {
    __extends(AudioTimeChartJsVisualizer, _super);
    /*
     * @param {Object} [properties={}] - the properties of the view
     * @param {number} [properties.fftSize=1024] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get time domain data.
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} [properties.maxValues=200] - The maximum values before shifting the graph to the left
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     * @param {String} [properties.colorData='rgba(100,255,65,0.4)'] - Defines color which colorizes the read data
     */
    function AudioTimeChartJsVisualizer(properties) {
        var _this = _super.call(this, __assign(__assign({ fftSize: 1024, maxValues: 200 }, properties), { type: 'time', format: 'float' })) || this;
        _this.initTimeChart(properties);
        return _this;
    }
    AudioTimeChartJsVisualizer.prototype.initTimeChart = function (properties) {
        var _this = this;
        // #region snippet_chartjsview_default_chartprops
        var type = 'bar';
        this.datasetMinMaxOptions = {};
        this.datasetOptions = {};
        this.colorReadData = 'rgba(100,255,65,0.4)';
        this.options = {
            legend: {
                display: false
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Amplitude'
                    },
                    min: -1.0,
                    max: 1.0,
                    stacked: true,
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks: {
                        callback: function (label, index, values) {
                            return _this.parseDate(values[index].value);
                        },
                        minRotation: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            datasets: {},
            interaction: {},
            animations: {},
            layout: {},
            elements: {},
            responsive: true,
            maintainAspectRatio: true,
        };
        if (isDefined(properties)) {
            if (properties.hasOwnProperty('options')) {
                merge(properties.options, this.options);
            }
            if (properties.hasOwnProperty('type')) {
                type = properties.type;
            }
            if (properties.hasOwnProperty('datasetOptions')) {
                this.datasetOptions = properties.datasetOptions;
            }
            if (properties.hasOwnProperty('colorReadData')) {
                this.colorReadData = properties.colorReadData;
            }
        }
        // #endregion snippet_chartjsview_default_chartprops
        this.resetting = false;
        this.pos = 0;
        this.chart = new Chart(this.canvas, {
            type: type,
            options: this.options
        });
        this.initDatasets();
        this.posReadData = 0;
    };
    AudioTimeChartJsVisualizer.prototype.initDatasets = function () {
        // #region snippet_audiochartjsview_default_chartprops
        this.dataset = __assign({ label: 'Time domain', backgroundColor: 'rgba(200,200,200,0.4)', data: [], pointRadius: 0.1, fill: true, 
            // barPercentage: 1.0,
            // categoryPercentage: 1.0,
            // barThickness: 'flex',
            barThickness: 2.0 }, this.datasetOptions);
        // init array of background color
        var color = this.dataset.backgroundColor;
        this.dataset.backgroundColor = [];
        for (var i = 0; i < this.properties.maxValues; i++) {
            this.dataset.backgroundColor.push(color);
        }
        // #endregion snippet_audiochartjsview_default_chartprops
        this.chart.data.datasets.push(this.dataset);
    };
    AudioTimeChartJsVisualizer.prototype.draw = function (decodedSample) {
        if (!_super.prototype.checkSubsampling.call(this, decodedSample)) {
            return;
        }
        if (this.resetting) {
            return;
        }
        if ((this.dataset.data.length > this.properties.maxValues)) {
            this.dataset.backgroundColor[this.dataset.data.length - 1] = 'rgba(200,200,200,0.4)';
            this.chart.data.labels.shift();
            this.dataset.data.shift();
            this.posReadData--;
        }
        var dataArray = decodedSample[this.properties.type][this.properties.format];
        var minValue = Math.min.apply(Math, dataArray);
        var maxValue = Math.max.apply(Math, dataArray);
        var time = decodedSample.timestamp;
        // console.log("TimeChart ts: " + new Date(time).toISOString());
        this.dataset.data.push({
            'x': time,
            'y': [minValue, maxValue]
        });
        //
    };
    AudioTimeChartJsVisualizer.prototype.render = function () {
        _super.prototype.update.call(this);
    };
    AudioTimeChartJsVisualizer.prototype.onended = function (decodedSample) {
        if (this.resetting) {
            return;
        }
        this.dataset.backgroundColor[this.posReadData++] = this.colorReadData;
        this.chart.update();
    };
    return AudioTimeChartJsVisualizer;
}(AudioChartVisualizer));
export default AudioTimeChartJsVisualizer;
//# sourceMappingURL=AudioTimeChartJsVisualizer.js.map