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
import { isDefined, randomUUID } from "../../../../../utils/Utils";
import AudioVisualizer from "../AudioVisualizer";
var AudioRollingSpectrogramCanvasVisualizer = /** @class */ (function (_super) {
    __extends(AudioRollingSpectrogramCanvasVisualizer, _super);
    function AudioRollingSpectrogramCanvasVisualizer(properties) {
        var _this = _super.call(this, __assign(__assign({ fftSize: 1024 }, properties), { type: 'frequency', format: 'byte' })) || this;
        _this.initFrequencySpectrogram(properties);
        return _this;
    }
    AudioRollingSpectrogramCanvasVisualizer.prototype.initFrequencySpectrogram = function (properties) {
        var domNode = document.getElementById(properties.container);
        var bounds = domNode.getBoundingClientRect();
        var canvas = document.createElement("canvas");
        canvas.setAttribute("id", randomUUID());
        canvas.setAttribute("class", properties.css);
        canvas.setAttribute("width", bounds.width);
        canvas.setAttribute("height", bounds.height);
        domNode.appendChild(canvas);
        this.clearThreshold = 250;
        this.width = bounds.width;
        this.height = 256;
        this.x = 0;
        this.ctx = canvas.getContext('2d');
        this.imageData = this.ctx.getImageData(0, 0, this.width, this.height);
        this.buf = new ArrayBuffer(this.imageData.data.length);
        this.data32 = new Uint32Array(this.buf);
        this.data = this.imageData.data;
        this.buf8 = new Uint8ClampedArray(this.buf);
        this.animate();
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.animate = function () {
        var _this = this;
        this.requestId = requestAnimationFrame(function () { return _this.animate(); });
        this.render();
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.render = function () {
        var time = performance.now();
        if (time - this.lastTime > this.clearThreshold) {
            this.DATA = null;
        }
        if (isDefined(this.DATA)) {
            this.update_geometry();
        }
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.update_geometry = function () {
        var colorData = this.colorizeData(this.DATA);
        this.addColumn(colorData);
        this.imageData.data.set(this.buf8);
        this.ctx.putImageData(this.imageData, 0, 0);
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.draw = function (decodedSample) {
        var data = decodedSample[this.properties.type][this.properties.format];
        var length = data.length;
        this.DATA = new Float32Array(length);
        // Reverse the direction, making lower frequencies on the bottom.
        for (var i = length - 1; i >= 0; i--) {
            this.DATA[i] = (data[length - 1 - i]) / 255.0;
        }
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.setPixel = function (x, y, red, green, blue, alpha) {
        this.data32[y * this.width + x] =
            (alpha << 24) | // alpha
                (blue << 16) | // blue
                (green << 8) | // green
                red; // red
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.addColumn = function (colorizeData) {
        for (var y = 0; y < this.height; y++) {
            this.setPixel(this.x, y, colorizeData[4 * y + 0], colorizeData[4 * y + 1], colorizeData[4 * y + 2], colorizeData[4 * y + 3]);
        }
        this.x++;
        this.x %= this.width;
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.color = function (value) {
        var rgb = { R: 0, G: 0, B: 0 };
        if (0 <= value && value <= 1 / 8) {
            rgb.R = 0;
            rgb.G = 0;
            rgb.B = 4 * value + .5; // .5 - 1 // b = 1/2
        }
        else if (1 / 8 < value && value <= 3 / 8) {
            rgb.R = 0;
            rgb.G = 4 * value - .5; // 0 - 1 // b = - 1/2
            rgb.B = 0;
        }
        else if (3 / 8 < value && value <= 5 / 8) {
            rgb.R = 4 * value - 1.5; // 0 - 1 // b = - 3/2
            rgb.G = 1;
            rgb.B = -4 * value + 2.5; // 1 - 0 // b = 5/2
        }
        else if (5 / 8 < value && value <= 7 / 8) {
            rgb.R = 1;
            rgb.G = -4 * value + 3.5; // 1 - 0 // b = 7/2
            rgb.B = 0;
        }
        else if (7 / 8 < value && value <= 1) {
            rgb.R = -4 * value + 4.5; // 1 - .5 // b = 9/2
            rgb.G = 0;
            rgb.B = 0;
        }
        else { // should never happen - value > 1
            rgb.R = .5;
            rgb.G = 0;
            rgb.B = 0;
        }
        return [rgb.R, rgb.G, rgb.B, 1].map(function (d) { return parseInt(d * 255, 10); });
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.colorizeData = function (data) {
        var colorData = new Uint8Array(this.properties.fftSize * 2);
        for (var i = 0, n = data.length; i < n; i++) {
            colorData.set(this.color(data[i]), i * 4);
        }
        return colorData;
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.onended = function () {
        this.lastTime = performance.now();
    };
    AudioRollingSpectrogramCanvasVisualizer.prototype.reset = function () { };
    return AudioRollingSpectrogramCanvasVisualizer;
}(AudioVisualizer));
export default AudioRollingSpectrogramCanvasVisualizer;
//# sourceMappingURL=AudioRollingSpectrogramCanvasVisualizer.js.map