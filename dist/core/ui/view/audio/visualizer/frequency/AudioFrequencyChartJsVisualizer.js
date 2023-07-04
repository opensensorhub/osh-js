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
import { Chart, registerables } from 'chart.js';
import { isDefined, merge } from "../../../../../utils/Utils";
import AudioChartVisualizer from "../AudioChartVisualizer";
/**
 * Class to visualize audio frequency using Chart.js framework
*/
var AudioFrequencyChartJsVisualizer = /** @class */ (function (_super) {
    __extends(AudioFrequencyChartJsVisualizer, _super);
    /*
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {number} [properties.fftSize=32] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     */
    function AudioFrequencyChartJsVisualizer(properties) {
        var _this = _super.call(this, __assign(__assign({ fftSize: 32 }, properties), { type: 'frequency', format: 'float' })) || this;
        _this.initFrequencyChart(properties);
        _this.sampleNumber = 0;
        return _this;
    }
    AudioFrequencyChartJsVisualizer.prototype.initFrequencyChart = function (properties) {
        Chart.register.apply(Chart, registerables);
        // #region snippet_audiochartjsview_default_chartprops
        var type = 'bar';
        this.options = {
            maintainAspectRatio: true,
            normalized: true,
            spanGaps: true,
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
                    },
                    ticks: {
                        autoSkip: false
                    }
                },
                y: {
                    type: 'linear',
                    min: -100,
                    max: 0,
                    title: {
                        display: true,
                        text: 'Amplitude (dB)'
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
            elements: {}
        };
        // #endregion snippet_audiochartjsview_default_chartprops
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
        }
        this.resetting = false;
        this.pos = 0;
        this.chart = new Chart(this.canvas, {
            type: type,
            options: this.options
        });
        this.dataset = __assign({ data: [], borderColor: 'rgba(0,0,0,0.5)', backgroundColor: 'rgba(210,210,210,0.8)', borderWidth: 1, barThickness: 20 }, this.datasetOptions);
        this.chart.data.datasets.push(this.dataset);
        this.first = false;
    };
    AudioFrequencyChartJsVisualizer.prototype.buildLabels = function (decodedSample) {
        var labels = [];
        var dataArray = decodedSample[this.properties.type][this.properties.format];
        var step = decodedSample.buffer.sampleRate / 2 / dataArray.length;
        var nbStep = decodedSample.buffer.sampleRate / 2 / step;
        var value;
        for (var i = 0; i < nbStep; i++) {
            value = Math.ceil((i + 1) * step);
            if (value > 1000) {
                labels.push((value /= 1000).toFixed(2) + 'K');
            }
            else {
                labels.push('' + value);
            }
        }
        this.chart.data.labels = labels;
        this.first = true;
    };
    AudioFrequencyChartJsVisualizer.prototype.draw = function (decodedSample) {
        if (this.resetting) {
            return;
        }
        this.decodedSample = decodedSample;
        this.sampleNumber++;
    };
    AudioFrequencyChartJsVisualizer.prototype.render = function () {
        var dataArray = this.decodedSample[this.properties.type][this.properties.format];
        if (this.chart.data.labels.length === 0) {
            this.buildLabels(this.decodedSample);
            for (var i = 0; i < dataArray.length; i++) {
                this.dataset.data.push([-100, dataArray[i]]);
            }
        }
        else {
            for (var i = 0; i < dataArray.length; i++) {
                this.dataset.data[i][1] = dataArray[i];
            }
        }
        _super.prototype.update.call(this);
    };
    return AudioFrequencyChartJsVisualizer;
}(AudioChartVisualizer));
export default AudioFrequencyChartJsVisualizer;
//# sourceMappingURL=AudioFrequencyChartJsVisualizer.js.map