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
import DataSynchronizerWorker from './DataSynchronizer.replay.worker.js';
import {DATA_SYNCHRONIZER_TOPIC, TIME_SYNCHRONIZER_TOPIC} from "../../Constants.js";
import {Mode} from "../../datasource/Mode";
import {EventType} from "../../event/EventType";

class DataSynchronizerReplay {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {String} [properties.id=randomUUID] - id of the dataSynchronizer or random if not provided
     * @param {Number} [properties.replaySpeed=1] - replaySpeed value
     * @param {Number} [properties.timerResolution=5] - interval in which data is played (in milliseconds)
     * @param {Number} [properties.masterTimeRefreshRate=250] - interval in which time value is send through broadcast channel (in milliseconds)
     * @param {Number} [properties.mode=Mode.REPLAY] - mode of the data synchronizer
     * @param {String} properties.minTime - min range time as ISO date
     * @param {String} properties.maxTime - max range time as ISO date
     * @param {Datasource[]} properties.dataSources - the dataSource array
     * @param {DataSynchronizer} timeSync - dataSynchronizer
     */
    constructor(properties, timeSync) {
        this.bufferingTime = 1000; // default
        this.id = properties.id || randomUUID();
        this.dataSources = properties.dataSources || [];
        this.replaySpeed = properties.replaySpeed || 1;
        this.timerResolution = properties.timerResolution || 5;
        this.masterTimeRefreshRate = properties.masterTimeRefreshRate || 250;
        this.initialized = false;
        this.timeSync = timeSync;

        this.properties = {};
        this.properties.replaySpeed = this.replaySpeed;
        this.properties.startTimestamp = undefined;
        this.properties.endTimestamp = undefined;
        this.properties.minTimestamp = undefined;
        this.properties.maxTimestamp = undefined;
        this.properties.version = 0;

        if(isDefined(properties)) {
            if(isDefined(properties.minTime)) {
                this.minTimestamp = new Date(properties.minTime).getTime();
            }
            if(isDefined(properties.maxTime)) {
                this.maxTimestamp = new Date(properties.maxTime).getTime();
            }
        }
        this.eventSubscriptionMap = {};
        this.messagesMap = {};

        this.computeMinMax();
    }

    getId() {
        return this.id;
    }
    getTopicId() {
        return DATA_SYNCHRONIZER_TOPIC + this.id;
    }

    getTimeTopicId() {
        return TIME_SYNCHRONIZER_TOPIC + this.id;
    }

    getDataSources() {
        return this.dataSources;
    }

