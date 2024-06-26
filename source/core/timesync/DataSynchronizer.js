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

import {Mode} from "../datasource/Mode";
import DataSynchronizerReplay from "./replay/DataSynchronizer.replay";
import DataSynchronizerRealtime from "./rt/DataSynchronizer.realtime";
import {randomUUID} from "../utils/Utils";
import {EventType} from "../event/EventType";

class DataSynchronizer {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {String} [properties.id=randomUUID] - id of the dataSynchronizer or random if not provided
     * @param {Number} [properties.replaySpeed=1] - replaySpeed value
     * @param {Number} [properties.timerResolution=5] - interval in which data is played (in milliseconds)
     * @param {Number} [properties.masterTimeRefreshRate=250] - interval in which time value is send through broadcast channel (in milliseconds)
     * @param {Number} [properties.mode=Mode.REPLAY] - mode of the data synchronizer
     * @param {String} properties.startTime - start time of the temporal run
     * @param {String} properties.endTime - end time of the temporal run
     * @param {Datasource[]} properties.dataSources - the dataSource array
     */
    constructor(properties) {
        const id = properties.id || randomUUID();
        this.dataSynchronizerReplay = new DataSynchronizerReplay({
            ...properties,
            id: id+'-replay'
        }, this);
        this.dataSynchronizerRt = new DataSynchronizerRealtime({
            ...properties,
            id: id+'-realtime'
        }, this);
        this.broadcastChannels = [];
        this.setMode(properties.mode || Mode.REPLAY, false).then(() => {
            this.dataSynchronizer.onTimeChanged = (min, max, start, end) => this.onTimeChanged(min, max, start, end);
            this.dataSynchronizer.onAddedDataSource = (dataSourceId) => this.onAddedDataSource(dataSourceId);
            this.dataSynchronizer.onRemovedDataSource = (dataSourceId) => this.onRemovedDataSource(dataSourceId);
        });
    }

    getId() {
        return this.id;
    }

    async setMode(mode, disconnect = true) {
        if (this.dataSynchronizer && disconnect) {
            await this.dataSynchronizer.disconnect();
        }
        if (mode === Mode.REPLAY) {
            this.dataSynchronizer = this.dataSynchronizerReplay;

        } else if (mode === Mode.REAL_TIME) {
            this.dataSynchronizer = this.dataSynchronizerRt;
        }
        this.id = this.dataSynchronizer.id;
        for(let bc of this.broadcastChannels) {
            bc.close();
        }
        this.initEventSubscription();
        this.broadcastChannels = [];
        const promises=[];
        for(let ds of this.dataSynchronizer.getDataSources()) {
            promises.push(ds.setMode(mode, disconnect));
        }
        this.dataSynchronizer.onTimeChanged = (min, max, start, end) => this.onTimeChanged(min, max, start, end);
        this.dataSynchronizer.onAddedDataSource = (dataSourceId) => this.onAddedDataSource(dataSourceId);
        this.dataSynchronizer.onRemovedDataSource = (dataSourceId) => this.onRemovedDataSource(dataSourceId);

        return Promise.all(promises).then(() => this.onChangedMode(mode));
    }

    initEventSubscription() {
        this.eventSubscriptionMap = {};
        // listen for Events to callback to subscriptions
        this.broadcastChannels.push(new BroadcastChannel(this.getTopicId()).onmessage = (message) => {
            const type = message.data.type;
            if (type in this.eventSubscriptionMap) {
                for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                    this.eventSubscriptionMap[type][i](message.data);
                }
            }
        });

