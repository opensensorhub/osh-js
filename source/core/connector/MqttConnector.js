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
     * @param url
     * @param properties -
     */
    constructor(url, properties) {
        super(url, {
            mqttPrefix: (properties.mqttOpts && properties.mqttOpts.prefix) || '/api',
            ...properties
        });
        this.interval = -1;
        this.id = `mqtt-connector-${randomUUID()}`;
        this.mqttProvider = undefined;
    }

    initBc() {
        this.onMessage = (data, topic) => {
            this.broadcastChannel.postMessage({
                data: data,
                topic: topic
            }, [data]);
        }
        this.broadcastChannel = new BroadcastChannel(this.id);
        this.broadcastChannel.onmessage = (message) => {
            if(message.data.message === 'subscribe') {
                this.doRequest(message.data.topic);
            } else if(message.data.message === 'unsubscribe') {
                this.disconnect(message.data.topic);
            }
        }
    }

    getMqttProvider() {
        let fullUrl = this.getUrl() ;

        // only 1 provider by URL
        if(!this.mqttProvider) {
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

            this.mqttProvider = new MqttProvider({
                endpoint: fullUrl,
                clientId: randomUUID(),
                options: options,
                mqttPrefix: this.properties.mqttPrefix
            });
            console.warn(`Stored MQTT provider into cache: ${fullUrl}`);
            this.mqttProvider.connect();
            this.mqttProvider.checkStatus = this.checkStatus;
            this.checkStatus(Status.CONNECTED);
        } else {
            console.warn(`Getting MQTT provider from cache: ${fullUrl}`);
        }
        return this.mqttProvider;
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

        mqttProvider.subscribe(topic, this.onMessage).then(() => {
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
    async disconnect(topic) {
        // does not call super to avoid reconnection logic and use the one of the mqtt.js lib
        // this.checkStatus(Status.DISCONNECTED);
        // this.init = false;
        // this.closed = true;
        // find the client
        const client = this.mqttProvider;

        if (isDefined(client) && client.isConnected()) {
            if(!topic) {
                // unsubscribe all topics
                return client.unsubscribeAll();
                // client.disconnect();
            } else {
                return client.unsubscribe(topic);
            }
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
        return isDefined(this.mqttProvider) && this.mqttProvider.isConnected();
    }

    reset() {
        this.disconnect();
        console.log(`Remove provider from cache: ${this.getUrl()}`)
        this.mqttProvider.reset();
    }
}

export default MqttConnector;
