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
import SystemFilter from "./SystemFilter";
import API from "../routes.conf";
import SweApiFetchSystemParser from "../../parsers/sweapi/collection/SweApiFetchSystem.parser";

class Systems extends SensorWebApi {
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
        this.sweApiFetchSystemParser = new SweApiFetchSystemParser(networkProperties);
    }

    /**
     * List or search all observing systems available through this API. By default, only top level systems are listed
     * (i.e. subsystems are ommitted) unless the "parent" query parameter is set
     * route: /systems
     * @param {SystemFilter} [systemFilter= new SystemFilter()] - the system filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<System>>} - A collection of System
     */
    async searchSystems(systemFilter = new SystemFilter(), pageSize = 10) {
        return new Collection(this.baseUrl() + API.systems.search, systemFilter, pageSize, this.sweApiFetchSystemParser);
    }

    /**
     * Get a specific system resource by ID. Note that this will return the description of the system valid at the
     * current time. To get the description valid for a past (or future) time, use the "history" sub-collection.
     * route: /systems/{sysid}
     * @param {String} systemId - the ID of the System resource
     * @param {SystemFilter} [systemFilter=new SystemFilter()] - the system filter
     * @return {System} - The corresponding System
     */
    async getSystemById(systemId,systemFilter = new SystemFilter()) {
        const apiUrl = API.systems.by_id.replace('{sysid}',systemId);
        const queryString = systemFilter.toQueryString(['select','format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.sweApiFetchSystemParser.parseData(jsonData);
    }
}
export default Systems;
