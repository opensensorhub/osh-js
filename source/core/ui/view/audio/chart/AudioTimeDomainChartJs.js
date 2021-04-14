import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';
import {isDefined, merge, randomUUID} from "../../../../utils/Utils";

class AudioTimeDomainChartJs {
    constructor(properties) {
        this.initTimeChart(properties);
    }

    initTimeChart(properties) {
        this.datasetsProps = {};
        this.chartProps = {};
        this.datasetsMinMaxProps = {};

        if (isDefined(properties)) {
            if(properties.props.hasOwnProperty('chartjsProps')){
                if(properties.props.chartjsProps.hasOwnProperty('datasetsProps')){
                    this.datasetsProps = properties.props.chartjsProps.datasetsProps;
                }

                if(properties.props.chartjsProps.hasOwnProperty('datasetsMinMaxProps')){
                    this.datasetsMinMaxProps = properties.props.chartjsProps.datasetsMinMaxProps;
                }

                if(properties.props.chartjsProps.hasOwnProperty('chartProps')){
                    this.chartProps = properties.props.chartjsProps.chartProps;
                }
            }
        }

        let domNode = properties.nodeElement;

        let ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
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
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Amplitude'
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
                    stacked: true,
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks: {
                        maxTicksLimit: 20,
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
                type: 'bar',
                data: {
                    datasets: []
                },
                options : chartProps,
                plugins: []
            });

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

        this.chart.data.datasets.push(this.positionDataset);
        this.chart.data.datasets.push(this.minDataset);
        this.chart.data.datasets.push(this.maxDataset);
        this.chart.data.datasets.push(this.dataset);


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
        const minValue = Math.min(...decodedSample.dataTimeDomainArray);
        const maxValue = Math.max(...decodedSample.dataTimeDomainArray);

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
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[3];
        }

        if((this.dataset.data.length > this.maxPoints )) {
            this.chart.data.labels.shift();
            this.chart.data.labels.shift();
            this.dataset.data.shift();
            this.dataset.data.shift();

            this.minDataset.data.shift();
            this.maxDataset.data.shift();
        }
        this.chart.update();
    }
    onended(decodedSample) {
        if(this.resetting) {
            return;
        }
        const minValue = Math.min(...decodedSample.dataTimeDomainArray);
        const maxValue = Math.max(...decodedSample.dataTimeDomainArray);

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

export default AudioTimeDomainChartJs;
