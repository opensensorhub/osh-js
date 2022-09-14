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

import DataSourceHandler from "./DataSource.handler";
import {assertBoolean, assertDefined, assertHasValue, isDefined} from "../../../utils/Utils";
import {EventType} from "../../../event/EventType";
import {Status} from "../../../connector/Status";
import {Mode} from "../../Mode";

class DelegateHandler {
    constructor(context) {
        this.context = context;
    }

    init(properties) {
        this.properties = properties;
    }

    handleData(data) {
    }

    connect() {
        this.context.connect();
    }

    async disconnect() {
        return this.context.disconnect();
    }

    setTimeTopic(timeTopic) {
        this.timeTopic = timeTopic;
    }
}

class DelegateRealTimeHandler extends DelegateHandler {

    connect() {
        this.context.connector.onMessage =  (message) => {
            this.context.parseData(message).then(data => this.handleData(data));
        }
        super.connect();
    }
}

class DelegateBatchHandler extends DelegateHandler {
    async fetchData(startTimestamp, endTimestamp) {
        console.warn(`fetching ${new Date(startTimestamp).toISOString()} -> ` +
            `${new Date(endTimestamp).toISOString()} for datasource ${this.context.properties.dataSourceId}`);
        return this.context.doTemporalRequest(this.properties, startTimestamp, endTimestamp, this.status);
    }

    connect() {
        this.fetchData(new Date(this.properties.startTime).getTime(), new Date(this.properties.endTime).getTime()).then(data => this.handleData(data));
    }

    async disconnect() {
    }
}
class DelegateReplayHandler extends DelegateHandler {
    constructor(context) {
        super(context);
        this.interval = -1;
        this.prefetchBatchDuration = 10000; // 10 sec
        this.prefetchNextBatchThreshold = 0.6; // 80%, fetch before the end
        this.status = {
            cancel: false
        }
    }

    init(properties) {
        super.init(properties);
        this.prefetchBatchDuration = properties.prefetchBatchDuration;
    }

    async fetchData(startTimestamp, endTimestamp) {
        console.warn(`fetching ${new Date(startTimestamp).toISOString()} -> ` +
            `${new Date(endTimestamp).toISOString()} for datasource ${this.context.properties.dataSourceId}`);
        return this.context.doTemporalRequest(this.properties, startTimestamp, endTimestamp, this.status);
    }

    async startLoop() {
        if (this.interval === -1) {
            this.interval = 1;
            let replaySpeed = this.properties.replaySpeed || 1;
            let batchSizeInMillis = this.prefetchBatchDuration * replaySpeed;
            let fetchNextDataThreshold = batchSizeInMillis * this.prefetchNextBatchThreshold;
            let nextOffsetTimestamp = new Date(this.properties.startTime).getTime();
            let endTimestamp = new Date(this.properties.endTime).getTime();

            let durationToFetch = batchSizeInMillis;
            if ((durationToFetch + nextOffsetTimestamp) > endTimestamp) {
                durationToFetch = endTimestamp - nextOffsetTimestamp;
            }
            this.promise = this.fetchData(nextOffsetTimestamp, nextOffsetTimestamp + durationToFetch);

            this.promise.then((data) => {
                this.handleData(data);
                this.context.onChangeStatus(Status.FETCH_STARTED);

                nextOffsetTimestamp += durationToFetch;

                let lastOffsetTimestamp;
                this.timeBc = new BroadcastChannel(this.timeTopic);
                this.timeBc.onmessage = async (event) => {
                    const currentDataTimestamp = event.data.timestamp;

                    if (currentDataTimestamp >= endTimestamp) {
                        await this.disconnect();
                        return;
                    }
                    const dTime = nextOffsetTimestamp - currentDataTimestamp;

                    if (dTime <= fetchNextDataThreshold) {
                        //either fetch new batch or disconnect because there is no more data
                        let deltaTimeToFetch = batchSizeInMillis;
                        if ((deltaTimeToFetch + nextOffsetTimestamp) > endTimestamp) {
                            deltaTimeToFetch = endTimestamp - nextOffsetTimestamp;
                        }
                        let offsetTimestamp = nextOffsetTimestamp;
                        nextOffsetTimestamp += deltaTimeToFetch;
                        if(nextOffsetTimestamp === lastOffsetTimestamp) {
                            // already fetched
                            return;
                        } else {
                            lastOffsetTimestamp = nextOffsetTimestamp;
                        }
                        this.promise = this.fetchData(offsetTimestamp, offsetTimestamp + deltaTimeToFetch);
                        this.handleData(await this.promise);
                    }
                }
            });
            assertDefined(this.timeTopic, 'TimeTopic not defined');
        }
    }

    connect() {
        this.startLoop();
    }

