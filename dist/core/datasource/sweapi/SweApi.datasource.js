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
import TimeSeriesDatasource from "../TimeSeries.datasource";
import { Mode } from "../Mode";
var SweApi = /** @class */ (function (_super) {
    __extends(SweApi, _super);
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}, 'http', 'ws', 'mqtt', 'file', 'topic'
     * @param {String} properties.endpointUrl the endpoint url, this property is ignored in case of using 'mqtt' protocol, the properties.mqttOpts.endpointUrl will be used instead
     * @param {String} properties.resource the resource, /procedures, /fois, /observations, /tasks, /datastreams/4778/obs
     * @param {Boolean} properties.tls - defines if use secure TLS connection
     * @param {Boolean} properties.connectorOpts - connector specific Opts
     * @param {Object} [properties.mqttOpts={}] - the Mqtt options if protocol is 'mqtt'
     * @param {String} properties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} properties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     * @param {Number} [properties.responseFormat=application/om+json] the response format (e.g application/om+json)
     * @param {String[]} [properties.parentId=undefined] the parent id
     * @param {String[]} [properties.keywords=undefined] the keyword ids
     * @param {String[]} [properties.includedProps=undefined] the included properties
     * @param {String[]} [properties.excludedProps=undefined] the excluded properties
     * @param {string} [properties.roi=undefined] - WKT geometry and operator to filter resources on their location or geometry
     * @param {String[]} [properties.featureOfInterest=undefined] Comma separated list of feature of interest IDs to get observations for.
     * @param {String[]} [properties.observedProperty=undefined] Comma separated list of observed property URIs to get observations for.
     * @param {String[]} [properties.prefetchBatchSize=250] Number of elements to prefetch at a time
     * @param {String[]} [properties.prefetchBatchDuration=5000] Duration before prefetching the next batch. N.b the next batch will be prefetched at 80% of this duration
     */
    function SweApi(name, properties) {
        return _super.call(this, name, __assign({ reconnectTimeout: 1000 * 5, reconnectRetry: 10, startTime: 'now', endTime: '2055-01-01T00:00:00Z', tls: false, responseFormat: 'application/om+json', protocol: 'http', type: 'SweApiStream', mode: Mode.REAL_TIME, prefetchBatchSize: 250, prefetchBatchDuration: 5000, connectorOpts: {} }, properties)) || this;
    }
    return SweApi;
}(TimeSeriesDatasource));
export default SweApi;
//# sourceMappingURL=SweApi.datasource.js.map