        this.broadcastChannels.push(new BroadcastChannel(this.getTimeTopicId()).onmessage = (message) => {
            if (message.data.type === EventType.MASTER_TIME) {
                // this.properties.startTimestamp = message.data.timestamp; // save as last timestamp
                this.dataSynchronizer.setStartTimestamp(message.data.timestamp);
            }
            const type = message.data.type;
            if (type in this.eventSubscriptionMap) {
                for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                    this.eventSubscriptionMap[type][i](message.data);
                }
            }
        });
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

    getDataSources() {
        return this.dataSynchronizer.getDataSources();
    }
    getTopicId() {
        return this.dataSynchronizer.getTopicId();
    }

    getTimeTopicId() {
        return this.dataSynchronizer.getTimeTopicId();
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getStartTimeAsIsoDate() {
        return this.dataSynchronizer.getStartTimeAsIsoDate();
    }

    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getStartTimeAsTimestamp() {
        return this.dataSynchronizer.getStartTimeAsTimestamp();
    }

    /**
     * Gets the endTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getEndTimeAsIsoDate() {
        return this.dataSynchronizer.getEndTimeAsIsoDate();
    }

    getEndTimeAsTimestamp() {
        return this.dataSynchronizer.getEndTimeAsTimestamp();
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    getMinTimeAsIsoDate() {
        return this.dataSynchronizer.getMinTimeAsIsoDate();
    }

    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as unix timestamp
     */
    getMinTimeAsTimestamp() {
        return this.dataSynchronizer.getMinTimeAsTimestamp();
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    getMaxTimeAsIsoDate() {
        return this.dataSynchronizer.getMinTimeAsTimestamp();
    }

    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as unix timestamp
     */
    getMaxTimeAsTimestamp() {
        return this.dataSynchronizer.getMaxTimeAsTimestamp();
    }

    /**
     * Gets the replaySpeed
     * @returns {Number} - the replay speed
     */
    getReplaySpeed() {
        return this.dataSynchronizer.getReplaySpeed();
    }

    /**
     * Terminate the corresponding running WebWorker by calling terminate() on it.
     */
    terminate() {
        if(this.dataSynchronizer) {
            return this.dataSynchronizer.terminate();
        }
    }

    getMode() {
        return this.dataSynchronizer.getMode();
    }

    async autoUpdateTime(activate) {
        return this.dataSynchronizerReplay.autoUpdateTime(activate);
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    async initDataSources() {
        return this.dataSynchronizer.initDataSources();
    }

    /**
     * Adds a new DataSource object to the list of datasources to synchronize.
     * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
     * @param {TimeSeriesDataSource} dataSource - the new datasource to add
     */
    async addDataSource(dataSource) {
        this.dataSynchronizerRt.addDataSource(dataSource);
        return this.dataSynchronizerReplay.addDataSource(dataSource);
    }

    /**
     * Removes a DataSource object from the list of datasources of the synchronizer.
     * @param {TimeSeriesDatasource} dataSource - the new datasource to add
     */
    async removeDataSource(dataSource) {
        await this.dataSynchronizerRt.removeDataSource(dataSource);
        return this.dataSynchronizerReplay.removeDataSource(dataSource)
    }

    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    async push(dataSourceId, data) {
        return this.dataSynchronizer.push(dataSourceId, data);
    }

    version() {
        return this.dataSynchronizer.version()
    }
    /**
     * Connects all dataSources
     */
    async connect() {
        return this.dataSynchronizer.connect()
    }

    async checkInit() {
        return this.dataSynchronizer.checkInit()
    }

    async doConnect() {
        return this.dataSynchronizer.doConnect()
    }

    /**
     * Disconnects all dataSources
     */
    async disconnect() {
        return this.dataSynchronizer.disconnect()
    }

    /**
     * Sets the replaySpeed
     */
    async setReplaySpeed(replaySpeed) {
        return this.dataSynchronizer.setReplaySpeed(replaySpeed)
    }

    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     */
    async setTimeRange(startTime = this.getStartTimeAsIsoDate(),
                       endTime = this.getEndTimeAsIsoDate(),
                       replaySpeed = this.getReplaySpeed(),
                       reconnect = false) {
        return this.dataSynchronizer.setTimeRange(startTime,endTime, replaySpeed,reconnect);
    }

    async updateProperties(properties) {
        return this.dataSynchronizer.updateProperties(properties);
    }

    /**
     * Resets reference time
     */
    async reset() {
        return this.dataSynchronizer.reset();
    }

    async getCurrentTime() {
        return this.dataSynchronizer.getCurrentTime();
    }

    setMinTime(minTime) {
        this.dataSynchronizer.setMinTime(minTime);
    }

    setMaxTime(maxTime) {
        this.dataSynchronizer.setMaxTime(maxTime);
    }

        /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    async isConnected() {
        return this.dataSynchronizer.isConnected();
    }

    minMaxChanged(resetStartTimestamp = false) {
        if(resetStartTimestamp) {
            this.dataSynchronizerReplay.properties.startTimestamp = undefined;
            this.dataSynchronizerReplay.properties.endTimestamp = undefined;
        }
        this.dataSynchronizerReplay.computeMinMax();
        this.dataSynchronizerReplay.timeChanged();
    }
    onTimeChanged(start, min) {
    }

    onRemovedDataSource(dataSourceId) {
    }

    onAddedDataSource(dataSourceId) {
    }

    onChangedMode(mode) {}
}

export default DataSynchronizer;
