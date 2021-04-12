import {isDefined} from "../../../utils/Utils";

class WebCodecApi {
    constructor(properties) {
        // time audio position
        this.deltaInc = 0.1;
        this.init = false;
        this.key = true;
        this.audioCtx = null;

        this.analyzerTime = null;
        this.analyzerFreq = null;
        this.startTime = 0;
        this.properties = properties;

        try {
            // check for supported webcodec
            this.audioDecoder = new AudioDecoder({
                output: (decodedSample) => {
                    const buffer = decodedSample.buffer;
                    let source = this.audioCtx.createBufferSource();

                    source.buffer = buffer;

                    let node = source;

                    if(this.analyzerTime !== null) {
                        node = node.connect(this.analyzerTime);
                    }

                    if(this.analyzerFreq !== null) {
                        node = node.connect(this.analyzerFreq);
                    }

                    node.connect(this.audioCtx.destination);

                    // Connect the source to be analysed
                    source.start(this.deltaInc);
                    this.deltaInc += buffer.duration;

                    let dataTimeDomainArray, dataFreqDomainArray;

                    dataTimeDomainArray = new Float32Array(this.analyzerTime.fftSize);
                    this.analyzerTime.getFloatTimeDomainData(dataTimeDomainArray);
                    dataFreqDomainArray = new Float32Array(this.analyzerFreq.frequencyBinCount);
                    this.analyzerFreq.getFloatFrequencyData(dataFreqDomainArray);

                    this.onDecodedBuffer({
                        buffer: decodedSample.buffer,
                        dataTimeDomainArray: dataTimeDomainArray,
                        dataFreqDomainArray: dataFreqDomainArray,
                        timestamp: this.startTime+this.deltaInc*1000
                    });
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
                this.analyzerFreq = this.audioCtx.createAnalyser();
                this.analyzerFreq.fftSize = this.properties.frequencyDomainVisualization.fftSize;
            }

            if(isDefined(this.properties.timeDomainVisualization)) {
                this.analyzerTime = this.audioCtx.createAnalyser();
                this.analyzerTime.fftSize = this.properties.timeDomainVisualization.fftSize;
            }
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

    getCurrentTime() {
        if(this.audioCtx === null){
            return 0;
        }
        return this.audioCtx.currentTime;
    }
}

export default WebCodecApi;
