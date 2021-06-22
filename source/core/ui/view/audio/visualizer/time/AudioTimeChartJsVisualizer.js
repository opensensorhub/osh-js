import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';
import {isDefined, merge, randomUUID} from "../../../../../utils/Utils";
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
     * @param {Object} properties.chartJsProps - (type 'chart')
     * @param {Object} properties.chartJsProps.chartProps - (type 'chart') [context configuration options]{@link https://www.chartjs.org/docs/2.9.4/configuration}
     * @param {Object} properties.chartJsProps.datasetsProps - (type 'chart')  [dataset options]{@link https://www.chartjs.org/docs/2.9.4/charts/bar.html#dataset-properties}
     * @param {Object} properties.chartJsProps.datasetsMinMaxProps - (type 'chart')  [dataset options]{@link https://www.chartjs.org/docs/2.9.4/charts/bar.html#dataset-properties}
     */
    constructor(properties) {
        super({
            fftSize: 1024,
            ...properties,
            type: 'time',
            format: 'float'
        });
        this.initTimeChart(properties);
    }

    initTimeChart(properties) {
        this.datasetsProps = {};
        this.chartProps = {};
        this.datasetsMinMaxProps = {};

        if (isDefined(properties)) {
            if(properties.hasOwnProperty('chartjsProps')){
                if(properties.chartjsProps.hasOwnProperty('datasetsProps')){
                    this.datasetsProps = properties.chartjsProps.datasetsProps;
                }

                if(properties.chartjsProps.hasOwnProperty('datasetsMinMaxProps')){
                    this.datasetsMinMaxProps = properties.chartjsProps.datasetsMinMaxProps;
                }

                if(properties.chartjsProps.hasOwnProperty('chartProps')){
                    this.chartProps = properties.chartjsProps.chartProps;
                }
            }
        }

        this.resetting = false;
        this.pos = 0;
        // #region snippet_chartjsview_default_chartprops
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
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Amplitude'
                    },
                    ticks: {
                        min: -1.0,
                        max: 1.0
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks: {
                        callback: (label, index, values) => {
                            return this.parseDate(values[index].value);
                        }
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

        // #endregion snippet_chartjsview_default_chartprops

        merge(chartProps,this.chartProps);
        merge(datasetsProps,this.datasetsProps);

        this.datasetsProps = datasetsProps;
        this.maxPoints = chartProps.scales.xAxes[0].ticks.maxTicksLimit;

        this.chart = new Chart(
            this.canvas, {
                labels:[],
                type: 'bar',
                data: {
                    datasets: []
                },
                options : chartProps,
                plugins: []
            });
        this.initDatasets();
    }

    initDatasets() {
        // #region snippet_audiochartjsview_default_chartprops
        this.dataset = {
            label: 'Time domain',
            backgroundColor: 'rgba(200,200,200,0.4)',
            data: [],
            pointRadius:0.1,
            barThickness:1,
            ...this.datasetsProps,
            fill: false,
        };

        this.minDataset = {
            backgroundColor: 'rgba(0,140,143,0.4)',
            borderColor:'rgba(0,140,143,0.4)',
            data: [],
            pointRadius:0.0,
            fill: true,
            ...this.datasetsMinMaxProps
        };

        this.maxDataset = {
            backgroundColor: 'rgba(0,140,143,0.4)',
            borderColor:'rgba(0,140,143,0.4)',
            data: [],
            pointRadius:0.0,
            fill: true,
            ...this.datasetsMinMaxProps
        };

        this.positionDataset = {
            backgroundColor: 'rgba(0,140,143,0.4)',
            borderColor:'rgb(255,128,128)',
            data: [],
            pointRadius:0.0,
            fill: false,
            borderWidth: 1.0,
            type: 'line'
        };
        // #endregion snippet_audiochartjsview_default_chartprops

        this.chart.data.datasets.push(this.positionDataset);
        this.chart.data.datasets.push(this.minDataset);
        this.chart.data.datasets.push(this.maxDataset);
        this.chart.data.datasets.push(this.dataset);
    }

    draw(decodedSample) {
        if(this.resetting) {
            return;
        }
        const dataArray = decodedSample[this.properties.type][this.properties.format];

        const minValue = Math.min(...dataArray);
        const maxValue = Math.max(...dataArray);

        const time = decodedSample.timestamp;
        this.dataset.data.push({
            'x': time,
            'y': minValue
        });
        this.dataset.data.push({
            'x': time,
            'y': maxValue
        });

        if((this.dataset.data.length > this.maxPoints )) {
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[2];
        }

        if((this.dataset.data.length > this.maxPoints )) {
            this.chart.data.labels.shift();
            this.dataset.data.shift();
            this.dataset.data.shift();

            this.minDataset.data.shift();
            this.maxDataset.data.shift();
        }
        this.chart.update(0);
    }
    onended(decodedSample) {
        if(this.resetting) {
            return;
        }
        const dataArray = decodedSample[this.properties.type][this.properties.format];

        const minValue = Math.min(...dataArray);
        const maxValue = Math.max(...dataArray);

        const time = decodedSample.timestamp;
        this.minDataset.data.push({
            'x': time,
            'y': minValue
        });
        this.maxDataset.data.push({
            'x': time,
            'y': maxValue
        });

        if(this.positionDataset.data.length === 0) {
            this.positionDataset.data.push({
                'x': time,
                'y': -1.0
            });
            this.positionDataset.data.push({
                'x': time,
                'y': 1.0
            });
        } else {
            this.positionDataset.data[0].x = time;
            this.positionDataset.data[1].x = time;
        }
        // this.chart.update(0);
    }

}

export default AudioTimeChartJsVisualizer;
