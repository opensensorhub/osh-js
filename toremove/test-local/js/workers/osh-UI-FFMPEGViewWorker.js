const load = () => {
    self.importScripts('./ffmpeg-h264.js');
    self.Module()
        .then((_Module) => {
            Module = _Module;

            // register all compiled codecs
            Module._avcodec_register_all();

            // find h264 decoder
            var codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
            if (codec == 0) {
                console.error("Could not find H264 codec");
            }

            // init codec and conversion context
            self.av_ctx = Module._avcodec_alloc_context3(codec);

            // open codec
            var ret = Module._avcodec_open2(self.av_ctx, codec, 0);
            if (ret < 0) {
                console.error("Could not initialize codec");
            }


            // allocate packet
            self.av_pkt = Module._malloc(96);
            self.av_pktData = Module._malloc(1024 * 3000);
            Module._av_init_packet(self.av_pkt);
            Module.setValue(self.av_pkt + 24, self.av_pktData, '*');

            // allocate video frame
            self.av_frame = Module._av_frame_alloc();
            if (!self.av_frame)
                alert("Could not allocate video frame");

            // init decode frame function
            self.got_frame = Module._malloc(4);

            self.onmessage = function (e) {
                var data = e.data;
                var decodedFrame = innerWorkerDecode(data.pktSize, new Uint8Array(data.pktData, data.byteOffset, data.pktSize));
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
                var len = Module._avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
                if (len < 0) {
                    console.log("Error while decoding frame");
                    return;
                }

                let type = Module.getValue(self.got_frame, 'i8');
                if (type === 0) {
                    // console.log("No frame");
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
        });
};

(async () => {
    await load();
    // do something with data
})();
