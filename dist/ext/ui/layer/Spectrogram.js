/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2020 Ian Patterson. All Rights Reserved.

 Author: Ian Patterson <cr31.dev@gmail.com>

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
import Layer from "../../../core/ui/layer/Layer";
import { isDefined } from "../../../core/utils/Utils";
var Spectrogram = /** @class */ (function (_super) {
    __extends(Spectrogram, _super);
    function Spectrogram(properties) {
        var _this = _super.call(this, properties) || this;
        _this.type = 'spectrogram';
        _this.props.latestData = null;
        _this.props.xLabel = 'Time';
        _this.props.yLabel = 'Frequency (Hz)';
        _this.props.zLabel = 'Amplitude (dB)';
        // Currently using chromatic scales from d3-scale-chromatic
        // TODO: Allow custom color sets
        _this.props.colors = 'interpolateOrRd';
        _this.props.powerRange = [-80, 250];
        var self = _this;
        if (isDefined(properties.xLabel)) {
            _this.props.xLabel = properties.xLabel;
        }
        if (isDefined(properties.yLabel)) {
            _this.props.yLabel = properties.yLabel;
        }
        if (isDefined(properties.zLabel)) {
            _this.props.zLabel = properties.zLabel;
        }
        if (isDefined(properties.colors)) {
            _this.props.colors = properties.colors;
        }
        if (isDefined(properties.colorRange)) {
            _this.props.colorRange = properties.colorRange;
        }
        if (isDefined(properties.getValues)) {
            var fn = function (rec, timestamp, options) {
                var values = properties.getValues.handler(rec, timestamp, options);
                if (Array.isArray(values)) {
                    self.props.latestData = values;
                }
                else {
                    self.props.latestData = [values];
                }
            };
            _this.addFn(properties.getValues.dataSourceIds, fn);
        }
        return _this;
    }
    return Spectrogram;
}(Layer));
export default Spectrogram;
//# sourceMappingURL=Spectrogram.js.map