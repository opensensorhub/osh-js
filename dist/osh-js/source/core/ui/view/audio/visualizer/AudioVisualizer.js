import {assertDefined, randomUUID} from "../../../../utils/Utils";

/**
 * This abstract class is in charge of visualizing Audio using a decoded AudioBuffer
 */
class AudioVisualizer {

    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     */
    constructor(properties) {
        if (new.target === AudioVisualizer) {
            throw new TypeError("Cannot construct AudioVisualizer instances directly");
        }
        assertDefined(properties.container,'container must be defined in constructor argument');
        this.properties = {
            css: '',
            ...properties
        };
        this.id = randomUUID();
    }

    draw(decodedSample){}

    onended(decodedSample) {}

    createAnalyzer(audioCtx) {
        const analyzerNode = audioCtx.createAnalyser();
        analyzerNode.fftSize = this.properties.fftSize;
        analyzerNode.smoothingTimeConstant = 0.5;
        return {
            analyzer: analyzerNode,
            type: this.properties.type,
            format: this.properties.format
        };
    }

    reset() {}
}


export default AudioVisualizer;
