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
import SensorWebApiFetchSystemParser from "../../../datasource/parsers/SensorWebApiFetchSystem.parser";
import SystemFilter from "./SystemFilter";
import API from "../routes.conf";

class Systems extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.parser = new SensorWebApiFetchSystemParser(networkProperties);
    }

    /**
     *
     * @returns {Collection<System>} A collection of System
     */
    async searchSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        return new Collection(
            API.systems.search, systemFilter.toQueryString(),
            pageSize, this.parser, this._network.info.connector
        );
    }

    async getSystemById(systemId,systemFilter = new SystemFilter()) {
        const response = await this._network.info.connector.doRequest(
            API.systems.by_id.replace('{id}',systemId),
            systemFilter.toQueryString(['select','format'])
        );
        return this.parser.parseData(response);
    }
}
export default Systems;
