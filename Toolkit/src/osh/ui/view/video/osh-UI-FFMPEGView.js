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

/**
 * @classdesc
 * @class
 * @type {OSH.UI.View}
 * @augments OSH.UI.View
 * @example
 var videoView = new OSH.UI.FFMPEGView("videoContainer-id", {
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
OSH.UI.FFMPEGView = OSH.UI.View.extend({
    initialize: function (parentElementDivId, options) {
        this._super(parentElementDivId, [], options);

        this.fps = 0;
        var width = "640";
        var height = "480";

        this.nbFrames = 0;
        /*
         for 1920 x 1080 @ 25 fps = 7 MB/s
         1 frame = 0.28MB
         178 frames = 50MB
         */
        this.FLUSH_LIMIT  = 200;

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

        this.useWorker = OSH.Utils.isWebWorker();
        this.resetCalled = true;
        this.useTransferableData = true;

        if (typeof options != "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            this.useWorker = (typeof options.useWorker != "undefined") && (options.useWorker) && (OSH.Utils.isWebWorker());

            if(options.adjust) {
                var divElt = document.getElementById(this.divId);
                if(divElt.offsetWidth < width) {
                    width = divElt.offsetWidth;
                }
                if(divElt.offsetHeight < height) {
                    height = divElt.offsetHeight;
                }
            }

            if(options.useWebWorkerTransferableData) {
                this.useWebWorkerTransferableData = options.useWebWorkerTransferableData;
            }
        }


        // create webGL canvas
        this.yuvCanvas = new YUVCanvas({width: width, height: height, contextOptions: {preserveDrawingBuffer: true}});
        var domNode = document.getElementById(this.divId);
        domNode.appendChild(this.yuvCanvas.canvasElement);

        // add selection listener
        var self = this;
        OSH.EventManager.observeDiv(this.divId, "click", function (event) {
            OSH.EventManager.fire(OSH.EventManager.EVENT.SELECT_VIEW, {
                dataSourcesIds: [self.dataSourceId],
                entityId: self.entityId
            });
        });

        if (this.useWorker) {
            this.initFFMPEG_DECODER_WORKER();
        } else {
            this.initFFMEG_DECODER();
        }
    },

    /**
     *
     * @param dataSourceId
     * @param data
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    setData: function (dataSourceId, data) {
        var pktData = data.data;
        var pktSize = pktData.length;

        this.resetCalled = false;

        if (this.useWorker) {
            this.decodeWorker(pktSize, pktData);
        } else {
            var decodedFrame = this.decode(pktSize, pktData);
            this.displayFrame(decodedFrame);
            this.update = false;
        }
        //check for flush
        this.checkFlush();
    },


    checkFlush: function() {
        if(!this.useWorker && this.nbFrames >= this.FLUSH_LIMIT) {
            this.nbFrames = 0;
            _avcodec_flush_buffers(this.av_ctx);
        }
    },
    /**
     *
     * @param $super
     * @param dataSourceIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    selectDataView: function (dataSourceIds, entityId) {
        if (dataSourceIds.indexOf(this.dataSourceId) > -1 || (typeof this.entityId != "undefined") && this.entityId == entityId) {
            document.getElementById(this.divId).setAttribute("class", this.css + " " + this.cssSelected);
        } else {
            document.getElementById(this.divId).setAttribute("class", this.css);
        }
    },


    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    reset: function () {
        _avcodec_flush_buffers(this.av_ctx);
        // clear canvas
        this.resetCalled = true;
        var nodata = new Uint8Array(1);
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
    },

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    updateStatistics: function () {
        var s = this.statistics;
        s.videoPictureCounter += 1;
        s.windowPictureCounter += 1;
        var now = Date.now();
        if (!s.videoStartTime) {
            s.videoStartTime = now;
        }
        var videoElapsedTime = now - s.videoStartTime;
        s.elapsed = videoElapsedTime / 1000;
        if (videoElapsedTime < 1000) {
            return;
        }

        if (!s.windowStartTime) {
            s.windowStartTime = now;
            return;
        } else if ((now - s.windowStartTime) > 1000) {
            var windowElapsedTime = now - s.windowStartTime;
            var fps = (s.windowPictureCounter / windowElapsedTime) * 1000;
            s.windowStartTime = now;
            s.windowPictureCounter = 0;

            if (fps < s.fpsMin) s.fpsMin = fps;
            if (fps > s.fpsMax) s.fpsMax = fps;
            s.fps = fps;
        }

        var fps = (s.videoPictureCounter / videoElapsedTime) * 1000;
        s.fpsSinceStart = fps;
    },

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    onAfterDecoded: function () {
    },

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
    initFFMPEG_DECODER_WORKER: function (callback) {
        this.worker = new Worker('js/workers/osh-UI-FFMPEGViewWorker.js');

        var self = this;
        var decodedFrame;

        function release(decodedFrame) {
            self.worker.postMessage({
                data: decodedFrame,
                release:true
            }, [
                decodedFrame.y.buffer,
                decodedFrame.u.buffer,
                decodedFrame.v.buffer
            ]);
        }

        this.worker.onmessage = function (e) {
            if(e.data !== null) {
                decodedFrame = e.data.data;
                this.displayFrame(e.data.width,e.data.height,decodedFrame);

                release(decodedFrame);
            }
        }.bind(this);
        this.worker.onerror = function (e) {
          console.error(e);
        };
    },

    displayFrame:function(width,height,decodedFrame) {
        if (!this.resetCalled) {
            this.yuvCanvas.canvasElement.drawing = true;
            // adjust canvas size to fit to the decoded frame
            if(width != this.yuvCanvas.width) {
                this.yuvCanvas.canvasElement.width = width;
                this.yuvCanvas.width = width;
            }
            if(height != this.yuvCanvas.height) {
                this.yuvCanvas.canvasElement.height = height;
                this.yuvCanvas.height = height;
            }

            this.yuvCanvas.drawNextOuptutPictureGL({
                yData: decodedFrame.y,
                yDataPerRow: width,
                yRowCnt: height,
                uData: decodedFrame.u,
                uDataPerRow: width / 2,
                uRowCnt: height / 2,
                vData: decodedFrame.v,
                vDataPerRow: width / 2,
                vRowCnt: height / 2
            });
            this.yuvCanvas.canvasElement.drawing = false;

            this.updateStatistics();
            this.onAfterDecoded();
        }
    },

    /**
     *
     * @param pktSize
     * @param pktData
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decodeWorker: function (pktSize, pktData) {
        // the transferableData actually transfer the ownership of the object to or from the web worker.
        // It's like passing by reference where a copy isn't made.
        // The difference between it and the normal pass-by-reference is that the side that transferred the data can no longer access it.

        if (this.useWebWorkerTransferableData) {
            this.worker.postMessage({data:pktData,release:false}, [pktData.buffer]);
        } else {
            // no transferable data
            // a copy of the data to be made before being sent to the worker. That could be slow for a large amount of data.

            var noTransferableObjData = {
                data: pktData,
                byteOffset: pktData.byteOffset,
                release:false
            };

            this.worker.postMessage(noTransferableObjData);
        }

    },

    //-------------------------------------------------------//
    //---------- No Web worker -----------------------------//
    //-----------------------------------------------------//

    /**
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    initFFMEG_DECODER: function () {
        // register all compiled codecs
        Module.ccall('avcodec_register_all');

        // find h264 decoder
        var codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
        if (codec == 0)
        {
            console.error("Could not find H264 codec");
            return;
        }

        // init codec and conversion context
        this.av_ctx = _avcodec_alloc_context3(codec);

        // open codec
        var ret = _avcodec_open2(this.av_ctx, codec, 0);
        if (ret < 0)
        {
            console.error("Could not initialize codec");
            return;
        }

        // allocate packet
        this.av_pkt = Module._malloc(96);
        this.av_pktData = Module._malloc(1024*150);
        _av_init_packet(this.av_pkt);
        Module.setValue(this.av_pkt+24, this.av_pktData, '*');

        // allocate video frame
        this.av_frame = _avcodec_alloc_frame();
        if (!this.av_frame)
            alert("Could not allocate video frame");

        // init decode frame function
        this.got_frame = Module._malloc(4);
        this.maxPktSize = 1024 * 50;
    },

    /**
     *
     * @param pktSize
     * @param pktData
     * @returns {{frame_width: *, frame_height: *, frameYDataPtr: *, frameUDataPtr: *, frameVDataPtr: *, frameYData: Uint8Array, frameUData: Uint8Array, frameVData: Uint8Array}}
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decode: function (pktSize, pktData) {
        if(!this.update) {
            this.update = true;
            if (pktSize > this.maxPktSize) {
                // dealloc old allocation
                Module._free(this.av_pktData);
                this.av_pktData = Module._malloc(pktSize);
                Module.setValue(this.av_pkt + 24, this.av_pktData, '*');
                this.maxPktSize = pktSize;
            }

            /*// prepare packet
             Module.setValue(this.av_pkt + 28, pktSize, 'i32');
             Module.writeArrayToMemory(pktData, this.av_pktData);

             // decode next frame
             var len = _avcodec_decode_video2(this.av_ctx, this.av_frame, this.got_frame, this.av_pkt);
             if (len < 0) {
             console.log("Error while decoding frame");
             return;
             }

             if (Module.getValue(this.got_frame, 'i8') == 0) {
             //console.log("No frame");
             return;
             }

             var decoded_frame = this.av_frame;
             var frame_width = Module.getValue(decoded_frame + 68, 'i32');
             var frame_height = Module.getValue(decoded_frame + 72, 'i32');
             //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

             // copy Y channel to canvas
             var frameYDataPtr = Module.getValue(decoded_frame, '*');
             var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
             var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');

             return {
             frame_width: frame_width,
             frame_height: frame_height,
             frameYDataPtr: frameYDataPtr,
             frameUDataPtr: frameUDataPtr,
             frameVDataPtr: frameVDataPtr,
             frameYData: new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height),
             frameUData: new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2),
             frameVData: new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2)
             };*/
            var self = this;
            // prepare packet
            Module.setValue(self.av_pkt + 28, pktSize, 'i32');

            Module.writeArrayToMemory(pktData, self.av_pktData);

            // decode next frame
            var len = _avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
            if (len < 0) {
                console.log("Error while decoding frame");
                return null;
            }

            if (Module.getValue(self.got_frame, 'i8') == 0) {
                //console.log("No frame");
                return null;
            }

            var decoded_frame = self.av_frame;
            var frame_width = Module.getValue(decoded_frame + 68, 'i32');
            var frame_height = Module.getValue(decoded_frame + 72, 'i32');
            //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

            // copy Y channel to canvas
            var frameYDataPtr = Module.getValue(decoded_frame, '*');
            var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
            var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');


            try {
                var arrY = new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height);
                var arrU = new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2);
                var arrV = new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2);

                return {
                    frame_width: frame_width,
                    frame_height: frame_height,
                    frameYDataPtr: frameYDataPtr,
                    frameUDataPtr: frameUDataPtr,
                    frameVDataPtr: frameVDataPtr,
                    frameYData: arrY,
                    frameUData: arrU,
                    frameVData: arrV
                };
            } catch (e) {
                console.error(e);
                return null;
            }
        }
    },
});