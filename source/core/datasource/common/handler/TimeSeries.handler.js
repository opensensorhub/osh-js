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

// v1
import DataSourceHandler from "./DataSource.handler";
import {assertBoolean, assertDefined, assertHasValue, isDefined} from "../../../utils/Utils";
import {EventType} from "../../../event/EventType";
import {Status} from "../../../connector/Status";
import {Mode} from "../../Mode";

class DelegateHandler {
    constructor(context) {
        this.context = context;
    }

    setContext(context) {
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

    init(properties) {
        super.init(properties);
        this.context.handleData = (data) => this.handleData(data);
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
        this.prefetchNextBatchThreshold = 0.7; // 80%, fetch before the end
        this.status = {
            cancel: false
        }
        this.startTime = undefined;
    }

    init(properties) {
        super.init(properties);
        this.prefetchBatchDuration = properties.prefetchBatchDuration;
        this.status = {
            cancel: false
        }
        if(!isDefined(this.startTime)) {
            this.startTime = properties.startTime;
        }
    }

    async fetchData(startTime, endTime) {
        console.warn(`fetching ${startTime} -> ` +
            `${endTime} for datasource ${this.context.properties.dataSourceId}`);
        return this.context.doTemporalRequest(this.properties, startTime, endTime, this.status);
    }

    async startLoop() {
        let startTimestamp = new Date(this.startTime).getTime();
        let endTimestamp = new Date(this.properties.endTime).getTime();

        if(startTimestamp >= endTimestamp) {
            console.warn(`Did not connect DataSource ${this.context.properties.dataSourceId}` +
                                            ` because startTime=${this.startTime} >= endTime=${this.properties.endTime}`);
            return;
        }

        if (this.interval === -1) {
            this.interval = 1;
            this.status = {
                cancel: false
            };

            let replaySpeed = this.properties.replaySpeed || 1;
            let batchSizeInMillis = this.prefetchBatchDuration * replaySpeed;
            let prefetchNextBatchThresholdInMillis = this.prefetchNextBatchThreshold * batchSizeInMillis;

            let durationToFetch = batchSizeInMillis;
            if ((durationToFetch + startTimestamp) > endTimestamp) {
                durationToFetch = endTimestamp - startTimestamp;
            }
            try {
                let endFetchTimestamp = startTimestamp + durationToFetch;
                this.promise = this.fetchData(this.startTime, new Date(endFetchTimestamp).toISOString());
                const data = await this.promise;
                if (!this.status.cancel) {
                    this.handleData(data);
                }

                this.context.onChangeStatus(Status.FETCH_STARTED);
                this.timeBc = new BroadcastChannel(this.timeTopic);

                this.timeBc.onmessage = async (event) => {
                    if(event.data.type === EventType.MASTER_TIME) {
                        const masterTimestamp = event.data.timestamp;

                        if (masterTimestamp >= endTimestamp) {
                            await this.disconnect();
                            return;
                        }
                        // compare masterTime to endFetch
                        if((masterTimestamp - startTimestamp) >= prefetchNextBatchThresholdInMillis) {
                            startTimestamp = endFetchTimestamp;
                        } else {
                            return;
                        }

                        endFetchTimestamp += durationToFetch;
                        if(endFetchTimestamp > endTimestamp) {
                            endFetchTimestamp = endTimestamp; //reach the end
                        }
                        this.startTime = new Date(startTimestamp).toISOString();
                        try{
                            this.promise = this.fetchData(this.startTime, new Date(endFetchTimestamp).toISOString());
                            const data = await this.promise;
                            if (!this.status.cancel) {
                                this.handleData(data);
                            }
                        } catch (ex) {
                            if (this.status.cancel) {
                                console.warn(ex);
                            } else {
                                throw Error(ex);
                            }
                        }
                    }
                }
            } catch (ex) {
                if(this.status.cancel) {
                    console.warn(ex);
                } else {
                    throw Error(ex);
                }
            }
            assertDefined(this.timeTopic, 'TimeTopic');
        }
    }

    connect(startTime) {
        this.startTime = startTime;
        this.startLoop();
    }

    async disconnect() {
        if(this.interval === -1) {
            console.warn(`The dataSource ${this.context.properties.dataSourceId} is not connected`);
            return;
        }
        this.status.cancel = true;
        return new Promise(async (resolve, reject) => {
            try {
                if (isDefined(this.promise)) {
                    await this.promise;
                }
            } catch (ex) {
                // reject(ex);
            } finally {
                try {
                    this.promise = undefined;
                    this.context.onChangeStatus(Status.FETCH_ENDED);
                    this.context.onChangeStatus(Status.DISCONNECTED);
                    if (isDefined(this.timeBc)) {
                        this.timeBc.close();
                    }
                    clearInterval(this.interval);
                    this.interval = -1;
                } catch (ex) {
                    console.error(ex);
                } finally {
                    resolve();
                }
            }
        });
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
        this.promiseDisconnect = new Promise(resolve => {resolve()}); // default one
    }

    async init(properties, topics, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.properties = {
            ...this.properties,
            ...properties,
            dataSourceId: dataSourceId,
            version: this.version
        };
        this.setTopics(topics);
        this.context = this.createContext(this.properties);
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
        this.delegateHandler.setTimeTopic(this.timeSyncTopic);
    }

    async updateProperties(properties) {
        try {
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
            this.version++;
            await this.disconnect();

            this.properties = {
                ...this.properties,
                ...properties,
                version: this.version
            };
            this.context = this.createContext(this.properties);
            await this.updateDelegateHandler(this.properties);
            // set the new context
            await this.context.init(this.properties);
            this.delegateHandler.setContext(this.context);
            this.context.onChangeStatus = this.onChangeStatus.bind(this);
            this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
            this.connect();
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
            this.timeSyncTopic = topics.sync;
            this.delegateHandler.setTimeTopic(this.timeSyncTopic);
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
        const results = [];
        if (Array.isArray(data)) {
            if (data.length === 0) {
                console.warn(`Data array is empty for datasource ${this.dataSourceId}`);
                return;
            }
            for (let i = 0; i < data.length; i++) {
                results.push({
                    data: data[i],
                    version: this.context.properties.version
                });
            }
        } else {
            results.push({
                data: data,
                version: this.version
            });
        }

        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: results
        });
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

    async checkDisconnect() {
        await this.promiseDisconnect;
    }

    async connect(startTime = this.properties.startTime) {
        await this.checkDisconnect();
        if (this.delegateHandler instanceof DelegateReplayHandler && !isDefined(this.timeSyncTopic)) {
            throw Error('DataSynchronizer must be used in case of Mode.REPLAY');
        }
        this.delegateHandler.connect(startTime);
    }

    async disconnect() {
        this.promiseDisconnect =  this.delegateHandler.disconnect();
        return this.promiseDisconnect;
    }
}

export default TimeSeriesHandler;
