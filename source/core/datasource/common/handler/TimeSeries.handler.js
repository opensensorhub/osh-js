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
import WebSocketConnector from "../../../connector/WebSocketConnector";
import MqttConnector from "../../../connector/MqttConnector";
import HttpConnector from "../../../connector/HttpConnector";
import {assertDefined, isDefined} from "../../../utils/Utils";
import {EventType} from "../../../event/EventType";
import {Status} from "../../../connector/Status";

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

    onMessage(message, format) {
        this.parseData(message).then(data => this.handleData(data, format));
    }
}

class DelegateReplayHandler extends DelegateHandler {
    constructor(context) {
        super(context);
        this.interval = -1;
        this.batchSizeInMillis = 10000; // 10 sec
        this.fetchNextDataThreshold = 0.5; // 80%, fetch before the end
        this.status = {
            cancel: false
        }
    }

    async startLoop() {
        if (this.interval === -1) {
            this.interval = 1;
            let replaySpeed = this.properties.replaySpeed || 1;
            replaySpeed = 1;
            let batchSizeInMillis = this.batchSizeInMillis * replaySpeed;
            let fetchNextDataThreshold = batchSizeInMillis * this.fetchNextDataThreshold;
            let nextOffsetTimestamp = new Date(this.properties.startTime).getTime();
            let endTimestamp = new Date(this.properties.endTime).getTime();

            let durationToFetch = batchSizeInMillis;
            if ((durationToFetch + nextOffsetTimestamp) > endTimestamp) {
                durationToFetch = endTimestamp - nextOffsetTimestamp;
            }
            this.context.onChangeStatus(Status.CONNECTED);
            console.warn(`fetching ${new Date(nextOffsetTimestamp).toISOString()} -> ` +
                `${new Date(nextOffsetTimestamp + durationToFetch).toISOString()} for datasource ${this.context.properties.dataSourceId}`);
            this.promise = this.context.doTemporalRequest(this.properties, nextOffsetTimestamp, nextOffsetTimestamp + durationToFetch, this.handleData.bind(this), this.status);
            this.promise.then(() => {
                nextOffsetTimestamp += durationToFetch;

                let lastOffsetTimestamp;
                this.timeBc = new BroadcastChannel(this.timeTopic);
                this.timeBc.onmessage = async (event) => {
                    const currentDataTimestamp = event.data.timestamp;

                    if (currentDataTimestamp >= endTimestamp) {
                        console.log('disconnected')
                        await this.disconnect();
                    }
                    const dTime = nextOffsetTimestamp - currentDataTimestamp;

                    // console.log(new Date(nextOffsetTimestamp).toISOString(), new Date(currentDataTimestamp).toISOString(), dTime)
                    if (dTime <= fetchNextDataThreshold) {
                        //either fetch new batch or disconnect because there is no more data
                        let deltaTimeToFetch = batchSizeInMillis;
                        if ((deltaTimeToFetch + nextOffsetTimestamp) > endTimestamp) {
                            deltaTimeToFetch = endTimestamp - nextOffsetTimestamp;
                        }
                        let offsetTimestamp = nextOffsetTimestamp;
                        nextOffsetTimestamp += deltaTimeToFetch;
                        // await this.promise;
                        if(nextOffsetTimestamp === lastOffsetTimestamp) {
                            // already fetched
                            return;
                        } else {
                            lastOffsetTimestamp = nextOffsetTimestamp;
                        }
                        await this.promise;
                        console.warn(`fetching ${new Date(offsetTimestamp).toISOString()} -> ` +
                                        `${new Date(offsetTimestamp + deltaTimeToFetch).toISOString()} for datasource ${this.context.properties.dataSourceId}`);
                        this.promise = this.context.doTemporalRequest(this.properties, offsetTimestamp, offsetTimestamp + deltaTimeToFetch, this.handleData.bind(this), this.status);
                        await this.promise;
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
        return new Promise(async (resolve, reject) => {
            if (isDefined(this.promise)) {
                this.status.cancel = true;
                await this.promise;
            }
            this.promise = undefined;
            this.context.onChangeStatus(Status.DISCONNECTED);
            if (isDefined(this.timeBc)) {
                this.timeBc.close();
            }
            this.status.cancel = false;
            this.interval = -1;
            resolve();
        });
    }


}

class TimeSeriesHandler extends DataSourceHandler {

    constructor(context) {
        super(context);
        this.timeBroadcastChannel = null;
        this.delegateReplayHandler = null;
        this.delegateRealTimeHandler = null;
        this.delegateHandler = undefined;
    }

    init(properties, topics, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.properties = {
            ...this.properties,
            ...properties,
            dataSourceId: dataSourceId
        };
        this.setTopics(topics);
        this.context = this.createContext(properties);
        this.updateDelegateHandler(properties);
        this.context.onChangeStatus = this.onChangeStatus.bind(this);
        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
        this.context.init(this.properties);
        this.initialized = true;
    }

    createContext(properties) {
        throw Error('Should be overridden');
    }

    updateDelegateHandler(properties) {
        if (properties.startTime === 'now') {
            if (!isDefined(this.delegateRealTimeHandler)) {
                this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
            }
            this.delegateHandler = this.delegateRealTimeHandler;
        } else {
            if (!isDefined(this.delegateReplayHandler)) {
                this.delegateReplayHandler = new DelegateReplayHandler(this.context, this.timeTopic);
            }
            this.delegateHandler = this.delegateReplayHandler;
        }
        this.delegateHandler.init(properties);
    }

    async updateProperties(properties) {
        try {
            await this.disconnect();
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
            this.version++;
            // re-init the context using the new values
            this.context.init({
                ...this.properties,
                ...properties
            });

            this.updateDelegateHandler({
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
        if (isDefined(topics.time)) {
            this.setTimeTopic(topics.time);
        }
        if (isDefined(topics.sync)) {
            this.delegateHandler.setTimeTopic(topics.sync);
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
        this.flush();
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
        // check if data is an array
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
            }
        }

        // check for realTime data
        // if(((isDefined(this.properties.batchSize) && this.values.length >= this.properties.batchSize))) {
        this.flush();
        if (this.timeBroadcastChannel !== null) {
            this.timeBroadcastChannel.postMessage({
                timestamp: data[data.length - 1].timestamp,
                type: EventType.TIME
            });
        }
        // }*/
    }

    isConnected() {
        if (isDefined(this.delegateHandler.context)) {
            return this.delegateHandler.context.isConnected();
        } else {
            return false;
        }
    }

    connect() {
        this.delegateHandler.connect();
    }

    async disconnect() {
        return this.delegateHandler.disconnect();
    }
}

export default TimeSeriesHandler;
