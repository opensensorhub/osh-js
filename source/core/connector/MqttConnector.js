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
import {isDefined, randomUUID} from "../utils/Utils";
import {Status} from "./Status";
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
        this.topicSubscribers = new Map();
        this.topicSubscriptionRequests = new Map();
        this.messagePorts = new Map();
    }

    initBc() {
        this.onMessage = (data, topic) => {
            const subscribers = this.topicSubscribers.get(topic);
            if (!subscribers) {
                return;
            }
            for (const connectorId of subscribers) {
                const port = this.messagePorts.get(connectorId);
                if (port) {
                    port.postMessage({data: data, topic: topic});
                }
            }
        }
    }

    registerMessagePort(connectorId, port) {
        const previousPort = this.messagePorts.get(connectorId);
        if (previousPort) {
            previousPort.close();
            for (const [topic, subscribers] of this.topicSubscribers) {
                subscribers.delete(connectorId);
                if (subscribers.size === 0) {
                    this.topicSubscribers.delete(topic);
                    this.disconnect(topic);
                }
            }
        }

        this.messagePorts.set(connectorId, port);
        port.onmessage = async (event) => {
            if (event.data.message === 'subscribe') {
                try {
                    await this.subscribeTopic(event.data.topic, connectorId);
                    port.postMessage({message: 'subscribe-ack', topic: event.data.topic});
                } catch (error) {
                    const message = error instanceof Error ? error.message : String(error);
                    port.postMessage({
                        message: 'subscribe-error',
                        topic: event.data.topic,
                        error: message
                    });
                }
            } else if (event.data.message === 'unsubscribe') {
                this.unsubscribeTopic(event.data.topic, connectorId);
            }
        };
        port.start();
    }

    ensureConnected() {
        this.getMqttProvider();
    }

    subscribeTopic(topic, connectorId) {
        let subscribers = this.topicSubscribers.get(topic);
        if (!subscribers) {
            subscribers = new Set();
            this.topicSubscribers.set(topic, subscribers);
        }
        if (subscribers.has(connectorId)) {
            return this.topicSubscriptionRequests.get(topic) || Promise.resolve();
        }
        subscribers.add(connectorId);
        if (subscribers.size === 1) {
            const request = this.doRequest(topic)
                .catch(error => {
                    this.topicSubscribers.delete(topic);
                    throw error;
                })
                .finally(() => {
                    this.topicSubscriptionRequests.delete(topic);
                });
            this.topicSubscriptionRequests.set(topic, request);
            return request;
        }
        return this.topicSubscriptionRequests.get(topic) || Promise.resolve();
    }

    unsubscribeTopic(topic, connectorId) {
        const subscribers = this.topicSubscribers.get(topic);
        if (!subscribers) {
            return;
        }
        subscribers.delete(connectorId);
        if (subscribers.size === 0) {
            this.topicSubscribers.delete(topic);
            return this.disconnect(topic);
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
            this.mqttProvider.connect();
            this.mqttProvider.checkStatus = this.checkStatus;
            this.checkStatus(Status.CONNECTED);
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

        return mqttProvider.subscribe(topic, this.onMessage).then(() => {
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
