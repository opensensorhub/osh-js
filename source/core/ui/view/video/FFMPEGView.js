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

import View from "../View.js";
import {isDefined, isWebWorker, randomUUID} from "../../../utils/Utils.js";
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
 dataSourceId: videoDataSource.id
});
 */

class FFMPEGView extends CanvasView {
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
    constructor(properties) {
        super({
            supportedLayers: ['data'],
            ...properties
        });

        this.directPlay = false;
        this.codec = 'h264';

        // create webGL canvas
        this.yuvCanvas = this.createCanvas(this.width,this.height);
        this.domNode.appendChild(this.yuvCanvas.canvasElement);

        this.buf = [];
        this.bufferingTime = 2 * 1000;
    }

    createCanvas(width, height, style) {
        return new YUVCanvas({width: width, height: height, contextOptions: {preserveDrawingBuffer: true}});
    }

    setData(dataSourceId, data) {
        const values = data.values;
        for(let i=0; i < values.length;i++) {
            if (!this.skipFrame) {
                if (this.decodeWorker == null) {
                    this.initFFMPEG_DECODER_WORKER();
                }

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
        if(isDefined(this.decodeWorker)) {
            this.decodeWorker.terminate();
            this.decodeWorker = null;
        }
        this.resetCalled = true;
        let nodata = new Uint8Array(1);
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
    }

//-- FFMPEG DECODING PART

    //-------------------------------------------------------//
    //---------- Web worker --------------------------------//
    //-----------------------------------------------------//

    /**
     * The worker code is located at the location js/workers/Ffmpeg.worker.js.
     * This location cannot be changed. Be sure to have the right file at the right place.
     * @private
     */
    initFFMPEG_DECODER_WORKER() {
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

        const that = this;
        this.decodeWorker.onmessage = function (e) {
            let decodedFrame = e.data;
            if(that.width !== decodedFrame.frame_width ||
                that.height !== decodedFrame.frame_height) {
                //re-create the canvas
                that.yuvCanvas.resize(decodedFrame.frame_width,decodedFrame.frame_height);
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
            if(this.showTime) {
                this.textFpsDiv.innerText = new Date(decodedFrame.timeStamp).toISOString()+' ';
            }
            if(this.showStats) {
                this.textStatsDiv.innerText  = this.statistics.averageFps.toFixed(2) + ' fps, ' +
                    (this.statistics.averageBitRate/1000).toFixed(2)+' kB/s @'+
                    that.yuvCanvas.width+"x"+that.yuvCanvas.height+'\n '+this.codec;
            }

            this.onUpdated(this.statistics);
        }.bind(this);
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
    }

    destroy() {
        super.destroy();
        if(isDefined(this.interval)) {
            clearInterval(this.interval);
        }
        this. decodeWorker.postMessage({
            message: 'release'
        });
        this.decodeWorker.terminate();
    }
}

export default FFMPEGView;

