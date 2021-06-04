class AudioPlayer extends AudioWorkletProcessor {
  constructor() {
    super()

    this.audioBuffers = [];
    this.readIdx = 0;
    this.audioBuffersIdx = 0;

    // set audio to play when received from main/worker thread
    this.port.onmessage = ({ data }) => {
      this.audioBuffers.push(new Float32Array(data.data));
    }
  }

  process(inputs, [[ outLeft, outRight ]], { audioSrcIndex }) {
    if(this.audioBuffers.length > 0) {
      for (let i = 0; i < outLeft.length; i++, this.readIdx++) {
       // copy 128 samples from decodedAudio to outputs channels
        if (this.readIdx >= this.audioBuffers[0].length) {
          // SHIFT
          this.readIdx = 0;
          this.audioBuffers.shift();
          this.port.postMessage({});
          // this.readIdx = 0;
          if(this.audioBuffers.length === 0) {
            break;
          }
        }
        // mono
        outLeft[i] = this.audioBuffers[0][this.readIdx];
      }
    }
    // run process() again for next 128 samples
    return true;
  }
}

registerProcessor('audio-player', AudioPlayer)
