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
        this.status = {
            cancel: false
        }
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
        this.status.cancel = false;
        this.context.connect();
    }

    async disconnect() {
        this.status.cancel = true;
        return this.context.disconnect();
    }

    setTimeTopic(timeTopic) {
        this.timeTopic = timeTopic;
    }
}

class DelegateRealTimeHandler extends DelegateHandler {

    init(properties) {
        super.init({
            ...properties,
            startTime: 'now',
            endTime: '2055-01-01'
        });
        this.status = {
            cancel: false
        }
        this.context.handleData = (data) => {
            if(!this.status.cancel) {
                this.handleData(data);
            }
        }
    }

    async disconnect() {
        this.status.cancel = true;
        return new Promise(async (resolve, reject) => {
            try {
                await this.context.disconnect();
            } catch (ex) {
                console.error(ex);
            } finally {
                resolve();
            }
        });
    }
}

class DelegateBatchHandler extends DelegateHandler {
    async fetchData(startTime, endTime) {
        console.warn(`fetching ${new Date(startTime).toISOString()} -> ` +
            `${new Date(endTime).toISOString()} for datasource ${this.context.properties.dataSourceId}`);
        return this.context.nextBatch(this.properties, startTime, endTime, this.status);
    }

    connect() {
        this.context.onChangeStatus(Status.FETCH_STARTED);
        this.fetchData(this.properties.startTime, this.properties.endTime).then(data => {
            if(!this.status.cancel) {
                this.handleData(data);
            }
        });
        this.context.onChangeStatus(Status.FETCH_ENDED);
    }

    async disconnect() {
    }
}

class DelegateReplayHandler extends DelegateHandler {
    constructor(context) {
        super(context);
        this.initialized = false;
        this.prefetchBatchDuration = 10000; // 10 sec
        this.prefetchNextBatchThreshold = 0.5; // 50%, fetch before the end
        this.prefetchBatchDuration = 5000;
        this.startTime = undefined;
    }

    init(properties) {
        super.init(properties);
        this.prefetchBatchDuration = properties.prefetchBatchDuration || this.prefetchBatchDuration;
        this.status = {
            cancel: false
        }
        if(!isDefined(this.startTime)) {
            this.startTime = properties.startTime;
        }
    }

    async startLoop() {
        let startTimestamp = new Date(this.startTime).getTime();
        let endTimestamp = new Date(this.properties.endTime).getTime();

        if(startTimestamp >= endTimestamp) {
            console.warn(`Did not connect DataSource ${this.context.properties.dataSourceId}` +
                ` because startTime=${this.startTime} >= endTime=${this.properties.endTime}`);
            return;
        }
        if (!this.initialized) {
            this.initialized = true;
            this.status = {
                cancel: false
            };
        }
        let replaySpeed = this.properties.replaySpeed || 1;
        let prefetchBatchDuration = this.properties.prefetchBatchDuration * replaySpeed;

        let lastTimestamp;
        try {
            let data = await this.context.nextBatch();
            this.context.onChangeStatus(Status.FETCH_STARTED);
            if (this.status.cancel) {
                return;
            } else if (data.length > 0) {
                this.handleData(data);
                lastTimestamp = data[data.length-1].timestamp;
            }

            if(lastTimestamp < endTimestamp) {
                let masterTimestamp;
                let fetching = false;

                this.timeBc = new BroadcastChannel(this.timeTopic);
                this.timeBc.onmessage = async (event) => {
                    if (event.data.type === EventType.MASTER_TIME) {

                        masterTimestamp = event.data.timestamp;
                        if (masterTimestamp >= endTimestamp) {
                            await this.disconnect();
                            return;
                        }

                        if(lastTimestamp < endTimestamp && !fetching) {
                            fetching = true;
                            let dTimestamp = lastTimestamp - masterTimestamp;
                            // less than 5 sec
                            if (dTimestamp <= prefetchBatchDuration) {
                                // request next batch
                                data = await this.context.nextBatch();
                                if (!this.status.cancel && data.length > 0) {
                                    this.handleData(data);
                                    lastTimestamp = data[data.length - 1].timestamp;
                                }
                            }
                            fetching = false;
                        }
                    }
                }
            }
        } catch (ex) {
            if(this.status.cancel) {
                console.warn(ex);
            } else {
                console.error(ex);
                throw Error(ex);
            }
        }
        assertDefined(this.timeTopic, 'TimeTopic');
    }

    connect(startTime) {
        if(startTime) {
            this.startTime = startTime;
            this.context.properties.startTime = this.startTime;
        }
        this.startLoop();
    }

    async disconnect() {
        if(!this.initialized) {
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
                    this.context.disconnect();
                    if (isDefined(this.timeBc)) {
                        this.timeBc.close();
                    }
                    this.initialized = false;
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

    constructor() {
        super();
        this.timeBroadcastChannel = null;
        this.delegateHandler = undefined;
        this.promiseDisconnect = new Promise(resolve => {resolve()}); // default one
        this.contexts = {};
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
        this.contexts[this.properties.mode] = this.createContext(this.properties);
        this.context = this.contexts[this.properties.mode];
        this.context.onChangeStatus = this.onChangeStatus.bind(this);
        await this.context.init(this.properties);
        await this.updateDelegateHandler(properties);
        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
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
            this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
            this.delegateHandler = this.delegateRealTimeHandler;
        } else if (properties.mode === Mode.REPLAY) {
            this.delegateReplayHandler = new DelegateReplayHandler(this.context);
            this.delegateHandler = this.delegateReplayHandler;
        } else if(properties.mode === Mode.BATCH) {
            this.delegateBatchHandler = new DelegateBatchHandler(this.context);
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
            await this.disconnect();

            this.properties = {
                ...this.properties,
                ...properties,
                version: ++this.version
            };
            if(!(this.properties.mode in this.contexts)) {
                console.warn(`creating new context for mode ${this.properties.mode}`);
                this.contexts[this.properties.mode] = this.createContext(this.properties)
            }
            this.context = this.contexts[this.properties.mode];
            this.context.onChangeStatus = this.onChangeStatus.bind(this);
            await this.context.init(this.properties);
            await this.updateDelegateHandler(this.properties);
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
            let d;
            for (let i = 0; i < data.length; i++) {
                d = {
                    data: data[i],
                    version: this.context.properties.version
                };
                results.push(d);
            }
        } else {
            results.push({
                data: data,
                version: this.context.properties.version
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
                    type: EventType.LAST_TIME
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
        this.version++;
        this.context.init(this.properties);
        this.delegateHandler.connect(startTime);
    }

    async disconnect() {
        this.promiseDisconnect =  this.delegateHandler.disconnect();
        return this.promiseDisconnect;
    }
}

export default TimeSeriesHandler;
