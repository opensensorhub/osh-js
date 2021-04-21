import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';
import {isDefined, merge, randomUUID} from "../../../../utils/Utils";

class AudioFrequencyDomainChartJs {
    constructor(properties) {
        this.initFrequencyChart(properties);
    }

    initFrequencyChart(properties) {
        this.datasetsProps = {};
        this.chartProps = {};

        if (isDefined(properties)) {
            if(properties.props.hasOwnProperty('chartjsProps')){
                if(properties.props.chartjsProps.hasOwnProperty('datasetsProps')){
                    this.datasetsProps = properties.props.chartjsProps.datasetsProps;
                }

                if(properties.props.chartjsProps.hasOwnProperty('chartProps')){
                    this.chartProps = properties.props.chartjsProps.chartProps;
                }
            }
        }

        let domNode = properties.nodeElement;

        let ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        ctx.setAttribute("class", properties.props.css);

        domNode.appendChild(ctx);

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

        // #endregion snippet_chartjsview_default_chartprops

        merge(chartProps,this.chartProps);
        merge(datasetsProps,this.datasetsProps);

        this.datasetsProps = datasetsProps;

        this.chart = new Chart(
            ctx, {
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

        let step = decodedSample.buffer.sampleRate / 2 / decodedSample.dataFreqDomainArray.length;

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
        const dataArray = decodedSample.dataFreqDomainArray;
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

    onended() {}
    reset() {
        this.resetting = true;
        this.chart.stop();
        this.chart.data.datasets[0].data = [];
        this.chart.data.labels = [];
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    }

}

export default AudioFrequencyDomainChartJs;
