import AudioPlayer from  './worklets/audio.worklet';

class WebAudioApi {
    constructor(properties) {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        // the current audio buffer to read, can be a concatenation of multiple decoded audio buffers
        this.audioBuffer = null;
        // define the size of the audiobuffer to concatenate
        this.flushLimit = properties.flush;
        // current count used for flushing
        this.count = 0;
        this.init = false;
    }

    concat(buffer1, buffer2){
        const tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);

        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);

        return tmp.buffer;
    }

    async decode(data, timestamp) {
        if (!this.init) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)({
                latencyHint: 'playback',
                sampleRate: data.sampleRate,
            });
            this.audioCtx.resume();
            await this.audioCtx.audioWorklet.addModule(AudioPlayer);

            this.workletNode = new AudioWorkletNode(this.audioCtx, 'audio-player', {
                outputChannelCount: [1]  // mono
            })
            this.init = true;
            this.startTime = timestamp;
            this.workletNode.connect(this.audioCtx.destination);
        }

        if(this.count === 0) {
            this.audioBuffer = data.frameData.buffer;
        } else {
            this.audioBuffer = this.concat(this.audioBuffer, data.frameData.buffer);
        }

        if(this.count >= this.flushLimit) {
            await this.flush();
            this.count = 0;
        } else {
            this.count++;
        }
    }

    async flush() {
        try {
            let audioBufferChunk = await this.audioCtx.decodeAudioData(this.audioBuffer);
            let buf = audioBufferChunk.getChannelData(0).buffer;
            this.workletNode.port.postMessage({data: buf}, [buf]);
        }catch (e){
            console.error(e);
        }
    }

    reset() {

    }

    onDecodedBuffer(decodedBuffer){}

    getCurrentTime() {
        if(this.audioCtx === null){
            return 0;
        }
        return this.audioCtx.currentTime;
    }
}

export default WebAudioApi;
