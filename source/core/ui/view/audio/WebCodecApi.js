import {isDefined} from "../../../utils/Utils";

class WebCodecApi {
    constructor(properties) {
        // time audio position
        this.deltaInc = 0.1;
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

        this.gain = this.properties.gain;
        try {
            // check for supported webcodec
            this.audioDecoder = new AudioDecoder({
                output: (decodedSample) => {
                    const buffer = decodedSample.buffer;
                    let source = this.audioCtx.createBufferSource();

                    source.buffer = buffer;

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
                    this.deltaInc += buffer.duration;

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
                        buffer: decodedSample.buffer,
                        dataTimeDomainArray: dataTimeDomainArray,
                        dataFreqDomainArray: dataFreqDomainArray,
                        timestamp: this.startTime+this.deltaInc*1000
                    };

                    this.onDecodedBuffer(decoded);

                    source.onended = () => {
                        this.onEnded(decoded);
                    }
                },
                error: (error) => {
                    console.error(error);
                }
            });


        } catch (e) {
            // WebCodec is not supported
            throw new Error('WebCodec is not supported');
        }
    }

    async decode(data, timestamp) {
        if (!this.init) {
            let AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioContext({
                sampleRate: data.sampleRate,
                latencyHint: 'interactive'
            });

            await this.audioDecoder.configure({
                codec: 'mp4a.40.2',
                numberOfChannels: 1,
                sampleRate: data.sampleRate
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
        }

        const chunk = new EncodedAudioChunk({
            type:  this.key? "key" : "delta",
            data: data.frameData.buffer,
            timestamp: 0
        });

        try {
            this.audioDecoder.decode(chunk);
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

export default WebCodecApi;
