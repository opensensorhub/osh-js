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
import { assertDefined, randomUUID } from "../../../../utils/Utils";
/**
 * This abstract class is in charge of visualizing Audio using a decoded AudioBuffer
 */
var AudioVisualizer = /** @class */ (function () {
    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     */
    function AudioVisualizer(properties) {
        var _newTarget = this.constructor;
        if (_newTarget === AudioVisualizer) {
            throw new TypeError("Cannot construct AudioVisualizer instances directly");
        }
        assertDefined(properties.container, 'container must be defined in constructor argument');
        this.properties = __assign({ css: '' }, properties);
        this.id = randomUUID();
    }
    AudioVisualizer.prototype.draw = function (decodedSample) { };
    AudioVisualizer.prototype.onended = function (decodedSample) { };
    AudioVisualizer.prototype.createAnalyzer = function (audioCtx) {
        var analyzerNode = audioCtx.createAnalyser();
        analyzerNode.fftSize = this.properties.fftSize;
        analyzerNode.smoothingTimeConstant = 0.5;
        return {
            analyzer: analyzerNode,
            type: this.properties.type,
            format: this.properties.format
        };
    };
    AudioVisualizer.prototype.reset = function () { };
    return AudioVisualizer;
}());
export default AudioVisualizer;
//# sourceMappingURL=AudioVisualizer.js.map