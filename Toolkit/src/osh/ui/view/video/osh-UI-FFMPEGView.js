/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.
 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>
 ******************************* END LICENSE BLOCK ***************************/

import {View} from "../osh-UI-View.js";
import {isDefined, isWebWorker} from "../../../osh-Utils.js";
import YUVCanvas from "../../../../../vendor-local/yuvcanvas/YUVCanvas.js";
import EventManager from "../../../osh-EventManager.js";
import {BASE_WORKER_URL} from "../../../osh-Constants.js";

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 let videoView = new OSH.UI.FFMPEGView("videoContainer-id", {
    dataSourceId: videoDataSource.id,
    css: "video",
    cssSelected: "video-selected",
    name: "Video",
    useWorker:true,
    useWebWorkerTransferableData: false // this is because you can speed up the data transfert between main script and web worker
                                            by using transferable data. Note that can cause problems if you data is attempted to use anywhere else.
                                            See the not below for more details(*).
});
 (*)The transferableData actually transfers the ownership of the object to or from the web worker.
 It's like passing by reference where a copy isn't made. The difference between it and the normal pass-by-reference
 is that the side that transferred the data can no longer access it. In that case, the use of the data must be UNIQUE, that means
 you cannot use the data for anything else (like another viewer).
 The non transferable data is a copy of the data to be made before being sent to the worker. That could be slow for a large amount of data.
 */

export default class FFMPEGView extends View {
    constructor(divId, options) {
        super(divId, [], options);

        this.fps = 0;
        let width = "640";
        let height = "480";
        this.bufferring = 0;

        this.statistics = {
            videoStartTime: 0,
            videoPictureCounter: 0,
            windowStartTime: 0,
            windowPictureCounter: 0,
            fps: 0,
            fpsMin: 1000,
            fpsMax: -1000,
            fpsSinceStart: 0
        };

        this.useWorker = false;
        this.resetCalled = true;

        if (isDefined(options)) {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            if (options.buffering) {
                this.bufferring = options.buffering;
            }

            this.useWorker = (isDefined(options.useWorker)) && (options.useWorker) && (isWebWorker());
        }

// create webGL canvas
        this.yuvCanvas = new YUVCanvas({width: width, height: height, contextOptions: {preserveDrawingBuffer: true}});
        let domNode = document.getElementById(this.divId);
        domNode.appendChild(this.yuvCanvas.canvasElement);

// add selection listener
        let self = this;
        EventManager.observeDiv(this.divId, "click", (event) => {
            EventManager.fire(EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            });
        });

