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
/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
import SensorWebApiFilter from "../Filter";
var ObservationFilter = /** @class */ (function (_super) {
    __extends(ObservationFilter, _super);
    /**
     *
     * @param {Object} properties - object properties
     * @param {any} [properties.phenomenonTime='now'] - time range <00:00:00T00:00:00Z/00:00:00T00:00:00Z> | 'now' | 'latest'
     * @param {any} [properties.resultTime='now'] - time range <00:00:00T00:00:00Z/00:00:00T00:00:00Z> | 'latest'
     * @param {string[]} [properties.featureOfInterest=undefined] - Comma separated list of feature of interest IDs to get observations for
     * @param {string[]} [properties.select=undefined] - Comma separated list of properties to include or exclude from results (use "!" prefix to exclude)
     * @param {number[]} [properties.bbox=undefined] - BBOX to filter resources on their location
     * @param {string} [properties.location=undefined] - WKT geometry and operator to filter resources on their location or geometry
     * @param {string} [properties.format='application/json'] - Mime type designating the format to use to encode the response.
     * @param {string} [properties.replaySpeed=undefined] - Mime type designating the format to use to encode the response.
     */
    function ObservationFilter(properties) {
        return _super.call(this, __assign({ phenomenonTime: undefined, resultTime: undefined, featureOfInterest: undefined, select: undefined, bbox: undefined, location: undefined, format: 'application/om+json', replaySpeed: undefined }, properties // merge defined properties
        )) || this;
    }
    return ObservationFilter;
}(SensorWebApiFilter));
export default ObservationFilter;
//# sourceMappingURL=ObservationFilter.js.map