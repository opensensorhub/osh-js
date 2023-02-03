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
import AudioVisualizer from "./AudioVisualizer";
import { isDefined } from "../../../../utils/Utils";
/**
 * This abstract class is in charge of visualizing Audio based on a canvas and using a decoded AudioBuffer.
 * @extends AudioVisualizer
 */
var AudioCanvasVisualizer = /** @class */ (function (_super) {
    __extends(AudioCanvasVisualizer, _super);
    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     * @param {string} properties.container - The div element to attach to
     */
    function AudioCanvasVisualizer(properties) {
        var _this = _super.call(this, properties) || this;
        _this.initCanvas(properties);
        _this.subSamplingFrequency = 4000;
        _this.sampleNumber = 0;
        _this.animate();
        return _this;
    }
    // abstract
    AudioCanvasVisualizer.prototype.draw = function (decodedSample) { };
    AudioCanvasVisualizer.prototype.onended = function (decodedSample) { };
    AudioCanvasVisualizer.prototype.initCanvas = function (properties) {
        var domNode = document.getElementById(properties.container);
        this.canvas = document.createElement("canvas");
        if (this.properties.hasOwnProperty('css')) {
            this.canvas.setAttribute("class", this.properties.css);
        }
        var bounds = domNode.getBoundingClientRect();
        this.canvas.setAttribute("width", bounds.width);
        this.canvas.setAttribute("height", bounds.height);
        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    };
    AudioCanvasVisualizer.prototype.checkSubsampling = function (decodedSample) {
        if (isDefined(this.lastSubSampingClockTime)) {
            var endClockTime = performance.now();
            var deltaClockTime = endClockTime - this.lastSubSampingClockTime;
            if (deltaClockTime < this.frequency) {
                console.warn('skipping audioBuffer');
                return false;
            }
        }
        else {
            this.frequency = 1000 / (this.subSamplingFrequency / decodedSample.buffer.length);
        }
        this.lastSubSampingClockTime = performance.now();
        return true;
    };
    AudioCanvasVisualizer.prototype.checkUpdate = function () {
        if (!isDefined(this.lastClockTime)) {
            this.lastClockTime = performance.now();
            return true;
        }
        var endClockTime = performance.now();
        var deltaClockTime = endClockTime - this.lastClockTime;
        if (deltaClockTime > 1000 / 15) {
            this.lastClockTime = performance.now();
            return true;
        }
        return false;
    };
    AudioCanvasVisualizer.prototype.animate = function () {
        var _this = this;
        setInterval(function () {
            if (_this.sampleNumber === 0) {
                return;
            }
            _this.render();
        }, 1000 / 10); // 15Hz
    };
    AudioCanvasVisualizer.prototype.render = function () { };
    return AudioCanvasVisualizer;
}(AudioVisualizer));
export default AudioCanvasVisualizer;
//# sourceMappingURL=AudioCanvasVisualizer.js.map