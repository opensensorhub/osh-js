/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/


import View from "../View.js";
import {hex2rgb, isDefined, merge, randomUUID} from "../../../utils/Utils.js";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';

/**
 * @extends View
 */
class ChartJsView extends View {
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {String} [properties.type='line'] - The  [type]{@link https://www.chartjs.org/docs/3.5.1/} of the graph
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     * @param {boolean} [properties.override=false] - Defines if options (as defined [Chart options]{@link https://www.chartjs.org/docs/3.5.1/general/options.html}) are completely overridden or merge only. Default is merge
     */
    constructor(properties) {
        super({
            supportedLayers: ['curve'],
            ...properties
        });
        Chart.register(...registerables);

        this.datasetOptions = {};

        // #region snippet_chartjsview_default_chartprops
        let type = 'line';
        this.options = {
            maintainAspectRatio: false,
            normalized : true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                    ticks :{
                        source : 'data'
                    }
                }
            },
            plugins: {},
            datasets: {},
            interaction :{},
            animations: {},
            layout: {},
            elements: {}
        };

        // #endregion snippet_chartjsview_default_chartprops
        if (isDefined(properties)) {
            if(properties.hasOwnProperty('options')){
                merge(properties.options,this.options);
            }
            if(properties.hasOwnProperty('type')){
                type = properties.type;
            }
            if(properties.hasOwnProperty('datasetOptions')){
                this.datasetOptions = properties.datasetOptions;
            }
        }

        console.log(this.options)
        let domNode = document.getElementById(this.divId);

        let ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        domNode.appendChild(ctx);

        this.resetting = false;

        this.chart = new Chart(
            ctx, {
                type: type,
                options: this.options
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

        let lineColor = this.getColor(props[0].lineColor);
        let bgColor = this.getColor(props[0].backgroundColor);

        if(!isDefined(currentDataset)) {
            currentDataset = {
                ...this.datasetOptions,
                label: props[0].name,
                fill:  props[0].fill,
                backgroundColor: bgColor,
                borderColor: lineColor,
                data: values
            };
            currentDataset = {...this.datasetsProps, ...currentDataset};
            this.datasets[props[0].curveId] = currentDataset;
            this.chart.data.datasets.push(currentDataset);
        } else {
            this.datasets[props[0].curveId].backgroundColor = bgColor;
            this.datasets[props[0].curveId].borderColor = lineColor;

            values.forEach(value => {
                this.datasets[props[0].curveId].data.push(value);
            });
        }
        //TODO: max points with multiple dataset won't work
        if((currentDataset.data.length > props[0].maxValues)) {
            this.chart.data.labels.shift();
            currentDataset.data.shift();
        }

        this.chart.update('none');
    }

    getColor(value) {
        let v = value;
        if(v.length > 0 && v.charAt(0) === '#') {
            const rgb = hex2rgb(value);
            v = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+',0.2)';
        }
        return v;
    }
    reset() {
        this.resetting = true;
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
