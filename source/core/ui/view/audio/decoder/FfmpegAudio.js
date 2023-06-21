import DecodeWorker from './workers/ffmpeg.decode.audio.worker.js';
import {randomUUID} from "../../../../utils/Utils";

class FfmpegAudio {
    constructor(properties) {
        const audioCtx = properties.audioCtx;
        this.codec = properties.codec;

        try {
            this.audioDecoderWorker = new DecodeWorker();
            // const drawWorker = new DrawWorker();
            this.audioDecoderWorker.id = randomUUID();

            console.log(this.codec)
            this.audioDecoderWorker.postMessage({
                'message': 'init',
                'codec' : this.codec.toLowerCase()
            });

            // create ffmpeg web worker
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
                pktSize: value.frameData.data.length,
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

