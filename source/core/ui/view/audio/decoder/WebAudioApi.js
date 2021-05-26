import AudioPlayer from  './worklets/audio.worklet';
import {isDefined} from "../../../../utils/Utils";

class WebAudioApi {
    constructor(properties) {
        let AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
        // the current audio buffer to read, can be a concatenation of multiple decoded audio buffers
        this.audioArrayBuffers = [];
        // define the size of the audiobuffer to concatenate
        this.flushLimit = properties.flush;
        this.flushLimit = 3;
        // current count used for flushing
        this.count = 0;
        this.init = false;
        this.deltaInc = 0;
        this.startTime = 0;

        this.analyzerTimeNode = null;
        this.analyzerFreqNode = null;
        this.gainNode = null;

        this.properties = {
            output: true,
            ...properties
        };
        this.gain = this.properties.gain;

        this.totalOffset = 0;
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
                latencyHint: 'interactive',
                sampleRate: data.sampleRate,
            });
            this.audioCtx.resume();
            await this.audioCtx.audioWorklet.addModule(AudioPlayer);

            this.workletNode = new AudioWorkletNode(this.audioCtx, 'audio-player', {
                outputChannelCount: [1]  // mono
            })
            this.init = true;
            this.startTime = timestamp;

            if (isDefined(this.properties.frequencyDomainVisualization)) {
                this.analyzerFreqNode = this.audioCtx.createAnalyser();
                this.analyzerFreqNode.fftSize = this.properties.frequencyDomainVisualization.fftSize;
            }

            if (isDefined(this.properties.timeDomainVisualization)) {
                this.analyzerTimeNode = this.audioCtx.createAnalyser();
                this.analyzerTimeNode.fftSize = this.properties.timeDomainVisualization.fftSize;
            }
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.gain.setValueAtTime(this.gain, 0);

            let node = this.workletNode;

            node = node.connect(this.gainNode);

            if (this.analyzerTimeNode !== null) {
                node = node.connect(this.analyzerTimeNode);
            }

            if (this.analyzerFreqNode !== null) {
                node = node.connect(this.analyzerFreqNode);
            }

            // play sound
            if (this.properties.output) {
                node.connect(this.audioCtx.destination);
            }
        }
        if(this.flushLimit === 0 || this.flushLimit === 1) {
            await this.flush(data.frameData.buffer);
        } else {
            // concat array
            this.audioArrayBuffers.push(data.frameData.buffer);
            this.count++;

            if (this.count >= this.flushLimit) {
                await this.flush(this.getAudioArrayBuffer());
                this.count = 0;
                this.audioArrayBuffers = [];
            }
        }
    }

    getAudioArrayBuffer() {
        let currentArrayBuffer=null;
        while(this.audioArrayBuffers.length > 0) {
            if(currentArrayBuffer === null) {
                currentArrayBuffer = this.audioArrayBuffers.shift();
            } else {
                currentArrayBuffer = this.concat(currentArrayBuffer, this.audioArrayBuffers.shift());
            }
        }
        return currentArrayBuffer;
    }

    async flush(audioBuffer) {
        try {
            let audioBufferChunk = await this.audioCtx.decodeAudioData(audioBuffer);
            let buf = audioBufferChunk.getChannelData(0).buffer;
            this.workletNode.port.postMessage({data: buf}, [buf]);

            this.deltaInc += audioBufferChunk.duration;

            let dataTimeDomainArray, dataFreqDomainArray;

            if(this.analyzerTimeNode !== null) {
                dataTimeDomainArray = new Float32Array(this.analyzerTimeNode.fftSize);
                this.analyzerTimeNode.getFloatTimeDomainData(dataTimeDomainArray);
            }

            if(this.analyzerFreqNode !== null) {
                dataFreqDomainArray = new Float32Array(this.analyzerFreqNode.frequencyBinCount);
                this.analyzerFreqNode.getFloatFrequencyData(dataFreqDomainArray);
            }

            const decoded =  {
                buffer: audioBufferChunk,
                dataTimeDomainArray: dataTimeDomainArray,
                dataFreqDomainArray: dataFreqDomainArray,
                timestamp: this.startTime+this.deltaInc*1000
            };

            this.onDecodedBuffer(decoded);

            this.workletNode.port.onmessage = () => {
                this.onEnded(decoded);
            }
        }catch (e){
            console.error(e);
        }
    }

    reset() {
    }

    parseAACHeaders(dataBuffer) {
        const data = new Uint8Array(dataBuffer.slice(0, 12));

        let E = (data[2] & 0xC0) >> 6;
        let F = (data[2] & 0x3C) >> 2;
        let H = (data[3] & 0xC0) >> 6;
        let I = (data[3] & 0x20) >> 5;
        let J = (data[3] & 0x10) >> 5;
        let K = (data[3] & 0x8) >> 4;
        let L = (data[3] & 0x4) >> 2;
        let M = ((data[3] & 0x2) << 11) | (data[4] << 3) | ((data[5] & 0xE0) >> 5);
        let O = ((data[5] & 0x1F) << 6) | ((data[6] & 0xFC) >> 2);
        let P = (data[6] & 0x3);

        const header = {
            E, F, H, I, J, K, L, M, O, P
        };

        return header;
    }

    onEnded(decodedBuffer){
    }

    onDecodedBuffer(decodedBuffer){}

    getCurrentTime() {
        if(this.audioCtx === null){
            return 0;
        }
        return this.audioCtx.currentTime;
    }

    setGain(value) {
        if(isDefined(this.gainNode)) {
            this.gainNode.gain.setValueAtTime(value, 0);
        } else {
            this.gain = value;
        }
    }
}

export default WebAudioApi;
