import AudioVisualizer from "./AudioVisualizer";
import {isDefined} from "../../../../utils/Utils";

/**
 * This abstract class is in charge of visualizing Audio based on a canvas and using a decoded AudioBuffer.
 * @extends AudioVisualizer
 */
class AudioCanvasVisualizer extends AudioVisualizer {
    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     * @param {string} properties.container - The div element to attach to
     */
    constructor(properties) {
        super(properties);
        this.initCanvas(properties);
        this.subSamplingFrequency = 4000;
        this.sampleNumber = 0;
        this.animate();
    }

    // abstract
    draw(decodedSample) {}

    onended(decodedSample) {}

    initCanvas(properties) {
        const domNode = document.getElementById(properties.container);
        this.canvas = document.createElement("canvas");

        if(this.properties.hasOwnProperty('css')) {
            this.canvas.setAttribute("class",this.properties.css);
        }

        const bounds = domNode.getBoundingClientRect();
        this.canvas.setAttribute("width", bounds.width);
        this.canvas.setAttribute("height", bounds.height);
        domNode.appendChild(this.canvas);
        this.canvasCtx = this.canvas.getContext("2d");
    }

    checkSubsampling(decodedSample) {
        if(isDefined(this.lastSubSampingClockTime)) {
            const endClockTime = performance.now();
            const deltaClockTime = endClockTime - this.lastSubSampingClockTime;
            if(deltaClockTime < this.frequency) {
                console.warn('skipping audioBuffer');
                return false;
            }
        } else {
            this.frequency = 1000 / (this.subSamplingFrequency / decodedSample.buffer.length);
        }
        this.lastSubSampingClockTime = performance.now();
        return true;
    }

    checkUpdate() {
        if(!isDefined(this.lastClockTime)) {
            this.lastClockTime = performance.now();
            return true;
        }
        const endClockTime = performance.now();
        const deltaClockTime = endClockTime - this.lastClockTime;

        if(deltaClockTime > 1000/15) {
            this.lastClockTime = performance.now();
            return true;
        }
        return false;
    }

    animate() {
        setInterval(() => {
            if (this.sampleNumber === 0) {
                return;
            }
            this.render();
        },1000/10); // 15Hz
    }

    render() {}
}

export default AudioCanvasVisualizer;
