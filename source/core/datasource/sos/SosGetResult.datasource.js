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


import TimeSeriesDatasource from "../TimeSeries.datasource";
import {Mode} from "../Mode";

class SosGetResult extends TimeSeriesDatasource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}, 'http', 'ws', 'mqtt', 'file', 'topic'
     * @param {String} properties.endpointUrl the endpoint url, this property is ignored in case of using 'mqtt' protocol, the properties.mqttOpts.endpointUrl will be used instead
     * @param {String} properties.collection the collection, /procedures, /fois, /observations, /tasks, /datastreams/4778/obs
     * @param {Boolean} properties.tls - defines if use secure TLS connection
     * @param {Number} [properties.responseFormat=application/om+json] the response format (e.g application/om+json)
     * @param {String[]} [properties.prefetchBatchSize=1000000] Number of elements to prefetch at a time
     * @param {String[]} [properties.prefetchBatchDuration=10000] Duration before prefetching the next batch. N.b the next batch will be prefetched at 80% of this duration
     */
    constructor(name, properties) {
        super(name, {
            protocol: 'ws', // default for streaming
            service: "SOS",
            timeShift:0,
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            reconnectRetry: 10,
            tls: false,
            type: 'SosGetResult',
            mode: Mode.REAL_TIME,
            prefetchBatchSize: 250,
            prefetchBatchDuration: 5000,
            ...properties
        });
    }
}

export default SosGetResult;
