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
import Collection from "../Collection";
import SweParser from "../SweParser";
import DataStreamFilter from "./DataStreamFilter";
import ObservationsCollection from "../ObservationsCollection";

class DataStream extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.jsonParser = new SweParser();
    }

    /**
     * Retrieve historical observations from a datastream
     * @param observationFilter
     * @param callback - A callback to get observations
     */
    streamObservations(observationFilter = new ObservationFilter(), callback = function(){}) {
        //TODO: handle swe+json
        if(observationFilter.props.format === 'application/swe+json'
                                || observationFilter.props.format === 'application/om+json') {
            this._network.stream.connector.onMessage = (message) => {
                callback(this.jsonParser.parseData(message));
            };
        } else if(observationFilter.props.format === 'application/swe+csv'
                            || observationFilter.props.format === 'application/swe+xml'
        ) {
            this._network.stream.connector.onMessage = (message) => {
                callback(String.fromCharCode.apply(null, new Uint8Array(message)));
            };
        } else {
            this._network.stream.connector.onMessage = callback;
        }

        this._network.stream.connector.doRequest(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Retrieve historical observations from a datastream     * @param observationFilter
     * @param observationFilter
     * @param pageSize
     * @param parser
     * @return {Collection}
     */
    async searchObservations(observationFilter = new ObservationFilter(),  pageSize= 10, parser = this.jsonParser) {
        return new ObservationsCollection(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter,
            pageSize,
            parser,
            this._network.info.connector
        );
    }

    async getSchema(dataStreamFilter = new DataStreamFilter()) {
        return this._network.info.connector.doRequest(
            API.datastreams.schema.replace('{id}',this.properties.id),
            dataStreamFilter.toQueryString(['select', 'obsFormat', ]),
            dataStreamFilter.props.format
        );
    }
}

export default DataStream;