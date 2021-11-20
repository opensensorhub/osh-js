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

import HttpConnector from "../../protocol/HttpConnector";
import WebSocketConnector from "../../protocol/WebSocketConnector";
import {assertDefined, isDefined} from "../../utils/Utils";
import SensorWebApiFetchJsonParser from "../../datasource/parsers/SensorWebApiFetchJson.parser";
import MqttConnector from "../../../ext/protocol/MqttConnector";

class SensorWebApi {

    constructor(networkProperties) {
        this._network = {}

        if(isDefined(networkProperties.info) && isDefined(networkProperties.info.connector)) {
            this._network.info = {
                connector: networkProperties.info.connector,
            };
        } else {
            assertDefined(networkProperties.info, 'info');
            assertDefined(networkProperties.info.endpoint, 'info.endpoint');
            assertDefined(networkProperties.info.protocol, 'info.protocol');
            this._network.info = {
                endpoint:  networkProperties.info.endpoint,
                protocol: networkProperties.info.protocol,
                connector: undefined
            };

            if (networkProperties.info.endpoint.endsWith('/')) {
                this._network.info.enpoint = networkProperties.info.endpoint.substring(0, networkProperties.info.endpoint.length - 1);
            }
            this._network.info.connector   = this.createConnector(this._network.info);
        }

        if(isDefined(networkProperties.stream) && isDefined(networkProperties.stream.connector)) {
            this._network.stream = {
                connector: networkProperties.stream.connector,
            };
        } else {
            assertDefined(networkProperties.stream, 'info');
            assertDefined(networkProperties.stream.endpoint, 'info.endpoint');
            assertDefined(networkProperties.stream.protocol, 'info.protocol');
            this._network.stream = {
                endpoint:  networkProperties.stream.endpoint,
                protocol: networkProperties.stream.protocol,
                connector: undefined
            };

            if (networkProperties.stream.endpoint.endsWith('/')) {
                this._network.stream.enpoint = networkProperties.stream.endpoint.substring(0, networkProperties.stream.endpoint.length - 1);
            }
            this._network.stream.connector   = this.createConnector(this._network.stream);
        }
    }

    createConnector(networkProperties) {
        if(networkProperties.protocol === 'https' || networkProperties.protocol === 'http') {
            return new HttpConnector(networkProperties.protocol + '://' + networkProperties.endpoint , {
                responseType: 'application/json',
                method: 'GET'
            });
        } else if(networkProperties.protocol === 'mqtts' || networkProperties.protocol === 'mqtt') {
            return new MqttConnector(networkProperties.protocol + '://' + networkProperties.endpoint);
        } else if(networkProperties.protocol === 'wss' || networkProperties.protocol === 'ws') {
            return new WebSocketConnector(networkProperties.protocol + '://' + networkProperties.endpoint);
        }
    }
}
export default SensorWebApi;
