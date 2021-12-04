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
import MqttConnector from "../../protocol/MqttConnector";

class SensorWebApi {

    constructor(networkProperties) {
        this._network = {}
        this._network.info = {
            connector: this.createConnector({
                protocol: 'http',
                tls: networkProperties.tls,
                endpointUrl: networkProperties.endpointUrl
            })
        };

        if (isDefined(networkProperties.connector)) {
            this._network.stream = {
                connector: networkProperties.connector,
            };
        } else {
            this._network.stream = {
                connector: this.createConnector(networkProperties)
            }
        }
    }

    createConnector(networkProperties) {
        assertDefined(networkProperties.endpointUrl, 'endpointUrl');
        assertDefined(networkProperties.protocol, 'protocol');

        let endpoint = networkProperties.endpointUrl;
        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }

        const tls = (networkProperties.tls) ? 's' : '';
        const url = networkProperties.protocol + tls + '://' + endpoint;

        if(networkProperties.protocol === 'http') {
            return new HttpConnector(url , {
                responseType: networkProperties.responseFormat || 'application/json',
                method: 'GET'
            });
        } else if(networkProperties.protocol === 'mqtt') {
            return new MqttConnector(url);
        } else if(networkProperties.protocol === 'ws') {
            return new WebSocketConnector(url);
        }
    }
}
export default SensorWebApi;
