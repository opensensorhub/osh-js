import SensorWebApi from "../SensorWebApi";
import CommandFilter from "../command/CommandFilter";
import Collection from "../Collection";
import API from "../routes.conf";
import SweApiFetchCommandParser from "../../datasource/sweapi/parser/collection/SweApiFetchCommand.parser";
import ControlFilter from "./ControlFilter";
import SweApiResultControlParser from "../../datasource/sweapi/parser/observations/SweApiResult.control.parser";
import SweApiResultCollectionControlParser
    from "../../datasource/sweapi/parser/observations/SweApiResult.collection.control.parser";
import ObservationsCollection from "../ObservationsCollection";
import SweApiControlStatusParser from "../../datasource/sweapi/parser/collection/SweApiControlStatus.parser";

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

class Control extends SensorWebApi {
    /**
     *
     */
    constructor(properties, networkProperties) {
        super(networkProperties); // network properties
        this.properties = properties;
        this.commandParser = new SweApiFetchCommandParser(networkProperties, this.properties['system@id']);
        this.sweCollectionParser = new SweApiResultCollectionControlParser(this);
        this.sweParser = new SweApiResultControlParser(this);
        this.controlStatusParser = new SweApiControlStatusParser();
    }

    /**
     * Get the list of commands received by a particular control interface
     * @param commandFilter
     * @param pageSize
     * @return {Promise<Collection<Command>>}
     */
    async searchCommands(commandFilter = new CommandFilter(), pageSize= 10) {
        return new ObservationsCollection(
            this.baseUrl() + API.controls.commands.replace('{sysid}',
                this.properties['system@id']).replace('{dsid}',this.properties.id),
            commandFilter,
            pageSize,
            this.sweCollectionParser
        );
    }

    /**
     * Stream all commands received by a particular control interface
     * @param {ControlFilter} controlFilter - controlFilter
     * @param callback - A callback to get observations
     */
    streamCommands(controlFilter = new ControlFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.sweParser.parseDataBlock(message,controlFilter.props.format);
            callback(dataBlock);
        };

        this.stream().doRequest(
            API.controls.commands.replace('{sysid}',this.properties['system@id']).replace('{dsid}',this.properties.id),
            controlFilter.toQueryString(),
            'arraybuffer'
        );
    }

    async getCommandById(commandId,commandFilter = new CommandFilter()) {
        const apiUrl = API.controls.command_by_id
            .replace('{sysid}',this.properties['system@id'])
            .replace('{dsid}', this.properties.id)
            .replace('{cmdid}', commandId);
        const queryString = commandFilter.toQueryString(['select', 'obsFormat']);
        const jsonData = await this.fetchAsJson(apiUrl, queryString);
        return this.commandParser.parseData(jsonData);
    }

    postCommand(payload, commandFilter = new CommandFilter()) {
        // this._network.info.connector.postRequest(
        //     API.controls.commands
        //         .replace('{sysid}',this.properties['system@id'])
        //         .replace('{dsid}', this.properties.id),
        //     payload,
        //     commandFilter.props.format
        // );
        throw Error('Not supported operation: postCommand');
    }

    publishCommand(payload, commandFilter = new CommandFilter()) {
        // this._network.stream.connector.publishRequest(
        //     API.controls.commands
        //         .replace('{sysid}',this.properties['system@id'])
        //         .replace('{dsid}', this.properties.id),
        //     payload
        // );
        throw Error('Not supported operation: publishCommand');
    }

    /**
     * Get all status messages sent by this control interface
     * @param controlFilter
     * @param pageSize
     * @return {Promise<Collection<JSON>>}
     */
    async searchStatus(controlFilter = new ControlFilter(), pageSize= 10) {
        return new Collection(
            this.baseUrl() + API.controls.status.replace('{sysid}',this.properties['system@id']).replace('{dsid}',
                this.properties.id),
            controlFilter,
            pageSize,
            this.controlStatusParser
        );
    }

    /**
     * Stream all status messages sent by this control interface
     * @param {ControlFilter} controlFilter - controlFilter
     * @param callback - A callback to get observations
     */
    streamStatus(controlFilter = new ControlFilter(), callback = function(){}) {
        this.stream().onMessage = async (message) => {
            const dataBlock = await this.controlStatusParser.parseData(message, 'arraybuffer');
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
     * @param {ControlFilter} controlFilter - controlFilter
     * @returns {Promise<*>}
     */
    async getSchema(controlFilter = new ControlFilter()) {
        const apiUrl = API.controls.schema.replace('{sysid}',this.properties['system@id']).replace('{dsid}',this.properties.id);
        const queryString = controlFilter.toQueryString(['select', 'commandFormat']);
        return this.fetchAsJson(apiUrl, queryString);
    }
}

export default Control;