        if (this.useWorker) {
            this.initFFMPEG_DECODER_WORKER();
        } else {
            this.initFFMEG_DECODER();
        }

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
    }

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    setData(dataSourceId, data) {
        if (!this.skipFrame) {
            let pktData = data.data;
            let pktSize = pktData.length;

            if (this.useWorker) {
                this.resetCalled = false;
                this.decodeWorker(pktSize, pktData);
            } else {
                let decodedFrame = this.decode(pktSize, pktData);
                if (isDefined(decodedFrame)) {
                    this.yuvCanvas.drawNextOuptutPictureGL({
                        yData: decodedFrame.frameYData,
                        yDataPerRow: decodedFrame.frame_width,
                        yRowCnt: decodedFrame.frame_height,
                        uData: decodedFrame.frameUData,
                        uDataPerRow: decodedFrame.frame_width / 2,
                        uRowCnt: decodedFrame.frame_height / 2,
                        vData: decodedFrame.frameVData,
                        vDataPerRow: decodedFrame.frame_width / 2,
                        vRowCnt: decodedFrame.frame_height / 2
                    });

                    this.updateStatistics();
                    this.onAfterDecoded();
                }
            }
        }
    }

    /**
     *
     * @param dataSourceIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    selectDataView(dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (isDefined(this.entityId) &&
            this.entityId === entityId)) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        } else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    }


    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    reset() {
        _avcodec_flush_buffers(this.av_ctx);
// clear canvas
        this.resetCalled = true;
        let nodata = new Uint8Array(1);
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
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    updateStatistics() {
        let s = this.statistics;
        s.videoPictureCounter += 1;
        s.windowPictureCounter += 1;
        let now = Date.now();
        if (!s.videoStartTime) {
            s.videoStartTime = now;
        }
        let videoElapsedTime = now - s.videoStartTime;
        s.elapsed = videoElapsedTime / 1000;
        if (videoElapsedTime < 1000) {
            return;
        }

        if (!s.windowStartTime) {
            s.windowStartTime = now;
            return;
        } else if ((now - s.windowStartTime) > 1000) {
            let windowElapsedTime = now - s.windowStartTime;
            let fps = (s.windowPictureCounter / windowElapsedTime) * 1000;
            s.windowStartTime = now;
            s.windowPictureCounter = 0;

            if (fps < s.fpsMin) s.fpsMin = fps;
            if (fps > s.fpsMax) s.fpsMax = fps;
            s.fps = fps;
        }

        let fps = (s.videoPictureCounter / videoElapsedTime) * 1000;
        s.fpsSinceStart = fps;
    }

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    onAfterDecoded() {
    }

//-- FFMPEG DECODING PART

//-------------------------------------------------------//
//---------- Web worker --------------------------------//
//-----------------------------------------------------//

    /**
     * The worker code is located at the location js/workers/FFMPEGViewWorker.js.
     * This location cannot be changed. Be sure to have the right file at the right place.
     * @instance
     * @memberof OSH.UI.FFMPEGView
     * @param callback
     */
    initFFMPEG_DECODER_WORKER(callback) {
        this.worker = new Worker(BASE_WORKER_URL.path+'/osh-UI-FFMPEGViewWorker.js');
        let yuvCanvas = this.yuvCanvas;

        let buffer = [];
        this.worker.onmessage = function (e) {
            if (this.bufferring > 0) {
                buffer.push(e);
            } else {
                display(e);
            }
        }

        setInterval(function () {
            if (buffer.length > 30) {
                buffer = [];
            }

            if (buffer.length > this.bufferring) {
                display(buffer.shift());
            }
        }, 1000 / 30.);

        function display(e) {

            let decodedFrame = e.data;

            yuvCanvas.canvasElement.drawing = true;
            yuvCanvas.drawNextOuptutPictureGL({
                yData: decodedFrame.frameYData,
                yDataPerRow: decodedFrame.frame_width,
                yRowCnt: decodedFrame.frame_height,
                uData: decodedFrame.frameUData,
                uDataPerRow: decodedFrame.frame_width / 2,
                uRowCnt: decodedFrame.frame_height / 2,
                vData: decodedFrame.frameVData,
                vDataPerRow: decodedFrame.frame_width / 2,
                vRowCnt: decodedFrame.frame_height / 2
            });

            yuvCanvas.canvasElement.drawing = false;
        }
    }

    /**
     *
     * @param pktSize
     * @param pktData
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decodeWorker(pktSize, pktData) {
        let transferableData = {
            pktSize: pktSize,
            pktData: pktData.buffer,
            byteOffset: pktData.byteOffset
        };
        this.worker.postMessage(transferableData, [transferableData.pktData]);
    }

//-------------------------------------------------------//
//---------- No Web worker -----------------------------//
//-----------------------------------------------------//

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    initFFMEG_DECODER() {
// register all compiled codecs
        Module.ccall('avcodec_register_all');

// find h264 decoder
        let codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
        if (codec === 0) {
            console.error("Could not find H264 codec");
            return;
        }

// init codec and conversion context
        this.av_ctx = _avcodec_alloc_context3(codec);

// open codec
        let ret = _avcodec_open2(this.av_ctx, codec, 0);
        if (ret < 0) {
            console.error("Could not initialize codec");
            return;
        }

// allocate packet
        this.av_pkt = Module._malloc(96);
        this.av_pktData = Module._malloc(1024 * 150);
        _av_init_packet(this.av_pkt);
        Module.setValue(this.av_pkt + 24, this.av_pktData, '*');

// allocate video frame
        this.av_frame = _avcodec_alloc_frame();
        if (!this.av_frame)
            alert("Could not allocate video frame");

// init decode frame function
        this.got_frame = Module._malloc(4);
        this.maxPktSize = 1024 * 50;


    }

    /**
     *
     * @param pktSize
     * @param pktData
     * @returns {{frame_width: *, frame_height: *, frameYDataPtr: *, frameUDataPtr: *, frameVDataPtr: *, frameYData: Uint8Array, frameUData: Uint8Array, frameVData: Uint8Array}}
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decode(pktSize, pktData) {
        if (pktSize > this.maxPktSize) {
            this.av_pkt = Module._malloc(96);
            this.av_pktData = Module._malloc(pktSize);
            _av_init_packet(this.av_pkt);
            Module.setValue(this.av_pkt + 24, this.av_pktData, '*');
            this.maxPktSize = pktSize;
        }
        // prepare packet
        Module.setValue(this.av_pkt + 28, pktSize, 'i32');
        Module.writeArrayToMemory(pktData, this.av_pktData);

// decode next frame
        let len = _avcodec_decode_video2(this.av_ctx, this.av_frame, this.got_frame, this.av_pkt);
        if (len < 0) {
            console.log("Error while decoding frame");
            return;
        }

        if (Module.getValue(this.got_frame, 'i8') === 0) {
//console.log("No frame");
            return;
        }

        let decoded_frame = this.av_frame;
        let frame_width = Module.getValue(decoded_frame + 68, 'i32');
        let frame_height = Module.getValue(decoded_frame + 72, 'i32');
//console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

// copy Y channel to canvas
        let frameYDataPtr = Module.getValue(decoded_frame, '*');
        let frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
        let frameVDataPtr = Module.getValue(decoded_frame + 8, '*');

        return {
            frame_width: frame_width,
            frame_height: frame_height,
            frameYDataPtr: frameYDataPtr,
            frameUDataPtr: frameUDataPtr,
            frameVDataPtr: frameVDataPtr,
            frameYData: new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height),
            frameUData: new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2),
            frameVData: new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2)
        };
    }
}