    async disconnect() {
        this.status.cancel = false;
        if (isDefined(this.promise)) {
            this.status.cancel = true;
        }
        this.promise = undefined;
        this.context.onChangeStatus(Status.FETCH_ENDED);
        if (isDefined(this.timeBc)) {
            this.timeBc.close();
        }
        clearInterval(this.interval);
        this.interval = -1;
    }


}

class TimeSeriesHandler extends DataSourceHandler {

    constructor(context) {
        super(context);
        this.timeBroadcastChannel = null;
        this.delegateReplayHandler = null;
        this.delegateRealTimeHandler = null;
        this.delegateBatchHandler = null;
        this.delegateHandler = undefined;
    }

    async init(properties, topics, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.properties = {
            ...this.properties,
            ...properties,
            dataSourceId: dataSourceId
        };
        this.setTopics(topics);
        this.context = this.createContext(properties);
        await this.updateDelegateHandler(properties);
        this.context.onChangeStatus = this.onChangeStatus.bind(this);
        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
        await this.context.init(this.properties);
        this.initialized = true;
    }

    createContext(properties) {
        throw Error('Should be overridden');
    }

    async updateDelegateHandler(properties) {
        if (isDefined(this.delegateHandler)) {
            await this.delegateHandler.disconnect();
        }
        if (properties.mode === Mode.REAL_TIME) {
            if(properties.startTime !== 'now') {
                throw Error('The time is not correct, must be "now" for mode "Mode.REAL_TIME"');
            }
            if (!isDefined(this.delegateRealTimeHandler)) {
                this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
            }
            this.delegateHandler = this.delegateRealTimeHandler;
        } else if (properties.mode === Mode.REPLAY) {
            if(properties.startTime === 'now') {
                throw Error('The time is not correct, must be "ISOdateStart/ISOdateEnd" for mode "Mode.REPLAY"');
            }
            if (!isDefined(this.delegateReplayHandler)) {
                this.delegateReplayHandler = new DelegateReplayHandler(this.context);
            }
            this.delegateHandler = this.delegateReplayHandler;
        } else if(properties.mode === Mode.BATCH) {
            if(!isDefined(this.delegateBatchHandler)) {
                this.delegateBatchHandler = new DelegateBatchHandler(this.context);
            }
            this.delegateHandler = this.delegateBatchHandler;
        }
        this.delegateHandler.init(properties);
    }

    async updateProperties(properties) {
        try {
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
            await this.disconnect();
            this.version++;

            this.context = this.createContext({
                    ...this.properties,
                    ...properties
                });

            await this.updateDelegateHandler({
                ...this.properties,
                ...properties
            })
            this.context.onChangeStatus = this.onChangeStatus.bind(this);
            this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
            await this.context.init({
                ...this.properties,
                ...properties
            });

            return super.updateProperties(properties);
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    setTopics(topics) {
        super.setTopics(topics);
        this.timeSyncTopic = undefined;
        if (isDefined(topics.time)) {
            this.setTimeTopic(topics.time);
        }
        if (isDefined(topics.sync)) {
            this.delegateHandler.setTimeTopic(topics.sync);
            this.timeSyncTopic = topics.sync;
        }
    }

    setTimeTopic(timeTopic) {
        if (this.timeTopic === timeTopic) {
            return;
        }
        if (this.timeBroadcastChannel !== null) {
            console.warn(`Replace old topic ${this.timeTopic} by ${timeTopic}`)
            this.timeBroadcastChannel.close();
        }
        this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
        this.timeTopic = timeTopic;
    }

    flushAll() {
        if(this.properties.mode !== Mode.BATCH && this.values.length > 0) {
            this.flush();
        }
    }

    flush() {
        // console.log('push message on ',this.broadcastChannel)
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values
        });
        this.values = [];
    }

    handleData(data) {
        if(data.length === 0) {
            console.warn(`Data array is empty for datasource ${this.dataSourceId}`);
            return;
        }
        // check if data is an array
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
            }
        }

        this.flush();
        if (this.timeBroadcastChannel !== null) {
            if(data.length > 0 ) {
                this.timeBroadcastChannel.postMessage({
                    timestamp: data[data.length - 1].timestamp,
                    type: EventType.TIME
                });
            }
        }
    }

    isConnected() {
        if (isDefined(this.delegateHandler.context)) {
            return this.delegateHandler.context.isConnected();
        } else {
            return false;
        }
    }

    connect() {
        if(this.delegateHandler instanceof DelegateReplayHandler && !isDefined(this.timeSyncTopic)) {
            throw Error('DataSynchronizer must be used in case of Mode.REPLAY');
        }
        this.delegateHandler.connect();
    }

    async disconnect() {
        return this.delegateHandler.disconnect();
    }
}

export default TimeSeriesHandler;
