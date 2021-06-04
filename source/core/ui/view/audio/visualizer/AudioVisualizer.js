import {assertDefined, randomUUID} from "../../../../utils/Utils";

class AudioVisualizer {

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
