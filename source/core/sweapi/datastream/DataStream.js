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

import SensorWebApi from "../SensorWebApi";
import ObservationFilter from "../observation/ObservationFilter";
import API from "../routes.conf";
import DataStreamFilter from "./DataStreamFilter";
import ObservationsCollection from "../ObservationsCollection";
import SweApiResultParser from "../../parsers/sweapi/observations/SweApiResult.datastream.parser";
import SweApiResultCollectionDatastreamParser
    from "../../parsers/sweapi/observations/SweApiResult.collection.datastream.parser";

class DataStream extends SensorWebApi {
    /**
     * @param {Object} properties - the properties of the object
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.sweApiResultParser = new SweApiResultParser(this);
        this.sweApiResultCollectionDatastreamParser = new SweApiResultCollectionDatastreamParser(this);
    }

    /**
     * Retrieve historical observations from a datastream
     * route: /datastreams/{id}/observations
     * @param {ObservationFilter} [observationFilter=new ObservationFilter()] - default ObservationFilter
     * @param {Function} callback - A callback to get observations
     */
    streamObservations(observationFilter = new ObservationFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweApiResultParser.parseDataBlock(message,observationFilter.props.format);
            callback(dataBlock);
        }

        return this.stream().doRequest(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter.toQueryString([], ['phenomenonTime']),
            'arraybuffer'
        );
    }

    /**
     * Retrieve historical observations from a datastream
     * route: /datastreams/{id}/observations
     * @param {ObservationFilter} [observationFilter=new ObservationFilter()] - default ObservationFilter
     * @param {Number} [pageSize=10] - default page size
     * @param {DataSourceParser} [parser=new SweApiResultParser()] - default observations parser
     * @return {Collection<JSON>} - result observations as JSON
     */
    async searchObservations(observationFilter = new ObservationFilter(),  pageSize= 10, parser = this.sweApiResultParser) {
        return new ObservationsCollection(
            this.baseUrl() + API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter,
            pageSize,
            this.sweApiResultCollectionDatastreamParser
        );
    }

    /**
     * Get the schema of a datastream
     * route: /datastreams/{id}/schema
     * @param {DataStreamFilter} [dataStreamFilter=new DataStreamFilter()] - default datastream filter
     * @return {Promise<JSON>} - the JSON schema
     */
    async getSchema(dataStreamFilter = new DataStreamFilter()) {
        const apiUrl = API.datastreams.schema.replace('{id}',this.properties.id);
        const queryString = dataStreamFilter.toQueryString(['select', 'obsFormat']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}

export default DataStream;
