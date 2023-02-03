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
import CommandFilter from "../command/CommandFilter";
import Collection from "../Collection";
import API from "../routes.conf";
import ControlFilter from "./ControlFilter";
import ObservationsCollection from "../ObservationsCollection";
import SweApiFetchCommandParser from "../../parsers/sweapi/collection/SweApiFetchCommand.parser";
import SweApiResultCollectionControlParser
    from "../../parsers/sweapi/observations/SweApiResult.collection.control.parser";
import SweApiResultControlParser from "../../parsers/sweapi/observations/SweApiResult.control.parser";
import SweApiControlStatusParser from "../../parsers/sweapi/collection/SweApiControlStatus.parser";

class Control extends SensorWebApi {
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
        this.commandParser = new SweApiFetchCommandParser(networkProperties, this.properties['system@id']);
        this.sweApiResultCollectionControlParser = new SweApiResultCollectionControlParser(this);
        this.sweApiResultControlParser = new SweApiResultControlParser(this);
        this.sweApiControlStatusParser = new SweApiControlStatusParser();
    }

    /**
     * Get the list of commands received by a particular control interface
     * route: /systems/{sysid}/controls/{dsid}/commands
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<JSON>>} - result as JSON
     */
    async searchCommands(commandFilter = new CommandFilter(), pageSize= 10) {
        return new ObservationsCollection(
            this.baseUrl() + API.controls.commands.replace('{sysid}',
                this.properties['system@id']).replace('{dsid}',this.properties.id),
            commandFilter,
            pageSize,
            this.sweApiResultCollectionControlParser
        );
    }

    /**
     * Stream all commands received by a particular control interface
     * route: /systems/{sysid}/controls/{dsid}/commands
     * @param {ControlFilter} [controlFilter= new ControlFilter()] - default Control filter
     * @param {Function} callback - A callback to get observations
     */
    streamCommands(controlFilter = new ControlFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweApiResultControlParser.parseDataBlock(message,controlFilter.props.format);
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.controls.commands.replace('{sysid}',this.properties['system@id']).replace('{dsid}',this.properties.id),
            controlFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Get a specific command resource by ID.
     * route: /systems/{sysid}/controls/{dsid}/commands/{cmdid}
     * @param {String} commandId - the ID of the Command resource
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter
     * @returns {Promise<Command>} - The corresponding Command
     */
    async getCommandById(commandId,commandFilter = new CommandFilter()) {
        const apiUrl = API.controls.command_by_id
            .replace('{sysid}',this.properties['system@id'])
            .replace('{dsid}', this.properties.id)
            .replace('{cmdid}', commandId);
        const queryString = commandFilter.toQueryString(['select', 'obsFormat']); //TODO: check useless obsFormat
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.commandParser.parseData(jsonData);
    }

    /**
     *  Send a new command to this control interface
     *  route: /systems/{sysid}/controls/{dsid}/commands
     * @param {JSON} jsonPayload - the JSON payload
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter specifying the 'sysid' and 'dsid'
     */
    postCommand(jsonPayload, commandFilter = new CommandFilter()) {
        const apiUrl =  API.controls.commands
                .replace('{sysid}',this.properties['system@id'])
                .replace('{dsid}', this.properties.id);
        this.postAsJson(apiUrl, jsonPayload);
    }

    /**
     * Send a new command to this control interface using streaming protocol such like WS or MQTT
     * route: /systems/{sysid}/controls/{dsid}/commands
     * @param {JSON} jsonPayload - the JSON payload
     * @param {CommandFilter} [commandFilter=new CommandFilter()] - default Command filter specifying the 'sysid' and 'dsid'
     */
    publishCommand(payload, commandFilter = new CommandFilter()) {
        this.stream().publishRequest(
            API.controls.commands
                .replace('{sysid}',this.properties['system@id'])
                .replace('{dsid}', this.properties.id),
            payload
        );
    }

    /**
     * Get all status messages sent by this control interface
     * route: /systems/{sysid}/controls/{dsid}/status
     * @param {ControlFilter} [controlFilter=new ControlFilter()] - default Control filter
     * @param {Number} [pageSize=10] - default page size
     * @return {Promise<Collection<JSON>>} - A Collection of JSON
     */
    async searchStatus(controlFilter = new ControlFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.controls.status.replace('{sysid}',this.properties['system@id']).replace('{dsid}',
                this.properties.id),
            controlFilter,
            pageSize,
            this.sweApiControlStatusParser
        );
    }

    /**
     * Stream all status messages sent by this control interface
     * route: /systems/{sysid}/controls/{dsid}/status
     * @param {ControlFilter} [controlFilter= new ControlFilter()] - default Control filter
     * @param {Function} callback - A callback to get observations
     */
    streamStatus(controlFilter = new ControlFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweApiControlStatusParser.parseData(message, 'arraybuffer');
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.controls.status.replace('{sysid}',this.properties['system@id']).replace('{dsid}',this.properties.id),
            controlFilter.toQueryString(),
            'arraybuffer'
        );
    }

    /**
     * Get the detailed schema of command messages in a command stream
     * route: /systems/{sysid}/controls/{dsid}/schema
     * @param {ControlFilter} [controlFilter= new ControlFilter()] - default Control filter, using 'commandFormat' to select response format
     * @returns {Promise<JSON>} - The schema as JSON
     */
    async getSchema(controlFilter = new ControlFilter()) {
        const apiUrl = API.controls.schema.replace('{sysid}',this.properties['system@id']).replace('{dsid}',this.properties.id);
        const queryString = controlFilter.toQueryString(['select', 'commandFormat']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}

export default Control;
