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
import SweApiFetchSystemParser from "../../datasource/sweapi/parser/collection/SweApiFetchSystem.parser";
import SystemFilter from "./SystemFilter";
import API from "../routes.conf";

class Systems extends SensorWebApi {
    /**
     *
     */
    constructor(networkProperties) {
        super(networkProperties);
        this.systemParser = new SweApiFetchSystemParser(networkProperties);
    }

    /**
     * List or search all observing systems available through this API. By default, only top level systems are listed
     * (i.e. subsystems are ommitted) unless the "parent" query parameter is set
     * @param systemFilter - the system filter
     * @param pageSize - the page size
     * @return {Promise<Collection>}  A collection of System
     */
    async searchSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        return new Collection(this.baseUrl() + API.systems.search, systemFilter, pageSize, this.systemParser);
    }

    /**
     * Get a specific system resource by ID. Note that this will return the description of the system valid at the
     * current time. To get the description valid for a past (or future) time, use the "history" sub-collection.
     * @param systemId - the ID of the System resource
     * @param systemFilter - the system filter
     * @return {Promise<System>}
     */
    async getSystemById(systemId,systemFilter = new SystemFilter()) {
        const apiUrl = API.systems.by_id.replace('{sysid}',systemId);
        const queryString = systemFilter.toQueryString(['select','format']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}
export default Systems;
