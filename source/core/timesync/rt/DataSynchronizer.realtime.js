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
        this.dataSources = properties.dataSources || [];
        this.timerResolution = properties.timerResolution || 5;
        this.masterTimeRefreshRate = properties.masterTimeRefreshRate || 250;
        this.initialized = false;
        this.timeSync = timeSync;
        this.properties = {};
        this.properties.version = 0;

        this.eventSubscriptionMap = {};
        this.messagesMap = {};
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

    /**
     * @private
     */
    initEventSubscription() {
        // listen for Events to callback to subscriptions
        new BroadcastChannel(this.getTopicId()).onmessage = (message) => {
            const type = message.data.type;
            if (type in this.eventSubscriptionMap) {
                for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                    this.eventSubscriptionMap[type][i](message.data);
                }
            }
        };

        new BroadcastChannel(this.getTimeTopicId()).onmessage = (message) => {
            const type = message.data.type;
            if (type in this.eventSubscriptionMap) {
                for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                    this.eventSubscriptionMap[type][i](message.data);
                }
            }
        };
    }

    /**
     * Terminate the corresponding running WebWorker by calling terminate() on it.
     */
    terminate() {
        if (this.synchronizerWorker !== null) {
            this.synchronizerWorker.terminate();
            this.synchronizerWorker = null;
        }
        for (let dataSource of this.dataSources) {
            dataSource.terminate();
        }
    }

    subscribe(fn, eventTypes) {
        // associate function to eventType
        for (let i = 0; i < eventTypes.length; i++) {
            if (!(eventTypes[i] in this.eventSubscriptionMap)) {
                this.eventSubscriptionMap[eventTypes[i]] = [];
            }
            this.eventSubscriptionMap[eventTypes[i]].push(fn);
        }
    }

    getMode() {
        return Mode.REAL_TIME;
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    async initDataSources() {
        return new Promise(async (resolve, reject) => {
            try {
                const dataSourcesForWorker = [];
                for (let dataSource of this.dataSources) {
                    const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);
                    dataSourcesForWorker.push(dataSourceForWorker);
                }
                this.synchronizerWorker = new DataSynchronizerWorker();
                this.handleWorkerMessage();
                await this.postMessage({
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
                }, function () {
                    this.initEventSubscription();
                    this.initialized = true;
                    resolve();
                }.bind(this), false);
            } catch (error) {
                console.log(error)
                reject(error);
            }
        });
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
        try {
            await dataSource.setDataSynchronizer(this.timeSync);
        } catch (ex) {
            console.error("Cannot set the synchronizer to this DataSource", ex);
            throw ex;
        }
        return obj;
    }

    /**
     * Adds a new DataSource object to the list of datasources to synchronize.
     * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
     * @param {TimeSeriesDataSource} dataSource - the new datasource to add
     */
    async addDataSource(dataSource) {
        return new Promise(async resolve => {
            this.dataSources.push(dataSource);
            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, add DataSource ${dataSource.id} as it`);
                resolve();
            } else {
                const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);
                // add dataSource to synchronizer algorithm
                await this.postMessage({
                    message: 'add',
                    dataSources: [dataSourceForWorker]
                }, async () => {
                    this.onAddedDataSource(dataSource.id);
                    resolve();
                });
            }
        });
    }

    /**
     * Removes a DataSource object from the list of datasources of the synchronizer.
     * @param {TimeSeriesDatasource} dataSource - the new datasource to add
     */
    async removeDataSource(dataSource) {
        return new Promise(async resolve => {
            await dataSource.removeDataSynchronizer();
            this.dataSources = this.dataSources.filter(elt => elt.id !== dataSource.getId());
            if(this.dataSources.length === 0) {
                await this.reset();
            }
            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, remove DataSource ${dataSource.id} as it`);
                resolve();
            } else {
                await this.postMessage({
                    message: 'remove',
                    dataSourceIds: [dataSource.getId()],
                }, async () => {
                    this.onRemovedDataSource(dataSource.id);
                    resolve();
                });
            }
        });
    }

    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    async push(dataSourceId, data) {
        return new Promise(async (resolve, reject) => {
            if (this.synchronizerWorker !== null) {
                await this.postMessage({
                    type: 'data',
                    dataSourceId: dataSourceId,
                    data: data
                }, resolve);
            }
        });
    }

    version() {
        return this.properties.version;
    }
    /**
     * Connects all dataSources
     */
    async connect() {
        await this.checkInit();
        await this.doConnect();
    }

    async checkInit() {
        const that = this;
        return new Promise(async (resolve, reject) => {
            if (!isDefined(that.init)) {
                that.init = that.initDataSources();
            }
            await that.init;
            resolve();
        });
    }

    async doConnect() {
        return new Promise(async resolve => {
            for (let dataSource of this.dataSources) {
                await dataSource.connect();
            }
            await this.postMessage({
                message: 'connect',
                version: this.version()
            }, resolve);
        });
    }

    /**
     * Disconnects all dataSources
     */
    async disconnect() {
        await this.reset();
        for (let dataSource of this.dataSources) {
            await dataSource.disconnect();
        }
        console.log('Has disconnected')
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
        return new Promise(async resolve => {
            await this.checkInit();
            await this.postMessage({
                message: 'reset'
            });
            resolve();
        });
    }

    async getCurrentTime() {
        return new Promise(async resolve => {
            await this.postMessage({
                message: 'current-time'
            }, resolve);
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
            return new Promise(async resolve => {
                await this.postMessage({
                    message: 'is-connected'
                }, (message) => resolve(message.data));
            });
        }
    }

    setMinTime(minTime) {}
    setMaxTime(maxTime) {}

    async postMessage(props, Fn, checkInit = true) {
        if (checkInit) {
            await this.checkInit();
        }
        const messageId = randomUUID();
        this.synchronizerWorker.postMessage({
            ...props,
            messageId: messageId
        });
        if (isDefined(Fn)) {
            this.messagesMap[messageId] = Fn;
        }
    }

    handleWorkerMessage() {
        this.synchronizerWorker.onmessage = (event) => {
            const id = event.data.messageId;
            if (id in this.messagesMap) {
                this.messagesMap[id](event.data.data);
                delete this.messagesMap[id];
            }
        }
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