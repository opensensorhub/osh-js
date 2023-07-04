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
 * Class to visualize audio time domain using Native canvas drawing
 */
var AudioTimeCanvasVisualizer = /** @class */ (function (_super) {
    __extends(AudioTimeCanvasVisualizer, _super);
    /*
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {number} [properties.fftSize=1024] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get time domain data.
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     */
    function AudioTimeCanvasVisualizer(properties) {
        return _super.call(this, __assign(__assign({ fftSize: 1024 }, properties), { type: 'time', format: 'float' })) || this;
    }
    AudioTimeCanvasVisualizer.prototype.draw = function (decodedSample) {
        this.decodedSample = decodedSample;
        this.sampleNumber++;
    };
    AudioTimeCanvasVisualizer.prototype.render = function () {
        var dataArray = this.decodedSample[this.properties.type][this.properties.format];
        try {
            var WIDTH = this.canvas.width;
            var HEIGHT = this.canvas.height + (25 * 100 / this.canvas.height);
            this.canvasCtx.fillStyle = 'rgb(255, 255, 255)';
            this.canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
            this.canvasCtx.lineWidth = 2;
            this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
            this.canvasCtx.beginPath();
            var sliceWidth = WIDTH / dataArray.length;
            var x = 0;
            for (var i = 0; i < dataArray.length; i++) {
                var v = dataArray[i];
                var y = v * HEIGHT + HEIGHT / 2;
                if (i === 0) {
                    this.canvasCtx.moveTo(x, y);
                }
                else {
                    this.canvasCtx.lineTo(x, y);
                }
                x += sliceWidth;
            }
            this.canvasCtx.strokeStyle = 'rgb(0,139,141)';
            this.canvasCtx.lineTo(WIDTH, HEIGHT / 2);
            this.canvasCtx.stroke();
            this.canvasCtx.fillStyle = 'rgba(198,198,198,0.8)';
            this.canvasCtx.fillRect(0, 0, 1, HEIGHT);
            this.canvasCtx.fillRect(0, HEIGHT - 10, WIDTH, 2);
        }
        catch (error) {
            console.error(error);
        }
    };
    return AudioTimeCanvasVisualizer;
}(AudioCanvasVisualizer));
export default AudioTimeCanvasVisualizer;
//# sourceMappingURL=AudioTimeCanvasVisualizer.js.map