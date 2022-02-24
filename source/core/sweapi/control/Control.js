import SensorWebApi from "../SensorWebApi";
import CommandFilter from "../command/CommandFilter";
import Collection from "../Collection";
import API from "../routes.conf";
import SweApiFetchCommandParser from "../../datasource/sweapi/parser/json/SweApiFetchCommand.parser";
import ControlFilter from "./ControlFilter";
import SweApiFetchGenericJson from "../../datasource/sweapi/parser/json/SweApiFetchGenericJson.parser";
import SweParser from "../SweParser";

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
        this.commandParser = new SweApiFetchCommandParser(networkProperties, this.properties.system.id);
        this.jsonParser = new SweParser();
    }

    /**
     * Get the list of commands received by a particular control interface
     * @param commandFilter
     * @param pageSize
     * @return {Promise<Collection<Command>>}
     */
    async searchCommand(commandFilter = new CommandFilter(), pageSize= 10) {
        return new Collection(
            API.controls.commands.replace('{sysid}',this.properties.system.id).replace('{dsid}',this.properties.id),commandFilter,
            pageSize,this.commandParser, this._network.info.connector);
    }

    async getCommandById(commandId,commandFilter = new CommandFilter()) {
        const response = await this._network.info.connector.doRequest(
            API.controls.command_by_id
                .replace('{sysid}',this.properties.system.id)
                .replace('{dsid}', this.properties.id)
                .replace('{cmdid}', commandId),
            commandFilter.toQueryString(['select','format']),
            commandFilter.props.format
        );
        return this.commandParser.parseData(response);
    }

    postCommand(payload, commandFilter = new CommandFilter()) {
        this._network.info.connector.postRequest(
            API.controls.commands
                .replace('{sysid}',this.properties.system.id)
                .replace('{dsid}', this.properties.id),
            payload,
            commandFilter.props.format
        );
    }

    publishCommand(payload, commandFilter = new CommandFilter()) {
        this._network.stream.connector.publishRequest(
            API.controls.commands
                .replace('{sysid}',this.properties.system.id)
                .replace('{dsid}', this.properties.id),
            payload
        );
    }

    /**
     * Get all status messages sent by this control interface
     * @param controlFilter
     * @param pageSize
     * @return {Promise<Collection<JSON>>}
     */
    async searchStatus(controlFilter = new ControlFilter(), pageSize= 10) {
        return new Collection(
            API.controls.status.replace('{sysid}',this.properties.system.id).replace('{dsid}',
                this.properties.id),controlFilter, pageSize,this.jsonParser, this._network.info.connector);
    }

    /**
     * Stream all status messages sent by this control interface
     * @param {ControlFilter} controlFilter - controlFilter
     * @param callback - A callback to get observations
     */
    streamStatus(controlFilter = new ControlFilter(), callback = function(){}) {
        if(controlFilter.props.format === 'application/json') {
            this._network.stream.connector.onMessage = (message) => {
                callback(this.jsonParser.parseData(message));
            };
        } else {
            this._network.stream.connector.onMessage = callback;
        }

        this._network.stream.connector.doRequest(
            API.controls.status.replace('{sysid}',this.properties.system.id).replace('{dsid}',this.properties.id),
            controlFilter.toQueryString(),
            'arraybuffer'
        );
    }
}

export default Control;
