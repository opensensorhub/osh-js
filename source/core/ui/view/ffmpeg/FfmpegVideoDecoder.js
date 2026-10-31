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
        const HEAPU8 = this.Module.HEAPU8;
        // AVFrame fields: data[0..2] at 0/4/8, width at 68, height at 72
        const avFrameFields = new Uint32Array(HEAPU8.buffer, avFrame, 19);
        const frame_width = avFrameFields[17] | 0;
        const frame_height = avFrameFields[18] | 0;
        //console.log("Decoded Frame, W=" + frame_width + ", H=" + frame_height);

        // copy Y channel to canvas
        const frameYDataPtr = avFrameFields[0];
        const frameUDataPtr = avFrameFields[1];
        const frameVDataPtr = avFrameFields[2];

        const ySize = frame_width * frame_height;
        const uvSize = frame_width / 2 * frame_height / 2;

        return {
            frame_width: frame_width,
            frame_height: frame_height,
            frameYDataPtr: frameYDataPtr,
            frameUDataPtr: frameUDataPtr,
            frameVDataPtr: frameVDataPtr,
            frameYData: HEAPU8.slice(frameYDataPtr, frameYDataPtr + ySize),
            frameUData: HEAPU8.slice(frameUDataPtr, frameUDataPtr + uvSize),
            frameVData: HEAPU8.slice(frameVDataPtr, frameVDataPtr + uvSize),
            timestamp: timestamp,
            pktSize: pktSize,
            codec: this.codec
        }
    }
}

export default FfmpegVideoDecoder;
