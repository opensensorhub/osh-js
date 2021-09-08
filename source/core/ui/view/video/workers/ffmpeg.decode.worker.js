import Module from '../../ffmpeg/ffmpeg-h264.js';
import {isDefined} from "../../../../utils/Utils";

let instance;
let codec = 'h264';
let released = false;
let initialized = false;

new Module().then(module => {
    instance = module;
});

self.onmessage = function (e) {
    // if the worker has been released, we can skip all the frames contained in the buffer
    if(released) {
        return;
    }

    //
    // The emscripten module initialization would return an instance (which was perhaps not ready yet if startup was
    // async). In the new model, that returns a Promise which you can do `.then` or
    // `await` on to get notified when the instance is ready, and the callback
    // receives the instance
    if(!isDefined(instance)) {
        console.warn('FFmpeg emscripten module is not loaded yet');
        return;
    }

    // init the decoder for the first time
    if(!initialized) {
        init();
        initialized = true;
    }

    if(e.data.message && e.data.message === 'release') {
        release();
        released = true;
    }

    // Update the codec on the fly
    if(e.data.codec !== codec) {
        init(e.data.codec);
    }

    const data = e.data;
    const decodedFrame = decode(data.pktSize, new Uint8Array(data.pktData, data.byteOffset, data.pktSize),
        data.timeStamp, data.roll);

    if (typeof decodedFrame != "undefined") {
        decodedFrame.roll = data.roll;
        self.postMessage(decodedFrame, [
            decodedFrame.frameYData.buffer,
            decodedFrame.frameUData.buffer,
            decodedFrame.frameVData.buffer
        ]);
    }
};
self.onerror = (e) => {
    console.log('closing worker');
}

function init() {
    // register all compiled codecs
    instance._avcodec_register_all();
    let cod = codec;
    if(codec === 'h265') {
        cod = 'hevc';
    }
    // find h264 decoder
    var codecId = instance.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [cod]);
    if (codecId === 0) {
        console.error("Could not find H264 codec");
    }

    // init codec and conversion context
    self.av_ctx = instance._avcodec_alloc_context3(codecId);

    // open codec
    var ret = instance._avcodec_open2(self.av_ctx, codecId, 0);
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

function decode(pktSize, pktData, timeStamp, roll) {
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
        timeStamp: timeStamp,
        pktSize: pktSize
    };
}
