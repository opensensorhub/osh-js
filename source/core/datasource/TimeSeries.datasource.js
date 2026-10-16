/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {Mode} from './Mode';
import TimeSeriesRealtimeDatasource from "./TimeSeries.realtime.datasource";
import TimeSeriesReplayDatasource from "./TimeSeries.replay.datasource";
import {isDefined, randomUUID} from "../utils/Utils";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class TimeSeriesDatasource {
    constructor(name, properties) {
        const id = randomUUID();
        this.timeSeriesRealtimeDataSource = new TimeSeriesRealtimeDatasource(name,{
            id: id,
            ...properties
        });
        this.timeSeriesReplayDataSource = new TimeSeriesReplayDatasource(name,{
            id: id,
            ...properties
        });

        this.setMode(properties.mode, false);
    }

    async setMode(mode, disconnect = true) {
        if (disconnect && this.timeSeriesDataSource) {
            await this.timeSeriesDataSource.disconnect();
        }

        if (!this.timeSeriesDataSource || mode !== this.timeSeriesDataSource.getMode()) {
            if (mode === Mode.REAL_TIME) {
                this.timeSeriesDataSource = this.timeSeriesRealtimeDataSource;
            } else {
                this.timeSeriesDataSource = this.timeSeriesReplayDataSource;
            }

            this.timeSeriesDataSource.resetInit();


            // bind properties
            this.properties = this.timeSeriesDataSource.properties;
            this.id = this.timeSeriesDataSource.id;
            this.name = this.timeSeriesDataSource.name;
            this.properties.mode = mode;
            return this.timeSeriesDataSource.initDataSynchronizerIfPresent();

        }
    }

    getTimeTopicId() {
        return this.timeSeriesDataSource.getTimeTopicId();
    }

    /**
     * Gets the mode
     * @returns {Mode} - Datasource mode
     */
    getMode() {
        return this.timeSeriesDataSource.getMode();
    }

    setVersion(version) {
        this.timeSeriesDataSource.setVersion(version);
    }
    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getStartTimeAsIsoDate() {
        return this.timeSeriesDataSource.getStartTimeAsIsoDate();
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as unix timestamp
     */
    getStartTimeAsTimestamp() {
        return this.timeSeriesDataSource.getStartTimeAsTimestamp();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getEndTimeAsIsoDate() {
        return this.timeSeriesDataSource.getEndTimeAsIsoDate();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as unix timestamp
     */
    getEndTimeAsTimestamp() {
        return this.timeSeriesDataSource.getEndTimeAsTimestamp();
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getMinTimeAsIsoDate() {
        return this.timeSeriesDataSource.getMinTimeAsIsoDate();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getMaxTimeAsIsoDate() {
        return this.timeSeriesDataSource.getMaxTimeAsIsoDate();
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as unix timestamp
     */
    getMinTimeAsTimestamp() {
        return this.timeSeriesDataSource.getMinTimeAsTimestamp();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as unix timestamp
     */
    getMaxTimeAsTimestamp() {
        return this.timeSeriesDataSource.getMaxTimeAsTimestamp();
    }

    /**
     * Sets the min time
     */
    setMinTime(time) {
        this.timeSeriesDataSource.setMinTime(time);
    }

    /**
     * Sets the max time
     */
    setMaxTime(time) {
        this.timeSeriesDataSource.setMaxTime(time);
    }

    /**
     * Sets the start time
     */
    setStartTimestamp(timestamp) {
        this.timeSeriesDataSource.setStartTimestamp(timestamp);
    }

    /**
     * Sets the end time
     */
    setEndTimestamp(timestamp) {
        this.timeSeriesDataSource.setEndTimestamp(timestamp);
    }

    /**
     * Sets the start time
     */
    setStartTime(time) {
        this.timeSeriesDataSource.setStartTime(time);
    }

    /**
     * Sets the end time
     */
    setEndTime(time) {
        this.timeSeriesDataSource.setEndTime(time);
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getReplaySpeed() {
        return this.timeSeriesDataSource.getReplaySpeed();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    setReplaySpeed(replaySpeed) {
        this.timeSeriesDataSource.setReplaySpeed(replaySpeed);
    }
    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    /**
     * @param dataSynchronizer
     * @returns {Promise}
     */
    async setDataSynchronizer(dataSynchronizer) {
        if(isDefined(dataSynchronizer)) {
            await this.setMode(dataSynchronizer.getMode(), false);
        }
        return this.timeSeriesDataSource.setDataSynchronizer(dataSynchronizer);
    }

    getDataSynchronizer() {
        return this.timeSeriesDataSource.dataSynchronizer;
    }

    async removeDataSynchronizer() {
        return this.timeSeriesDataSource.removeDataSynchronizer();

    }
    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    async disconnect() {
        return this.timeSeriesDataSource.disconnect();
    }

    async doConnect() {
        return this.timeSeriesDataSource.doConnect();
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    async initDataSource(properties) {
        return this.timeSeriesDataSource.initDataSource(properties);
    }

    version() {
        return this.timeSeriesDataSource.version();
    }
    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     * @param {Mode} mode - default dataSource mode
     * @param {Number} version - version of data
     */
    async setTimeRange(startTime= this.getStartTimeAsIsoDate(),
                       endTime= this.getEndTimeAsIsoDate(),
                       replaySpeed= this.getReplaySpeed(),
                       reconnect= false,
                       mode= this.getMode(),
                       version = this.version()
                       ) {

        return this.timeSeriesDataSource.setTimeRange(startTime,endTime,replaySpeed,reconnect,mode,version);
    }

    /***********************************/
    /**
     * Gets the datasource id.
     * @return {String} the datasource id
     */
    getId() {
        return this.timeSeriesDataSource.getId();
    }

    /**
     * Gets the datasource name.
     * @return {String} the datasource name
     */
    getName() {
        return this.timeSeriesDataSource.getName();
    }

    terminate() {
        this.timeSeriesDataSource.terminate();
    }

    getTopicId() {
        return this.timeSeriesDataSource.getTopicId();
    }

    subscribe(fn, eventTypes) {
        this.timeSeriesDataSource.subscribe(fn, eventTypes);
    }

    /**
     * Update properties
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    async updateProperties(properties) {
        return this.timeSeriesDataSource.updateProperties(properties);
    }

    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    async connect() {
        return this.timeSeriesDataSource.connect();
    }

    async checkInit() {
        return this.timeSeriesDataSource.checkInit();
    }

    async isConnected() {
        return this.timeSeriesDataSource.isConnected();
    }

    async reset() {
        return this.timeSeriesDataSource.reset();
    }

    onTimeChanged(min, max, start, end) {
    }

    async autoUpdateTime(activate) {
        if(activate) {
            return this.createTimeUpdater();
        } else {
            this.destroyTimeUpdater();
        }
    }

    // abstract
    async createTimeUpdater() {}

    // abstract
    destroyTimeUpdater() {}

}

export default TimeSeriesDatasource;
