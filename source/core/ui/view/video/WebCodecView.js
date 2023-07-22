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
import {FrameType} from "./FrameType";

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
            supportedLayers: ['videoData'],
            ...properties
        });

        if (!'VideoEncoder' in window) {
            // WebCodecs API is not supported.
            throw Error('WebCodec API is not supported');
        }

        //https://developer.mozilla.org/en-US/docs/Web/Media/Formats/codecs_parameter
        // common VP8/ VP9/ H264 profiles. May not work depending on the video encoding profile
        //        case "H264":
        //           config.codec = "avc1.42002A";  // baseline profile, level 4.2
        //           config.avc = { format: "annexb" };
        //           config.pt = 1;
        //           break;
        //         case "H265":
        //           config.codec = "hvc1.1.6.L123.00"; // Main profile, level 4.1, main Tier
        //           config.hevc = { format: "annexb" };
        //           config.pt = 2;
        //           break;
        //         case "VP8":
        //           config.codec = "vp8";
        //           config.pt = 3;
        //           break;
        //         case "VP9":
        //           config.codec = "vp09.00.10.08"; //VP9, Profile 0, level 1, bit depth 8
        //           config.pt = 4;
        //           break;
        //         case "AV1":
        //           config.codec = "av01.0.08M.10.0.110.09" // AV1 Main Profile, level 4.0, Main tier, 10-bit content, non-monochrome, with 4:2:0 chroma subsampling
        //           config.pt = 5;
        //           break;
        //       }
        this.codecMap = {
            'vp9':  'vp09.02.10.10.01.09.16.09.01',
            'vp8':  'vp08.00.41.08',
            'h264': 'avc1.42e01e',
            'h265': 'hev1.1.6.L123.00'
        };

        // default use H264 codec
        this.codec = this.codecMap['h264'];

        if(isDefined(properties.codec)) {
            if(!properties.codec in this.codecMap) {
                throw Error(`The codec properties.codec is not supported, the list of supported codec: this.codecMap`);
            } else {
                this.codec = this.codecMap[properties.codec];
            }
        }
        this.compression = properties.codec;

        // create webGL canvas
        this.canvasElt = this.createCanvas(this.width, this.height);
        this.domNode.appendChild(this.canvasElt);

        this.queue = [];
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

    updateCanvasSize(width, height) {
        this.canvasElt.width = width;
        this.canvasElt.height = height;
    }

    async setData(dataSourceId, data) {
        if(data.type === 'videoData') {
            const values = data.values;
            for(let i=0;i < values.length;i++) {
                await this.updateVideo(values[i]);
            }
        }
    }
    async updateVideo(props) {
        if (!this.skipFrame) {
            if (!this.codecConfigured) {
                this.codec = this.codecMap[props.frameData.compression.toLowerCase()]
                this.initDecoder();
            }

            await this.decode(
                props.frameData.data.length,
                props.frameData.data,
                props.timestamp,
                props.roll || 0
            );
        }
    }

    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    reset() {
    }

    initDecoder() {
        this.gl = this.canvasElt.getContext("bitmaprenderer");

        const init = {
            output: async (videoFrame) => {
                // check picture width
                let isReconfigure = false;
                if (this.width !== videoFrame.codedWidth || this.height !== videoFrame.codedHeight) {
                    this.width = videoFrame.codedWidth;
                    this.height = videoFrame.codedHeight;

                    this.updateCanvasSize(this.width ,this.height);
                    isReconfigure = true;
                }
                if(this.videoDecoder.state === 'closed' || isReconfigure) {
                    this.videoDecoder.configure({
                        codec: this.codec,
                        codedWidth: this.width,
                        codedHeight:this.height,
                    });
                }
                const bitmap = await createImageBitmap(videoFrame);
                try {
                    await this.handleDocodedFrame(bitmap, this.width, this.height, videoFrame.timestamp, this.queue.shift());
                } finally {
                    videoFrame.close();
                }
            },
            error: (error) => {
                this.queue.shift();
                console.error(error);
                if(this.videoDecoder.state === 'closed') {
                    this.initDecoder();
                }
            }
        };
        try {
            this.videoDecoder = new VideoDecoder(init);
            this.videoDecoder.configure({
                codec: this.codec,
                codedWidth: this.width,
                codedHeight: this.height,
            });
            this.codecConfigured = true;
        }catch (ex) {
            this.elementDiv.remove(); // remove reserved div element
            throw Error('Cannot configure WebCodec API VideoDecoder');
        }
    }

    async handleDocodedFrame(videoFrame, width, height, timestamp = 0, queueElt = null) {
        try {
            // draw image
            let roll = Math.round(queueElt.roll/90) * 90;
            if (roll > 180) roll -= 360;
            let scale = 1.0;
            if (Math.abs(roll) === 90) {
                scale = this.height / this.width;
            }
            const angleRad = roll*Math.PI/180.;
            if((this.angleRad && this.angleRad !== angleRad) || (this.scale && this.scale !== scale) || !this.angleRad || !this.scale) {
                this.canvasElt.style = `transform:rotate(${angleRad}rad) scale(${scale})`;
                this.angleRad = angleRad;
                this.scale = scale;
            }

            this.gl.transferFromImageBitmap(videoFrame);

            // update stats
            this.onAfterDecoded(videoFrame, FrameType.ARRAY);
            this.updateStatistics(queueElt.pktSize);
            if(this.showTime) {
                this.textFpsDiv.innerText = new Date(timestamp).toISOString()+' ';
            }
            if(this.showStats) {
                this.textStatsDiv.innerText  = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate/1000).toFixed(2)+' kB/s @'+
                    width+"x"+height+'\n '+this.compression;
            }
            this.onUpdated(this.statistics);
        } catch (exception) {
            console.error(exception);
            //continue;
        }
    }

    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timestamp
     */
    async decode(pktSize, pktData, timestamp, roll) {
        if (this.codecConfigured) {
            let key = false;
            if(this.codec === this.codecMap['h264']) {
                // optimize for H264
                // H264 logic
                key = pktData[26] === 101 && pktData[25] === 1 && pktData[24] === 0 && pktData[23] === 0;
            }

            this.queue.push({
                roll: roll,
                pktSize: pktSize
            });
            let chunk = new EncodedVideoChunk({
                timestamp: timestamp,
                type: key ? 'key' : 'delta',
                data: pktData
            });
            this.videoDecoder.decode(chunk);
        } else {
            console.warn('decoder has not been initialized yet');
        }
    }

    destroy() {
        super.destroy();
        if(this.videoDecoder) {
            this.videoDecoder.close();
        }
    }

    async getCanvas() {
        return this.canvasElt;
    }
}

export default WebCodecView;

