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
 import WebCodecView from 'osh/ui/view/video/WebCodecView.js';

 let videoView = new WebCodecView("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video"
});
 */

class WebCodecView extends CanvasView {
    /**
     * Create a View.
     * @param {String} divId - The div element to attach to
     * @param {Object} options - the properties of the view
     * @param {Boolean} [options.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [options.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {String} [options.codec='h264'] - Video codec
     */
    constructor(divId, options) {
        super(divId, options);
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

    setData(dataSourceId, values) {
        for (let i = 0; i < values.length; i++) {
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
                timeStamp: timeStamp,
                data: videoData
            });

            try {
                console.log(that.videoDecoder);
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

    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timeStamp
     */
    decode(pktSize, pktData, timeStamp, roll) {
        if(pktSize > 0) {
            let arrayBuffer = pktData.buffer;
            // check configure
            // init decoder with config
            if (!this.codecConfigured) {
                if(pktData[4] === 103) {
                    console.log('configure')
                    this.videoDecoder.configure({
                        codec: 'avc1.42e01e',
                        description: new Uint8Array([
                            0x01, 0x42, 0xC0, 0x1E, 0xFF,
                            0xE1, 0, 9, 103, 66, 64, 31, 166, 128, 80, 5, 185, //sps
                            0x01, 0, 5, 104, 206, 48, 166, 128 // pps
                        ]),
                        codedWidth: parseInt(this.width),
                        codedHeight: parseInt(this.height)
                    });
                    this.codecConfigured = true;
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

