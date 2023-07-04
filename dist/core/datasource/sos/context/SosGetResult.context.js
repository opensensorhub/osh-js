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
import SosContext from "./Sos.context";
import SosGetResultParser from "../../../parsers/sos/SosGetResult.parser";
var SosGetResultContext = /** @class */ (function (_super) {
    __extends(SosGetResultContext, _super);
    function SosGetResultContext() {
        return _super.call(this, new SosGetResultParser()) || this;
    }
    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    SosGetResultContext.prototype.getQueryString = function (properties) {
        var queryString = _super.prototype.getQueryString.call(this, properties);
        // adds request
        queryString += "&request=GetResult";
        // adds offering
        queryString += "&offering=" + properties.offeringID;
        // adds observedProperty
        queryString += "&observedProperty=" + properties.observedProperty;
        return queryString;
    };
    return SosGetResultContext;
}(SosContext));
export default SosGetResultContext;
//# sourceMappingURL=SosGetResult.context.js.map