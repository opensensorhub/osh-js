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

import mqtt from './mqtt.min.js';
import {isDefined} from "../utils/Utils.js";

let mqttCallbacks = {};

class MqttProvider {
    /**
     * Build the MqttProvider.
     * @param {Object} properties - the object properties
     * @param {String} properties.endpoint - the mqtt endpoint[:port]
     * @param {String} properties.clientId - the clientId
     * @param {String} [properties.mqttPrefix='/api'] - a prefix to each topic
     * @param {Object} properties.options - the MQTT.js property options as defined  [mqtt.Client(streamBuilder, options)]{@link https://github.com/mqttjs/MQTT.js#mqttclientstreambuilder-options}
     * Note that the credentials are passed in the object options as for the mqtt.js client.
     */
    constructor(properties) {
        this.properties = properties;

        if (!isDefined(properties)) {
            throw Error('endpoint and clientId are mandatory properties');
        }

        if (!isDefined(properties.endpoint)) {
            throw Error('endpoint is a mandatory property');
        }

        if (!isDefined(properties.clientId)) {
            throw Error('clientId is a mandatory property');
        }

        this.mqttPrefix = '/api';
        if (isDefined(properties.mqttPrefix)) {
            this.mqttPrefix = properties.mqttPrefix;
        }

        this.topics = [];

        let options = {
            reconnectPeriod: 30,
            connectTimeout: 30 * 1000,
            clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
            wsOptions: {
                binaryType: 'arraybuffer'
            }
        };

        // merge generic options
        if (isDefined(this.properties.options)) {
            options = {
                ...options,
                ...this.properties.options
            };
        }

        this.options = options;
        this.endpoint = properties.endpoint+'/mqtt';
        this.clientId = properties.clientId;
        this.client = null;
    }


    async subscribe(topic, callback) {
        if(topic in this.topics) {
            // already subscribed, skipping
            return;
        }
        if (!isDefined(this.client)) {
            throw Error('You must connect the client before subscribing any topic');
        }
        // waiting for the client gets connected
        let interval;
        const topicQuery = `${this.mqttPrefix}${topic}`;
        this.topics.push(topic);
        return new Promise((resolve, error) => {
            interval = setInterval(() => {
                if (this.client.connected) {
                    try {
                        // subscribe
                        // store callback for this topic
                        if (!(topicQuery in mqttCallbacks)) {
                            mqttCallbacks[topicQuery] = [];
                        }

                        mqttCallbacks[topicQuery].push(callback);

                        this.client.subscribe(`${topicQuery}`, function (err) {
                            if (err) {
                                callback(err);
                                error(err);
                            } else {
                                console.warn(`Subscribed to ${topicQuery}`);
                                resolve();
                            }
                        });
                    } catch (exception) {
                        console.error(exception);
                    } finally {
                        clearInterval(interval);
                    }
                }
            }, 100);
        });
    }


    publish(topic, payload) {
        const topicQuery = `${this.mqttPrefix}${topic}`;
        this.client.publish(topicQuery, payload);
    }

    /**
     * Check to unsuscribe to any topic listened by this dsId
     * If the topic is only subscribed by the dsId, unsubscribe from broken
     * Otherwise, remove from the list of subscribe topic/dsId
     * @param topic
     */
    async unsubscribe(topic) {
        const topicQuery = `${this.mqttPrefix}${topic}`;
        return new Promise((resolve, error) => {
            this.client.unsubscribe(topicQuery, err => {
                delete mqttCallbacks[topicQuery];
                if (err) {
                    const messageErr = `Cannot Unsubscribed topic: ${topicQuery} : ${err}`;
                    console.error(messageErr);
                    error(messageErr);
                } else {
                    console.warn(`Unsubscribed topic: ${topicQuery}`);
                    resolve();
                }
            });
        });
    }

    async unsubscribeAll() {
        // unsubscribe topic
        for (let topic of this.topics) {
            await this.unsubscribe(topic);
        }
        this.topics = [];
    }

    connect() {
        if(!isDefined(this.client)) {
            // connects to the broker specified by the given url and options and returns a Client.
            this.client = mqtt.connect(this.endpoint, {...this.options});
            const that = this;
            this.client.on('connect', e => {
                console.info(`Mqtt client is connected to ${that.endpoint}`);
            });
            this.client.on('message', this.onMessage.bind(this));

            this.client.on('offline', e => {
                throw new Error(`The server ${that.endpoint} seems offline`);
            });
            this.client.on('error', e => {
                throw new Error(error);
            });
        }
    }

    async onMessage(topic, message) {
        // console.log(new DataView(message.buffer, message.byteOffset).getFloat64(0, false) * 1000)
        // console.log(new DataView(new Uint8Array(message).subarray(message.byteOffset).buffer).getFloat64(0, false) * 1000)
        // console.log(String.fromCharCode.apply(null, new Uint8Array(message)));
        if (topic in mqttCallbacks) {
            // callback for the corresponding topic
            for (let callbackFn of mqttCallbacks[topic]) {
                // callback to all subscription registered
                callbackFn(new Uint8Array(message).subarray(message.byteOffset).buffer);
            }
        }
    }

    disconnect() {
        if (!isDefined(this.client)) {
            throw Error('The client has not been created yet');
        }
        // close the client
        this.client.end();
        mqttCallbacks = {};
        this.client = null;
    }

    isConnected() {
        return isDefined(this.client) && this.client.connected;
    }
}

export default MqttProvider;
