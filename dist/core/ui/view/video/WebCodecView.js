/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.
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
import { isDefined } from "../../../utils/Utils.js";
import '../../../resources/css/ffmpegview.css';
import CanvasView from "./CanvasView";
import DecodeWorker from './workers/webapi.decode.worker.js';
import { FrameType } from "./FrameType";
/**
 * This class is in charge of displaying H264 data by decoding ffmpeg.js library and displaying into them a YUV canvas.
 * @extends CanvasView
 * @example
 *
 import WebCodecView from 'core/ui/view/video/WebCodecView.js';

 let videoView = new WebCodecView({
  container: 'video-h264-container',
  css: 'video-h264',
  name: 'UAV Video',
  layers: [
      new DataLayer({
        dataSourceId: videoDataSource.id,
        getFrameData: (rec) => rec.videoFrame,
        getTimestamp: (rec) => rec.timestamp
      })
  ]
});
 */
var WebCodecView = /** @class */ (function (_super) {
    __extends(WebCodecView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Boolean} [properties.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [properties.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {String} [properties.codec='h264'] - Video codec
     */
    function WebCodecView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['videoData'] }, properties)) || this;
        if (!'VideoEncoder' in window) {
            // WebCodecs API is not supported.
            throw Error('WebCodec API is not supported');
        }
        // common VP8/ VP9/ H264 profiles. May not work depending on the video encoding profile
        _this.codecMap = {
            'vp9': 'vp09.02.10.10.01.09.16.09.01',
            'vp8': 'vp08.00.41.08',
            'h264': 'avc1.42e01e'
        };
        // default use H264 codec
        _this.codec = _this.codecMap['h264'];
        if (isDefined(properties.codec)) {
            if (!properties.codec in _this.codecMap) {
                throw Error("The codec properties.codec is not supported, the list of supported codec: this.codecMap");
            }
            else {
                _this.codec = _this.codecMap[properties.codec];
            }
        }
        // create webGL canvas
        _this.canvasElt = _this.createCanvas(_this.width, _this.height);
        _this.domNode.appendChild(_this.canvasElt);
        return _this;
    }
    /**
     * Create <canvas> DOM element with some height/width/style
     * @protected
     * @param {String} width - the width
     * @param {String} height - the height
     * @param {String} style - the dom element style (Optional)
     */
    WebCodecView.prototype.createCanvas = function (width, height, style) {
        var canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);
        if (isDefined(style)) {
            canvasElement.setAttribute('style', style);
        }
        return canvasElement;
    };
    WebCodecView.prototype.updateCanvasSize = function (width, height) {
        this.canvasElt.setAttribute('width', width);
        this.canvasElt.setAttribute('height', height);
    };
    WebCodecView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var values, i;
            return __generator(this, function (_a) {
                if (data.type === 'videoData') {
                    values = data.values;
                    for (i = 0; i < values.length; i++) {
                        this.updateVideo(values[i]);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    WebCodecView.prototype.updateVideo = function (props) {
        if (!this.skipFrame) {
            if (!this.codecConfigured) {
                this.codec = this.codecMap[props.frameData.compression.toLowerCase()];
                this.initDecoder();
            }
            this.decode(props.frameData.data.length, props.frameData.data, props.timestamp, props.roll || 0);
        }
    };
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    WebCodecView.prototype.reset = function () {
    };
    WebCodecView.prototype.initDecoder = function () {
        var _this = this;
        this.gl = this.canvasElt.getContext("bitmaprenderer");
        this.decodeWorker = new DecodeWorker();
        this.decodeWorker.postMessage({
            init: {
                codec: this.codec,
                width: this.width,
                height: this.height
            },
        });
        this.decodeWorker.onmessage = function (event) {
            if (event.data.init) {
                _this.codecConfigured = true;
            }
            else if (_this.codecConfigured) {
                var bitmap = event.data.bitmap;
                var width = event.data.width;
                var height = event.data.height;
                // for some reason, the web worker failed to create the bitmal
                if (!isDefined(bitmap)) {
                    console.warn('Bitmap is undefined, skipping this frame..');
                    return;
                }
                _this.handleDocodedFrame(bitmap, width, height);
            }
        };
    };
    WebCodecView.prototype.handleDocodedFrame = function (bitmap, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (this.width !== width || this.height !== height) {
                        this.width = width;
                        this.height = height;
                        //re-configure the canvas
                        this.updateCanvasSize(width, height);
                    }
                    // draw image
                    this.gl.transferFromImageBitmap(bitmap);
                    // update stats
                    this.onAfterDecoded(bitmap, FrameType.ARRAY);
                    this.updateStatistics(event.data.pktSize);
                    if (this.showTime) {
                        this.textFpsDiv.innerText = new Date(event.data.timestamp).toISOString() + ' ';
                    }
                    if (this.showStats) {
                        this.textStatsDiv.innerText = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                            (this.statistics.averageBitRate / 1000).toFixed(2) + ' kB/s @';
                    }
                    this.onUpdated(this.statistics);
                }
                catch (exception) {
                    console.error(exception);
                    //continue;
                }
                finally {
                    bitmap.close();
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timestamp
     */
    WebCodecView.prototype.decode = function (pktSize, pktData, timestamp, roll) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.codecConfigured) {
                    this.decodeWorker.postMessage({
                        pktSize: pktSize,
                        pktData: pktData,
                        roll: roll,
                        codec: this.codec,
                        timestamp: timestamp,
                    }, [pktData.buffer]);
                }
                else {
                    console.warn('decoder has not been initialized yet');
                }
                return [2 /*return*/];
            });
        });
    };
    WebCodecView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    WebCodecView.prototype.getCanvas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.canvasElt];
            });
        });
    };
    WebCodecView.prototype.drawFrame = function (decodedFrame) {
        throw Error('Not supported operation');
    };
    return WebCodecView;
}(CanvasView));
export default WebCodecView;
//# sourceMappingURL=WebCodecView.js.map