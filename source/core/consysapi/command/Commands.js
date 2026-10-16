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

import ConSysApiFetchCommandParser from "../../parsers/consysapi/collection/ConSysApiFetchCommand.parser";
import ConnectedSystemsApi from "../ConnectedSystemsApi";
import Collection from "../Collection";
import API from "../routes.conf";
import CommandFilter from "./CommandFilter";

class Commands extends ConnectedSystemsApi {
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
        this.conSysApiCommandParser = new ConSysApiFetchCommandParser(networkProperties);
    }

    /**
     * List or search all commands available through this API.
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter
     * @param {Number} [pageSize=10] - default page size
     * @param {Number} [pageOffset=0] - default page offset
     * @return {Promise<Collection<Command>>} - A Collection of Command
     */
    async searchCommands(commandFilter = new CommandFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
            this.baseUrl() + API.commands.search,
            this.getHeaders(),
            commandFilter,
            pageSize,
            this.conSysApiCommandParser,
            pageOffset
        );
    }

    /**
     * Get a specific command resource by ID
     * @param {string} commandId - ID of requested command
     * @return {Promise<Command>} - The corresponding Command
     */
    async getCommandById(commandId) {
        const apiUrl = API.commands.by_id.replace('{cmdid}',commandId);
        const jsonData = await this.fetchAsJson(apiUrl, undefined);
        return this.conSysApiCommandParser.parseData(jsonData);
    }

}

export default Commands;
