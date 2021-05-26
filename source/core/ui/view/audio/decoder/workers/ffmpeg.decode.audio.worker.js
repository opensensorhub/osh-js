import Module from '../../../ffmpeg/ffmpeg-h264.js';

let instance = {
    ready: new Promise(resolve => {
        Module({
            onRuntimeInitialized() {
                instance = Object.assign(this, {
                    ready: Promise.resolve()
                });
                resolve();
            }
        });
    })
};
instance.ready
    .then(_ => {
        // register all compiled codecs
        instance._avcodec_register_all();

        self.codec = null;

        self.onmessage = function (e) {
            const data = e.data;

            if(self.codec === null) {
                init(data.codec);
            }
            const frameData = data.pktData.frameData;
            const decodedFrame = innerWorkerDecode(frameData);
            if (typeof decodedFrame !== "undefined") {
                self.postMessage(decodedFrame, [
                    decodedFrame.frame.buffer,
                ]);
            }
        };
        self.onerror = (e) => {
            console.log('closing worker');
        }

        function init(codec) {
            self.codec = codec;
            // find wav decoder
            var codec = instance.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [codec]);

            if (codec === 0) {
                console.error("Could not find "+codec+" codec");
            }

            // init codec and conversion context
            self.av_ctx = instance._avcodec_alloc_context3(codec);
            // open codec
            var ret = instance._avcodec_open2(self.av_ctx, codec, 0);
            if (ret < 0) {
                console.error("Could not initialize codec");
            }

            // allocate packet
            self.av_pkt = instance._malloc(96);
            self.av_pktData = instance._malloc(1024);
            instance._av_init_packet(self.av_pkt);
            instance.setValue(self.av_pkt + 24, self.av_pktData, '*');

            // allocate audio frame
            self.av_frame = instance._av_frame_alloc();
            if (!self.av_frame)
                alert("Could not allocate video frame");

            // init decode frame function
            self.got_frame = instance._malloc(4);
            console.log('Audio init OK with codec '+self.codec);
        }

        function innerWorkerDecode(pktData) {
            // prepare packet
            instance.setValue(self.av_pkt + 28, pktData.length, 'i32');
            instance.writeArrayToMemory(pktData, self.av_pktData);

            // decode next frame
            var len = instance._avcodec_decode_audio4(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
            if (len < 0) {
                console.log("Error while decoding frame");
                return;
            }

            let type = instance.getValue(self.got_frame, 'i8');
            if (type === 0) {
                console.log("No frame");
                return;
            }
            var decoded_frame = self.av_frame;

            var nb_samples = instance.getValue(decoded_frame + 76, 'i32');
            var audioFramePtr = instance.getValue(decoded_frame, '*');
            var audioFrame = new Float32Array(instance.HEAPU8.buffer.slice(audioFramePtr, audioFramePtr + nb_samples*4))
            return {
                frame: audioFrame
            };
        }
    });
