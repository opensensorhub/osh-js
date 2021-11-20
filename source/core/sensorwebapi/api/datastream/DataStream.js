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
import SensorWebApiFetchJson from "../../../datasource/parsers/SensorWebApiFetchJson.parser";
import SweApiMqttJsonParser from "../../../../ext/datasource/parsers/SweApiMqttJson.parser";

class DataStream extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        if(networkProperties.stream.protocol.startsWith('mqtt')) {
            this.dataParser = new SweApiMqttJsonParser(networkProperties);
        } else {
            this.dataParser = new SensorWebApiFetchJson(networkProperties);
        }
    }

    /**
     *
     * @param observationFilter
     * @param callback
     */
    streamObservations(observationFilter = new ObservationFilter(), callback = function(){}) {
        this._network.stream.connector.onMessage = async (data) => {
            callback(await this.dataParser.parseData(data))
        };
        this._network.stream.connector.doRequest(
            API.datastreams.observations.replace('{id}',this.properties.id),
            observationFilter.toQueryString()
        );
    }
}

export default DataStream;
