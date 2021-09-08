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
import YUVCanvas from "./YUVCanvas";

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

        this.codecMap = {
            'vp9':'vp09.02.10.10.01.09.16.09.01',
            'h264': 'avc1.42e01e'
        };

        this.codec = this.codecMap['h264'];

        if(isDefined(properties.codec)) {
            if(!properties.codec in this.codecMap) {
                throw Error(`The codec properties.codec is not supported, the list of supported codec: this.codecMap`);
            } else {
                this.codec = this.codecMap[properties.codec];
            }
        }

        // create webGL canvas
        this.canvasElt = this.createCanvas(this.width, this.height);
        this.domNode.appendChild(this.canvasElt);

        // this.offscreen = this.canvasElt.transferControlToOffscreen()
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
        if (!this.codecConfigured) {
            let drawWorker = new DecodeWorker();

            const that = this;

            // drawWorker.postMessage({
            //     canvas: this.offscreen
            // }, [this.offscreen]);

            const gl = this.canvasElt.getContext("bitmaprenderer");

            drawWorker.onmessage = (event) => {
                const bitmap = event.data.bitmap;
                // that.yuvCanvas.canvasElement.drawing = true;
                // that.yuvCanvas.drawNextOuptutPictureBitmapGL({
                //     yData: bitmap,
                //     yDataPerRow: 1920,
                //     yRowCnt: 1080,
                //     roll: 0
                // });
                //
                // that.yuvCanvas.canvasElement.drawing = false;
                // event.data.bitmap.close();
                gl.transferFromImageBitmap(bitmap);
                bitmap.close();
                that.updateStatistics(pktSize);
                if(that.showTime) {
                    that.textFpsDiv.innerText = new Date(event.data.timestamp).toISOString()+' ';
                }
                if(that.showStats) {
                    that.textStatsDiv.innerText  = that.statistics.averageFps.toFixed(2) + ' fps, ' +
                        (that.statistics.averageBitRate/1000).toFixed(2)+' kB/s @';
                }

                that.onUpdated(that.statistics);
            }
            async function paintFrameToCanvas(videoFrame) {
                drawWorker.postMessage({
                    frame: videoFrame,
                    pktSize: pktSize
                });
            }

            function onDecoderError(error) {
                console.error(error);
            }

            const init = {
                output: paintFrameToCanvas,
                error: onDecoderError
            };
            this.codecConfigured = true;
            this.width = 1920;
            this.height = 1080;
            this.videoDecoder = new VideoDecoder(init);
            this.videoDecoder.configure({
                codec: this.codec,
                codedWidth: 1920,
                codedHeight: 1080
            });
        } else {
            let i;
            let key = false;
            for (i = 0; i < 100; i++) {
                if ((pktData[i] === 101 || pktData[i] === 65) && pktData[i - 1] === 1
                    && pktData[i - 2] === 0 && pktData[i - 3] === 0) {

                    // check if key frame
                    if (pktData[i] === 101) {
                        key = true;
                    }

                    break;
                }
            }

            let chunk = new EncodedVideoChunk({
                timestamp: timeStamp,
                type: key ? 'key' : 'delta',
                data: pktData
            });
            this.videoDecoder.decode(chunk);
        }
    }

    destroy() {
        super.destroy();
    }
}

export default WebCodecView;

