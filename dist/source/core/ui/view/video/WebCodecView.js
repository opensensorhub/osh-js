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

        // common VP8/ VP9/ H264 profiles. May not work depending on the video encoding profile
        this.codecMap = {
            'vp9':'vp09.02.10.10.01.09.16.09.01',
            'vp8': 'vp08.00.41.08',
            'h264': 'avc1.42e01e'
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

        // create webGL canvas
        this.canvasElt = this.createCanvas(this.width, this.height);
        this.domNode.appendChild(this.canvasElt);
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
        this.canvasElt.setAttribute('width', width);
        this.canvasElt.setAttribute('height', height);
    }

    async setData(dataSourceId, data) {
        if(data.type === 'videoData') {
            const values = data.values;
            for(let i=0;i < values.length;i++) {
                this.updateVideo(values[i]);
            }
        }
    }
    updateVideo(props) {
        if (!this.skipFrame) {
            if (!this.codecConfigured) {
                this.codec = this.codecMap[props.frameData.compression.toLowerCase()]
                this.initDecoder();
            }

            this.decode(
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

        this.decodeWorker = new DecodeWorker();
        this.decodeWorker.postMessage({
            init: {
                codec: this.codec,
                width: this.width,
                height: this.height
            },
        });

        this.decodeWorker.onmessage = (event) => {
            if(event.data.init) {
                this.codecConfigured = true;
            } else if(this.codecConfigured) {
                const bitmap = event.data.bitmap;
                const width = event.data.width;
                const height = event.data.height;

                // for some reason, the web worker failed to create the bitmal
                if(!isDefined(bitmap)) {
                    console.warn('Bitmap is undefined, skipping this frame..');
                    return;
                }
                this.handleDocodedFrame(bitmap, width, height);
            }
        }
    }

    async handleDocodedFrame(bitmap, width, height) {
        try {
            if(this.width !== width || this.height !== height) {
                this.width = width;
                this.height = height;
                //re-configure the canvas
                this.updateCanvasSize(width,height);
            }
            // draw image
            this.gl.transferFromImageBitmap(bitmap);

            // update stats
            this.onAfterDecoded(bitmap, FrameType.ARRAY);
            this.updateStatistics(event.data.pktSize);
            if(this.showTime) {
                this.textFpsDiv.innerText = new Date(event.data.timestamp).toISOString()+' ';
            }
            if(this.showStats) {
                this.textStatsDiv.innerText  = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate/1000).toFixed(2)+' kB/s @';
            }
            this.onUpdated(this.statistics);
        } catch (exception) {
            console.error(exception);
            //continue;
        } finally {
            bitmap.close();
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
            this.decodeWorker.postMessage({
                pktSize: pktSize,
                pktData: pktData,
                roll: roll,
                codec: this.codec,
                timestamp: timestamp,
            }, [pktData.buffer]);
        } else {
            console.warn('decoder has not been initialized yet');
        }
    }

    destroy() {
        super.destroy();
    }

    async getCanvas() {
        return this.canvasElt;
    }

    drawFrame(decodedFrame) {
        throw Error('Not supported operation');
    }
}

export default WebCodecView;

