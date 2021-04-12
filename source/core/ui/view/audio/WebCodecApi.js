class WebCodecApi {
    constructor(properties) {
        // time audio position
        this.deltaInc = 0.1;
        this.init = false;
        this.key = true;
        this.audioCtx = null;

        this.analyzer = null;
        this.startTime = 0;
        this.properties = properties;

        try {
            // check for supported webcodec
            this.audioDecoder = new AudioDecoder({
                output: (decodedSample) => {
                    const buffer = decodedSample.buffer;
                    let source = this.audioCtx.createBufferSource();

                    source.buffer = buffer;
                    if(this.analyzer) {
                        source.connect(this.analyzer);/*.connect(this.audioCtx.destination);*/
                    } else {
                        source.connect(this.audioCtx.destination);
                    }

                    // Connect the source to be analysed
                    source.start(this.deltaInc);
                    this.deltaInc += buffer.duration;

                    let dataDomainArray;

                    if(properties.domain === 'time') {
                        dataDomainArray = new Float32Array(this.analyzer.fftSize);
                        this.analyzer.getFloatTimeDomainData(dataDomainArray);
                    } else if(properties.domain === 'frequency') {
                        dataDomainArray = new Float32Array(this.analyzer.frequencyBinCount);
                        this.analyzer.getFloatFrequencyData(dataDomainArray);
                    }

                    this.onDecodedBuffer({
                        buffer: decodedSample.buffer,
                        dataDomainArray: dataDomainArray,
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

            if(this.properties.domain === 'time') {
                this.analyzer = this.audioCtx.createAnalyser();
                this.analyzer.fftSize = 1024;
            } else if(this.properties.domain === 'frequency') {
                this.analyzer = this.audioCtx.createAnalyser();
                this.analyzer.fftSize = 32;
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
