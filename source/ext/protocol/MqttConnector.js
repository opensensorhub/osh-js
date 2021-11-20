/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2021 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataConnector from "../../core/protocol/DataConnector";
import {assertDefined, isDefined, randomUUID} from "../../core/utils/Utils";
import {Status} from "../../core/protocol/Status";
import MqttProvider from "../mqtt/MqttProvider";

/**
 * Defines the MqttConnector to connect to a remote server by creating a Mqtt channel.
 * @extends DataConnector
 * @example
 * import MqttConnector from 'osh-js/dataconnector/MqttConnector.js';
 *
 * let url = ...;
 * let connector = new MqttConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */

// TODO: Useless in WebWorker since the WebWorker has its own context.
const mqttProviders = {};

class MqttConnector extends DataConnector {
    /**
     *
     * @param properties -
     */
    constructor(url, properties) {
        super(url, {
            ...properties
        });
        this.interval = -1;
    }

    /**
     * Connect to the Mqtt broker.
     */
    doRequest(topic = '',queryString= undefined) {
        if (!this.init) {
            let fullUrl = this.getUrl() ;

            let options = {
                reconnectPeriod: this.reconnectTimeout,
                connectTimeout: 30 * 1000
            };

            if(isDefined(this.properties.options)) {
                options = {
                    ...options,
                    ...this.properties.options
                }
            }

            // only 1 provider by URL
            if(!(fullUrl in mqttProviders)) {
                mqttProviders[fullUrl] = new MqttProvider({
                    endpoint: fullUrl,
                    clientId: randomUUID(),
                    options: options
                });
                mqttProviders[fullUrl].connect();
            }

            mqttProviders[fullUrl].subscribeToObservations(topic, 'application/json',this.onMessage);
            this.url = fullUrl;
        }
    }

    /**
     * Disconnects and close the mqtt client.
     */
    disconnect() {
        // does not call super to avoid reconnection logic and use the one of the mqtt.js lib
        this.checkStatus(Status.DISCONNECTED);
        this.init = false;
        this.closed = true;
        if(isDefined(mqttProviders[this.url])) {
            // unsubscribe topic
            // find the client
            const client = mqttProviders[this.url];
            client.unsubscribeDs(this.properties.topic);
        }
        console.warn(`Disconnected from ${this.getUrl()}`);
    }

    connect() {
        this.doRequest(this.properties.topic || '');
    }

    /**
     * The onMessage method used by the mqtt client to callback the data
     * @param data the callback data
     * @event
     */
    onMessage(data) {
    }

    isConnected() {
        return isDefined(mqttProviders[this.url]) && mqttProviders[this.url].isConnected();
    }
}

export default MqttConnector;
