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

    async decode(data, timestamp) {
        try {
            this.audioDecoderWorker.postMessage({
                pktData: data,
                codec: this.codec
            }, [data.frameData.buffer]);
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

