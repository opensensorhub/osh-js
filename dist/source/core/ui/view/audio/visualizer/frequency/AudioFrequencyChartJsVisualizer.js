import { Chart, registerables } from 'chart.js';
import {isDefined, merge} from "../../../../../utils/Utils";
import AudioChartVisualizer from "../AudioChartVisualizer";

/**
 * Class to visualize audio frequency using Chart.js framework
*/
class AudioFrequencyChartJsVisualizer extends AudioChartVisualizer {
    /*
     * @param {Object} [properties={}] - the properties of the visualizer
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {number} [properties.fftSize=32] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get frequency domain data.
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     */
    constructor(properties) {
        super({
            fftSize: 32,
            ...properties,
            type: 'frequency',
            format: 'float'
        });
        this.initFrequencyChart(properties);
        this.sampleNumber = 0;
    }

    initFrequencyChart(properties) {
        Chart.register(...registerables);

        // #region snippet_audiochartjsview_default_chartprops
        let type = 'bar';
        this.options = {
            maintainAspectRatio: true,
            normalized : true,
            spanGaps: true,
            scales: {
                x: {
                    type: 'category',
                    title: {
                        display: true,
                        text: 'Frequency (Hz)'
                    },
                    ticks: {
                        autoSkip: false
                    }
                },
                y : {
                    type: 'linear',
                    min: -100,
                    max: 0,
                    title: {
                        display: true,
                        text: 'Amplitude (dB)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            datasets: {},
            interaction :{},
            animations: {},
            layout: {},
            elements: {}
        };
        // #endregion snippet_audiochartjsview_default_chartprops

        if (isDefined(properties)) {
            if(properties.hasOwnProperty('options')){
                merge(properties.options,this.options);
            }
            if(properties.hasOwnProperty('type')){
                type = properties.type;
            }
            if(properties.hasOwnProperty('datasetOptions')){
                this.datasetOptions = properties.datasetOptions;
            }
        }

        this.resetting = false;
        this.pos = 0;

        this.chart = new Chart(
            this.canvas, {
                type: type,
                options: this.options
            });

        this.dataset = {
            data: [],
            borderColor: 'rgba(0,0,0,0.5)',
            backgroundColor: 'rgba(210,210,210,0.8)',
            borderWidth: 1,
            barThickness: 20,
            ...this.datasetOptions
        };
        this.chart.data.datasets.push(this.dataset);
        this.first = false;
    }

    buildLabels(decodedSample) {
        const labels = [];

        const dataArray = decodedSample[this.properties.type][this.properties.format];

        let step = decodedSample.buffer.sampleRate / 2 / dataArray.length;
        let nbStep = decodedSample.buffer.sampleRate / 2 / step;

        let value;
        for(let i=0;i < nbStep; i++) {
            value = Math.ceil((i+1) * step);
            if(value > 1000) {
                labels.push((value /= 1000).toFixed(2)+'K');
            } else {
                labels.push(''+value);
            }
        }
        this.chart.data.labels = labels;
        this.first = true;
    }

    draw(decodedSample) {
        if(this.resetting) {
            return;
        }
        this.decodedSample = decodedSample;
        this.sampleNumber++;
    }

    render() {
        const dataArray = this.decodedSample[this.properties.type][this.properties.format];
        if(this.chart.data.labels.length ===0) {
            this.buildLabels(this.decodedSample);
            for(let i=0;i < dataArray.length;i++) {
                this.dataset.data.push([-100, dataArray[i]]);
            }
        } else {
            for(let i=0;i < dataArray.length;i++) {
                this.dataset.data[i][1] = dataArray[i];
            }
        }
        super.update();
    }
}

export default AudioFrequencyChartJsVisualizer;