    computeMinMax() {
        if (this.dataSources.length > 0) {
            let minTimestamp = Number.MAX_VALUE, maxTimestamp = Number.MIN_VALUE;
            for (let ds of this.dataSources) {
                let dsMinTimestamp = ds.getMinTimeAsTimestamp();
                let dsMaxTimestamp = ds.getMaxTimeAsTimestamp()

                if (dsMinTimestamp < minTimestamp) {
                    minTimestamp = dsMinTimestamp;
                }

                if (dsMaxTimestamp > maxTimestamp) {
                    maxTimestamp = dsMaxTimestamp;
                }
            }

            // set proper limit
            if(this.minTimestamp && (minTimestamp < this.minTimestamp || minTimestamp > this.maxTimestamp)) {
                minTimestamp = this.minTimestamp;
            }

            if(this.maxTimestamp && (maxTimestamp > this.maxTimestamp || maxTimestamp < this.minTimestamp)) {
                maxTimestamp = this.maxTimestamp;
            }

            this.properties.minTimestamp = minTimestamp;
            this.properties.maxTimestamp = maxTimestamp;

            if (!this.properties.startTimestamp || this.dataSources.length === 1 || this.properties.startTimestamp < this.getMinTimeAsTimestamp()) {
                this.properties.startTimestamp = this.getMinTimeAsTimestamp();
            } else if(this.properties.startTimestamp > this.getMaxTimeAsTimestamp()) {
                this.properties.startTimestamp = this.getMaxTimeAsTimestamp();
            }

            if (!this.properties.endTimestamp || this.dataSources.length === 1 || this.properties.endTimestamp > this.getMaxTimeAsTimestamp()) {
                this.properties.endTimestamp = this.getMaxTimeAsTimestamp();
            } else if(this.properties.endTimestamp < this.getMinTimeAsTimestamp()) {
                this.properties.endTimestamp = this.getMinTimeAsTimestamp();
            }
        }
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
            if (message.data.type === EventType.MASTER_TIME) {
                this.properties.startTimestamp = message.data.timestamp; // save as last timestamp
            }
            const type = message.data.type;
            if (type in this.eventSubscriptionMap) {
                for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                    this.eventSubscriptionMap[type][i](message.data);
                }
            }
        };
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getStartTimeAsIsoDate() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return new Date(this.properties.startTimestamp).toISOString();
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getStartTimeAsTimestamp() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.properties.startTimestamp;
    }

    /**
     * Gets the endTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getEndTimeAsIsoDate() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return new Date(this.properties.endTimestamp).toISOString();
    }

    getEndTimeAsTimestamp() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.properties.endTimestamp;
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getMinTimeAsIsoDate() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return new Date(this.properties.minTimestamp).toISOString();
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getMinTimeAsTimestamp() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.properties.minTimestamp;
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getMaxTimeAsIsoDate() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return new Date(this.properties.maxTimestamp).toISOString();
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as unix timestamp
     */
    getMaxTimeAsTimestamp() {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.properties.maxTimestamp;
    }

    /**
     * Gets the replaySpeed
     * @returns {Number} - the replay speed
     */
    getReplaySpeed() {
        return this.replaySpeed;
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
        return Mode.REPLAY;
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
                    replaySpeed: this.replaySpeed,
                    timerResolution: this.timerResolution,
                    masterTimeRefreshRate: this.masterTimeRefreshRate,
                    startTimestamp: this.getStartTimeAsTimestamp(),
                    endTimestamp: this.getEndTimeAsTimestamp(),
                    mode: this.getMode(),
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
                console.error(error)
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
            id: dataSource.getId(),
            name: dataSource.getName(),
            minTimestamp: dataSource.getMinTimeAsTimestamp(),
            maxTimestamp: dataSource.getMaxTimeAsTimestamp()
        };
        // bind dataSource data onto dataSynchronizer data
        try {
            await dataSource.setDataSynchronizer(this.timeSync);
            dataSource.properties.replaySpeed = this.replaySpeed;
        } catch (ex) {
            console.error("Cannot set the synchronizer to this DataSource", ex);
            throw ex;
        }
        return obj;
    }

    timeChanged() {
        this.onTimeChanged(
            this.getMinTimeAsTimestamp(),
            this.getMaxTimeAsTimestamp(),
            this.getStartTimeAsTimestamp(),
            this.getEndTimeAsTimestamp()
        );
    }

    /**
     * Adds a new DataSource object to the list of datasources to synchronize.
     * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
     * @param {TimeSeriesDataSource} dataSource - the new datasource to add
     */
    async addDataSource(dataSource) {
        return new Promise(async resolve => {
            this.dataSources.push(dataSource);
            this.computeMinMax();
            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, add DataSource ${dataSource.id} as it`);
                this.timeChanged();
                resolve();
            } else {
                const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);
                console.log(this.getStartTimeAsIsoDate())
                await dataSource.setTimeRange(
                    this.getStartTimeAsIsoDate(),
                    this.getEndTimeAsIsoDate(),
                    this.getReplaySpeed(),
                    false,
                    this.getMode(),
                    this.version()
                );

                // add dataSource to synchronizer algorithm
                await this.postMessage({
                    message: 'add',
                    dataSources: [dataSourceForWorker]
                }, async () => {
                    this.onAddedDataSource(dataSource.id);
                    this.timeChanged();
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
            this.dataSources = this.dataSources.filter(elt => elt.id !== dataSource.getId());
            if(this.dataSources.length === 0) {
                await this.reset();
            }
            this.computeMinMax();

            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, remove DataSource ${dataSource.id} as it`);
                this.timeChanged();
                resolve();
            } else {
                // await dataSource.disconnect();
                await dataSource.removeDataSynchronizer();

                await this.postMessage({
                    message: 'remove',
                    dataSourceIds: [dataSource.getId()],
                    startTimestamp: this.getStartTimeAsTimestamp(),
                    endTimestamp: this.getEndTimeAsTimestamp()
                }, async () => {
                    this.timeChanged();
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
        if (this.dataSources.length === 0) {
            return;
        } else {
            console.log('connect replay')
            await this.checkInit();
            if(!(await this.isConnected())) {
                await this.doConnect();
            }
        }
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
    }

    /**
     * Sets the replaySpeed
     */
    async setReplaySpeed(replaySpeed) {
        return new Promise(async resolve => {
            this.replaySpeed = replaySpeed;
            this.properties.replaySpeed = replaySpeed;
            await this.postMessage({
                message: 'replay-speed',
                replaySpeed: replaySpeed,
            }, resolve);
        });
    }

    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     * @param {Mode} mode - default dataSource mode
     */
    async setTimeRange(startTime = this.getStartTimeAsIsoDate(),
                       endTime = this.getEndTimeAsIsoDate(),
                       replaySpeed = this.getReplaySpeed(),
                       reconnect = false) {
        return new Promise(async resolve => {
            this.incVersion();

            // compute intersection
            let stTimestamp = new Date(startTime).getTime();
            let endTimestamp = new Date(endTime).getTime();

            // is it in the dataSynchronizer range?
            if (stTimestamp < this.getMinTimeAsTimestamp()) {
                this.properties.startTimestamp = this.getMinTimeAsTimestamp();
            } else if (stTimestamp > this.getMaxTimeAsTimestamp()) {
                this.properties.startTimestamp = this.getMaxTimeAsTimestamp();
            } else {
                this.properties.startTimestamp = stTimestamp;
            }

            if (endTimestamp < this.getMinTimeAsTimestamp()) {
                this.properties.endTimestamp = this.getMinTimeAsTimestamp();
            } else if (endTimestamp > this.getMaxTimeAsTimestamp()) {
                this.properties.endTimestamp = this.getMaxTimeAsTimestamp();
            } else {
                this.properties.endTimestamp = endTimestamp;
            }

            this.replaySpeed = replaySpeed;

            // update Synchronizer Web Worker
            let st = new Date(this.getStartTimeAsTimestamp() + 1000).toISOString();
            let end = this.getEndTimeAsIsoDate();

            this.onTimeChanged(
                this.getMinTimeAsTimestamp(),
                this.getMaxTimeAsTimestamp(),
                this.getStartTimeAsTimestamp(),
                this.getEndTimeAsTimestamp()
            );

            await this.postMessage({
                message: 'time-range',
                mode: this.getMode(),
                replaySpeed: replaySpeed,
                startTimestamp: stTimestamp,
                endTimestamp: this.getEndTimeAsTimestamp(),
                version: this.version()
            }, async () => {
                if (this.dataSources.length > 0) {
                    for (let ds of this.dataSources) {
                        await ds.setTimeRange(st, end, replaySpeed, false, this.getMode(), this.version());
                    }
                }
                resolve();
            });
        });
    }

    async updateProperties(properties) {
        for (let ds of this.dataSources) {
            ds.updateProperties(properties);
        }
    }

    resetTimes() {
        this.computeMinMax();
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
            this.resetTimes();
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

    async setMinTime(minTime) {
        this.minTimestamp = new Date(minTime).getTime();
        this.computeMinMax();
        return new Promise(async resolve => {
            return this.postMessage({
                message: 'time-range',
                mode: this.getMode(),
                replaySpeed: this.getReplaySpeed(),
                startTimestamp: this.getMinTimeAsTimestamp(),
                endTimestamp: this.getMaxTimeAsTimestamp(),
                version: this.version()
            }, () => {
                this.timeChanged();
                resolve();
            });
        });
    }

    async setMaxTime(maxTime) {
        this.maxTimestamp = new Date(maxTime).getTime();
        this.computeMinMax();
        return new Promise(async resolve => {
            return this.postMessage({
                message: 'time-range',
                mode: this.getMode(),
                replaySpeed: this.getReplaySpeed(),
                startTimestamp: this.getMinTimeAsTimestamp(),
                endTimestamp: this.getMaxTimeAsTimestamp(),
                version: this.version()
            }, () => {
                this.timeChanged();
                resolve();
            });
        });
    }
    onTimeChanged(min, max, start, end) {
    }

    onRemovedDataSource(dataSourceId) {
    }

    onAddedDataSource(dataSourceId) {
    }
}

export default DataSynchronizerReplay;
