import {View} from "../View";
import {isDefined, randomUUID} from "../../../utils/Utils";
import Chart from 'chart.js';
import moment from 'moment';

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
        this.maxPoints = 30;

        let xTickFormat = function(d) {
            return moment().format();
        };

        if (isDefined(options)) {
            if (options.hasOwnProperty('xLabel')) {
                let xLabel = options.xLabel;
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

        this.chart = new Chart(
            ctx, {
                labels:[],
                type: 'line',
                data: { datasets: [] },
                options : {
                    animation: {
                        duration: 500
                    },
                    spanGaps: true,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: yLabel
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: xLabel
                            },
                            type: 'time',
                            time: {
                                unit: 'second',
                            },
                            ticks: {
                                maxTicksLimit: 8
                            }
                        }],
                    },
                    responsive: true,
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
