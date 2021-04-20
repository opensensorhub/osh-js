import {isDefined} from "../../../utils/Utils";
import DecodeWorker from './workers/ffmpeg.decode.audio.worker.js';

class FfmpegAudio {
    constructor(properties) {
        // time audio position
        this.deltaInc = 0.2;
        this.init = false;
        this.key = true;
        this.audioCtx = null;

        this.analyzerTimeNode = null;
        this.analyzerFreqNode = null;
        this.gainNode = null;

        this.startTime = 0;
        this.properties = {
            output: true,
            ...properties
        };

        this.codec = 'aac';
        this.gain = this.properties.gain;

        try {
            // create ffmpeg web worker
            this.audioDecoderWorker = new DecodeWorker();

            this.audioDecoderWorker.onmessage = (event) => {
                const frame = event.data.frame;
                let audioBuffer = this.audioCtx.createBuffer(1, frame.length, this.audioCtx.sampleRate);
                audioBuffer.copyToChannel(frame, 0,0);

                let source = this.audioCtx.createBufferSource();
                source.buffer = audioBuffer;

                let node = source;

                node = node.connect(this.gainNode);
                if(this.analyzerTimeNode !== null) {
                    node = node.connect(this.analyzerTimeNode);
                }

                if(this.analyzerFreqNode !== null) {
                    node = node.connect(this.analyzerFreqNode);
                }

                // play sound
                if(this.properties.output) {
                    node.connect(this.audioCtx.destination);
                }

                // Connect the source to be analysed
                source.start(this.deltaInc);
                this.deltaInc += audioBuffer.duration;

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
                    buffer: audioBuffer,
                    dataTimeDomainArray: dataTimeDomainArray,
                    dataFreqDomainArray: dataFreqDomainArray,
                    timestamp: this.startTime+this.deltaInc*1000
                };

                this.onDecodedBuffer(decoded);

                source.onended = () => {
                    this.onEnded(decoded);
                }
            };
        } catch (e) {
            // WebCodec is not supported
            throw new Error('FFMPEG audio decoder is not supported');
        }
    }

    async decode(data, timestamp) {
        if (!this.init) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext({
                sampleRate: data.sampleRate,
                latencyHint: 'interactive'
            });

            if(isDefined(this.properties.frequencyDomainVisualization)) {
                this.analyzerFreqNode = this.audioCtx.createAnalyser();
                this.analyzerFreqNode.fftSize = this.properties.frequencyDomainVisualization.fftSize;
            }

            if(isDefined(this.properties.timeDomainVisualization)) {
                this.analyzerTimeNode = this.audioCtx.createAnalyser();
                this.analyzerTimeNode.fftSize = this.properties.timeDomainVisualization.fftSize;
            }
            this.gainNode = this.audioCtx.createGain();
            this.gainNode.gain.setValueAtTime(this.gain,0);

            this.init = true;
            this.startTime = timestamp;
            this.deltaInc = 0;
        }

        try {
            this.audioDecoderWorker.postMessage({
                pktData: data,
                codec: this.codec
            }, [data.frameData.buffer]);
        } catch (error) {
            console.error(error);
        }
    }

    reset() {
        if(this.init) {
            this.init = false;
        }
    }

    onDecodedBuffer(decodedBuffer){
        console.log('decoded')
    }

    onEnded(decodedBuffer){
        console.log('ended')
    }

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

export default FfmpegAudio;

