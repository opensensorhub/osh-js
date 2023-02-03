/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2015-2021 Mathieu Dhainaut. All Rights Reserved.
 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import View from "../View.js";
import { isDefined } from "../../../utils/Utils";
import FfmpegAudio from "./decoder/FfmpegAudio";
/**
 * This class is in charge of listening Audio using either default native WebAPI or compatible WebCodec(if supported)
 * @extends View
 * @example
 *
 import AudioView from 'core/ui/view/audio/AudioView.js';

 let audioView = new AudioView({
  name: 'Audio',
  dataSourceId: audioDatasource.id
});
 */
var AudioView = /** @class */ (function (_super) {
    __extends(AudioView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {number} [properties.gain=1.0] - set the gain to be applied to the input  before its propagation to the output
     * @param {string} [properties.codec='aac'] - the audio codec
     * @param {boolean} [properties.playSound=true] - define if the sound is playing on the output
     * @param {Datasource} properties.dataSource - the dataSource object
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     */
    function AudioView(properties) {
        var _this = _super.call(this, __assign(__assign({ supportedLayers: ['audioData'], gain: 1.0, playSound: true, codec: 'aac', visualizers: [], frequency: 8000 }, properties), { visible: false })) || this;
        _this.visualizers = _this.properties.visualizers;
        _this.isInitContext = false;
        _this.webCodecApiMapping = {
            'aac': 'mp4a.40.2',
        };
        return _this;
    }
    AudioView.prototype.initVisualizers = function () {
        this.visualizersMap = {};
        for (var _i = 0, _a = this.visualizers; _i < _a.length; _i++) {
            var visualizer = _a[_i];
            /**
             *
             * Module is {
             *     analyzer: <analyzer_instance>,
             *     type: 'time' | 'frequency',
             *     format: 'byte' | 'float'
             * }
             */
            this.visualizersMap[visualizer.id] = visualizer.createAnalyzer(this.audioCtx);
        }
    };
    AudioView.prototype.addVisualizer = function (visualizer) {
        // add to current existing context
        // otherwise, will be initialized later
        if (isDefined(this.audioCtx)) {
            this.visualizersMap[visualizer.id] = visualizer.createAnalyzer(this.audioCtx);
        }
        this.visualizers.push(visualizer);
    };
    AudioView.prototype.initAudioContext = function (sampleRate, compression, timestamp) {
        if (!this.isInitContext) {
            // time audio position
            this.deltaInc = 0.2;
            this.audioCtx = null;
            this.analyzerTimeNode = null;
            this.analyzerFreqNode = null;
            this.analyzerFreqByteNode = null;
            this.gainNode = null;
            this.gain = this.properties.gain;
            var AudioContext_1 = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext_1({
                sampleRate: sampleRate,
                latencyHint: 'interactive'
            });
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.gain.setValueAtTime(this.gain, 0);
            this.startTime = timestamp;
            this.isInitContext = true;
            this.initDecoder(compression);
            this.initVisualizers();
        }
    };
    AudioView.prototype.initDecoder = function (compression) {
        try {
            //TODO: since the WebCodec API changed after chrome >=94, we need to detect correctly which version
            // of the browser is used to be sure to apply the right decoder
            // this.decoder = new WebCodecApi({
            if (!(compression in this.webCodecApiMapping)) {
                throw Error("Compression ".concat(compression, " is not supported by WebCodecApi"));
            }
            this.decoder = new FfmpegAudio(__assign(__assign({}, this.properties), { codec: this.webCodecApiMapping[compression], audioCtx: this.audioCtx }));
            console.warn('using WebCodec for audio decoding');
        }
        catch (error) {
            this.decoder = new FfmpegAudio(__assign(__assign({}, this.properties), { audioCtx: this.audioCtx }));
            console.warn('using FfmpegAudio for audio decoding');
        }
        this.decoder.onDecodedBuffer = this.onDecodedBuffer.bind(this);
    };
    AudioView.prototype.onDecodedBuffer = function (audioBuffer, timestamp) {
        var _this = this;
        var replaySpeed = 1.0;
        if (isDefined(this.properties.dataSource)) {
            replaySpeed = this.properties.dataSource.getReplaySpeed();
        }
        var source = this.audioCtx.createBufferSource();
        source.buffer = audioBuffer;
        // source.detune.value = replaySpeed  * 100;
        source.playbackRate.value = replaySpeed;
        var node = source;
        node = node.connect(this.gainNode);
        // connect to visualizers using modules
        for (var _i = 0, _a = this.visualizers; _i < _a.length; _i++) {
            var visualizer = _a[_i];
            node = node.connect(this.visualizersMap[visualizer.id]['analyzer']);
        }
        // play sound
        if (this.properties.playSound) {
            node.connect(this.audioCtx.destination);
        }
        source.start(this.deltaInc);
        //  if timestamp is defined, use it.  Otherwise compute
        if (timestamp === undefined)
            timestamp = this.startTime + this.deltaInc * 1000;
        if (isDefined(this.lastTimestamp)) {
            this.deltaInc += (timestamp - this.lastTimestamp) / 1000;
        }
        else {
            this.deltaInc += audioBuffer.duration;
        }
        this.lastTimestamp = timestamp;
        var decoded = {
            buffer: audioBuffer,
            // timestamp: this.startTime + this.deltaInc * 1000,
            timestamp: timestamp,
            time: {},
            frequency: {}
        };
        // gets the necessary decoded data
        var visModule;
        for (var _b = 0, _c = this.visualizers; _b < _c.length; _b++) {
            var visualizer = _c[_b];
            // time | frequency
            // --> byte | float
            visModule = this.visualizersMap[visualizer.id];
            if (visModule.type === 'time') {
                if (visModule.format === 'byte' && !decoded['time'].hasOwnProperty('byte')) {
                    var array = new Uint8Array(visModule['analyzer'].fftSize);
                    visModule['analyzer'].getByteTimeDomainData(array);
                    decoded['time']['byte'] = array;
                }
                else if (visModule.format === 'float' && !decoded['time'].hasOwnProperty('float')) {
                    var array = new Float32Array(visModule['analyzer'].fftSize);
                    visModule['analyzer'].getFloatTimeDomainData(array);
                    decoded['time']['float'] = array;
                }
            }
            else if (visModule.type === 'frequency') {
                if (visModule.format === 'byte' && !decoded['frequency'].hasOwnProperty('byte')) {
                    var array = new Uint8Array(visModule['analyzer'].frequencyBinCount);
                    visModule['analyzer'].getByteFrequencyData(array);
                    decoded['frequency']['byte'] = array;
                }
                else if (visModule.format === 'float' && !decoded['frequency'].hasOwnProperty('float')) {
                    var array = new Float32Array(visModule['analyzer'].frequencyBinCount);
                    visModule['analyzer'].getFloatFrequencyData(array);
                    decoded['frequency']['float'] = array;
                }
            }
        }
        // forward result
        for (var _d = 0, _e = this.visualizers; _d < _e.length; _d++) {
            var visualizer = _e[_d];
            visualizer.draw(decoded);
        }
        this.onEndedDecodedBuffer(decoded);
        source.onended = function (event) {
            for (var _i = 0, _a = _this.visualizers; _i < _a.length; _i++) {
                var visualizer = _a[_i];
                visualizer.onended(decoded);
            }
        };
    };
    AudioView.prototype.onEndedDecodedBuffer = function (audioBuffer) { };
    AudioView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i, value, frame, audioBuffer;
            return __generator(this, function (_a) {
                if (data.type === 'audioData') {
                    values = data.values;
                    for (i = 0; i < values.length; i++) {
                        value = values[i];
                        if (!this.isInitContext) {
                            this.codec = value.frameData.compression;
                            this.initAudioContext(value.sampleRate, value.frameData.compression.toLowerCase(), value.timestamp);
                        }
                        if (this.properties.codec === 'raw') {
                            frame = new Float32Array(value.frameData);
                            audioBuffer = this.audioCtx.createBuffer(1, frame.length, this.audioCtx.sampleRate);
                            audioBuffer.copyToChannel(frame, 0, 0);
                            this.onDecodedBuffer(audioBuffer, value.timestamp);
                        }
                        else {
                            this.decoder.decode(value, value.timestamp);
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    AudioView.prototype.reset = function () {
        _super.prototype.reset.call(this);
        if (isDefined(this.decoder)) {
            this.decoder.reset();
        }
        if (this.isInitContext) {
            for (var _i = 0, _a = this.visualizers; _i < _a.length; _i++) {
                var visualizer = _a[_i];
                visualizer.reset();
                this.visualizersMap[visualizer.id]['analyzer'].disconnect();
            }
            if (isDefined(this.gainNode)) {
                this.gainNode.disconnect();
            }
            this.lastTimestamp = undefined;
            this.audioCtx.close();
            this.isInitContext = false;
        }
    };
    AudioView.prototype.getCurrentTime = function () {
        if (this.audioCtx === null) {
            return 0;
        }
        return this.audioCtx.currentTime;
    };
    AudioView.prototype.setGain = function (value) {
        if (isDefined(this.gainNode)) {
            this.gainNode.gain.setValueAtTime(value, 0);
        }
        else {
            this.gain = value;
        }
    };
    return AudioView;
}(View));
export default AudioView;
//# sourceMappingURL=AudioView.js.map