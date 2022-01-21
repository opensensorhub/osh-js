import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import { isDefined, merge, randomUUID } from "../../../../../utils/Utils";
import AudioChartVisualizer from "../AudioChartVisualizer";

/**
 * Class to visualize audio time domain using Chart.js framework
 */
class AudioTimeChartJsVisualizer extends AudioChartVisualizer {
    /*
     * @param {Object} [properties={}] - the properties of the view
     * @param {number} [properties.fftSize=1024] - The fftSize property of the AnalyserNode interface is an unsigned long value and represents the window size in samples that is used when performing a Fast Fourier Transform (FFT) to get time domain data.
     * @param {string} properties.container - The div element to attach to
     * @param {string} [properties.css=''] - The css classes to set, can be multiple if separate by spaces
     * @param {Number} [properties.maxValues=200] - The maximum values before shifting the graph to the left
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     * @param {String} [properties.colorData='rgba(100,255,65,0.4)'] - Defines color which colorizes the read data
     */
    constructor(properties) {
        super({
            fftSize: 1024,
            maxValues: 200,
            ...properties,
            type: 'time',
            format: 'float'
        });
        this.initTimeChart(properties);
    }

    initTimeChart(properties) {
        // #region snippet_chartjsview_default_chartprops
        let type = 'bar';
        this.datasetMinMaxOptions = {};
        this.datasetOptions = {};
        this.colorReadData = 'rgba(100,255,65,0.4)';
        this.options = {
            legend: {
                display: false
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Amplitude'
                    },
                    min: -1.0,
                    max: 1.0,
                    stacked: true,
                },
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    },
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks: {
                        callback: (label, index, values) => {
                            return this.parseDate(values[index].value);
                        },
                        minRotation: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            datasets: {},
            interaction: {},
            animations: {},
            layout: {},
            elements: {},
            responsive: true,
            maintainAspectRatio: true,
        };

        if (isDefined(properties)) {
            if (properties.hasOwnProperty('options')) {
                merge(properties.options, this.options);
            }
            if (properties.hasOwnProperty('type')) {
                type = properties.type;
            }
            if (properties.hasOwnProperty('datasetOptions')) {
                this.datasetOptions = properties.datasetOptions;
            }
            if (properties.hasOwnProperty('colorReadData')) {
                this.colorReadData = properties.colorReadData;
            }
        }

        // #endregion snippet_chartjsview_default_chartprops

        this.resetting = false;
        this.pos = 0;

        this.chart = new Chart(
            this.canvas, {
                type: type,
                options: this.options
            });

        this.initDatasets();
        this.posReadData = 0;
    }

    initDatasets() {
        // #region snippet_audiochartjsview_default_chartprops
        this.dataset = {
            label: 'Time domain',
            backgroundColor: 'rgba(200,200,200,0.4)',
            data: [],
            pointRadius: 0.1,
            fill: true,
            // barPercentage: 1.0,
            // categoryPercentage: 1.0,
            // barThickness: 'flex',
            barThickness: 2.0,
            ...this.datasetOptions
        };

        // init array of background color
        let color = this.dataset.backgroundColor;
        this.dataset.backgroundColor = [];
        for (let i = 0; i < this.properties.maxValues; i++) {
            this.dataset.backgroundColor.push(color);
        }

        // #endregion snippet_audiochartjsview_default_chartprops
        this.chart.data.datasets.push(this.dataset);
    }

    draw(decodedSample) {
        if(!super.checkSubsampling(decodedSample)) {
            return;
        }
        if (this.resetting) {
            return;
        }

        if ((this.dataset.data.length > this.properties.maxValues)) {
            this.dataset.backgroundColor[this.dataset.data.length - 1] = 'rgba(200,200,200,0.4)';
            this.chart.data.labels.shift();
            this.dataset.data.shift();
            this.posReadData--;
        }

        const dataArray = decodedSample[this.properties.type][this.properties.format];

        const minValue = Math.min(...dataArray);
        const maxValue = Math.max(...dataArray);

        const time = decodedSample.timestamp;
        // console.log("TimeChart ts: " + new Date(time).toISOString());
        this.dataset.data.push({
            'x': time,
            'y': [minValue, maxValue]
        });
        //
    }

    render() {
        super.update();
    }
    onended(decodedSample) {
        if (this.resetting) {
            return;
        }

        this.dataset.backgroundColor[this.posReadData++] = this.colorReadData;
        this.chart.update();
    }

}

export default AudioTimeChartJsVisualizer;
