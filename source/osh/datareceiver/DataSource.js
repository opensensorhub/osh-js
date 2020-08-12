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

import {isDefined, randomUUID} from '../utils/Utils.js';
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_DATA_TOPIC} from "../Constants";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class DataSource {
    /**
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
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     * @param {Object} worker - DataSource worker
     * @return {String} the full url
     */
    constructor(name, properties, worker) {
        this.id = "DataSource-" + randomUUID();
        this.name = name;
        this.properties = properties;
        this.dataSourceWorker = worker;
        this.dataSynchronizer = null;
        this.initDataSource(properties);
    }

    /**
     * Inits the datasource with the constructor properties.
     * @private
     * @param properties
     */
    initDataSource(properties) {
        this.dataSourceWorker.postMessage({
            message: 'init',
            id: this.id,
            properties: JSON.stringify(properties),
            topic: DATASOURCE_DATA_TOPIC+this.id
        });
    }

    setDataSynchronizer(dataSynchronizer) {
        this.dataSynchronizer = dataSynchronizer;
        this.dataSourceWorker.postMessage({
            message: 'topic',
            topic: DATA_SYNCHRONIZER_TOPIC+this.dataSynchronizer.id
        });
    }

    /**
     * Disconnect the dataSource then the connector will be closed as well.
     */
    disconnect() {
        this.dataSourceWorker.postMessage({
            message: 'disconnect'
        });
        this.connected = false;
    }

    /**
     * Connect the dataSource then the connector will be opened as well.
     */
    connect() {
        this.dataSourceWorker.postMessage({
            message: 'connect'
        });
        this.connected = true;
    }

    async getCurrentTime() {
        if(isDefined(this.dataSynchronizer)) {
            return this.dataSynchronizer.getCurrentTime();
        } else {
            const promise = new Promise(resolve => {
                if(this.dataSourceWorker !== null) {
                    this.dataSourceWorker.onmessage = (event) => {
                        if (event.data.message === 'last-timestamp') {
                            resolve(event.data.data);
                        }
                    };
                }
            });
            if(this.dataSourceWorker !== null) {
                this.dataSourceWorker.postMessage({
                    message: 'last-timestamp'
                });
            }

            return promise;
        }
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
     /**
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
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    updateUrl(properties) {
        const newProperties = {
            ...this.properties,
            ...properties
        };

        if(this.dataSourceWorker !== null) {
            this.dataSourceWorker.postMessage({
                message: 'update-url',
                data: newProperties
            });
        }
    }
}

export default DataSource;
