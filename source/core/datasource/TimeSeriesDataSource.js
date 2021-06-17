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

import DataSource from "./DataSource";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_TIME_TOPIC} from "../Constants";
import {assertDefined, isDefined} from "../utils/Utils";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class TimeSeriesDataSource extends DataSource{
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.bufferingTime=0 - defines the time during the data has to be buffered. Useful only when used with DataSynchronizer
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {String} [properties.minTime=properties.startTime] the min range time (ISO format)
     * @param {String} [properties.maxTime=properties.endTime] the max range time (ISO format)
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Number} [properties.batchSize=1] - the number of data to fetch
     * @param {Object} [properties.customUrlParams={}] - custom parameters appended to the URL as they are
     * @param {Object} worker - DataSource worker
     */
    constructor(name, properties, worker) {
        super(name,properties ,worker);

        assertDefined(properties,'Some properties must be defined');
        assertDefined(properties.startTime,'startTime must must be defined');
        assertDefined(properties.endTime,'startTime must must be defined');

        this.timeSync = null;
    }

    setDataSynchronizer(timeSync) {
        this.timeSync = timeSync;
        this.dataSourceWorker.postMessage({
            message: 'topic',
            topic: DATA_SYNCHRONIZER_TOPIC+this.timeSync.id,
            timeTopic: this.getTimeTopicId()
        });
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    initDataSource(properties) {
        super.initDataSource(properties);
        this.dataSourceWorker.postMessage({
            message: 'topic',
            topic: this.getTopicId(),
            timeTopic: this.getTimeTopicId()
        });
    }

    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     */
    setTimeRange(startTime, endTime, replaySpeed, reconnect= false) {
        let replay = {};
        if(isDefined(replaySpeed)) {
            replay =  {
                replaySpeed: replaySpeed
            }
        }
        this.updateProperties({
            ...this.currentRunningProperties,
            startTime: startTime,
            endTime: endTime,
           ...replay,
            reconnect : reconnect
        });
    }

    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    getStartTime() {
        return this.properties.startTime;
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
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    getReplaySpeed() {
        if(isDefined(this.currentRunningProperties) && isDefined(this.currentRunningProperties.replaySpeed) ){
            return this.currentRunningProperties.replaySpeed;
        } else if(isDefined(this.properties.replaySpeed)){
            return this.properties.replaySpeed;
        } else {
            return 1.0;
        }
    }

    async getCurrentTime() {
        if(isDefined(this.timeSync)) {
            return this.timeSync.getCurrentTime();
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
     * Update properties
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
     * @param {Number} properties.replaySpeed the replay speed
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    updateProperties(properties) {
        super.updateProperties(properties);

    }


    getTimeTopicId() {
        return DATASOURCE_TIME_TOPIC + this.id;
    }
}

export default TimeSeriesDataSource;
