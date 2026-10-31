import OSH from '../ffmpeg/ffmpeg';

import {isDefined} from "../../../utils/Utils";

class FfmpegDecoder {
    constructor(props) {
        this.codec = props.codec;
        this.released = false;
        this.initialized = false;
        this.initPromise = undefined;
        this.codecMap = props.codecMap || {};
        this.pktDataAllocSize = props.pktDataAllocSize;
    }

    terminate(){}

    async init() {
        if(!this.initPromise) {
            this.initPromise = new Promise(async (resolve, reject) => {
                this.Module = await OSH();
                let cod = this.codec.toLowerCase();
                if(this.codec in this.codecMap) {
                    cod = this.codecMap[this.codec];
                }

                // find decoder
                const codec = this.Module.ccall('avcodec_find_decoder_by_name', 'number', ['string'], [cod]);
                if (codec === 0) {
                    console.error(`Could not find ${cod} codec`);
                    reject(`Could not find ${cod} codec`);
                    return;
                }

                // init codec and conversion context
                this.av_ctx = this.Module._avcodec_alloc_context3(codec);

                // this.av_ctx.flags2 |= (1 << 15);
                // open codec
                const openRet = this.Module._avcodec_open2(this.av_ctx, codec, 0);
                if (openRet < 0) {
                    console.error("Could not initialize codec", openRet);
                    reject("Could not initialize codec " + openRet);
                    return;
                }

                // allocate packet
                this.av_pkt = this.Module._malloc(96);
                // + AV_INPUT_BUFFER_PADDING_SIZE (64) bytes of padding required by ffmpeg after the data
                this.av_pktData = this.Module._malloc(this.pktDataAllocSize + 64);
                this.Module._av_init_packet(this.av_pkt);
                this.Module.setValue(this.av_pkt + 24, this.av_pktData, '*');

                // allocate video frame
                this.av_frame = this.Module._av_frame_alloc();
                if (!this.av_frame) {
                    console.error("Could not allocate video frame");
                    reject("Could not allocate video frame");
                } else {
                    console.log('Decoder init OK with codec '+this.codec.toLowerCase());
                    this.initialized = true;
                    resolve();
                }
            });
        }
        return this.initPromise;
    }

    async decode(message) {
        if (message && message === 'release') {
            this.release();
            this.released = true;
        }
        if (this.released) {
            return;
        }
        if (!this.initialized) {
            await this.init();
            // 'release' may have been received while the decoder was initializing
            if (this.released) {
                return;
            }
        }

        const decodedFrame = this.decodePacket(message.pktSize, new Uint8Array(message.pktData, message.byteOffset, message.pktSize),
            message.timestamp, message.roll);
        if (isDefined(decodedFrame)) {
            decodedFrame.roll = message.roll;
        }
        return decodedFrame;
    }

    release() {
        this.Module._avcodec_close(this.av_ctx);
        this.Module._av_free(this.av_ctx);
        // instance._av_frame_free(self.av_frame);
    }

    decodePacket(pktSize, pktData, timestamp) {
        // an empty packet with a non-null data pointer is rejected by ffmpeg with AVERROR(EINVAL)
        if (!(pktSize > 0)) {
            return;
        }

        // a packet bigger than the allocated buffer would overwrite the memory of the module
        if (pktSize > this.pktDataAllocSize) {
            console.warn("Packet too large (" + pktSize + " > " + this.pktDataAllocSize + "), dropped");
            return;
        }

        // prepare packet

        this.Module.setValue(this.av_pkt + 28, pktSize, 'i32');
        this.Module.writeArrayToMemory(pktData, this.av_pktData);
        // the padding after the data must be zeroed: bytes left by a previous bigger packet can corrupt decoding
        this.Module.HEAPU8.fill(0, this.av_pktData + pktSize, this.av_pktData + pktSize + 64);

        // decode next frame
        const sendRet = this.Module._avcodec_send_packet(this.av_ctx, this.av_pkt);
        if (sendRet < 0) {
            console.warn("Error while sending frame for decoding", sendRet, "pktSize=" + pktSize);
            return;
        }

        const recvRet = this.Module._avcodec_receive_frame(this.av_ctx, this.av_frame);
        // AVERROR(EAGAIN) is not an error: the decoder needs more data before it can output a frame
        // (decoder delay, packet with only SPS/PPS...). EAGAIN is 6 with emscripten's libc, so the value is -6
        if (recvRet === -6) {
            return;
        }
        if (recvRet < 0) {
            console.warn("Error while decoding frame", recvRet);
            return;
        }

        return this.handleAvFrame(this.av_frame, pktSize, timestamp);
    }
    // abstract
    handleAvFrame(avFrame, pktSize, timestamp) {}
}

export default FfmpegDecoder;
