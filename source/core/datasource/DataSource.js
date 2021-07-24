/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {randomUUID} from '../utils/Utils.js';
import {DATASOURCE_DATA_TOPIC} from "../Constants";
import {Status} from "../protocol/Status";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class DataSource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.bufferingTime=0 - defines the time during the data has to be buffered. Useful only when used with DataSynchronizer
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Number} [properties.batchSize=1] - the number of data to fetch
     * @param {Object} [properties.customUrlParams={}] - custom parameters appended to the URL as they are
     * @param {Object} worker - DataSource worker
     */
    constructor(name, properties, worker) {
        this.id = "DataSource-" + randomUUID();
        this.name = name;
        this.properties = properties;
        this.dataSourceWorker = worker;
        this.currentRunningProperties = {};
        this.initDataSource(properties);
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    initDataSource(properties) {
        this.dataSourceWorker.postMessage({
            message: 'init',
            id: this.id,
            properties: JSON.stringify(properties),
            topic: this.getTopicId()
        });
    }


    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    disconnect() {
        this.dataSourceWorker.postMessage({
            message: 'disconnect'
        });
    }

    /**
     * Trigger when the datasource is disconnected for some reason.
     */
    onDisconnect() {
        return new Promise(resolve => {
            new BroadcastChannel(this.getTopicId()).onmessage = (event) => {
                if(event.data.status === Status.DISCONNECTED) {
                    resolve();
                }
            }
        });
    }

    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    async connect() {
        this.dataSourceWorker.postMessage({
            message: 'connect'
        });
        return this.isConnected();
    }

    async isConnected() {
        const promise = new Promise(resolve => {
            if(this.dataSourceWorker !== null) {
                this.dataSourceWorker.onmessage = (event) => {
                    if (event.data.message === 'is-connected') {
                        resolve(event.data.data);
                    }
                };
            }
        });
        if(this.dataSourceWorker !== null) {
            this.dataSourceWorker.postMessage({
                message: 'is-connected'
            });
        }

        return promise;
    }

    /**
     * Gets the datasource id.
     * @return {String} the datasource id
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the datasource name.
     * @return {String} the datasource name
     */
    getName() {
        return this.name;
    }

    /**
     * Update properties
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} properties.timeShift - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    updateProperties(properties) {
        // save current running properties
        this.currentRunningProperties = {
            ...this.properties,
            ...properties
        };
        if(this.dataSourceWorker !== null) {
            this.dataSourceWorker.postMessage({
                message: 'update-url',
                data: properties
            });
        }
    }

    getCurrentRunningProperties() {
        return this.currentRunningProperties;
    }

    terminate() {
        if(this.dataSourceWorker !== null) {
            this.dataSourceWorker.terminate();
        }
    }

    getTopicId() {
        return DATASOURCE_DATA_TOPIC + this.id;
    }

    getVersion() {
        return 0;
    }
}

export default DataSource;
