/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/


import View from "../View.js";
import {isDefined, randomUUID} from "../../../utils/Utils.js";
import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';

/**
 * @extends View
 */
class ChartJsView extends View {
    /**
     * Create a View.
     * @param {String} parentElementDivId - The div element to attach to
     * @param {Object[]} viewItems - The initial view items to add
     * @param {String} viewItems.name - The name of the view item
     * @param {Styler} viewItems.styler - The styler object representing the view item
     * @param {Object} options - the properties of the view
     * @param {Object} options.datasetsOpts - chart.js dataset options
     * @param {Object} options.gridLinesOpts - chart.js gridline options
     * @param {Object} options.scaleLabelOpts - chart.js scaleLabel options
     * @param {Object} options.tickOpts - chart.js tick options
     * @param {Object} options.legendOpts - chart.js legend options
     * @param {Number} options.maxPoints - max points to display before shifting
     */
    constructor(parentElementDivId, viewItems, options) {
        super(parentElementDivId, viewItems, options);

        let xLabel = 'Time';
        let yLabel = 'Values';

        this.datasetsOpts = {};
        this.gridLinesOpts = {};
        this.tickOpts = {};
        this.scaleLabelOpts = {};
        this.legendOpts = {};
        this.options = {};

        if (isDefined(options)) {
            if(options.hasOwnProperty('options')){
                this.options = options.options;
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
                    maintainAspectRatio: true,
                    ...this.options
                }
            });

        this.datasets = {};
    }

    /**
     *
     * @param {Curve} styler -
     * @param {Number} timestamp -
     * @param {Object} options -
     */
    updateCurve(styler, timestamp, options) {
        let currentDataset = this.datasets[styler.getId()];
        if(!isDefined(currentDataset)) {
            currentDataset = {
                label: styler.viewItem.name,
                fillColor: "rgba(220,220,0,0.2)",
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
}

export default ChartJsView;
