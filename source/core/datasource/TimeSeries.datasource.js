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

import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_TIME_TOPIC} from "../Constants";
import {assertDefined, isDefined} from "../utils/Utils";
import DataSource from "./DataSource.datasource";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class TimeSeriesDatasource extends DataSource {
    constructor(name, properties) {
        super(name, properties);

        assertDefined(properties,'Some properties must be defined');
        this.dataSynchronizer = undefined;
    }

    getTimeTopicId() {
        return DATASOURCE_TIME_TOPIC + this.id;
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getStartTime() {
        return this.properties.startTime;
    }
    /**
     * Gets the mode
     * @returns {Mode} - Datasource mode
     */
    getMode() {
        return this.properties.mode;
    }
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getEndTime() {
        return this.properties.endTime;
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getMinTime() {
        return this.properties.minTime;
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getMaxTime() {
        return this.properties.maxTime;
    }

    /**
     * Sets the min time
     */
    setMinTime(time) {
        this.properties.minTime = time;
    }

    /**
     * Sets the max time
     */
    setMaxTime(time) {
        this.properties.maxTime = time;
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getReplaySpeed() {
        return this.properties.replaySpeed;
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    setReplaySpeed(replaySpeed) {
        this.properties.replaySpeed = replaySpeed;
    }
    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    /**
     * @private
     * @param dataSynchronizer
     * @returns {Promise}
     */
    async setDataSynchronizer(dataSynchronizer) {
        return new Promise(async (resolve, reject) => {
            await this.checkInit();
            const topic = DATA_SYNCHRONIZER_TOPIC + dataSynchronizer.id;
            this.dataSynchronizer = dataSynchronizer;
            this.postMessage({
                message: 'topics',
                topics: {
                    data: topic,
                    time: this.getTimeTopicId(),
                    sync: dataSynchronizer.getTimeTopicId()
                },
            }, resolve);
        });
    }

    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    async disconnect() {
        return new Promise(async resolve => {
            await this.checkInit();
            this.postMessage({
                message: 'disconnect'
            }, resolve);
        });
    }

    async doConnect() {
        return new Promise(async resolve => {
            let startTime = this.properties.startTime;
            if(isDefined(this.dataSynchronizer)) {
                let st = (await this.dataSynchronizer.getCurrentTime()).data; // add 1 sec threshold
                if(isDefined(st)) {
                    startTime = new Date(st).toISOString();
                }
            }
            this.postMessage({
                message: 'connect',
                startTime: startTime
            }, resolve);
        });
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    async initDataSource(properties) {
        await super.initDataSource(properties);
        return new Promise(async (resolve, reject) => {
            this.postMessage({
                message: 'topics',
                topics:  {
                    data: this.getTopicId(),
                    time: this.getTimeTopicId()
                },
            }, async () => {
                // listen for Events to callback to subscriptions
                const datasourceBroadcastChannel = new BroadcastChannel(this.getTimeTopicId());
                datasourceBroadcastChannel.onmessage = async (message) => {
                     await this.handleTimeMessage(message);
                };
                resolve();
            });
        });
    }

    async handleTimeMessage(message) {
        const type = message.data.type;
        if (type in this.eventSubscriptionMap) {
            for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                this.eventSubscriptionMap[type][i](message.data);
            }
        }
    }

    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     * @param {Mode} mode - default dataSource mode
     */
    async setTimeRange(startTime= this.getStartTime(),
                       endTime= this.getEndTime(),
                       replaySpeed= this.getReplaySpeed(),
                       reconnect= false,
                       mode= this.getMode()) {
        return this.updateProperties({
            startTime: startTime,
            endTime: endTime,
            replaySpeed: replaySpeed,
            reconnect : reconnect,
            mode: mode
        });
    }
}

export default TimeSeriesDatasource;
