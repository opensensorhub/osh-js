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

import mqtt from '../../../libs/mqtt/mqtt.min';
import {isDefined} from "../utils/Utils";
import ObservationFilter from "../sweapi/observation/ObservationFilter";

let mqttCallbacks = {};

class MqttProvider {
    /**
     * Build the MqttProvider.
     * @param {Object} properties - the object properties
     * @param {String} properties.endpoint - the mqtt endpoint[:port]
     * @param {String} properties.clientId - the clientId
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

        let options = {
            reconnectPeriod: 30,
            connectTimeout: 30 * 1000,
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


    subscribeToObservations(dataStreamId, format, callback) {
        const obsFilter = new ObservationFilter();
        this.subscribeToObservationsByObsFilter([dataStreamId],obsFilter,callback);
    }


    /**
     * Generic model
     * mqttCallback: {
     *     'topic0': [callback]
     * }
     */
    /**
     *
     * @param {String[]} [dataStreamIds=[]] - list of datastream ids
     * @param {ObservationFilter} observationFilter - the observation filter object
     * @param callback
     */
    subscribeToObservationsByObsFilter(dataStreamIds = [],observationFilter,  callback) {
        if (!isDefined(this.client)) {
            throw Error('You must connect the client before subscribing any topic');
        }
        // waiting for the client gets connected
        let interval;

        interval = setInterval(() => {
            if (this.client.connected) {
                try {
                    // subscribe
                    for (let dataStreamId of dataStreamIds) {
                        // store callback for this topic
                        if (!(dataStreamId in mqttCallbacks)) {
                            mqttCallbacks[dataStreamId] = [];
                        }

                        mqttCallbacks[dataStreamId].push(callback);

                        this.client.subscribe(dataStreamId, function (err) {
                            if (err) {
                                callback(err);
                            } else {
                                console.warn(`Subscribed to ${dataStreamId}`);
                            }
                        });
                    }
                } catch (exception) {
                    console.error(exception);
                } finally {
                    clearInterval(interval);
                }
            }
        },100);
    }

    /**
     * Check to unsuscribe to any topic listened by this dsId
     * If the topic is only subscribed by the dsId, unsubscribe from broken
     * Otherwise, remove from the list of subscribe topic/dsId
     * @param dataStreamId
     */
    unsubscribeDs(dataStreamId) {
        console.log(`remove dataStream: ${dataStreamId}`);
        delete mqttCallbacks[dataStreamId];
    }

    connect() {
        if(!isDefined(this.client)) {
            // connects to the broker specified by the given url and options and returns a Client.
            this.client = mqtt.connect(this.endpoint, {...this.options});
            const that = this;
            this.client.on('connect', function (e) {
                console.info(`Mqqt client is connected to ${that.endpoint}`);
            });
            this.client.on('message', this.onMessage.bind(this));
        }
    }

    async onMessage(topic, message) {
        if (topic in mqttCallbacks) {
            // callback for the corresponding topic
            for (let callbackFn of mqttCallbacks[topic]) {
                // callback to all subscription registered
                callbackFn(new Uint8Array(message).buffer);
            }
        }
    }

    disconnect() {
        if (isDefined(this.client)) {
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
