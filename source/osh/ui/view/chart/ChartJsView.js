import {View} from "../View";
import {isDefined, randomUUID} from "../../../utils/Utils";
import Chart from 'chart.js';
import moment from 'moment';
import 'chart.js/dist/Chart.min.css';
export default class ChartJsView extends View {
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let xLabel = 'Time';
        let yLabel = 'Values';

        let useInteractiveGuideline = true;
        let showLegend = true;
        let showYAxis = true;
        let showXAxis = true;
        let transitionDuration = 1;
        this.datasetsOpts = {};
        this.gridLinesOpts = {};
        this.tickOpts = {};
        this.scaleLabelOpts = {};
        this.legendOpts = {};

        let xTickFormat = function(d) {
            return moment().format();
        };

        if (isDefined(options)) {
            if (options.hasOwnProperty('xLabel')) {
                let xLabel = options.xLabel;
            }

            if(options.hasOwnProperty('datasetsOpts')){
                this.datasetsOpts = options.datasetsOpts;
            }

            if(options.hasOwnProperty('gridLinesOpts')){
                this.gridLinesOpts = options.gridLinesOpts;
            }

            if(options.hasOwnProperty('scaleLabelOpts')){
                this.scaleLabelOpts = options.scaleLabelOpts;
            }

            if(options.hasOwnProperty('tickOpts')){
                this.tickOpts = options.tickOpts;
            }

            if(options.hasOwnProperty('legendOpts')){
                this.legendOpts = options.legendOpts;
            }

            if (options.hasOwnProperty('yLabel')) {
                let yLabel = options.yLabel;
            }

            if (options.hasOwnProperty('xTickFormat')) {
                xTickFormat = options.xTickFormat;
            }

            if (options.hasOwnProperty('yTickFormat')) {
                yTickFormat = options.yTickFormat;
            }

            if (options.hasOwnProperty('showLegend')) {
                showLegend = options.showLegend;
            }

            if (options.hasOwnProperty('showXAxis')) {
                showXAxis = options.showXAxis;
            }

            if (options.hasOwnProperty('showYAxis')) {
                showYAxis = options.showYAxis;
            }

            if (options.hasOwnProperty('useInteractiveGuideline')) {
                useInteractiveGuideline = options.useInteractiveGuideline;
            }

            if (options.hasOwnProperty('transitionDuration')) {
                transitionDuration = options.transitionDuration;
            }
            if (options.hasOwnProperty('maxPoints')) {
                this.maxPoints = options.maxPoints;
            }
        }

        let domNode = document.getElementById(this.divId);

        let ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        domNode.appendChild(ctx);

        const { maxTicksLimit } = this.tickOpts || 5;
        this.maxPoints = maxTicksLimit;

        this.chart = new Chart(
            ctx, {
                labels:[],
                type: 'line',
                data: {
                    datasets: []
                },
                options : {
                    legend: {
                        ...this.legendOpts
                    },
                    animation: {
                        duration: 1000
                    },
                    spanGaps: true,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: yLabel,
                                ...this.scaleLabelOpts,
                            },
                            ticks: {
                                maxTicksLimit:5,
                                ...this.tickOpts
                            },
                            gridLines: this.gridLinesOpts,
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: xLabel,
                                ...this.scaleLabelOpts,
                            },
                            type: 'time',
                            time: {
                                unit: 'second',
                            },
                            ticks: {
                                maxTicksLimit:5,
                                ...this.tickOpts
                            },
                            gridLines: this.gridLinesOpts,
                        }],
                    },
                    responsive: true,
                    maintainAspectRatio: true
                }
            });

        this.datasets = {};
    }

    updateCurve(styler, timestamp, options) {
        let currentDataset = this.datasets[styler.getId()];
        if(!isDefined(currentDataset)) {
            currentDataset = {
                label: styler.viewItem.name,
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: []
            };
            currentDataset = {...currentDataset, ...this.datasetsOpts};
            this.datasets[styler.getId()] = currentDataset;
            this.chart.data.datasets.push(currentDataset);
        }
        if(currentDataset.data.length >= this.maxPoints) {
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[2];
        }

        currentDataset.data.push({
            x: styler.x,
            y: styler.y
        });
        this.chart.data.labels.push(styler.x);

        this.chart.update();

        if(currentDataset.data.length > this.maxPoints) {
            this.chart.data.labels.shift();
            currentDataset.data.shift();
        }

    }

    selectDataView(dataSourceIds) {

    }

    reset() {

    }
}
