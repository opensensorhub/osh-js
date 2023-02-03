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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import WebSocketConnector from "../connector/WebSocketConnector";
import { assertDefined, isDefined } from "../utils/Utils";
import MqttConnector from "../connector/MqttConnector";
var SensorWebApi = /** @class */ (function () {
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
    function SensorWebApi(networkProperties) {
        assertDefined(networkProperties.endpointUrl, 'endpointUrl');
        this.networkProperties = networkProperties;
        var endpoint = networkProperties.endpointUrl;
        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }
        var tls = (networkProperties.tls) ? 's' : '';
        this.url = 'http' + tls + '://' + endpoint;
        this._network = {};
        if (isDefined(networkProperties.connector)) {
            this._network.stream = {
                connector: networkProperties.connector,
            };
        }
        else if (isDefined(networkProperties.streamProtocol)) {
            this._network.stream = {
                connector: this.createStreamConnector(networkProperties)
            };
        }
        else {
            // default Stream to WS
            this._network.stream = {
                connector: this.createStreamConnector(__assign(__assign({}, networkProperties), { streamProtocol: 'ws' }))
            };
        }
    }
    SensorWebApi.prototype.baseUrl = function () {
        return this.url;
    };
    SensorWebApi.prototype.stream = function () {
        return this._network.stream.connector;
    };
    SensorWebApi.prototype.createStreamConnector = function (networkProperties) {
        assertDefined(networkProperties.streamProtocol, 'streamProtocol');
        var endpoint = networkProperties.endpointUrl;
        if (networkProperties.streamProtocol === 'mqtt' && isDefined(networkProperties.mqttOpts)) {
            endpoint = networkProperties.mqttOpts.endpointUrl;
        }
        if (endpoint.endsWith('/')) {
            endpoint = endpoint.substring(0, endpoint.length - 1);
        }
        var tls = (networkProperties.tls) ? 's' : '';
        var url = networkProperties.streamProtocol + tls + '://' + endpoint;
        if (networkProperties.streamProtocol === 'mqtt') {
            return new MqttConnector(url, networkProperties);
        }
        else if (networkProperties.streamProtocol === 'ws') {
            return new WebSocketConnector(url);
        }
    };
    SensorWebApi.prototype.connect = function () {
        this._network.stream.connector.connect();
    };
    SensorWebApi.prototype.getHeaders = function () {
        var headers = {};
        if ('connectorOpts' in this.networkProperties) {
            if ('username' in this.networkProperties.connectorOpts && 'password' in this.networkProperties.connectorOpts) {
                headers['Authorization'] = 'Basic ' +
                    btoa(this.networkProperties.connectorOpts.username + ":" + this.networkProperties.connectorOpts.password);
            }
            else {
                for (var key in this.networkProperties.connectorOpts) {
                    headers[key] = this.networkProperties.connectorOpts[key];
                }
            }
        }
        return headers;
    };
    SensorWebApi.prototype.fetchAsJson = function (apiUrl, queryString) {
        var fullUrl = this.baseUrl() + apiUrl + '?' + queryString;
        var headers = this.getHeaders();
        return fetch(fullUrl, {
            method: 'GET',
            headers: headers
        }).then(function (response) {
            if (!response.ok) {
                var err = new Error("Got ".concat(response.status, " response from ").concat(this.baseUrl()));
                err.response = response;
                throw err;
            }
            return response.json();
        });
    };
    SensorWebApi.prototype.postAsJson = function (apiUrl, jsonPayload) {
        var fullUrl = this.baseUrl() + apiUrl;
        var headers = this.getHeaders();
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';
        fetch(fullUrl, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: jsonPayload
        }).then(function (response) {
            if (!response.ok) {
                var err = new Error("Got ".concat(response.status, " response from ").concat(fullUrl));
                err.response = response;
                throw err;
            }
        });
    };
    return SensorWebApi;
}());
export default SensorWebApi;
//# sourceMappingURL=SensorWebApi.js.map