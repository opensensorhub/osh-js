import Module from "../ffmpeg/ffmpeg";
import { isDefined } from "../../../utils/Utils";
var FfmpegDecoder = /** @class */ (function () {
    function FfmpegDecoder(codec) {
        this.instance = null;
        this.codec = codec || 'h264';
        this.released = false;
        this.initialized = false;
        var that = this;
        new Module().then(function (module) {
            that.instance = module;
        });
    }
    FfmpegDecoder.prototype.terminate = function () { };
    FfmpegDecoder.prototype.decode = function (message) {
        if (this.released) {
            return;
        }
        if (!isDefined(this.instance)) {
            console.warn('FFmpeg emscripten module is not loaded yet');
            return;
        }
        // init the decoder for the first time
        if (!this.initialized) {
            this.init();
            this.initialized = true;
        }
        if (message && message === 'release') {
            this.release();
            this.released = true;
        }
        var decodedFrame = this.decodePacket(message.pktSize, new Uint8Array(message.pktData, message.byteOffset, message.pktSize), message.timestamp, message.roll);
        if (isDefined(decodedFrame)) {
            decodedFrame.roll = message.roll;
        }
        return decodedFrame;
    };
    FfmpegDecoder.prototype.init = function () {
        // register all compiled codecs
        this.instance._avcodec_register_all();
        var cod = this.codec.toLowerCase();
        if (this.codec === 'h265') {
            cod = 'hevc';
        }
        // find h264 decoder
        var codecId = this.instance.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [cod]);
        if (codecId === 0) {
            console.error("Could not find H264 codec");
        }
        // init codec and conversion context
        this.av_ctx = this.instance._avcodec_alloc_context3(codecId);
        // open codec
        var ret = this.instance._avcodec_open2(this.av_ctx, codecId, 0);
        if (ret < 0) {
            console.error("Could not initialize codec");
        }
        // allocate packet
        this.av_pkt = this.instance._malloc(96);
        this.av_pktData = this.instance._malloc(1024 * 3000);
        this.instance._av_init_packet(this.av_pkt);
        this.instance.setValue(this.av_pkt + 24, this.av_pktData, '*');
        // allocate video frame
        this.av_frame = this.instance._av_frame_alloc();
        if (!this.av_frame)
            alert("Could not allocate video frame");
        // init decode frame function
        this.got_frame = this.instance._malloc(4);
    };
    FfmpegDecoder.prototype.release = function () {
        this.instance._avcodec_close(this.av_ctx);
        this.instance._av_free(this.av_ctx);
        // instance._av_frame_free(self.av_frame);
    };
    FfmpegDecoder.prototype.decodePacket = function (pktSize, pktData, timestamp, roll) {
        // prepare packet
        this.instance.setValue(this.av_pkt + 28, pktSize, 'i32');
        this.instance.writeArrayToMemory(pktData, this.av_pktData);
        // decode next frame
        var len = this.instance._avcodec_decode_video2(this.av_ctx, this.av_frame, this.got_frame, this.av_pkt);
        if (len < 0) {
            console.log("Error while decoding frame");
            return;
        }
        var type = this.instance.getValue(this.got_frame, 'i8');
        if (type === 0) {
            // console.log("No frame");
            return;
        }
        var decoded_frame = this.av_frame;
        var frame_width = this.instance.getValue(decoded_frame + 68, 'i32');
        var frame_height = this.instance.getValue(decoded_frame + 72, 'i32');
        //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);
        // copy Y channel to canvas
        var frameYDataPtr = this.instance.getValue(decoded_frame, '*');
        var frameUDataPtr = this.instance.getValue(decoded_frame + 4, '*');
        var frameVDataPtr = this.instance.getValue(decoded_frame + 8, '*');
        return {
            frame_width: frame_width,
            frame_height: frame_height,
            frameYDataPtr: frameYDataPtr,
            frameUDataPtr: frameUDataPtr,
            frameVDataPtr: frameVDataPtr,
            frameYData: new Uint8Array(this.instance.HEAPU8.buffer.slice(frameYDataPtr, frameYDataPtr + frame_width * frame_height)),
            frameUData: new Uint8Array(this.instance.HEAPU8.buffer.slice(frameUDataPtr, frameUDataPtr + frame_width / 2 * frame_height / 2)),
            frameVData: new Uint8Array(this.instance.HEAPU8.buffer.slice(frameVDataPtr, frameVDataPtr + frame_width / 2 * frame_height / 2)),
            timestamp: timestamp,
            pktSize: pktSize,
            codec: this.codec
        };
    };
    return FfmpegDecoder;
}());
export default FfmpegDecoder;
//# sourceMappingURL=FfmpegDecoder.js.map