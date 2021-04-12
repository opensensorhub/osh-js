import AudioView from "./AudioView";
import {hex2rgb, isDefined, merge, randomUUID} from "../../../utils/Utils";
import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';

class AudioTimeDomainChartJs extends AudioView {
    constructor(properties) {
        super({
                ...properties,
                domain: 'time'
            }
        );

        this.initTimeChart(properties);
    }

    initTimeChart(properties) {
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

        let domNode = document.getElementById(this.divId);

        let ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        domNode.appendChild(ctx);

        this.resetting = false;

        // #region snippet_chartjsview_default_chartprops
        let chartProps = {
            responsiveAnimationDuration: 0,
            animation: {
                duration: 0
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
                        labelString: 'Values'
                    },
                    ticks: {
                        maxTicksLimit: 5,
                        min: -1.0,
                        max: 1.0
                    },
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Time'
                    },
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks: {
                        maxTicksLimit:5,
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
            ctx, {
                labels:[],
                type: 'line',
                data: {
                    datasets: []
                },
                options : chartProps
            });

        this.dataset = {
            ...this.datasetsProps,
            label: 'Time domain',
            backgroundColor: 'rgb(200,200,200)',
            data: [],
            pointRadius:0.2
        }
        this.chart.data.datasets.push(this.dataset);
        this.maxPoints = 100;
    }
    parseDate(intTimeStamp) {
        const date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    }

    withLeadingZeros(dt) {
        return (dt < 10 ? '0' : '') + dt;
    }

    draw(decodedSample) {
        if(this.resetting) {
            return;
        }
        const minValue = Math.min(...decodedSample.dataDomainArray);
        const maxValue = Math.max(...decodedSample.dataDomainArray);

        const time = decodedSample.timestamp;
        this.dataset.data.push({
            'x': time,
            'y': 0
        });
        this.dataset.data.push({
            'x': time,
            'y': minValue
        });
        this.dataset.data.push({
            'x': time,
            'y': maxValue
        });
        this.dataset.data.push({
            'x': time,
            'y': 0
        });
        if((this.dataset.data.length > this.maxPoints + 2)) {
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[2];
        }

        if((this.dataset.data.length > this.maxPoints + 2)) {
            this.chart.data.labels.shift();
            this.dataset.data.shift();
        }
        this.chart.update();
    }

    reset() {
        this.resetting = true;
        this.chart.stop();
        super.reset();
        this.chart.data.datasets[0].data = [];
        this.chart.data.labels = [];
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    }

}

export default AudioTimeDomainChartJs;
