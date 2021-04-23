import Module from '../../ffmpeg/ffmpeg-h264.js';
import {FFMPEG_VIEW_DECODE_TOPIC} from "../../../../Constants";

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

        init('h264');
        self.codec = null;
        let released = false;

        self.onmessage = function (e) {
            if(released) {
                return;
            }

            if(e.data.message && e.data.message === 'release') {
                release();
                released = true;
            }
            if(e.data.codec !== self.codec) {
                init(e.data.codec);
            }

            const data = e.data;
            const decodedFrame = innerWorkerDecode(data.pktSize, new Uint8Array(data.pktData, data.byteOffset, data.pktSize),
                data.timeStamp, data.roll);
            if (typeof decodedFrame != "undefined") {
                decodedFrame.roll = data.roll;
                self.postMessage(decodedFrame, [
                    decodedFrame.frameYData.buffer,
                    decodedFrame.frameUData.buffer,
                    decodedFrame.frameVData.buffer,
                    data.pktData,
                ]);
            }
        };
        self.onerror = (e) => {
            console.log('closing worker');
        }

        function init(codec) {
            self.codec = codec;
            let cod = codec;
            if(codec === 'h265') {
                cod = 'hevc';
            }
            // find h264 decoder
            var codec = instance.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [cod]);
            if (codec == 0) {
                console.error("Could not find H264 codec");
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
            self.av_pktData = instance._malloc(1024 * 3000);
            instance._av_init_packet(self.av_pkt);
            instance.setValue(self.av_pkt + 24, self.av_pktData, '*');

            // allocate video frame
            self.av_frame = instance._av_frame_alloc();
            if (!self.av_frame)
                alert("Could not allocate video frame");

            // init decode frame function
            self.got_frame = instance._malloc(4);
        }

        function release() {
            instance._avcodec_close(self.av_ctx);
            instance._av_free(self.av_ctx);
            // instance._av_frame_free(self.av_frame);
        }

        function innerWorkerDecode(pktSize, pktData, timeStamp, roll) {
            // prepare packet
            instance.setValue(self.av_pkt + 28, pktSize, 'i32');
            instance.writeArrayToMemory(pktData, self.av_pktData);

            // decode next frame
            var len = instance._avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
            if (len < 0) {
                console.log("Error while decoding frame");
                return;
            }

            let type = instance.getValue(self.got_frame, 'i8');
            if (type === 0) {
                // console.log("No frame");
                return;
            }

            var decoded_frame = self.av_frame;
            var frame_width = instance.getValue(decoded_frame + 68, 'i32');
            var frame_height = instance.getValue(decoded_frame + 72, 'i32');
            //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

            // copy Y channel to canvas
            var frameYDataPtr = instance.getValue(decoded_frame, '*');
            var frameUDataPtr = instance.getValue(decoded_frame + 4, '*');
            var frameVDataPtr = instance.getValue(decoded_frame + 8, '*');

            return {
                frame_width: frame_width,
                frame_height: frame_height,
                frameYDataPtr: frameYDataPtr,
                frameUDataPtr: frameUDataPtr,
                frameVDataPtr: frameVDataPtr,
                frameYData: new Uint8Array(instance.HEAPU8.buffer.slice(frameYDataPtr, frameYDataPtr + frame_width * frame_height)),
                frameUData: new Uint8Array(instance.HEAPU8.buffer.slice(frameUDataPtr, frameUDataPtr + frame_width / 2 * frame_height / 2)),
                frameVData: new Uint8Array(instance.HEAPU8.buffer.slice(frameVDataPtr, frameVDataPtr + frame_width / 2 * frame_height / 2)),
                timeStamp:timeStamp,
                pktSize:pktSize
            };
        }
    });
