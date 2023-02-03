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
import AudioCanvasVisualizer from "./AudioCanvasVisualizer";
/**
 * This abstract class is in charge of visualizing Audio based on chart.js framework and using a decoded AudioBuffer.
 * @extends AudioCanvasVisualizer
 */
var AudioChartVisualizer = /** @class */ (function (_super) {
    __extends(AudioChartVisualizer, _super);
    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     */
    function AudioChartVisualizer(properties) {
        return _super.call(this, __assign({}, properties)) || this;
    }
    AudioChartVisualizer.prototype.parseDate = function (intTimeStamp) {
        var date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    };
    AudioChartVisualizer.prototype.withLeadingZeros = function (dt) {
        return (dt < 10 ? '0' : '') + dt;
    };
    AudioChartVisualizer.prototype.reset = function () {
        this.resetting = true;
        this.chart.stop();
        this.chart.data.labels = [];
        this.chart.data.datasets.forEach(function (dataset) { return dataset.data = []; });
        this.chart.update('none');
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    };
    AudioChartVisualizer.prototype.onended = function () { };
    AudioChartVisualizer.prototype.update = function () {
        if (this.first) {
            this.chart.update('none');
            this.first = false;
        }
        else {
            this.chart.update();
        }
    };
    return AudioChartVisualizer;
}(AudioCanvasVisualizer));
export default AudioChartVisualizer;
//# sourceMappingURL=AudioChartVisualizer.js.map