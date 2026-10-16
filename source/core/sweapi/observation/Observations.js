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
import Collection from "../Collection";
import SensorWebApiFetchObservation from "../../parsers/sweapi/collection/SweApiFetchObservation.parser";
import ObservationFilter from "./ObservationFilter";

class Observations extends SensorWebApi {
    /**
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.sensorWebApiFetchObservation = new SensorWebApiFetchObservation(networkProperties);
    }

    /**
     * List or search all observations available through this API.
     * @param {ObservationFilter} [observationFilter=new ObservationFilter()] - default observation filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<Observation>>} - A Collection of Observation
     */
    async searchObservations(observationFilter = new ObservationFilter(), pageSize= 10) {
        return new Collection('/observations', observationFilter, pageSize,this.sensorWebApiFetchObservation, this._network.info.connector);
    }
}
export default Observations;
