import FfmpegDecoder from "./FfmpegDecoder";

class FfmpegVideoDecoder extends FfmpegDecoder {
    constructor(codec) {
        super({
                codec: codec || 'h264',
                codecMap: {
                    'h265': 'hevc'
                },
                pktDataAllocSize: 1024 * 3000
            }
        );
    }

    handleAvFrame(avFrame, pktSize, timestamp) {
        const frame_width = this.Module.getValue(avFrame + 68, 'i32');
        const frame_height = this.Module.getValue(avFrame + 72, 'i32');
        //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

        // copy Y channel to canvas
        const frameYDataPtr = this.Module.getValue(avFrame, '*');
        const frameUDataPtr = this.Module.getValue(avFrame + 4, '*');
        const frameVDataPtr = this.Module.getValue(avFrame + 8, '*');

        return {
            frame_width: frame_width,
            frame_height: frame_height,
            frameYDataPtr: frameYDataPtr,
            frameUDataPtr: frameUDataPtr,
            frameVDataPtr: frameVDataPtr,
            frameYData: new Uint8Array(this.Module.HEAPU8.buffer.slice(frameYDataPtr, frameYDataPtr + frame_width * frame_height)),
            frameUData: new Uint8Array(this.Module.HEAPU8.buffer.slice(frameUDataPtr, frameUDataPtr + frame_width / 2 * frame_height / 2)),
            frameVData: new Uint8Array(this.Module.HEAPU8.buffer.slice(frameVDataPtr, frameVDataPtr + frame_width / 2 * frame_height / 2)),
            timestamp: timestamp,
            pktSize: pktSize,
            codec: this.codec
        }
    }
}

export default FfmpegVideoDecoder;
