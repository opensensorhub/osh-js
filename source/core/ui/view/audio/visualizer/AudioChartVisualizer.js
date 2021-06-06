import AudioCanvasVisualizer from "./AudioCanvasVisualizer";

/**
 * This abstract class is in charge of visualizing Audio based on chart.js framework and using a decoded AudioBuffer.
 * @extends AudioCanvasVisualizer
 */
class AudioChartVisualizer extends AudioCanvasVisualizer {
    /**
     * Create a visualizer.
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} properties.fftSize - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency/time domain data.
     * @param {Object} [properties.chartjsProps={}] - Properties which can override the default framework ones
     * @param {Object} [properties.chartjsProps.datasetsProps={}] - chart.js [dataset options]{@link https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties}.
     * @param {Object} [properties.chartjsProps.chartProps={}] - chart.js [context configuration options]{@link https://www.chartjs.org/docs/latest/configuration}
     */
    constructor(properties) {
        super(properties);
    }

    parseDate(intTimeStamp) {
        const date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    }

    withLeadingZeros(dt) {
        return (dt < 10 ? '0' : '') + dt;
    }

    reset() {
        this.resetting = true;
        this.chart.stop();
        this.chart.data.labels = [];
        this.chart.data.datasets.forEach( dataset => dataset.data = []);
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    }

    onended() {}
}

export default  AudioChartVisualizer;
