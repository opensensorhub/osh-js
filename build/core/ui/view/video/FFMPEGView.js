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
import { isDefined, randomUUID } from "../../../utils/Utils.js";
import DecodeWorker from './workers/ffmpeg.decode.worker.js';
import '../../../resources/css/ffmpegview.css';
import YUVCanvas from "./YUVCanvas";
import CanvasView from "./CanvasView";
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
      new DataLayer({
        dataSourceId: videoDataSource.id
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
     * @param {String} [properties.codec='h264'] - Video codec
     */
    function FFMPEGView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['data'] }, properties)) || this;
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
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            if (!this.skipFrame) {
                if (this.decodeWorker == null) {
                    this.initFFMPEG_DECODER_WORKER();
                }
                var value = values.shift();
                var pktData = value.data.frameData;
                var roll = value.data.roll;
                var pktSize = pktData.length;
                this.decode(pktSize, pktData, value.timeStamp, roll);
            }
        }
    };
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    FFMPEGView.prototype.reset = function () {
        if (this.decodeWorker !== null) {
            this.decodeWorker.terminate();
            this.decodeWorker = null;
        }
        this.resetCalled = true;
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
    FFMPEGView.prototype.initFFMPEG_DECODER_WORKER = function () {
        this.decodeWorker = new DecodeWorker();
        // const drawWorker = new DrawWorker();
        this.decodeWorker.id = randomUUID();
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
            if (that.width !== decodedFrame.frame_width ||
                that.height !== decodedFrame.frame_height) {
                //re-create the canvas
                that.yuvCanvas.resize(decodedFrame.frame_width, decodedFrame.frame_height);
                that.width = decodedFrame.frame_width;
                that.height = decodedFrame.frame_height;
            }
            that.yuvCanvas.canvasElement.drawing = true;
            that.yuvCanvas.drawNextOuptutPictureGL({
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
            that.yuvCanvas.canvasElement.drawing = false;
            this.updateStatistics(decodedFrame.pktSize);
            if (this.showTime) {
                this.textFpsDiv.innerText = new Date(decodedFrame.timeStamp).toISOString() + ' ';
            }
            if (this.showStats) {
                this.textStatsDiv.innerText = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate / 1000).toFixed(2) + ' kB/s @' +
                    that.yuvCanvas.width + "x" + that.yuvCanvas.height + '\n ' + this.codec;
            }
            this.onUpdated(this.statistics);
        }.bind(this);
    };
    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timeStamp
     */
    FFMPEGView.prototype.decode = function (pktSize, pktData, timeStamp, roll) {
        if (pktSize > 0) {
            var arrayBuffer = pktData.buffer;
            this.decodeWorker.postMessage({
                pktSize: pktSize,
                pktData: arrayBuffer,
                roll: roll,
                byteOffset: pktData.byteOffset,
                codec: this.codec,
                timeStamp: timeStamp,
                dataSourceId: this.dataSourceId
            }, [arrayBuffer]);
            pktData = null;
        }
    };
    FFMPEGView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
        }
        this.decodeWorker.postMessage({
            message: 'release'
        });
        this.decodeWorker.terminate();
    };
    return FFMPEGView;
}(CanvasView));
export default FFMPEGView;
//# sourceMappingURL=FFMPEGView.js.map