import DecodeWorker from './workers/ffmpeg.decode.audio.worker.js';

class FfmpegAudio {
    constructor(properties) {
        const audioCtx = properties.audioCtx;
        this.codec = properties.codec;

        try {
            // create ffmpeg web worker
            this.audioDecoderWorker = new DecodeWorker();

            this.audioDecoderWorker.onmessage = (event) => {
                const frame = event.data.frame;
                let audioBuffer = audioCtx.createBuffer(1, frame.length, audioCtx.sampleRate);
                audioBuffer.copyToChannel(frame, 0,0);
                this.onDecodedBuffer(audioBuffer);
            };
        } catch (e) {
            // WebCodec is not supported
            throw new Error('FFMPEG audio decoder is not supported');
        }
    }

    async decode(value, timestamp) {
        try {
            this.audioDecoderWorker.postMessage({
                pktData: value.frameData.data,
                codec: value.frameData.compression.toLowerCase()
            }, [value.frameData.data.buffer]);
        } catch (error) {
            console.error(error);
        }
    }

    onDecodedBuffer(decodedBuffer){
        console.log('decoded')
    }
    reset() {

    }
}

export default FfmpegAudio;

