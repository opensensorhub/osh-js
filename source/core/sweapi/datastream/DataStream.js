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
import SweApiFetchGenericJson from "../../datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";

class DataStream extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.jsonParser = new SweApiFetchGenericJson(networkProperties);
    }

    /**
     * Retrieve historical observations from a datastream
     * @param observationFilter
     * @param callback - A callback to get observations
     */
    streamObservations(observationFilter = new ObservationFilter(), callback = function(){}) {
        //TODO: handle swe+json
        if(observationFilter.props.format === 'application/json') {
            this._network.stream.connector.onMessage = (message) => {
                callback(this.jsonParser.parseData(message));
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
     * @param pageSize
     * @param parser
     * @return {Collection}
     */
    searchObservations(observationFilter = new ObservationFilter(),  pageSize= 10, parser = this.parser) {
        return new Collection(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter,
            pageSize,
            parser,
            this._network.info.connector
        );
    }
}

export default DataStream;
