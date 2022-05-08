class WebCodecApi {
    constructor(properties) {
        // time audio position
        this.init = false;
        this.key = true;
        this.codec = properties.codec || 'mp4a.40.2';
        try {
            // check for supported webcodec
            this.audioDecoder = new AudioDecoder({
                output: (decodedSample) => {
                    this.onDecodedBuffer(decodedSample.buffer);
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

    async decode(value, timestamp) {
        if (!this.init) {
            await this.audioDecoder.configure({
                codec: this.codec,
                numberOfChannels: 1,
                sampleRate: value.sampleRate
            });
            this.init = true;
        }

        const chunk = new EncodedAudioChunk({
            type:  this.key? "key" : "delta",
            data: value.frameData.data.buffer,
            timestamp: 0
        });

        try {
            this.audioDecoder.decode(chunk);
        } catch (error) {
            console.error(error);
        }
    }

    onDecodedBuffer(decodedBuffer){
        console.log('decoded')
    }

    reset() {
        if(this.init) {
            this.audioDecoder.close();
            this.init = false;
        }
    }
}

export default WebCodecApi;
