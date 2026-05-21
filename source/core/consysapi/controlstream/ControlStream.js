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

import ConnectedSystemsApi from "../ConnectedSystemsApi";
import CommandFilter from "../command/CommandFilter";
import Collection from "../Collection";
import API from "../routes.conf";
import ControlStreamFilter from "./ControlStreamFilter";
import ObservationsCollection from "../ObservationsCollection";
import ConSysApiFetchCommandParser from "../../parsers/consysapi/collection/ConSysApiFetchCommand.parser";
import ConSysApiResultCollectionControlStreamParser
    from "../../parsers/consysapi/observations/ConSysApiResult.collection.controlstream.parser";
import ConSysApiResultControlStreamParser from "../../parsers/consysapi/observations/ConSysApiResult.controlstream.parser";
import ConSysApiControlStreamStatusParser from "../../parsers/consysapi/collection/ConSysApiControlStreamStatus.parser";

class ControlStream extends ConnectedSystemsApi {
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
        this.commandParser = new ConSysApiFetchCommandParser(networkProperties);
        this.conSysApiResultCollectionControlStreamParser = new ConSysApiResultCollectionControlStreamParser(this);
        this.conSysApiResultControlStreamParser = new ConSysApiResultControlStreamParser(this);
        this.conSysApiControlStreamStatusParser = new ConSysApiControlStreamStatusParser();
    }

    /**
     * Get the list of commands received by a particular control interface
     * route: /controlstreams/{csid}/commands
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter
     * @param {Number} [pageSize=10] - default page size
     * @param {Number} [pageOffset=0] - default page offset
     * @return {Promise<Collection<JSON>>} - result as JSON
     */
    async searchCommands(commandFilter = new CommandFilter(), pageSize= 10, pageOffset = 0) {
        return new ObservationsCollection(
            this.baseUrl() + API.controlstreams.commands
                .replace('{csid}',this.properties.id),
            this.getHeaders(),
            commandFilter,
            pageSize,
            this.conSysApiResultCollectionControlStreamParser,
            pageOffset
        );
    }

    /**
     * Stream all commands received by a particular control interface
     * route: /controlstreams/{csid}/commands
     * @param {ControlStreamFilter} [controlStreamFilter= new ControlStreamFilter()] - default ControlStreamStream filter
     * @param {Function} callback - A callback to get observations
     */
    streamCommands(controlStreamFilter = new ControlStreamFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.conSysApiResultControlStreamParser
                .parseDataBlock(message,controlStreamFilter.props.format);
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.controlstreams.commands
                .replace('{csid}',this.properties.id),
            controlFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Get a specific command resource by ID.
     * route: /controlstreams/{csid}/commands/{cmdid}
     * @param {String} commandId - the ID of the Command resource
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter
     * @returns {Promise<Command>} - The corresponding Command
     */
    async getCommandById(commandId,commandFilter = new CommandFilter()) {
        const apiUrl = API.controlstreams.command_by_id
            .replace('{csid}', this.properties.id)
            .replace('{cmdid}', commandId);
        const queryString = commandFilter.toQueryString(['select', 'obsFormat']); //TODO: check useless obsFormat
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.commandParser.parseData(jsonData);
    }

    /**
     *  Send a new command to this control interface
     *  route: /controlstreams/{csid}/commands
     * @param {JSON} jsonPayload - the JSON payload
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter specifying the 'sysid' and 'csid'
     */
    postCommand(jsonPayload, commandFilter = new CommandFilter()) {
        const apiUrl =  API.controlstreams.commands
                .replace('{csid}', this.properties.id);
        this.postAsJson(apiUrl, jsonPayload);
    }

    /**
     * Send a new command to this control interface using streaming protocol such like WS or MQTT
     * route: /controlstreams/{csid}/commands
     * @param {JSON} jsonPayload - the JSON payload
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter specifying the 'sysid' and 'csid'
     */
    publishCommand(payload, commandFilter = new CommandFilter()) {
        this.stream().publishRequest(API.controlstreams.commands
            .replace('{csid}', this.properties.id),
            payload
        );
    }

    /**
     * Get all status messages sent by this control interface
     * route: /controlstreams/{csid}/status
     * @param {ControlStreamFilter} [controlStreamFilter=new ControlStreamFilter()] - default ControlStream filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<JSON>>} - A Collection of JSON
     */
    async searchStatus(controlStreamFilter = new ControlStreamFilter(), pageSize= 10, pageOffset = 0) {
        return new Collection(
        this.baseUrl() + API.controlstreams.status
            .replace('{csid}',
            this.properties.id),
            this.getHeaders(),
            controlStreamFilter,
            pageSize,
            this.conSysApiControlStreamStatusParser,
            pageOffset
        );
    }

    /**
     * Stream all status messages sent by this control interface
     * route: /controlstreams/{csid}/status
     * @param {ControlStreamFilter} [controlStreamFilter= new ControlStreamFilter()] - default ControlStream filter
     * @param {Function} callback - A callback to get observations
     */
    streamStatus(controlStreamFilter = new ControlStreamFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.conSysApiControlStreamStatusParser.parseData(message, 'arraybuffer');
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.controlstreams.status.replace('{csid}',this.properties.id),
            controlStreamFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Get the detailed schema of command messages in a command stream
     * route: /controlstreams/{csid}/schema
     * @param {ControlStreamFilter} [controlStreamFilter= new ControlStreamFilter()] - default ControlStream filter, using 'commandFormat' to select response format
     * @returns {Promise<JSON>} - The schema as JSON
     */
    async getSchema(controlStreamFilter = new ControlStreamFilter()) {
        const apiUrl = API.controlstreams.schema.replace('{csid}',this.properties.id);
        const queryString = controlStreamFilter.toQueryString(['select', 'commandFormat']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}

export default ControlStream;
