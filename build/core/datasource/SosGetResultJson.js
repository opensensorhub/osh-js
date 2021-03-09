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
import TimeSeriesDataSource from './TimeSeriesDataSource.js';
import SosGetResultJsonWorker from './workers/SosGetResultJson.worker.js';
/**
 * This datasource provides generic parsing for JSON response.
 *
 * @extends DataSource
 * @example
 * import SosGetResultJson from 'core/datasource/SosGetResultJson.js';
 *
 * let androidPhoneGpsDataSource = new SosGetResultJson("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:00Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: replaySpeed+"",
    bufferingTime: 1000,
    timeShift: -16000
  });
 */
var SosGetResultJson = /** @class */ (function (_super) {
    __extends(SosGetResultJson, _super);
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.bufferingTime=0 - defines the time during the data has to be buffered. Useful only when used with DataSynchronizer
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     */
    function SosGetResultJson(name, properties) {
        return _super.call(this, name, __assign({ timeShift: 0, reconnectTimeout: 1000 * 5 }, properties), new SosGetResultJsonWorker()) || this;
    }
    return SosGetResultJson;
}(TimeSeriesDataSource));
export default SosGetResultJson;
//# sourceMappingURL=SosGetResultJson.js.map