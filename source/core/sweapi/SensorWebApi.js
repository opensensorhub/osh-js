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

import WebSocketConnector from "../connector/WebSocketConnector";
import {assertDefined, isDefined} from "../utils/Utils";
import MqttConnector from "../connector/MqttConnector";

class SensorWebApi {

    /**
     * @param {Object} [networkProperties={}]
     * @param {String} networkProperties.endpointUrl - defines the Http(s) endpoint URL
     * @param {Boolean} networkProperties.tls - defines is use Http or Https secure protocol for fetching data
     * @param {String} [networkProperties.streamProtocol='ws'] - the Stream protocol to use: 'ws' pr 'mqtt'
     * @param {Object} [networkProperties.mqttOpts={}] - the Mqtt options if stream protocol is 'mqtt'
     * @param {String} networkProperties.mqttOpts.prefix - the Mqtt prefix value
     * @param {String} networkProperties.mqttOpts.endpointUrl - the Mqtt specific endpointUrl
     * @param {Object} networkProperties.connectorOpts - Specific connector options
     */
    constructor(networkProperties) {
        assertDefined(networkProperties.endpointUrl, 'endpointUrl');
        this.networkProperties = networkProperties;

        let endpoint = networkProperties.endpointUrl;
        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }

        const tls = (networkProperties.tls) ? 's' : '';
        this.url = 'http' + tls + '://' + endpoint;

        this._network = {}
        if (isDefined(networkProperties.connector)) {
            this._network.stream = {
                connector: networkProperties.connector,
            };
        } else if(isDefined(networkProperties.streamProtocol)){
            this._network.stream = {
                connector: this.createStreamConnector(networkProperties)
            }
        } else {
            // default Stream to WS
            this._network.stream = {
                connector: this.createStreamConnector({
                    ...networkProperties,
                    streamProtocol: 'ws'
                })
            }
        }
    }

    baseUrl() {
        return this.url;
    }

    stream() {
        return this._network.stream.connector;
    }

    createStreamConnector(networkProperties) {
        assertDefined(networkProperties.streamProtocol, 'streamProtocol');

        let endpoint = networkProperties.endpointUrl;
        if(networkProperties.streamProtocol === 'mqtt' && isDefined(networkProperties.mqttOpts)) {
            endpoint = networkProperties.mqttOpts.endpointUrl;
        }

        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }

        const tls = (networkProperties.tls) ? 's' : '';
        const url = networkProperties.streamProtocol + tls + '://' + endpoint;

        if(networkProperties.streamProtocol === 'mqtt') {
            return new MqttConnector(url, networkProperties);
        } else if(networkProperties.streamProtocol === 'ws') {
            return new WebSocketConnector(url);
        }
    }

    connect() {
        this._network.stream.connector.connect();
    }

    getHeaders() {
        const headers = {
        };

        if('connectorOpts' in this.networkProperties){
            if('username' in this.networkProperties.connectorOpts && 'password' in this.networkProperties.connectorOpts) {
                headers['Authorization'] = 'Basic ' +
                    btoa(this.networkProperties.connectorOpts.username + ":" + this.networkProperties.connectorOpts.password);
            } else {
                for(let key in this.networkProperties.connectorOpts) {
                    headers[key] = this.networkProperties.connectorOpts[key];
                }
            }
        }
        return headers;
    }

    fetchAsJson(apiUrl, queryString) {
        const fullUrl = this.baseUrl() +  apiUrl + '?' +queryString;

        const headers = this.getHeaders();

        return fetch(fullUrl, {
                method: 'GET',
                headers: headers
            }
        ).then(function (response) {
            if (!response.ok) {
                const err = new Error(`Got ${response.status} response from ${this.baseUrl()}`);
                err.response = response;
                throw err;
            }
            return response.json();
        });
    }

    postAsJson(apiUrl, jsonPayload) {
        const fullUrl = this.baseUrl() +  apiUrl;

        const headers = this.getHeaders();

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        fetch(fullUrl, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: jsonPayload
        }).then(function (response) {
            if (!response.ok) {
                const err = new Error(`Got ${response.status} response from ${fullUrl}`);
                err.response = response;
                throw err;
            }
        });
    }
}
export default SensorWebApi;
