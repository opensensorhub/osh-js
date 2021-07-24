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

import {isDefined, isWebWorker, randomUUID} from "../../../utils/Utils.js";
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

class WebCodecView extends CanvasView {
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
    constructor(properties) {
        super({
            supportedLayers: ['data'],
            ...properties
        });

        this.codec = 'h264';

        this.canvasElt = this.createCanvas(this.width, this.height, 'transform: scaleY(-1)');
        this.domNode.appendChild(this.canvasElt);

        this.videoDecoder = this.createWebDecoder();
        this.initDecodeWorker();
    }

    createWebDecoder() {
        this.codecConfigured = false;
        const canvasCtx = this.canvasElt.getContext('bitmaprenderer');

        function paintFrameToCanvas(videoFrame) {
            videoFrame.createImageBitmap({
                imageOrientation: "flipY"
            }).then(bitmap => {
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
    }

    /**
     * Create <canvas> DOM element with some height/width/style
     * @protected
     * @param {String} width - the width
     * @param {String} height - the height
     * @param {String} style - the dom element style (Optional)
     */
    createCanvas(width, height, style) {
        const canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);
        if (isDefined(style)) {
            canvasElement.setAttribute('style', style);
        }
        return canvasElement;
    }

    setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0; i < values.length;i++) {
            if (!this.skipFrame) {
                const value = values.shift();
                let pktData = value.data.frameData;
                let roll = value.data.roll;
                let pktSize = pktData.length;
                this.decode(pktSize, pktData, value.timeStamp, roll);
            }
        }
    }

    initDecodeWorker() {
        this.decodeWorker = new DecodeWorker();
        this.decodeWorker.id = randomUUID();

        const that = this;
        this.decodeWorker.onmessage =  function(e) {
            let encodedFrame = e.data;
            let videoData = encodedFrame.videoData;
            let timeStamp = encodedFrame.timeStamp;
            let pktSize = encodedFrame.pktSize;

            const chunk = new EncodedVideoChunk({
                type: encodedFrame.key ? "key" : "delta",
                timestamp: timeStamp,
                data: videoData
            });

            try {
                that.videoDecoder.decode(chunk);
            } catch (error) {
                console.error(error);
            }
            that.updateStatistics(pktSize);
            if(that.showTime) {
                that.textFpsDiv.innerText = new Date(timeStamp).toISOString()+' ';
            }
            if(that.showStats) {
                that.textStatsDiv.innerText  = that.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (that.statistics.averageBitRate/1000).toFixed(2)+' kB/s @'+
                    that.width+"x"+that.height+'\n '+that.codec;
            }

            that.onUpdated(that.statistics);
        }
    }
    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    reset() {
    }

    ev(signed, data) {
        let bitCount = 0;
        while (this.getBit(data) === 0) {
            bitCount++;
        }
        let result = 1;
        for (let i = 0; i < bitCount; i++) {
            let b = this.getBit(data);
            result = result * 2 + b;
        }
        result--;
        if (signed) {
            result = (result + 1) / 2 * (result % 2 === 0 ? -1 : 1);
        }
        return result;
    }

    uev(data) {
        return this.ev(false,data);
    }

    sev(data) {
        return this.ev(true,data);
    }

    getU(bits, data) {
        let result = 0;
        for (let i = 0; i < bits; i++) {
            result = result * 2 + this.getBit(data);
        }
        return result;
    }

    getBit(data) {
     let mask = 1 << (7 - (this.pos & 7));
     let idx = this.pos >> 3;
     this.pos++;
     return ((data[idx] & mask) === 0) ? 0 : 1;
    }

    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timeStamp
     */
    decode(pktSize, pktData, timeStamp, roll) {
        if(pktSize > 0) {
            this.pos = 4 * 8;
            let arrayBuffer = pktData.buffer;
            // check configure
            // init decoder with config
            if (!this.codecConfigured) {
                if(pktData[4] === 0x67) {
                    const data = pktData;
                    const forbidden_zero_bit = this.getU(1,data);
                    const nal_ref_idc = this.getU(2,data); // 3 for SPS
                    const nal_unit_type = this.getU(5,data); // 7 = SPS
                    const profile_idc = this.getU(8,data); // 66 = Baseline
                    const constraint_set0_flag = this.getU(1,data);
                    const constraint_set1_flag = this.getU(1,data);
                    const constraint_set2_flag = this.getU(1,data);
                    const constraint_set3_flag = this.getU(1,data);
                    const reserved = this.getU(4,data);
                    const level_idc = this.getU(8, data);
                    const seq_parameter_set_id = this.uev(data);
                    const log2_max_frame_num_minus4 = this.uev(data);
                    const pict_order_cnt_type = this.uev(data);
                    if (pict_order_cnt_type === 0) {
                        this.uev(data);
                    } else if (pict_order_cnt_type === 1) {
                        this.getU(1,data);
                        this.sev(data);
                        this.sev(data);
                        const n = this.uev(data);
                        for (let i = 0; i < n; i++) {
                            this.sev(data);
                        }
                    }
                    const num_ref_frames = this.uev(data);
                    const gaps_in_frame_num_value_allowed_flag = this.getU(1,data);
                    const pic_width = (this.uev(data) + 1) * 16;
                    const pic_height = (this.uev(data) + 1) * 16;
                    const frame_mbs_only_flag = this.getU(1,data);
                    const direct_8x8_inference_flag = this.getU(1, data);
                    const frame_cropping_flag = this.getU(1, data);
                    const vui_prameters_present_flag = this.getU(1,data);
                    const rbsp_stop_one_bit = this.getU(1,data);

                    this.videoDecoder.configure({
                        codec: 'avc1.42e01e',
                        description: new Uint8Array([
                            0x01, 0x42, 0xC0, 0x1E, 0xFF,
                            0xE1, 0, 9, 103, 66, 64, 31, 166, 128, 80, 5, 185, //sps
                            0x01, 0, 5, 104, 206, 48, 166, 128 // pps
                        ]),
                        codedWidth: parseInt(pic_width),
                        codedHeight: parseInt(pic_height)
                    });
                    this.codecConfigured = true;
                    this.width = pic_width;
                    this.height = pic_height;
                }
            } else {
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
    }

    destroy() {
        super.destroy();
    }
}

export default WebCodecView;

