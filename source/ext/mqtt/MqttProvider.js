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

import mqtt from 'mqtt';
import {isDefined} from "../../core/utils/Utils";

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
            connectTimeout: 30 * 1000
        };

        // merge generic options
        if (isDefined(this.properties.options)) {
            options = {
                ...options,
                ...this.properties.options
            }
        }

        this.options = options;
        this.endpoint = properties.endpoint+'/mqtt';
        this.clientId = properties.clientId;
        this.client = null;
    }


    subscribeToObservations(dsID, format, callback) {

    }

    /**
     * Generic model
     * mqttCallback: {
     *     'topic0': {
     *         dsId: callback
     *     }
     * }
     */
    /**
     *
     * @param dsID
     * @param {ObsFilter} ObsFilter - the observation filter object
     * @param {string} format - the return format such as 'application/json', 'application/swe+json','text/xml','text/plain', 'application/swe+binary'
     * @param callback
     */
    subscribeToObservationsWithObsFilter(dsID, obsFilter, format, callback) {
        if (!isDefined(this.client)) {
            throw Error('You must connect the client before subscribing any topic')
        }
        // waiting for the client gets connected
        let interval;

        interval = setInterval(() => {
            if (this.client.connected) {
                try {
                    // subscribe
                    for (let dataStreamId of obsFilter.datastreamIds) {
                        // store callback for this topic
                        if (!(dataStreamId in mqttCallbacks)) {
                            mqttCallbacks[dataStreamId] = {};
                        }

                        mqttCallbacks[dataStreamId][dsID] = callback;

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

    // TODO!:
    unsubscribeObservations(dsId, obsFilter) {
    }

    /**
     * Check to unsuscribe to any topic listened by this dsId
     * If the topic is only subscribed by the dsId, unsubscribe from broken
     * Otherwise, remove from the list of subscribe topic/dsId
     * @param dsId
     */
    unsubscribeDs(dsId) {
        console.log('remove', mqttCallbacks)

        for (let dataStreamId in mqttCallbacks) {
            // callback for the corresponding topic
            if(dsId in mqttCallbacks[dataStreamId]) {
                delete mqttCallbacks[dataStreamId][dsId];
            }

            if (Object.keys(mqttCallbacks[dataStreamId]).length === 0) {
                this.client.unsubscribe(dataStreamId, function (err) {
                    // throw Error(err);
                });
                delete mqttCallbacks[dataStreamId];
            }
        }
        console.log(mqttCallbacks)
    }

    connect() {
        if(!isDefined(this.client)) {
            // connects to the broker specified by the given url and options and returns a Client.

            this.client = mqtt.connect(this.endpoint, {...this.options});
            this.client.on('connect', function (e) {
                console.log('is connected')
            })
            this.client.on('message', this.onMessage.bind(this));
        }
    }

    onMessage(topic, message) {
        if(topic in mqttCallbacks) {
            // callback for the corresponding topic
            for(let dsId in mqttCallbacks[topic]) {
                // callback to all subscription registered
                mqttCallbacks[topic][dsId](message)
            }
        }
        console.log(mqttCallbacks)
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
