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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import View from "../View.js";
import { hex2rgb, isDefined, merge, randomUUID } from "../../../utils/Utils.js";
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
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
     * @param {String} [properties.type='line'] - The  [type]{@link https://www.chartjs.org/docs/3.5.1/} of the graph
     * @param {Object} [properties.options={}] - Properties which can override the default framework ones
     * @param {Object} [properties.datasetOptions={}] - Properties which can override the default framework ones (as defined [dataset]{@link https://www.chartjs.org/docs/latest/configuration/#dataset-configuration}
     * @param {boolean} [properties.override=false] - Defines if options (as defined [Chart options]{@link https://www.chartjs.org/docs/3.5.1/general/options.html}) are completely overridden or merge only. Default is merge
     */
    function ChartJsView(properties) {
        var _this = _super.call(this, __assign({ supportedLayers: ['curve'] }, properties)) || this;
        Chart.register.apply(Chart, registerables);
        // #region snippet_chartjsview_default_chartprops
        _this.datasetOptions = {};
        var type = 'line';
        _this.options = {
            maintainAspectRatio: false,
            normalized: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                    },
                }
            },
            plugins: {},
            datasets: {},
            interaction: {},
            animations: {},
            layout: {},
            elements: {}
        };
        // #endregion snippet_chartjsview_default_chartprops
        if (isDefined(properties)) {
            if (properties.hasOwnProperty('options')) {
                merge(properties.options, _this.options);
            }
            if (properties.hasOwnProperty('type')) {
                type = properties.type;
            }
            if (properties.hasOwnProperty('datasetOptions')) {
                _this.datasetOptions = properties.datasetOptions;
            }
        }
        var domNode = document.getElementById(_this.divId);
        var ctx = document.createElement("canvas");
        ctx.setAttribute("id", randomUUID());
        domNode.appendChild(ctx);
        _this.resetting = false;
        _this.chart = new Chart(ctx, {
            type: type,
            options: _this.options
        });
        _this.datasets = {};
        return _this;
    }
    ChartJsView.prototype.setData = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (data.type === 'curve') {
                    this.updateCurve(data.values);
                }
                return [2 /*return*/];
            });
        });
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
        return __awaiter(this, void 0, void 0, function () {
            var currentDataset, values, lineColor, bgColor;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.resetting) {
                    return [2 /*return*/];
                }
                currentDataset = this.datasets[props[0].curveId];
                values = props.map(function (item) { return ({ 'x': item.x, 'y': item.y }); });
                lineColor = this.getColor(props[0].lineColor);
                bgColor = this.getColor(props[0].backgroundColor);
                if (!isDefined(currentDataset)) {
                    currentDataset = __assign(__assign({}, this.datasetOptions), { label: props[0].name, fill: props[0].fill, backgroundColor: bgColor, borderColor: lineColor, data: values });
                    currentDataset = __assign(__assign({}, this.datasetsProps), currentDataset);
                    this.datasets[props[0].curveId] = currentDataset;
                    this.chart.data.datasets.push(currentDataset);
                }
                else {
                    this.datasets[props[0].curveId].backgroundColor = bgColor;
                    this.datasets[props[0].curveId].borderColor = lineColor;
                    values.forEach(function (value) {
                        _this.datasets[props[0].curveId].data.push(value);
                    });
                }
                //TODO: max points with multiple dataset won't work
                if ((currentDataset.data.length > props[0].maxValues)) {
                    this.chart.data.labels.shift();
                    currentDataset.data.shift();
                }
                this.chart.update('none');
                return [2 /*return*/];
            });
        });
    };
    ChartJsView.prototype.getColor = function (value) {
        var v = value;
        if (v.length > 0 && v.charAt(0) === '#') {
            var rgb = hex2rgb(value);
            v = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',0.2)';
        }
        return v;
    };
    ChartJsView.prototype.reset = function () {
        this.resetting = true;
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