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

import SensorWebApi from "../SensorWebApi";
import ObservationFilter from "../observation/ObservationFilter";
import API from "../routes.conf";
import DataStreamFilter from "./DataStreamFilter";
import ObservationsCollection from "../ObservationsCollection";
import SweApiResultParser from "../../datasource/sweapi/parser/observations/SweApiResult.datastream.parser";
import SweApiResultCollectionDatastreamParser from "../../datasource/sweapi/parser/observations/SweApiResult.collection.datastream.parser";

class DataStream extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.sweParser = new SweApiResultParser(this);
        this.sweCollectionParser = new SweApiResultCollectionDatastreamParser(this);
    }

    /**
     * Retrieve historical observations from a datastream
     * @param observationFilter
     * @param callback - A callback to get observations
     */
    streamObservations(observationFilter = new ObservationFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweParser.parseDataBlock(message,observationFilter.props.format);
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Retrieve historical observations from a datastream
     * @param observationFilter
     * @param observationFilter
     * @param pageSize
     * @param parser
     * @return {Collection}
     */
    async searchObservations(observationFilter = new ObservationFilter(),  pageSize= 10, parser = this.sweParser) {
        return new ObservationsCollection(
            this.baseUrl() + API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter,
            pageSize,
            this.sweCollectionParser
        );
    }

    async getSchema(dataStreamFilter = new DataStreamFilter()) {
        const apiUrl = API.datastreams.schema.replace('{id}',this.properties.id);
        const queryString = dataStreamFilter.toQueryString(['select', 'obsFormat']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}

export default DataStream;
