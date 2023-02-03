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

import DataConnector from "./DataConnector";
import {assertDefined, isDefined, randomUUID} from "../utils/Utils";
import {Status} from "./Status";
import MqttProvider from "../mqtt/MqttProvider";
import ObservationFilter from "../sweapi/observation/ObservationFilter";

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
            mqttPrefix: (properties.mqttOpts && properties.mqttOpts.prefix) || '/api',
            ...properties
        });
        this.interval = -1;
    }

    getMqttProvider() {
        let fullUrl = this.getUrl() ;

        // only 1 provider by URL
        if(!(fullUrl in mqttProviders)) {
            let options = {
                reconnectPeriod: this.reconnectTimeout,
                connectTimeout: 30 * 1000
            };

            if(isDefined(this.properties.mqttOpts)) {
                options = {
                    ...options,
                    ...this.properties.mqttOpts
                };
            }

            mqttProviders[fullUrl] = new MqttProvider({
                endpoint: fullUrl,
                clientId: randomUUID(),
                options: options,
                mqttPrefix: this.properties.mqttPrefix
            });
            console.warn(`Stored MQTT provider into cache: ${fullUrl}`);
            mqttProviders[fullUrl].connect();
            mqttProviders[fullUrl].checkStatus = this.checkStatus;
            this.checkStatus(Status.CONNECTED);
        } else {
            console.warn(`Getting MQTT provider from cache: ${fullUrl}`);
        }
        return mqttProviders[fullUrl];
    }

    checkStatus(status) {
        this.onChangeStatus(status);
        this.status = status;
    }

    /**
     * Connect to the Mqtt broker.
     */
    doRequest(topic = '',queryString= undefined) {
        const mqttProvider = this.getMqttProvider();
        mqttProvider.subscribe(`${topic}?${queryString}`, this.onMessage).then(() => {
            this.onChangeStatus(Status.CONNECTED);
        });
    }

    publishRequest(topic, payload) {
        const mqttProvider = this.getMqttProvider();
        mqttProvider.publish(topic, payload);
    }

    /**
     * Disconnects and close the mqtt client.
     */
    async disconnect() {
        // does not call super to avoid reconnection logic and use the one of the mqtt.js lib
        // this.checkStatus(Status.DISCONNECTED);
        // this.init = false;
        // this.closed = true;
        // find the client
        const client = mqttProviders[this.getUrl()];

        if (isDefined(client) && client.isConnected()) {
            // unsubscribe all topics
            await client.unsubscribeAll();
            // client.disconnect();
        }
        //delete mqttProviders[this.getUrl()];
        //console.warn(`Disconnected from ${this.getUrl()}`);
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
        return isDefined(mqttProviders[this.getUrl()]) && mqttProviders[this.getUrl()].isConnected();
    }

    reset() {
        this.disconnect();
        console.log(`Remove provider from cache: ${this.getUrl()}`)
        delete mqttProviders[this.getUrl()];
    }
}

export default MqttConnector;
