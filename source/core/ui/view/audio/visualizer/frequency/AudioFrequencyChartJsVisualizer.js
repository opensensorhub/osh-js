import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';
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
     * @param {Object} properties.chartJsProps - (type 'chart')
     * @param {Object} properties.chartJsProps.chartProps - (type 'chart') [context configuration options]{@link https://www.chartjs.org/docs/2.9.4/configuration}
     * @param {Object} properties.chartJsProps.datasetsProps - (type 'chart')  [dataset options]{@link https://www.chartjs.org/docs/2.9.4/charts/bar.html#dataset-properties}
     * @param {Object} properties.chartJsProps.datasetsMinMaxProps - (type 'chart')  [dataset options]{@link https://www.chartjs.org/docs/2.9.4/charts/bar.html#dataset-properties}
     */
    constructor(properties) {
        super({
            fftSize: 32,
            ...properties,
            type: 'frequency',
            format: 'float'
        });
        this.initFrequencyChart(properties);
    }

    initFrequencyChart(properties) {
        this.datasetsProps = {};
        this.chartProps = {};

        if (isDefined(properties)) {
            if(properties.hasOwnProperty('chartjsProps')){
                if(properties.chartjsProps.hasOwnProperty('datasetsProps')){
                    this.datasetsProps = properties.chartjsProps.datasetsProps;
                }

                if(properties.chartjsProps.hasOwnProperty('chartProps')){
                    this.chartProps = properties.chartjsProps.chartProps;
                }
            }
        }

        this.resetting = false;
        this.pos = 0;
        // #region snippet_audiochartjsview_default_chartprops
        let chartProps = {
            events: [],
            responsiveAnimationDuration: 0,
            animation: {
                duration: 0
            },
            legend: {
                display: false
            },
            spanGaps: true,
            elements: {
                line: {
                    tension: 0
                }
            },
            scales: {
                reverse: true,
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Amplitude (dB)',
                    },
                    ticks: {
                        min: -100,
                        max: 0,
                        beginAtZero: true
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        labelString: 'Frequency (Hz)',
                        display: true,
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: true,
        };

        let datasetsProps = {
            borderColor: '#a3a3a3',
            borderWidth:1,
            backgroundColor: 'rgba(188,221,255,0.1)',
            fill: false
        };

        // #endregion snippet_audiochartjsview_default_chartprops

        merge(chartProps,this.chartProps);
        merge(datasetsProps,this.datasetsProps);

        this.datasetsProps = datasetsProps;

        this.chart = new Chart(
            this.canvas, {
                labels:[''],
                type: 'bar',
                data: {
                    datasets: []
                },
                options : chartProps,
                plugins: []
            });

        this.dataset = {
            data: [],
            barThickness: 20,
            ...this.datasetsProps
        };

        this.chart.data.datasets.push(this.dataset);
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
    }

    draw(decodedSample) {
        if(this.resetting) {
            return;
        }
        const dataArray = decodedSample[this.properties.type][this.properties.format];
        if(this.chart.data.labels.length ===0) {
            this.buildLabels(decodedSample);
            for(let i=0;i < dataArray.length;i++) {
                this.dataset.data.push([-100, dataArray[i]]);
            }
        } else {
            for(let i=0;i < dataArray.length;i++) {
                this.dataset.data[i][1] = dataArray[i];
            }
        }
        this.chart.update(0);
    }

}

export default AudioFrequencyChartJsVisualizer;
