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
    useWorker:true
});
 */
OSH.UI.FFMPEGView = Class.create(OSH.UI.View, {
    initialize: function ($super, divId, options) {
        $super(divId, [], options);

        this.fps = 0;
        var width = "640";
        var height = "480";

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

        if (typeof options != "undefined") {
            if (options.width) {
                width = options.width;
            }

            if (options.height) {
                height = options.height;
            }

            this.useWorker = (typeof options.useWorker != "undefined") && (options.useWorker) && (OSH.Utils.isWebWorker());
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

        if (this.useWorker) {
            this.resetCalled = false;
            this.decodeWorker(pktSize, pktData);
        } else {
           var decodedFrame = this.decode(pktSize, pktData);
            if(typeof decodedFrame != "undefined") {
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
    },


    /**
     *
     * @param $super
     * @param dataSourceIds
     * @param entityId
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    selectDataView: function ($super, dataSourceIds, entityId) {
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
     * @instance
     * @memberof OSH.UI.FFMPEGView
     * @param callback
     */
    initFFMPEG_DECODER_WORKER: function (callback) {
        console.log("init FFMPEG worker");
        var blobURL = URL.createObjectURL(new Blob(['(',
                function () {
                    //TODO
                    importScripts("http://opensensorhub.github.io/osh-js/Toolkit/vendor/ffmpeg/ffmpeg-h264.js");
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
                    self.av_ctx = _avcodec_alloc_context3(codec);

                    // open codec
                    var ret = _avcodec_open2(self.av_ctx, codec, 0);
                    if (ret < 0)
                    {
                        console.error("Could not initialize codec");
                        return;
                    }


                    // allocate packet
                    self.av_pkt = Module._malloc(96);
                    self.av_pktData = Module._malloc(1024*3000);
                    _av_init_packet(self.av_pkt);
                    Module.setValue(self.av_pkt+24, self.av_pktData, '*');

                    // allocate video frame
                    self.av_frame = _avcodec_alloc_frame();
                    if (!self.av_frame)
                        alert("Could not allocate video frame");

                    // init decode frame function
                    self.got_frame = Module._malloc(4);

                    self.onmessage = function (e) {
                        var data = e.data;
                        var decodedFrame = innerWorkerDecode(data.pktSize, new Uint8Array(data.pktData, data.byteOffset,data.pktSize));
                        if (typeof decodedFrame != "undefined") {
                            self.postMessage(decodedFrame, [
                                decodedFrame.frameYData.buffer,
                                decodedFrame.frameUData.buffer,
                                decodedFrame.frameVData.buffer
                            ]);
                        }
                    };


                    function innerWorkerDecode(pktSize, pktData) {
                        // prepare packet
                        Module.setValue(self.av_pkt + 28, pktSize, 'i32');
                        Module.writeArrayToMemory(pktData, self.av_pktData);

                        // decode next frame
                        var len = _avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
                        if (len < 0) {
                            console.log("Error while decoding frame");
                            return;
                        }

                        if (Module.getValue(self.got_frame, 'i8') == 0) {
                            //console.log("No frame");
                            return;
                        }

                        var decoded_frame = self.av_frame;
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
                            frameYData: new Uint8Array(Module.HEAPU8.buffer.slice(frameYDataPtr, frameYDataPtr + frame_width * frame_height)),
                            frameUData: new Uint8Array(Module.HEAPU8.buffer.slice(frameUDataPtr, frameUDataPtr + frame_width / 2 * frame_height / 2)),
                            frameVData: new Uint8Array(Module.HEAPU8.buffer.slice(frameVDataPtr, frameVDataPtr + frame_width / 2 * frame_height / 2))
                        };
                    }
                }.toString(), ')()'],
            {type: 'application/javascript'}));

        this.worker = new Worker(blobURL);

        var self = this;
        this.worker.onmessage = function (e) {
            var decodedFrame = e.data;

            if (!this.resetCalled) {
                self.yuvCanvas.canvasElement.drawing = true;
                self.yuvCanvas.drawNextOuptutPictureGL({
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
                self.yuvCanvas.canvasElement.drawing = false;

                self.updateStatistics();
                self.onAfterDecoded();
            }
        }.bind(this);

        // Won't be needing this anymore
        URL.revokeObjectURL(blobURL);
    },

    /**
     *
     * @param pktSize
     * @param pktData
     * @instance
     * @memberof OSH.UI.FFMPEGView
     */
    decodeWorker: function (pktSize, pktData) {
        var transferableData = {
            pktSize: pktSize,
            pktData: pktData.buffer,
            byteOffset:pktData.byteOffset
        };
        this.worker.postMessage(transferableData, [transferableData.pktData]);
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
        if(pktSize > this.maxPktSize) {
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
        };
    },
});