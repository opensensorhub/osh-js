importScripts("ffmpeg-h264.js");

console.log("init worker");
// register all compiled codecs
Module.ccall('avcodec_register_all');

// find h264 decoder
var codec = Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], ["h264"]);
if (codec == 0) {
    console.error("Could not find H264 codec");
}

// init codec and conversion context
self.av_ctx = _avcodec_alloc_context3(codec);

// open codec
var ret = _avcodec_open2(self.av_ctx, codec, 0);
if (ret < 0) {
    console.error("Could not initialize codec");
}

var AV_PKDATA_DEFAULT = 1024 * 50;
// allocate packet
self.av_pkt = Module._malloc(96);
self.av_pktData = Module._malloc(AV_PKDATA_DEFAULT);
_av_init_packet(self.av_pkt);
Module.setValue(self.av_pkt + 24, self.av_pktData, '*');

// allocate video frame
self.av_frame = _avcodec_alloc_frame();
if (!self.av_frame)
    alert("Could not allocate video frame");

// init decode frame function
self.got_frame = Module._malloc(4);
self.maxPktSize = AV_PKDATA_DEFAULT;

self.bufferCounters = 0;

// init static buffers
self.init = false;
self.signed = 0;
self.width = 0;
self.height = 0;

self.MAX_INPUT_BUFFER_SIZE = 25;
self.inputBuffers = new Array();
self.outputBuffer = null;
self.id = Math.floor((Math.random() * 10000) + 1);

self.onmessage = function (e) {
    // release from main thread
    if(e.data.release) {
        self.outputBuffer = e.data.data;
        self.outputBuffer.inUse = false;
        if(self.inputBuffers.length > 0 && !self.consumeLock) {
            consume();
        }
    } else {
        if(!self.init) {
            if(computeSize(e.data.data.byteLength, e.data.data)) {
                initBuffers();
                self.init = true;
                produce(e.data.data.byteLength, e.data.data);
            }
        } else {
            // incoming data from main thread
            produce(e.data.data.byteLength, e.data.data);
            if(!self.outputBuffer.inUse && !self.consumeLock) {
                consume();
            }

        }
    }
};

function initBuffers() {
    self.outputBuffer = {
        signed: self.signed,
        y: new Uint8Array(new ArrayBuffer(self.width * self.height)),
        u: new Uint8Array(new ArrayBuffer((self.width * self.height) / 4)),
        v: new Uint8Array(new ArrayBuffer((self.width * self.height) / 4)),
        inUse:false
    };
}

function computeSize(pktSize,pktData) {
    if (pktSize > self.maxPktSize) {
        // dealloc old allocation
        Module._free(this.av_pktData);
        self.av_pktData = Module._malloc(pktSize);
        Module.setValue(self.av_pkt + 24, self.av_pktData, '*');
        self.maxPktSize = pktSize;
    }
    // prepare packet
    Module.setValue(self.av_pkt + 28, pktSize, 'i32');
    Module.writeArrayToMemory(pktData, self.av_pktData);

    // decode next frame
    if (_avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt) < 0) {
        //console.log("Error while decoding frame");
        return false;
    }

    if (Module.getValue(self.got_frame, 'i8') == 0) {
        return false;
    }

    var decoded_frame = self.av_frame;
    var frame_width = Module.getValue(decoded_frame + 68, 'i32');
    var frame_height = Module.getValue(decoded_frame + 72, 'i32');
    self.width = frame_width;
    self.height = frame_height;
    return true;
}

// decode frame and store into buffer
function produce(pktSize,pktData) {
    if(self.inputBuffers.length < self.MAX_INPUT_BUFFER_SIZE) {
        self.inputBuffers.push({pktSize:pktSize,pktData:pktData});
    }
    // otherwise skip frame
}

function consume() {
    self.consumeLock = true;
    // compute frame

    var inputBuffer = self.inputBuffers.shift();
    if (inputBuffer.pktSize > self.maxPktSize) {
        // dealloc old allocation
        Module._free(this.av_pktData);
        self.av_pktData = Module._malloc(inputBuffer.pktSize);
        Module.setValue(self.av_pkt + 24, self.av_pktData, '*');
        self.maxPktSize = inputBuffer.pktSize;
    }

    // prepare packet
    Module.setValue(self.av_pkt + 28, inputBuffer.pktSize, 'i32');
    Module.writeArrayToMemory(inputBuffer.pktData, self.av_pktData);

    // decode next frame
    var len = _avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
    if (len < 0) {
        //console.log("Error while decoding frame");
        self.consumeLock = false;
        return;
    }

    if (Module.getValue(self.got_frame, 'i8') == 0) {
        self.consumeLock = false;
        return;
    }

    var decoded_frame = self.av_frame;
    var frame_width = Module.getValue(decoded_frame + 68, 'i32');
    var frame_height = Module.getValue(decoded_frame + 72, 'i32');

    if (self.width != frame_width || self.height != frame_height) {
        self.width = frame_width;
        self.height = frame_height;
    }

    try {
        // copy Y channel to canvas
        var frameYDataPtr = Module.getValue(decoded_frame, '*');
        var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
        var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');

        var tmpY = new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height);
        var tmpU = new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, (frame_width * frame_height) / 4);
        var tmpV = new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, (frame_width * frame_height) / 4);

        self.outputBuffer.y.set(tmpY);
        self.outputBuffer.u.set(tmpU);
        self.outputBuffer.v.set(tmpV);

        tmpY = null;
        tmpU = null;
        tmpV = null;

        frameYDataPtr = null;
        frameUDataPtr = null;
        frameVDataPtr = null;

        self.outputBuffer.inUse = true;
        self.postMessage({
                data: self.outputBuffer,
                width: self.width,
                height:self.height
            },
            [
                self.outputBuffer.y.buffer,
                self.outputBuffer.u.buffer,
                self.outputBuffer.v.buffer
            ]);
    } catch (e) {
        console.error(e);
        self.consumeLock = false;
    }
    self.consumeLock = false;
}