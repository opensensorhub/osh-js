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
import { isDefined, randomUUID } from "../../../utils/Utils.js";
import DecodeWorker from './workers/ffmpeg.decode.worker.js';
import '../../../resources/css/ffmpegview.css';
import YUVCanvas from "./YUVCanvas";
import CanvasView from "./CanvasView";
import { FrameType } from "./FrameType";
/**
 * This class is in charge of displaying H264 data by decoding ffmpeg.js library and displaying into them a YUV canvas.
 * @extends CanvasView
 * @example
 *
 import FFMPEGView from 'core/ui/view/video/FFMPEGView.js';

 let videoView = new FFMPEGView({
  container: 'video-h264-container',
  css: 'video-h264',
  name: 'UAV Video',
  framerate:25,
  showTime: true,
  showStats: true,
    layers: [
      new VideoDataLayer({
        dataSourceId: videoDataSource.id,
        getFrameData: (rec) => rec.videoFrame,
        getTimestamp: (rec) => rec.timestamp
      })
  ]
});
 */
var FFMPEGView = /** @class */ (function (_super) {
    __extends(FFMPEGView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {string} properties.container - The div element to attach to
     * @param {string} properties.css - The css classes to set, can be multiple if separate by spaces
     * @param {boolean} properties.visible - set the default behavior of the visibility of the view
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Number} [properties.framerate=29.67] - The framerate to play 1s/framerate and get smooth display
     * @param {Boolean} [properties.directPlay=false] - Enable or ignore the framerate play
     * @param {Boolean} [properties.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [properties.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {Number} [properties.width=1920] - Set the default canvas width
     * @param {Number} [properties.height=1080] - Set the default canvas height
     * @param {String} [properties.codec='h264'] - Video codec
     */
    function FFMPEGView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['videoData'] }, properties)) || this;
        _this.directPlay = false;
        _this.codec = 'h264';
        // create webGL canvas
        _this.yuvCanvas = _this.createCanvas(_this.width, _this.height);
        _this.domNode.appendChild(_this.yuvCanvas.canvasElement);
        _this.buf = [];
        _this.bufferingTime = 2 * 1000;
        return _this;
    }
    FFMPEGView.prototype.createCanvas = function (width, height, style) {
        return new YUVCanvas({ width: width, height: height, contextOptions: { preserveDrawingBuffer: true } });
    };
    FFMPEGView.prototype.setData = function (dataSourceId, data) {
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
    FFMPEGView.prototype.updateVideo = function (props) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.skipFrame) {
                    if (this.decodeWorker == null) {
                        this.initFFMPEG_DECODER_WORKER(props.frameData.compression);
                    }
                    return [2 /*return*/, this.decode(props.frameData.data.length, props.frameData.data, props.timestamp, props.roll || 0)];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    FFMPEGView.prototype.reset = function () {
        this.skipFrame = true;
        // if(isDefined(this.decodeWorker)) {
        //     this.decodeWorker.terminate();
        //     this.decodeWorker = null;
        // }
        this.decodeWorker.postMessage({
            message: 'release'
        });
        var nodata = new Uint8Array(1);
        nodata[0] = 128;
        this.yuvCanvas.drawNextOuptutPictureGL({
            yData: nodata,
            yDataPerRow: 1,
            yRowCnt: 1,
            uData: nodata,
            uDataPerRow: 1,
            uRowCnt: 1,
            vData: nodata,
            vDataPerRow: 1,
            vRowCnt: 1
        });
        this.skipFrame = false;
    };
    //-- FFMPEG DECODING PART
    //-------------------------------------------------------//
    //---------- Web worker --------------------------------//
    //-----------------------------------------------------//
    /**
     * The worker code is located at the location js/workers/Ffmpeg.worker.js.
     * This location cannot be changed. Be sure to have the right file at the right place.
     * @private
     */
    FFMPEGView.prototype.initFFMPEG_DECODER_WORKER = function (codec) {
        this.decodeWorker = new DecodeWorker();
        // const drawWorker = new DrawWorker();
        this.decodeWorker.id = randomUUID();
        this.decodeWorker.postMessage({
            'message': 'init',
            'codec': codec.toLowerCase()
        });
        // const offscreenCanvas = this.canvas.transferControlToOffscreen();
        // let canvas = document.createElement('canvas');
        // canvas.setAttribute('width', this.width);
        // canvas.setAttribute('height', this.height);
        // this.domNode.appendChild(canvas);
        // const offscreenCanvas = canvas.transferControlToOffscreen();
        // drawWorker.postMessage({
        //     canvas: offscreenCanvas,
        //     width: this.width,
        //     height: this.height,
        //     framerate: this.framerate,
        //     dataSourceId: this.dataSourceId
        // }, [offscreenCanvas]);
        var that = this;
        this.decodeWorker.onmessage = function (e) {
            var decodedFrame = e.data;
            that.drawFrame(decodedFrame);
            this.onAfterDecoded(decodedFrame, FrameType.ARRAY);
            this.updateStatistics(decodedFrame.pktSize);
            if (this.showTime) {
                this.textFpsDiv.innerText = new Date(decodedFrame.timestamp).toISOString() + ' ';
            }
            if (this.showStats) {
                this.textStatsDiv.innerText = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate / 1000).toFixed(2) + ' kB/s @' +
                    that.yuvCanvas.width + "x" + that.yuvCanvas.height + '\n ' + this.codec;
            }
            this.onUpdated(this.statistics);
        }.bind(this);
    };
    FFMPEGView.prototype.drawFrame = function (decodedFrame) {
        this.yuvCanvas.canvasElement.drawing = true;
        if (this.width !== decodedFrame.frame_width ||
            this.height !== decodedFrame.frame_height) {
            //re-create the canvas
            this.yuvCanvas.resize(decodedFrame.frame_width, decodedFrame.frame_height);
            this.width = decodedFrame.frame_width;
            this.height = decodedFrame.frame_height;
        }
        this.yuvCanvas.drawNextOuptutPictureGL({
            yData: decodedFrame.frameYData,
            yDataPerRow: decodedFrame.frame_width,
            yRowCnt: decodedFrame.frame_height,
            uData: decodedFrame.frameUData,
            uDataPerRow: decodedFrame.frame_width / 2,
            uRowCnt: decodedFrame.frame_height / 2,
            vData: decodedFrame.frameVData,
            vDataPerRow: decodedFrame.frame_width / 2,
            vRowCnt: decodedFrame.frame_height / 2,
            roll: decodedFrame.roll
        });
        this.yuvCanvas.canvasElement.drawing = false;
    };
    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timestamp
     */
    FFMPEGView.prototype.decode = function (pktSize, pktData, timestamp, roll) {
        return __awaiter(this, void 0, void 0, function () {
            var arrayBuffer;
            return __generator(this, function (_a) {
                if (pktSize > 0) {
                    arrayBuffer = pktData.buffer;
                    this.decodeWorker.postMessage({
                        message: 'data',
                        pktSize: pktSize,
                        pktData: arrayBuffer,
                        roll: roll,
                        byteOffset: pktData.byteOffset,
                        codec: this.codec,
                        timestamp: timestamp,
                        dataSourceId: this.dataSourceId
                    }, [arrayBuffer]);
                    pktData = null;
                }
                return [2 /*return*/];
            });
        });
    };
    FFMPEGView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
        }
        if (isDefined(this.decodeWorker)) {
            this.decodeWorker.postMessage({
                message: 'release'
            });
            this.decodeWorker.terminate();
        }
    };
    FFMPEGView.prototype.getCanvas = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.yuvCanvas.canvasElement];
            });
        });
    };
    return FFMPEGView;
}(CanvasView));
export default FFMPEGView;
//# sourceMappingURL=FFMPEGView.js.map