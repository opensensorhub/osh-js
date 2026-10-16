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

import ConSysApiFetchControlStreamParser from "../../parsers/consysapi/collection/ConSysApiFetchControlStream.parser";
import Collection from "../Collection";
import ConnectedSystemsApi from "../ConnectedSystemsApi";
import API from "../routes.conf";
import ControlStreamFilter from "./ControlStreamFilter";

class ControlStreams extends ConnectedSystemsApi {
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
        super(networkProperties); // network properties
        this.conSysApiControlStreamParser = new ConSysApiFetchControlStreamParser(networkProperties);
    }

    /**
     * List or search all controlstreams available through this API.
     * @param {ControlStreamFilter} [controlStreamFilter=new ControlStreamFilter()] - default ControlStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<ControlStream>>} - A Collection of ControlStream
     */
    async searchControlStreams(controlStreamFilter = new ControlStreamFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.controlstreams.search,
            this.getHeaders(),
            controlStreamFilter,
            pageSize,
            this.conSysApiControlStreamParser,
            pageOffset
        );
    }

    /**
     * Get a specific controlstream resource by ID
     * @param {string} controlstreamId - ID of requested controlstream
     * @param {ControlStreamFilter} [controlStreamFilter=new ControlStreamFilter()] - default controlstream filter 
     * @return {Promise<ControlStream>} - The corresponding ControlStream
     */
    async getControlStreamById(controlstreamId, controlStreamFilter = new ControlStreamFilter()) {
        const apiUrl = API.controlstreams.by_id.replace('{csid}',controlstreamId);
        const queryString = controlStreamFilter.toQueryString(['select', 'format']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.conSysApiControlStreamParser.parseData(jsonData);
    }

}

export default ControlStreams;
