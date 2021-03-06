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
import {hex2rgb, isDefined, merge, randomUUID} from "../../../utils/Utils.js";
import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';

/**
 * @extends View
 */
class ChartJsView extends View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Object} [properties.chartjsProps={}] - Properties which can override the default framework ones
     * @param {Object} [properties.chartjsProps.datasetsProps={}] - chart.js [dataset options]{@link https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties}.
     * @param {Object} [properties.chartjsProps.chartProps={}] - chart.js [context configuration options]{@link https://www.chartjs.org/docs/latest/configuration}
     */
    constructor(properties) {
        super({
            supportedLayers: ['curve'],
            ...properties
        });

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
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Values'
                    },
                    ticks: {
                        maxTicksLimit: 5
                    }
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
                }],
            },
            responsive: true,
            maintainAspectRatio: true,
        };

        let datasetsProps = {
            borderColor: '#a3a3a3',
            borderWidth:1,
            backgroundColor: 'rgba(188,221,255,0.1)'
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

        this.datasets = {};
    }

    setData(dataSourceId, data) {
        if(data.type === 'curve') {
            this.updateCurve(data.values);
        }
    }

    parseDate(intTimeStamp) {
        const date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    }

    withLeadingZeros(dt) {
        return (dt < 10 ? '0' : '') + dt;
    }

    /**
     * Updates the curve associated to the layer.
     * @param {Curve.props[]} props - The layer properties allowing the update of the curve
     */
    updateCurve(props) {
        if(this.resetting) {
            return;
        }
        let currentDataset = this.datasets[props[0].curveId];
        const values = props.map(item => ({'x': item.x, 'y': item.y}));
        let create = false;
        if(!isDefined(currentDataset)) {
            create = true;
            let lineColor = props[0].color;
            if(lineColor.startsWith('#')) {
                const rgb = hex2rgb(lineColor);
                lineColor = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.5)';
            }
            currentDataset = {
                label: props[0].name,
                backgroundColor: lineColor,
                data: values
            };
            currentDataset = {...this.datasetsProps, ...currentDataset};
            this.datasets[props[0].curveId] = currentDataset;
            this.chart.data.datasets.push(currentDataset);
        } else {
            values.forEach(value => {
                this.datasets[props[0].curveId].data.push(value);
            });
        }
        if((currentDataset.data.length > this.maxPoints + 2) || create) {
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[2];
        }

        if((currentDataset.data.length > this.maxPoints + 2) || create) {
            this.chart.data.labels.shift();
            currentDataset.data.shift();
        }
        this.chart.update();
    }

    reset() {
        this.resetting = true;
        // this.chart.stop();
        super.reset();
        this.datasets = {};
        this.chart.data.datasets = [];
        this.chart.data.labels = [];
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    }
}

export default ChartJsView;
