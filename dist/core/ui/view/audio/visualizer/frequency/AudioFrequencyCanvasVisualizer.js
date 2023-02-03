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
import AudioCanvasVisualizer from "../AudioCanvasVisualizer";
/**
 * Class to visualize audio frequency using Native canvas drawing
 */
var AudioFrequencyCanvasVisualizer = /** @class */ (function (_super) {
    __extends(AudioFrequencyCanvasVisualizer, _super);
    /**
     * Class to visualize audio frequency using Native canvas drawing
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {number} [properties.fftSize=32] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
     * @param {Object} [properties.barWidth=10] - bar width
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     */
    function AudioFrequencyCanvasVisualizer(properties) {
        return _super.call(this, __assign(__assign({ barWidth: 10, fftSize: 32 }, properties), { type: 'frequency', format: 'float' })) || this;
    }
    AudioFrequencyCanvasVisualizer.prototype.draw = function (decodedSample) {
        this.decodedSample = decodedSample;
        this.sampleNumber++;
    };
    AudioFrequencyCanvasVisualizer.prototype.render = function () {
        var dataArray = this.decodedSample[this.properties.type][this.properties.format];
        try {
            var WIDTH = this.canvas.width;
            var HEIGHT = this.canvas.height;
            this.canvasCtx.fillStyle = 'rgba(221,221,221,0.8)';
            this.canvasCtx.fillStyle = 'rgb(255,255,255)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            // let  barWidth = (WIDTH / bufferLength) * 2.5;
            // TODO: handle too small WIDTH
            var barWidth = this.properties.barWidth;
            var spaceWidth = (WIDTH / (dataArray.length + 1)) - barWidth;
            var barHeight = void 0;
            var x = barWidth;
            for (var i = 0; i < dataArray.length; i++) {
                barHeight = 100 - dataArray[i] * -1;
                barHeight = HEIGHT * barHeight / 100;
                this.canvasCtx.fillStyle = 'rgb(215,215,215)';
                this.canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, HEIGHT);
                this.canvasCtx.fillStyle = 'rgba(34,34,34,0.8)';
                this.canvasCtx.beginPath();
                this.canvasCtx.rect(x, HEIGHT - barHeight, barWidth, HEIGHT);
                this.canvasCtx.stroke();
                x += barWidth + spaceWidth;
            }
            this.canvasCtx.fillStyle = 'rgba(198,198,198,0.8)';
            this.canvasCtx.fillRect(0, 0, 1, HEIGHT);
            this.canvasCtx.fillRect(0, HEIGHT - 1, WIDTH, 1);
        }
        catch (error) {
            console.error(error);
        }
    };
    return AudioFrequencyCanvasVisualizer;
}(AudioCanvasVisualizer));
export default AudioFrequencyCanvasVisualizer;
//# sourceMappingURL=AudioFrequencyCanvasVisualizer.js.map