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
import DataSource from "./DataSource.datasource";
import {Mode} from './Mode';
import MqttConnector from "../connector/MqttConnector";
import {isDefined} from "../utils/Utils";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
let mqttConnectors = {};

function createSharedMqttConnector(properties, topic) {
    let endpoint = properties.mqttOpts.endpointUrl;

    if (endpoint.endsWith('/')) {
        endpoint = endpoint.substring(0, endpoint.length - 1);
    }

    const tls = (properties.tls) ? 's' : '';
    const url =  'mqtt' + tls + '://' + endpoint;
    if(!(url in mqttConnectors)) {
        mqttConnectors[url] = new MqttConnector(url, properties);
        mqttConnectors[url].initBc();
    } else {
        console.log(`Reuse shared MqttConnector instance for ${url}`);
    }
    return mqttConnectors[url].id;
}

class TimeSeriesRealtimeDatasource extends DataSource {
    constructor(name, properties) {
        super(name, properties);

        this.dataSynchronizer = undefined;
        this.properties.version = 0;

        if(properties.protocol === 'mqtt') {
            this.properties.mqttOpts.bcId = createSharedMqttConnector(properties);
        }
    }

    getTimeTopicId() {
        return DATASOURCE_TIME_TOPIC + this.id;
    }

    /**
     * Gets the mode
     * @returns {Mode} - Datasource mode
     */
    getMode() {
        return Mode.REAL_TIME;
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getStartTimeAsIsoDate() {
        return 'now';
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as unix timestamp
     */
    getStartTimeAsTimestamp() {
        return Date.now();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getEndTimeAsIsoDate() {
        return this.getMaxTimeAsTimestamp();
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as unix timestamp
     */
    getEndTimeAsTimestamp() {
        return this.getMaxTimeAsTimestamp();
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getMinTimeAsIsoDate() {
        return 'now';
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getMaxTimeAsIsoDate() {
        return '2055-01-01Z';
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as unix timestamp
     */
    getMinTimeAsTimestamp() {
        return Date.now(); // or should we use first timestamp of last data received???
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as unix timestamp
     */
    getMaxTimeAsTimestamp() {
        return new Date('2055-01-01Z').toISOString();
    }

    /**
     * Sets the min time
     */
    setMinTime(time) {
    }

    /**
     * Sets the max time
     */
    setMaxTime(time) {
    }

    /**
     * Sets the start time
     */
    setStartTimestamp(timestamp) {
    }

    /**
     * Sets the end time
     */
    setEndTimestamp(timestamp) {
    }

    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getReplaySpeed() {
        return 1.0;
    }

    setReplaySpeed(replaySpeed) {
    }

    setVersion(version) {
        this.properties.version = version;
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    /**
     * @param dataSynchronizer
     * @returns {Promise}
     */
    async setDataSynchronizer(dataSynchronizer) {
        this.dataSynchronizer = dataSynchronizer;
        return this.initDataSynchronizerIfPresent();
    }

    async initDataSynchronizerIfPresent() {
        if(this.dataSynchronizer) {
            await this.checkInit();
            const topic = DATA_SYNCHRONIZER_TOPIC + this.dataSynchronizer.id;
            this.properties.version = this.dataSynchronizer.version();
            return this.getWorker().postMessageWithAck({
                message: 'topics',
                topics: {
                    data: topic,
                    time: this.getTimeTopicId(),
                    mode: Mode.REAL_TIME,
                    sync: this.dataSynchronizer.getTimeTopicId()
                },
                dsId: this.id,
                mode: Mode.REAL_TIME,
            });
        } else {

        }
    }

    async removeDataSynchronizer() {
        if(this.dataSynchronizer) {
            await this.dataSynchronizer.removeDataSource(this);
        }
        this.dataSynchronizer = undefined;
        // remove datasynchronizer
        // restore datasource topic
        this.properties.version = 0;

        return this.getWorker().postMessageWithAck({
            message: 'topics',
            topics: {
                data: this.getTopicId(),
                time: this.getTimeTopicId()
            },
            dsId: this.id,
            mode: Mode.REAL_TIME,
        });
    }

    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    async disconnect() {
        if (isDefined(this.init)) {
            try {
                return this.getWorker().postMessageWithAck({
                    message: 'disconnect',
                    dsId: this.id,
                    mode: Mode.REAL_TIME,
                });
            } catch (ex) {
                console.error(ex);
            }
        }
    }

    async doConnect() {
        await this.checkInit();
        return this.getWorker().postMessageWithAck({
            message: 'connect',
            startTime: 'now',
            version: this.version(),
            dsId: this.id,
            mode: Mode.REAL_TIME,
        });
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    async initDataSource(properties) {
        await super.initDataSource(properties);
        const topics = {
            data: this.getTopicId(),
            time: this.getTimeTopicId()
        };
        if (this.dataSynchronizer) {
            topics.sync = this.dataSynchronizer.getTimeTopicId()
        }

        return this.getWorker().postMessageWithAck({
            message: 'topics',
            topics: topics,
            dsId: this.id,
            mode: Mode.REAL_TIME,
        }).then(() => {
            // listen for Events to callback to subscriptions
            const datasourceBroadcastChannel = new BroadcastChannel(this.getTimeTopicId());
            datasourceBroadcastChannel.onmessage = async (message) => {
                await this.handleTimeMessage(message);
            };
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

    version() {
        return this.properties.version;
    }

    async reset() {
        console.warn(`dataSource ${this.id} has been reset`);
        await super.reset();
        return this.doConnect();
    }
}

export default TimeSeriesRealtimeDatasource;
