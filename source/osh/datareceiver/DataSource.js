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
import EventManager from "../events/EventManager.js";

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
            properties: JSON.stringify(properties)
        });

        this.dataSourceWorker.onmessage = (event) => {
            this.onData(event.data);
        }
    }

    onData(data) {
        EventManager.fire(EventManager.EVENT.DATA + "-" + this.id, {data: data});
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
}

export default DataSource;
