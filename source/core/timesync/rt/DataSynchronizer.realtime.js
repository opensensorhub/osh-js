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

import {assertDefined, isDefined, randomUUID} from "../../utils/Utils.js";
import DataSynchronizerWorker from './DataSynchronizer.realtime.worker.js';
import {DATA_SYNCHRONIZER_TOPIC, TIME_SYNCHRONIZER_TOPIC} from "../../Constants.js";
import {Mode} from "../../datasource/Mode";
import WorkerExt from "../../worker/WorkerExt";

class DataSynchronizerRealtime {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {String} [properties.id=randomUUID] - id of the dataSynchronizer or random if not provided
     * @param {Number} [properties.timerResolution=5] - interval in which data is played (in milliseconds)
     * @param {Number} [properties.masterTimeRefreshRate=250] - interval in which time value is send through broadcast channel (in milliseconds)
     * @param {Datasource[]} properties.dataSources - the dataSource array
     * @param {DataSynchronizer} timeSync - dataSynchronizer
     */
    constructor(properties, timeSync) {
        this.bufferingTime = 1000; // default
        this.id = properties.id || randomUUID();
        this.dataSources = (properties.dataSources) ? [...properties.dataSources] : [];
        this.timerResolution = properties.timerResolution || 5;
        this.masterTimeRefreshRate = properties.masterTimeRefreshRate || 250;
        this.initialized = false;
        this.timeSync = timeSync;
        this.properties = {};
        this.properties.version = 0;
    }

    getId() {
        return this.id;
    }

    getDataSources() {
        return this.dataSources;
    }

    getTopicId() {
        return DATA_SYNCHRONIZER_TOPIC + this.id;
    }

    getTimeTopicId() {
        return TIME_SYNCHRONIZER_TOPIC + this.id;
    }

    setStartTimestamp(timestamp){
        this.properties.startTimestamp = timestamp;
    }

    /**
     * Terminate the corresponding running WebWorker by calling terminate() on it.
     */
    terminate() {
        if (isDefined(this.synchronizerWorker)) {
            this.synchronizerWorker.terminate();
            this.synchronizerWorker = null;
        }
        for (let dataSource of this.dataSources) {
            dataSource.terminate();
        }
    }

    getMode() {
        return Mode.REAL_TIME;
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    async initDataSources() {
        try {
            const dataSourcesForWorker = [];
            for (let dataSource of this.dataSources) {
                const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);
                dataSourcesForWorker.push(dataSourceForWorker);
            }
            this.synchronizerWorker = new WorkerExt(new DataSynchronizerWorker());
            return this.synchronizerWorker.postMessageWithAck({
                message: 'init',
                dataSources: dataSourcesForWorker,
                timerResolution: this.timerResolution,
                masterTimeRefreshRate: this.masterTimeRefreshRate,
                mode: Mode.REAL_TIME,
                version: this.version(),
                topics: {
                    data: this.getTopicId(),
                    time: this.getTimeTopicId()
                }
            }).then(() => {
                this.initialized = true;
            });
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * @private
     * @param dataSource
     */
    async createDataSourceForWorker(dataSource) {
        const obj = {
            bufferingTime: dataSource.properties.bufferingTime || 0,
            timeOut: dataSource.properties.timeOut || 0,
            id: dataSource.id,
            name: dataSource.name
        };
        // bind dataSource data onto dataSynchronizer data
        await dataSource.setDataSynchronizer(this.timeSync);
        return obj;
    }

    /**
     * Adds a new DataSource object to the list of datasources to synchronize.
     * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
     * @param {TimeSeriesDataSource} dataSource - the new datasource to add
     */
    async addDataSource(dataSource) {
        this.dataSources.push(dataSource);
        if (!this.initialized) {
            console.log(`DataSynchronizer not initialized yet, add DataSource ${dataSource.id} as it`);
        } else {
            const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);
            // add dataSource to synchronizer algorithm
            return this.synchronizerWorker.postMessageWithAck({
                message: 'add',
                dataSources: [dataSourceForWorker]
            }).then(() => {
                this.onAddedDataSource(dataSource.id);
            });
        }
    }

    /**
     * Removes a DataSource object from the list of datasources of the synchronizer.
     * @param {TimeSeriesDatasource} dataSource - the new datasource to add
     */
    async removeDataSource(dataSource) {
        if(this.dataSources.map(ds => ds.id).includes(dataSource.id)) {
            dataSource.removeDataSynchronizer();
            this.dataSources = this.dataSources.filter(elt => elt.id !== dataSource.getId());
            dataSource.setDataSynchronizer(null);
            if (this.dataSources.length === 0) {
                await this.reset();
            }
            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, remove DataSource ${dataSource.id} as it`);
            } else {
                return this.synchronizerWorker.postMessageWithAck({
                    message: 'remove',
                    dataSourceIds: [dataSource.getId()],
                }).then(() => {
                    this.onRemovedDataSource(dataSource.id);
                });
            }
        }
    }

    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    async push(dataSourceId, data) {
        if (this.synchronizerWorker !== null) {
            return this.synchronizerWorker.postMessageWithAck({
                type: 'data',
                dataSourceId: dataSourceId,
                data: data
            });
        }
    }

    version() {
        return this.properties.version;
    }

    /**
     * Connects all dataSources
     */
    async connect() {
        await this.checkInit();
        return this.doConnect();
    }

    async checkInit() {
        if (!isDefined(this.init)) {
            this.init = this.initDataSources();
        }
        return this.init;
    }

    async doConnect() {
        for (let dataSource of this.dataSources) {
            await dataSource.connect();
        }
        return this.synchronizerWorker.postMessageWithAck({
            message: 'connect',
            version: this.version()
        });
    }

    /**
     * Disconnects all dataSources
     */
    async disconnect() {
        console.log('disconnect')
        await this.reset();
        const promises = [];
        for (let dataSource of this.dataSources) {
            promises.push(dataSource.disconnect());
        }
        return Promise.all(promises);
    }

    async updateProperties(properties) {
        for (let ds of this.dataSources) {
            ds.updateProperties(properties);
        }
    }

    /**
     * Resets reference time
     */
    async reset() {
        await this.checkInit();
        return this.synchronizerWorker.postMessageWithAck({
            message: 'reset'
        });
    }

    async getCurrentTime() {
        return this.synchronizerWorker.postMessageWithAck({
            message: 'current-time'
        });
    }

    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    async isConnected() {
        if (this.dataSources.length === 0) {
            return false;
        } else {
            await this.checkInit();
            return this.synchronizerWorker.postMessageWithAck({
                message: 'is-connected'
            }).then((message) => message.data);
        }
    }

    setMinTime(minTime) {
    }

    setMaxTime(maxTime) {
    }

    incVersion() {
        this.properties.version++;
    }

    onTimeChanged(start, min) {
    }

    onRemovedDataSource(dataSourceId) {
    }

    onAddedDataSource(dataSourceId) {
    }
}

export default DataSynchronizerRealtime;
