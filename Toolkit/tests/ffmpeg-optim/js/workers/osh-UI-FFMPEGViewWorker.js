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

var AV_PKDATA_DEFAULT = 1024 * 10000;
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

self.nbId = Math.floor((Math.random() * 10000) + 1);
self.skip = false;

self.bufferCounters = 0;

// init static buffers

self.availableBuffers = new Array();

self.MAX_YUV_BUFFERS = 2;
self.init = false;
self.signed = 0;

self.width = 0;
self.height = 0;

self.onmessage = function (e) {
    if(e.data.release) {
        if(self.signed == e.data.data.signed) {
            for(var i =0;i < self.availableBuffers.length;i++) {
                if(self.availableBuffers[i].id == e.data.data.id) {
                    self.availableBuffers[i] = e.data.data;
                    self.availableBuffers[i].active =true;
                }
            }
        }
    } else {

        var decodedFrame = innerWorkerDecode(e.data.data.byteLength, e.data.data);
        if (decodedFrame != null) {
            self.postMessage({
                    data: decodedFrame,
                    width: self.width,
                    height:self.height
                },
                [
                    decodedFrame.y.buffer,
                    decodedFrame.u.buffer,
                    decodedFrame.v.buffer
                ]);
        } else {
            self.postMessage(null);
        }
    }
};

function innerWorkerDecode(pktSize, pktData) {
    if (!self.init) {
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
            return null;
        }

        if (Module.getValue(self.got_frame, 'i8') == 0) {
            return null;
        }

        var decoded_frame = self.av_frame;
        var frame_width = Module.getValue(decoded_frame + 68, 'i32');
        var frame_height = Module.getValue(decoded_frame + 72, 'i32');
        self.width = frame_width;
        self.height = frame_height;

        // creates buffers
        createBuffers(self.width,self.height);
        self.init = true;
    } else {
        var buffer = getNextAvailableBuffer();
        if(buffer != null) {
            buffer.active = false;
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
            var len = _avcodec_decode_video2(self.av_ctx, self.av_frame, self.got_frame, self.av_pkt);
            if (len < 0) {
                //console.log("Error while decoding frame");
                self.availableBuffers.push(buffer);
                return null;
            }

            if (Module.getValue(self.got_frame, 'i8') == 0) {
                buffer.active = true;
                return null;
            }

            var decoded_frame = self.av_frame;
            var frame_width = Module.getValue(decoded_frame + 68, 'i32');
            var frame_height = Module.getValue(decoded_frame + 72, 'i32');

            if (self.width != frame_width || self.height != frame_height) {
                self.width = frame_width;
                selft.height = frame_height;
                resetBuffers();
                buffer.active = true;
            }

            try {
                // copy Y channel to canvas
                var frameYDataPtr = Module.getValue(decoded_frame, '*');
                var frameUDataPtr = Module.getValue(decoded_frame + 4, '*');
                var frameVDataPtr = Module.getValue(decoded_frame + 8, '*');

                var tmpY = new Uint8Array(Module.HEAPU8.buffer, frameYDataPtr, frame_width * frame_height);
                var tmpU = new Uint8Array(Module.HEAPU8.buffer, frameUDataPtr, frame_width / 2 * frame_height / 2);
                var tmpV = new Uint8Array(Module.HEAPU8.buffer, frameVDataPtr, frame_width / 2 * frame_height / 2);

                buffer.y.set(tmpY);
                buffer.u.set(tmpU);
                buffer.v.set(tmpV);

                tmpY = null;
                tmpU = null;
                tmpV = null;

                frameYDataPtr = null;
                frameUDataPtr = null;
                frameVDataPtr = null;

                return buffer;
            } catch (e) {
                console.error(e);
                buffer.active = true;
                return null;
            }
        } else {
            //otherwise skip frame
            return null;
        }
    }
}

function createBuffers(width,height) {
    while(self.availableBuffers.length < self.MAX_YUV_BUFFERS) {
        self.availableBuffers.push({
            signed: self.signed,
            y: new Uint8Array(new ArrayBuffer(width * height)),
            u: new Uint8Array(new ArrayBuffer((width * height) / 4)),
            v: new Uint8Array(new ArrayBuffer((width * height) / 4)),
            active:true,
            id:self.bufferCounters++
        });
    }
};

function resetBuffers() {
    self.availableBuffers.clear();
    self.bufferCounters = 0;
    self.signed++;
    createBuffers(self.width,self.height);
};

function getNextAvailableBuffer() {
    var buffer = null;
    for(var i=0;i < self.availableBuffers.length;i++) {
        if(self.availableBuffers[i].active) {
            buffer = self.availableBuffers[i];
            break;
        }
    }
    return buffer;
}

