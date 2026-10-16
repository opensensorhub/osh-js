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
import API from "../routes.conf";
import CommandFilter from "./CommandFilter";
import SweCollectionDataParser from "../../parsers/sweapi/collection/SweCollectionDataParser";
import SweApiResultControlParser from "../../parsers/sweapi/observations/SweApiResult.control.parser";

class Command extends SensorWebApi {
    /**
     * @param {Object} properties - the properties of the object
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.jsonParser = new SweCollectionDataParser(networkProperties);
        this.sweParser = new SweApiResultControlParser(this);
    }

    /**
     * Get all status messages associated to a specific command
     * route: /systems/{sysid}/controls/{dsid}/commands/{cmdid}/status
     * @param {CommandFilter} [commandFilter== new CommandFilter()] - default Command filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<JSON>>} - response as JSON
     */
    async searchStatus(commandFilter = new CommandFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.commands.status.replace('{sysid}',this.properties['system@id'])
                               .replace('{dsid}', this.properties['control@id'])
                               .replace('{cmdid}', this.properties.id),
            commandFilter,
            pageSize,
            this.jsonParser
        );
    }

    /**
     * Stream all status messages associated to a specific command
     * route: /systems/{sysid}/controls/{dsid}/commands/{cmdid}/status
     * @param {CommandFilter} [commandFilter== new CommandFilter()] - default Command filter
     * @param {Function} callback
     */
    streamStatus(commandFilter = new CommandFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweParser.parseDataBlock(message,commandFilter.props.format);
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.commands.status.replace('{sysid}',this.properties['system@id'])
                .replace('{dsid}', this.properties['control@id'])
                .replace('{cmdid}', this.properties.id),
            commandFilter.toQueryString(),
            'arraybuffer'
        );
    }
}

export default Command;
