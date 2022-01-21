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
import Collection from "../Collection";
import SensorWebApiFetchObservation from "../../datasource/sweapi/parser/json/SweApiFetchObservation.parser";
import ObservationFilter from "./ObservationFilter";

class Observations extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.parser = new SensorWebApiFetchObservation(networkProperties);
    }

    /**
     * List or search all observations available through this API.
     * @param observationFilter
     * @param pageSize
     * @return {Promise<Collection>}
     */
    async searchObservations(observationFilter = new ObservationFilter(), pageSize= 10) {
        return new Collection('/observations', observationFilter, pageSize,this.parser, this._network.info.connector);
    }

    /**
     * Get a specific observation resource by ID
     * @param observationId - The ID of the observation
     * @param observationFilter
     * @return {Promise<Observation>}
     */
    async getObservationById(observationId,observationFilter = new ObservationFilter()) {
        const response = await this._network.info.connector.doRequest(
            `/observations/${observationId}`,
            observationFilter.toQueryString(['select','format'],
            observationFilter.props.format
        ));
        return this.parser.parseData(response);
    }
}
export default Observations;
