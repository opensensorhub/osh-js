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
import '../../../resources/css/ffmpegview.css';
import CanvasView from "./CanvasView";
import DecodeWorker from './workers/webapi.decode.worker.js';
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
        dataSourceId: videoDataSource.id
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
        var _this = _super.call(this, __assign({ supportedLayers: ['data'] }, properties)) || this;
        _this.codec = 'h264';
        _this.canvasElt = _this.createCanvas(_this.width, _this.height, 'transform: scaleY(-1)');
        _this.domNode.appendChild(_this.canvasElt);
        _this.videoDecoder = _this.createWebDecoder();
        _this.initDecodeWorker();
        return _this;
    }
    WebCodecView.prototype.createWebDecoder = function () {
        this.codecConfigured = false;
        var canvasCtx = this.canvasElt.getContext('bitmaprenderer');
        function paintFrameToCanvas(videoFrame) {
            videoFrame.createImageBitmap({
                imageOrientation: "flipY"
            }).then(function (bitmap) {
                canvasCtx.transferFromImageBitmap(bitmap);
            });
        }
        function onDecoderError(error) {
            console.error(error);
        }
        return new VideoDecoder({
            output: paintFrameToCanvas,
            error: onDecoderError
        });
    };
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
    WebCodecView.prototype.setData = function (dataSourceId, data) {
        var values = data.values;
        for (var i = 0; i < values.length; i++) {
            if (!this.skipFrame) {
                var value = values.shift();
                var pktData = value.data.frameData;
                var roll = value.data.roll;
                var pktSize = pktData.length;
                this.decode(pktSize, pktData, value.timeStamp, roll);
            }
        }
    };
    WebCodecView.prototype.initDecodeWorker = function () {
        this.decodeWorker = new DecodeWorker();
        this.decodeWorker.id = randomUUID();
        var that = this;
        this.decodeWorker.onmessage = function (e) {
            var encodedFrame = e.data;
            var videoData = encodedFrame.videoData;
            var timeStamp = encodedFrame.timeStamp;
            var pktSize = encodedFrame.pktSize;
            var chunk = new EncodedVideoChunk({
                type: encodedFrame.key ? "key" : "delta",
                timeStamp: timeStamp,
                data: videoData
            });
            try {
                that.videoDecoder.decode(chunk);
            }
            catch (error) {
                console.error(error);
            }
            that.updateStatistics(pktSize);
            if (that.showTime) {
                that.textFpsDiv.innerText = new Date(timeStamp).toISOString() + ' ';
            }
            if (that.showStats) {
                that.textStatsDiv.innerText = that.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (that.statistics.averageBitRate / 1000).toFixed(2) + ' kB/s @' +
                    that.width + "x" + that.height + '\n ' + that.codec;
            }
            that.onUpdated(that.statistics);
        };
    };
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    WebCodecView.prototype.reset = function () {
    };
    WebCodecView.prototype.ev = function (signed, data) {
        var bitCount = 0;
        while (this.getBit(data) === 0) {
            bitCount++;
        }
        var result = 1;
        for (var i = 0; i < bitCount; i++) {
            var b = this.getBit(data);
            result = result * 2 + b;
        }
        result--;
        if (signed) {
            result = (result + 1) / 2 * (result % 2 === 0 ? -1 : 1);
        }
        return result;
    };
    WebCodecView.prototype.uev = function (data) {
        return this.ev(false, data);
    };
    WebCodecView.prototype.sev = function (data) {
        return this.ev(true, data);
    };
    WebCodecView.prototype.getU = function (bits, data) {
        var result = 0;
        for (var i = 0; i < bits; i++) {
            result = result * 2 + this.getBit(data);
        }
        return result;
    };
    WebCodecView.prototype.getBit = function (data) {
        var mask = 1 << (7 - (this.pos & 7));
        var idx = this.pos >> 3;
        this.pos++;
        return ((data[idx] & mask) === 0) ? 0 : 1;
    };
    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timeStamp
     */
    WebCodecView.prototype.decode = function (pktSize, pktData, timeStamp, roll) {
        if (pktSize > 0) {
            this.pos = 4 * 8;
            var arrayBuffer = pktData.buffer;
            // check configure
            // init decoder with config
            if (!this.codecConfigured) {
                if (pktData[4] === 0x67) {
                    var data = pktData;
                    var forbidden_zero_bit = this.getU(1, data);
                    var nal_ref_idc = this.getU(2, data); // 3 for SPS
                    var nal_unit_type = this.getU(5, data); // 7 = SPS
                    var profile_idc = this.getU(8, data); // 66 = Baseline
                    var constraint_set0_flag = this.getU(1, data);
                    var constraint_set1_flag = this.getU(1, data);
                    var constraint_set2_flag = this.getU(1, data);
                    var constraint_set3_flag = this.getU(1, data);
                    var reserved = this.getU(4, data);
                    var level_idc = this.getU(8, data);
                    var seq_parameter_set_id = this.uev(data);
                    var log2_max_frame_num_minus4 = this.uev(data);
                    var pict_order_cnt_type = this.uev(data);
                    if (pict_order_cnt_type === 0) {
                        this.uev(data);
                    }
                    else if (pict_order_cnt_type === 1) {
                        this.getU(1, data);
                        this.sev(data);
                        this.sev(data);
                        var n = this.uev(data);
                        for (var i = 0; i < n; i++) {
                            this.sev(data);
                        }
                    }
                    var num_ref_frames = this.uev(data);
                    var gaps_in_frame_num_value_allowed_flag = this.getU(1, data);
                    var pic_width = (this.uev(data) + 1) * 16;
                    var pic_height = (this.uev(data) + 1) * 16;
                    var frame_mbs_only_flag = this.getU(1, data);
                    var direct_8x8_inference_flag = this.getU(1, data);
                    var frame_cropping_flag = this.getU(1, data);
                    var vui_prameters_present_flag = this.getU(1, data);
                    var rbsp_stop_one_bit = this.getU(1, data);
                    this.videoDecoder.configure({
                        codec: 'avc1.42e01e',
                        description: new Uint8Array([
                            0x01, 0x42, 0xC0, 0x1E, 0xFF,
                            0xE1, 0, 9, 103, 66, 64, 31, 166, 128, 80, 5, 185,
                            0x01, 0, 5, 104, 206, 48, 166, 128 // pps
                        ]),
                        codedWidth: parseInt(pic_width),
                        codedHeight: parseInt(pic_height)
                    });
                    this.codecConfigured = true;
                    this.width = pic_width;
                    this.height = pic_height;
                }
            }
            else {
                this.decodeWorker.postMessage({
                    pktSize: pktSize,
                    pktData: pktData,
                    roll: roll,
                    timeStamp: timeStamp,
                    dataSourceId: this.dataSourceId
                }, [arrayBuffer]);
                pktData = null;
            }
        }
    };
    WebCodecView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return WebCodecView;
}(CanvasView));
export default WebCodecView;
//# sourceMappingURL=WebCodecView.js.map