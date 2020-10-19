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
import EventManager from "../../../events/EventManager.js";
import DecodeWorker from './workers/ffmpeg.decode.worker.js';
import DrawWorker from './workers/ffmpeg.draw.worker.js';

import '../../../resources/css/ffmpegview.css';
import YUVCanvas from "./YUVCanvas";

/**
 * This class is in charge of displaying H264 data by decoding ffmpeg.js library and displaying into them a YUV canvas.
 * @extends View
 * @example
 *
 import FFMPEGView from 'osh/ui/view/video/FFMPEGView.js';

 let videoView = new FFMPEGView("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video",
    framerate: 25,
    directPlay: false
});
 */

class FFMPEGView extends View {
    /**
     * Create a View.
     * @param {String} divId - The div element to attach to
     * @param {Object} options - the properties of the view
     * @param {Number} [options.framerate=29.67] - The framerate to play 1s/framerate and get smooth display
     * @param {Boolean} [options.directPlay=false] - Enable or ignore the framerate play
     * @param {Boolean} [options.showTime=false] - Enable or ignore the show timestamp text onto the canvas
     * @param {Boolean} [options.showStats=false] - Enable or ignore the display stats (FPS number) onto the canvas
     * @param {String} [options.codec='h264'] - Video codec
     */
    constructor(divId, options) {
        super(divId, [], options);

        this.fps = 0;
        this.width = "1920";
        this.height = "1080";
        this.showTime = false;
        this.showStats = false;

        this.statistics = {
            averageFps: 0,
            frames: 0,
            firstTime: 0,
            bitRate: 0,
            averageBitRate:0
        };

        this.framerate = 29.67;
        this.directPlay = false;
        this.codec = 'h264';

        if (isDefined(options)) {
            if (isDefined(options.framerate)) {
                this.framerate = options.framerate;
            }

            if (isDefined(options.directPlay)) {
                this.directPlay = options.directPlay;
            }

            if (isDefined(options.codec)) {
                this.codec = options.codec;
            }

            if (isDefined(options.showTime)) {
                this.showTime = options.showTime;
            }

            if (isDefined(options.showStats)) {
                this.showStats = options.showStats;
            }
        }

        let domNode = document.getElementById(this.divId);

        // if need to draw text
        if(this.showTime || this.showStats) {
            this.textDiv = document.createElement("div");
            this.textDiv.setAttribute("width",this.width);
            this.textDiv.setAttribute("height",15);
            this.textDiv.setAttribute("class","ffmpeg-info");

            if(this.showTime) {
                this.textFpsDiv = document.createElement("div");
                this.textFpsDiv.setAttribute("class","ffmpeg-fps");
                this.textDiv.appendChild(this.textFpsDiv);
            }
            if(this.showStats) {
                this.textStatsDiv = document.createElement("div");
                this.textStatsDiv.setAttribute("class","ffmpeg-stats");
                this.textDiv.appendChild(this.textStatsDiv);
            }

            domNode.appendChild(this.textDiv);
        }

        // create webGL canvas
        this.domNode = domNode;

        // create webGL canvas
        this.yuvCanvas = this.createCanvas(this.width,this.height);
        domNode.appendChild(this.yuvCanvas.canvasElement);

        // add selection listener
        let self = this;
        EventManager.observeDiv(this.divId, "click", (event) => {
            EventManager.fire(EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            });
        });

        let hidden, visibilityChange;

        if (isDefined(document.hidden)) { // Opera 12.10 and Firefox 18 and later support
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (isDefined(document.msHidden)) {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (isDefined(document.webkitHidden)) {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        let that = this;

        function handleVisibilityChange() {
            if (document.hidden) {
                that.skipFrame = true;
            } else {
                that.skipFrame = false;
            }
        }

        document.addEventListener(visibilityChange, handleVisibilityChange, false);
        this.buf = [];
        this.bufferingTime = 2 * 1000;
        this.configured = false;
    }

    createCanvas(width, height, domNode) {
        return new YUVCanvas({width: width, height: height, contextOptions: {preserveDrawingBuffer: true}});
    }

    setData(dataSourceId, values) {
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

    selectDataView(dataSourceIds, entityId) {
        let elt = document.getElementById(this.divId);
        // if(isDefined(elt)) {
        //     if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (isDefined(this.entity) &&
        //         this.entity.getId() === entityId)) {
        //         elt.setAttribute("class", this.css + " " + this.cssSelected);
        //     } else {
        //         elt.setAttribute("class", this.css);
        //     }
        // }
    }


    /**
     * Reset the view by drawing no data array into the YUV canvas.
     * @override
     */
    reset() {
        if(this.decodeWorker !== null) {
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

    /**
     * @private
     */
    updateStatistics(pktSize) {
        this.statistics.frames++;
        this.statistics.pktSize+=pktSize;
        if(this.statistics.firstTime === 0) {
            this.statistics.firstTime = performance.now();
            return;
        }
        const currentTime = performance.now();
        if(currentTime - this.statistics.firstTime < 1000) {
            return;
        }

        // compute current time
        this.statistics.averageFps = (this.statistics.frames-1) / ((currentTime - this.statistics.firstTime)/1000);
        this.statistics.averageBitRate=   (this.statistics.pktSize-pktSize) / ((currentTime - this.statistics.firstTime)/1000);
        this.statistics.frames = 1;
        this.statistics.pktSize = pktSize;
        this.statistics.firstTime = currentTime;
    }

    /**
     * Called after each decoded frame.
     * @event
     */
    onAfterDecoded() {
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

    onUpdated(stats) {

    }

    /**
     * @private
     * @param pktSize
     * @param pktData
     * @param timeStamp
     */
    decode(pktSize, pktData, timeStamp, roll) {
        if(pktSize > 0) {
            if(!this.configured) {
                // skip until find SPS to start the sequence
                if(pktData[4] === 0x67) {
                    this.configured = true;
                }
            }

            if(this.configured) {
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

