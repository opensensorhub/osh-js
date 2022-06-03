import Module from '../../../ffmpeg/ffmpeg.js';
import {isDefined} from "../../../../../utils/Utils";

let instance;
let initialized = false;

// buffering frame while the emscripten module is initializing
let initBuffer = [];

new Module().then(module => {
    instance = module;
    console.log('Module emscripten has been loaded successfully');
    checkForInit();
});

self.onmessage = function (e) {
    //
    // The emscripten module initialization would return an instance (which was perhaps not ready yet if startup was
    // async). In the new model, that returns a Promise which you can do `.then` or
    // `await` on to get notified when the instance is ready, and the callback
    // receives the instance
    self.codec = e.data.codec;
    const pktData = e.data.pktData;

    if(!isDefined(instance)) {
        initBuffer.push(pktData);
        console.warn('FFmpeg emscripten module is not loaded yet');
        return;
    }

    checkForInit();

    const decodedFrame = decode(pktData);
    sendBack(decodedFrame);
};
self.onerror = (e) => {
    console.log('closing worker');
}

function checkForInit() {
    if(!isDefined(self.codec)) {
        return;
    }
    // init the decoder for the first time
    if(!initialized) {
        init(self.codec);
    }

    if(initBuffer.length > 0) {
        // check if there are buffering frames
        for (let frameData of initBuffer) {
            const decodedFrame = decode(frameData);
            sendBack(decodedFrame);
        }
        initBuffer = [];
    }
}

function sendBack(decodedFrame) {
    if (typeof decodedFrame !== "undefined") {
        self.postMessage(decodedFrame, [
            decodedFrame.frame.buffer,
        ]);
    }
}

function init(codec) {
    // register all compiled codecs
    instance._avcodec_register_all();
    // find audio decoder
    console.log(`Init Ffmpeg audio decoder using ${codec} codec`);
    var codecId = instance.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [codec]);
    if (codecId === 0) {
        console.error(`Could not find ${codec} codec`);
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
    self.av_pktData = instance._malloc(1024);
    instance._av_init_packet(self.av_pkt);
    instance.setValue(self.av_pkt + 24, self.av_pktData, '*');

    // allocate audio frame
    self.av_frame = instance._av_frame_alloc();
    if (!self.av_frame)
        alert("Could not allocate video frame");

    // init decode frame function
    self.got_frame = instance._malloc(4);
    console.log('Audio init OK with codec '+codec);
    initialized = true;
}

function decode(pktData) {
    try {
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
        var audioFrame = new Float32Array(instance.HEAPU8.buffer.slice(audioFramePtr, audioFramePtr + nb_samples * 4))
        return {
            frame: audioFrame
        };
    } catch (exception) {
        console.error(exception)
        throw Error(exception);
    }
}
