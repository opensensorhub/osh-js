import FfmpegDecoder from "./FfmpegDecoder";

class FfmpegAudioDecoder extends FfmpegDecoder {
    constructor(codec) {
        super({
                codec: codec,
                codecMap: {
                    // 'aac': 'mp4a.40.2',
                },
                pktDataAllocSize: 1024
            }
        );
    }

    handleAvFrame(avFrame, pktSize, timestamp) {
        const nb_samples = this.Module.getValue(avFrame + 76, 'i32');
        const audioFramePtr = this.Module.getValue(avFrame, '*');
        return {
            frame: new Float32Array(this.Module.HEAPU8.buffer.slice(audioFramePtr, audioFramePtr + nb_samples * 4))
        };
    }
}

export default FfmpegAudioDecoder;
