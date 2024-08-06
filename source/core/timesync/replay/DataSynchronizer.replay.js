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
import WorkerExt from "../../worker/WorkerExt";

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
        this.dataSources = (properties.dataSources) ? [...properties.dataSources] : [];
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

        if (isDefined(properties)) {
            if (isDefined(properties.minTime)) {
                this.minTimestamp = new Date(properties.minTime).getTime();
            }
            if (isDefined(properties.maxTime)) {
                this.maxTimestamp = new Date(properties.maxTime).getTime();
            }
        }
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
            // default min/max will be adjusted on the most min/max DataSource
            for (let ds of this.dataSources) {
                // compute min/max range of dataSynchronizer
                let dsMinTimestamp = ds.getMinTimeAsTimestamp();
                let dsMaxTimestamp = ds.getMaxTimeAsTimestamp();

                if (dsMinTimestamp < minTimestamp) {
                    minTimestamp = dsMinTimestamp;
                }

                if (dsMaxTimestamp > maxTimestamp) {
                    maxTimestamp = dsMaxTimestamp;
                }
            }

            // check if a default Min/Max has been defined into DataSynchronizer forcing intersection with current computed ones
            if (isDefined(this.minTimestamp) && this.minTimestamp > minTimestamp) {
                // intersect and takes the min of dataSynchronizer
                minTimestamp = this.minTimestamp;
            }

            if (isDefined(this.maxTimestamp) && this.maxTimestamp > maxTimestamp) {
                // intersect and takes the min of dataSynchronizer
                maxTimestamp = this.maxTimestamp;
            }

            this.properties.minTimestamp = minTimestamp;
            this.properties.maxTimestamp = maxTimestamp;
        } else {
            const st = new Date('1970-01-01T00:00:00Z').getTime();
            const end = new Date('2055-01-01T00:00:00Z').getTime();
            this.properties.minTimestamp = this.properties.startTimestamp = st;
            this.properties.maxTimestamp = this.properties.endTimestamp = end;
        }

        if(this.properties.startTimestamp < this.properties.minTimestamp || this.properties.startTimestamp > this.properties.maxTimestamp) {
            this.properties.startTimestamp = this.properties.minTimestamp;
        }
        if(this.properties.endTimestamp > this.properties.maxTimestamp || this.properties.endTimestamp < this.properties.minTimestamp) {
            this.properties.endTimestamp = this.properties.maxTimestamp;
        }
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getStartTimeAsIsoDate() {
        if (this.properties.startTimestamp) {
            return new Date(this.properties.startTimestamp).toISOString();
        } else {
            return this.getMinTimeAsIsoDate();
        }
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getStartTimeAsTimestamp() {
        return this.properties.startTimestamp;
    }

    /**
     * Gets the endTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getEndTimeAsIsoDate() {
        if (this.properties.endTimestamp) {
            return new Date(this.properties.endTimestamp).toISOString();
        } else {
            return this.getMaxTimeAsIsoDate();
        }
    }

    getEndTimeAsTimestamp() {
        return this.properties.endTimestamp;
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getMinTimeAsIsoDate() {
        return new Date(this.properties.minTimestamp).toISOString();
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getMinTimeAsTimestamp() {
        return this.properties.minTimestamp;
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getMaxTimeAsIsoDate() {
        return new Date(this.properties.maxTimestamp).toISOString();
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as unix timestamp
     */
    getMaxTimeAsTimestamp() {
        return this.properties.maxTimestamp;
    }


    async setStartTime(time, lazy = false) {
        this.properties.startTimestamp = new Date(time).getTime();
        if (!lazy) {
            await this.updateAlgo();
        }
    }

    async setEndTime(time, lazy = false) {
        this.properties.endTimestamp = new Date(time).getTime();
        if (!lazy) {
            await this.updateAlgo();
        }
    }

    async setMinTime(minTime, resetStartTime = false) {
        this.minTimestamp = new Date(minTime).getTime();
        this.computeMinMax();
        this.timeChanged();
    }

    async setMaxTime(maxTime, resetStartTime = false) {
        this.maxTimestamp = new Date(maxTime).getTime();
        this.computeMinMax();
        this.timeChanged();
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
        if (isDefined(this.synchronizerWorker)) {
            this.synchronizerWorker.terminate();
            this.synchronizerWorker = null;
        }
        for (let dataSource of this.dataSources) {
            dataSource.terminate();
        }
    }

    getMode() {
        return Mode.REPLAY;
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
            }).then(() => {
                this.initialized = true;
            });
        } catch (error) {
            console.error(error);
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
        if(!this.dataSources.map(ds => ds.id).includes(dataSource.id)) {
            this.dataSources.push(dataSource);
            this.computeMinMax();
            console.log('time changed');
            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, add DataSource ${dataSource.id} as it`);
                this.timeChanged();
                this.onAddedDataSource(dataSource.id);
                return new Promise((resolve, reject) => {
                    resolve();
                });
            } else {
                dataSource.setStartTime(this.getStartTimeAsIsoDate());
                dataSource.setEndTime(this.getEndTimeAsIsoDate());
                const dataSourceForWorker = await this.createDataSourceForWorker(dataSource);

                // add dataSource to synchronizer algorithm
                return this.synchronizerWorker.postMessageWithAck({
                    message: 'add',
                    dataSources: [dataSourceForWorker],
                    startTimestamp: this.getStartTimeAsTimestamp(),
                    endTimestamp: this.getEndTimeAsTimestamp()
                }).then(async () => {
                    if (!await this.isConnected()) {
                        await dataSource.connect()
                    }
                    this.onAddedDataSource(dataSource.id);
                    this.timeChanged();
                });
            }
        }
    }

    /**
     * Removes a DataSource object from the list of datasources of the synchronizer.
     * @param {TimeSeriesDatasource} dataSource - the new datasource to add
     */
    async removeDataSource(dataSource) {
        if(this.dataSources.map(ds => ds.id).includes(dataSource.id)) {
            this.dataSources = this.dataSources.filter(elt => elt.id !== dataSource.getId());

            if (!this.initialized) {
                console.log(`DataSynchronizer not initialized yet, remove DataSource ${dataSource.id} as it`);
                await dataSource.removeDataSynchronizer();
                this.timeChanged();
                this.onRemovedDataSource(dataSource.id);
            } else {
                if (this.dataSources.length === 0) {
                    await this.reset();
                }
                this.computeMinMax();
                await dataSource.disconnect();
                await dataSource.removeDataSynchronizer();
                // if any
                dataSource.destroyTimeUpdater();

                return this.synchronizerWorker.postMessageWithAck({
                    message: 'remove',
                    dataSourceIds: [dataSource.getId()],
                    startTimestamp: this.getStartTimeAsTimestamp(),
                    endTimestamp: this.getEndTimeAsTimestamp()
                }).then(async () => {
                    await this.disconnect();
                    this.timeChanged();
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
        if (this.synchronizerWorker) {
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
        if (this.dataSources.length > 0) {
            return this.checkInit().then(async () => {
                const isConnected = await this.isConnected();
                return isConnected? isConnected : this.doConnect();
            });
        }
    }

    async checkInit() {
        if (!isDefined(this.init)) {
            this.init = this.initDataSources();
        }
        return this.init;
    }

    checkStartEndTime() {
        if (!this.properties.startTimestamp) {
            this.properties.startTimestamp = this.properties.minTimestamp;
        }
        if (!this.properties.endTimestamp) {
            this.properties.endTimestamp = this.properties.maxTimestamp;
        }
    }

    async doConnect() {

        this.checkStartEndTime();
        await this.updateAlgo();
        for (let dataSource of this.dataSources) {
            await dataSource.setTimeRange(this.getStartTimeAsIsoDate(), this.getEndTimeAsIsoDate(), this.getReplaySpeed(), true);
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
        await this.reset();
        const promises = [];
        for (let dataSource of this.dataSources) {
            promises.push(dataSource.disconnect());
        }
        return Promise.all(promises);
    }

    /**
     * Sets the replaySpeed
     */
    async setReplaySpeed(replaySpeed) {
        this.replaySpeed = replaySpeed;
        this.properties.replaySpeed = replaySpeed;
        return this.synchronizerWorker.postMessageWithAck({
            message: 'replay-speed',
            replaySpeed: replaySpeed,
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
        await this.disconnect();
        this.incVersion();
        // update properties of DataSynchronizer
        this.replaySpeed = replaySpeed;

        await this.setStartTime(startTime, false);
        await this.setEndTime(endTime, false);

        const promises = [];
        // update properties of each DataSource
        for (let ds of this.dataSources) {
            promises.push(ds.setTimeRange(
                this.getStartTimeAsIsoDate(),
                this.getEndTimeAsIsoDate(),
                this.getReplaySpeed(),
                false,
                this.getMode(),
                this.version()
            ));
        }
        return Promise.all(promises);
    }

    setStartTimestamp(timestamp){
        this.properties.startTimestamp = timestamp;
    }

    async updateAlgo() {
        // synchronize startTimestamp of synchronizer to datasources
        for (let dataSource of this.dataSources) {
            dataSource.setStartTimestamp(this.getStartTimeAsTimestamp());
            dataSource.setEndTimestamp(this.getEndTimeAsTimestamp());
        }
        // re-compute new min/max of synchronizer
        this.computeMinMax();
        // provide new min/max of each dataSource to dataSynchronizer
        const dataSourcesForWorker = [];
        for (let dataSource of this.dataSources) {
            const obj = {
                bufferingTime: dataSource.properties.bufferingTime || 0,
                timeOut: dataSource.properties.timeOut || 0,
                id: dataSource.getId(),
                name: dataSource.getName(),
                minTimestamp: dataSource.getMinTimeAsTimestamp(),
                maxTimestamp: dataSource.getMaxTimeAsTimestamp()
            };
            dataSourcesForWorker.push(obj);
        }

        return this.synchronizerWorker.postMessageWithAck({
            message: 'time-range',
            mode: this.getMode(),
            replaySpeed: this.getReplaySpeed(),
            startTimestamp: this.getStartTimeAsTimestamp(),
            endTimestamp: this.getEndTimeAsTimestamp(),
            version: this.version(),
            dataSources: dataSourcesForWorker
        });
    }

    async updateProperties(properties) {
        const promises = [];
        for (let ds of this.dataSources) {
            promises.push(ds.updateProperties(properties));
        }
        return Promise.all(promises);
    }

    resetTimes() {
        this.computeMinMax();
    }

    /**
     * Resets reference time
     */
    async reset() {
        if(isDefined(this.synchronizerWorker)) {
            await this.checkInit();
            return this.synchronizerWorker.postMessageWithAck({
                message: 'reset'
            }).then(() => this.resetTimes());
        } else return this.checkInit();
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
            }).then(v => v.data);
        }
    }

    incVersion() {
        this.properties.version++;
    }

    async autoUpdateTime(activate) {
        const promises = [];
        for (let ds of this.dataSources) {
            promises.push(ds.autoUpdateTime(activate));
        }
        return Promise.all(promises);
    }

    onTimeChanged(min, max, start, end) {
    }

    onRemovedDataSource(dataSourceId) {
    }

    onAddedDataSource(dataSourceId) {
    }
}

export default DataSynchronizerReplay;
