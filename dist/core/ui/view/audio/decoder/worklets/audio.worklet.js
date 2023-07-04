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
var AudioPlayer = /** @class */ (function (_super) {
    __extends(AudioPlayer, _super);
    function AudioPlayer() {
        var _this = _super.call(this) || this;
        _this.audioBuffers = [];
        _this.readIdx = 0;
        _this.audioBuffersIdx = 0;
        // set audio to play when received from main/worker thread
        _this.port.onmessage = function (_a) {
            var data = _a.data;
            _this.audioBuffers.push(new Float32Array(data.data));
        };
        return _this;
    }
    AudioPlayer.prototype.process = function (inputs, _a, _b) {
        var _c = _a[0], outLeft = _c[0], outRight = _c[1];
        var audioSrcIndex = _b.audioSrcIndex;
        if (this.audioBuffers.length > 0) {
            for (var i = 0; i < outLeft.length; i++, this.readIdx++) {
                // copy 128 samples from decodedAudio to outputs channels
                if (this.readIdx >= this.audioBuffers[0].length) {
                    // SHIFT
                    this.readIdx = 0;
                    this.audioBuffers.shift();
                    this.port.postMessage({});
                    // this.readIdx = 0;
                    if (this.audioBuffers.length === 0) {
                        break;
                    }
                }
                // mono
                outLeft[i] = this.audioBuffers[0][this.readIdx];
            }
        }
        // run process() again for next 128 samples
        return true;
    };
    return AudioPlayer;
}(AudioWorkletProcessor));
registerProcessor('audio-player', AudioPlayer);
//# sourceMappingURL=audio.worklet.js.map