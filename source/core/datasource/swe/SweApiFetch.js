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

import TimeSeriesDataSource from "../TimeSeriesDataSource";

class SweApiFetch extends TimeSeriesDataSource {

    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.collection the collection, /procedures, /fois, /observations, /tasks, /datastreams/4778/obs
     * @param {Number} [properties.responseFormat=application/json] the response format (e.g application/json)
     * @param {String[]} [properties.parentId=undefined] the parent id
     * @param {String[]} [properties.keywords=undefined] the keyword ids
     * @param {String[]} [properties.includedProps=undefined] the included properties
     * @param {String[]} [properties.excludedProps=undefined] the excluded properties
     * @param {string} [properties.roi=undefined] - WKT geometry and operator to filter resources on their location or geometry
     * @param {String[]} [properties.featureOfInterest=undefined] Comma separated list of feature of interest IDs to get observations for.
     * @param {String[]} [properties.observedProperty=undefined] Comma separated list of observed property URIs to get observations for.
     */
    constructor(name, properties) {
        super(name, {
            batchSize: 1,
            reconnectTimeout: 1000 * 5, // default if not defined into properties
            startTime: 'now',
            endTime: '2055-01-01T00:00:00Z',
            tls: false,
            ...properties
        });
    }
}

export default SweApiFetch;