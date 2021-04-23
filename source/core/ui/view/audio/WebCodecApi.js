class WebCodecApi {
    constructor(properties) {
        // time audio position
        this.init = false;
        this.key = true;

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

    async decode(data, timestamp) {
        if (!this.init) {
            await this.audioDecoder.configure({
                codec: 'mp4a.40.2',
                numberOfChannels: 1,
                sampleRate: data.sampleRate
            });
            this.init = true;
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
