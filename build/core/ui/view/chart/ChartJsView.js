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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import View from "../View.js";
import { hex2rgb, isDefined, merge, randomUUID } from "../../../utils/Utils.js";
import Chart from 'chart.js';
import 'chart.js/dist/Chart.min.css';
/**
 * @extends View
 */
var ChartJsView = /** @class */ (function (_super) {
    __extends(ChartJsView, _super);
    /**
     * Create a View.
     * @param {Object} [properties={}] - the properties of the view
     * @param {String} properties.container - The div element to attach to
     * @param {Object[]}  [properties.layers=[]] - The initial layers to add
     * @param {Object} [properties.chartjsProps={}] - Properties which can override the default framework ones
     * @param {Object} [properties.chartjsProps.datasetsProps={}] - chart.js [dataset options]{@link https://www.chartjs.org/docs/latest/charts/line.html#dataset-properties}.
     * @param {Object} [properties.chartjsProps.chartProps={}] - chart.js [context configuration options]{@link https://www.chartjs.org/docs/latest/configuration}
     */
    function ChartJsView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['curve'] }, properties)) || this;
        _this.datasetsProps = {};
        _this.chartProps = {};
        if (isDefined(properties)) {
            if (properties.hasOwnProperty('chartjsProps')) {
                if (properties.chartjsProps.hasOwnProperty('datasetsProps')) {
                    _this.datasetsProps = properties.chartjsProps.datasetsProps;
                }
                if (properties.chartjsProps.hasOwnProperty('chartProps')) {
                    _this.chartProps = properties.chartjsProps.chartProps;
                }
            }
        }
        var domNode = document.getElementById(_this.divId);
        var ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        domNode.appendChild(ctx);
        _this.resetting = false;
        // #region snippet_chartjsview_default_chartprops
        var chartProps = {
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
                            maxTicksLimit: 5,
                            callback: function (label, index, values) {
                                return _this.parseDate(values[index].value);
                            }
                        }
                    }],
            },
            responsive: true,
            maintainAspectRatio: true,
        };
        var datasetsProps = {
            borderColor: '#a3a3a3',
            borderWidth: 1,
            backgroundColor: 'rgba(188,221,255,0.1)'
        };
        // #endregion snippet_chartjsview_default_chartprops
        merge(chartProps, _this.chartProps);
        merge(datasetsProps, _this.datasetsProps);
        _this.datasetsProps = datasetsProps;
        _this.maxPoints = chartProps.scales.xAxes[0].ticks.maxTicksLimit;
        _this.chart = new Chart(ctx, {
            labels: [],
            type: 'line',
            data: {
                datasets: []
            },
            options: chartProps
        });
        _this.datasets = {};
        return _this;
    }
    ChartJsView.prototype.setData = function (dataSourceId, data) {
        if (data.type === 'curve') {
            this.updateCurve(data.values);
        }
    };
    ChartJsView.prototype.parseDate = function (intTimeStamp) {
        var date = new Date(intTimeStamp);
        return this.withLeadingZeros(date.getUTCHours()) + ":" + this.withLeadingZeros(date.getUTCMinutes()) + ":"
            + this.withLeadingZeros(date.getUTCSeconds());
    };
    ChartJsView.prototype.withLeadingZeros = function (dt) {
        return (dt < 10 ? '0' : '') + dt;
    };
    /**
     * Updates the curve associated to the layer.
     * @param {Curve.props[]} props - The layer properties allowing the update of the curve
     */
    ChartJsView.prototype.updateCurve = function (props) {
        var _this = this;
        if (this.resetting) {
            return;
        }
        var currentDataset = this.datasets[props[0].curveId];
        var values = props.map(function (item) { return ({ 'x': item.x, 'y': item.y }); });
        var create = false;
        if (!isDefined(currentDataset)) {
            create = true;
            var lineColor = props[0].color;
            if (lineColor.startsWith('#')) {
                var rgb = hex2rgb(lineColor);
                lineColor = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.5)';
            }
            currentDataset = {
                label: props[0].name,
                backgroundColor: lineColor,
                data: values
            };
            currentDataset = __assign(__assign({}, this.datasetsProps), currentDataset);
            this.datasets[props[0].curveId] = currentDataset;
            this.chart.data.datasets.push(currentDataset);
        }
        else {
            values.forEach(function (value) {
                _this.datasets[props[0].curveId].data.push(value);
            });
        }
        if ((currentDataset.data.length > this.maxPoints + 2) || create) {
            this.chart.options.scales.xAxes[0].ticks.min = this.chart.data.labels[2];
        }
        if ((currentDataset.data.length > this.maxPoints + 2) || create) {
            this.chart.data.labels.shift();
            currentDataset.data.shift();
        }
        this.chart.update();
    };
    ChartJsView.prototype.reset = function () {
        this.resetting = true;
        // this.chart.stop();
        _super.prototype.reset.call(this);
        this.datasets = {};
        this.chart.data.datasets = [];
        this.chart.data.labels = [];
        this.chart.update(0);
        this.resetting = false;
        // this.chart.data.datasets = [];
        // this.chart.update();
    };
    return ChartJsView;
}(View));
export default ChartJsView;
//# sourceMappingURL=ChartJsView.js.map