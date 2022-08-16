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
import {isDefined} from "../../../utils/Utils";
import {EventType} from "../../../event/EventType";
import {Status} from "../../../connector/Status";

class DelegateHandler {
    constructor(context) {
        this.context = context;
    }

    init(properties) {
        this.properties = properties;
    }

    handleData(data){}

    connect() {
        this.context.connect();
    }

    async disconnect() {
        return this.context.disconnect();
    }
}

class DelegateRealTimeHandler extends DelegateHandler {

    onMessage(message, format) {
        this.parseData(message).then(data => this.handleData(data,format));
    }
}

class DelegateReplayHandler extends DelegateHandler  {
    constructor(context) {
        super(context);
        this.interval = -1;
        this.batchSizeInMillis = 10000; // 10 sec
        this.fetchNextDataTreshold = 0.5; // 80%, fetch before the end
    }

    startLoop() {
        if(this.interval === -1) {
            let replaySpeed = this.properties.replaySpeed || 1;
            let endTimestamp = new Date(this.properties.endTime).getTime();
            let tsRef = -1;
            let refClockTime = performance.now();
            let buffer = [];
            let nextOffsetTimestamp = new Date(this.properties.startTime).getTime();
            let lastDataTimestamp = nextOffsetTimestamp;
            const existingRequest = new Set();

            let batchSizeInMillis = this.batchSizeInMillis * replaySpeed;
            let fetchNextDataTreshold = batchSizeInMillis * this.fetchNextDataTreshold;

            this.interval = setInterval(() => {
                // fetch if less or equal than deltaTimeThreshold
                if ( (lastDataTimestamp + fetchNextDataTreshold) >= nextOffsetTimestamp
                    && !existingRequest.has(nextOffsetTimestamp )) { // workaround to use ASYNC function into setInterval, waiting for last temporal request if any

                    //either fetch new batch or disconnect because there is no more data
                    let deltaTimeToFetch = batchSizeInMillis;
                    if ((deltaTimeToFetch + nextOffsetTimestamp) > endTimestamp) {
                        deltaTimeToFetch = endTimestamp - nextOffsetTimestamp;
                    }
                    console.warn(`fetching ${new Date(nextOffsetTimestamp).toISOString()} -> ${new Date(nextOffsetTimestamp + deltaTimeToFetch).toISOString()}`);
                    existingRequest.add(nextOffsetTimestamp);
                    this.context.doTemporalRequest(this.properties, nextOffsetTimestamp, nextOffsetTimestamp + deltaTimeToFetch).then(async data => {
                        buffer = buffer.concat(data);
                        nextOffsetTimestamp += deltaTimeToFetch;
                    });

                }
                if(buffer.length > 0) {
                    if (tsRef === -1) {
                        tsRef = buffer[0].timestamp;
                    } else if (buffer[0].timestamp < tsRef) {
                        tsRef = buffer[0].timestamp;
                    }
                    // console.log(tsRef)
                    const dClock = (performance.now() - refClockTime) * replaySpeed;
                    const dTs = (buffer[0].timestamp - tsRef);
                    // console.log(dTs, dClock);
                    if (dTs <= dClock) {
                        lastDataTimestamp = buffer[0].timestamp;
                        this.handleData(buffer.shift());
                    }
                }

                if (nextOffsetTimestamp >= endTimestamp && buffer.length === 0) {
                    console.log(`clearing interval: ${new Date(nextOffsetTimestamp).toISOString()} >= ${this.properties.endTime}`)
                    clearInterval(this.interval); // end of stream, no more data
                }
            },5);
            this.context.onChangeStatus(Status.CONNECTED);
        }
    }

    connect() {
        this.startLoop();
    }

    async disconnect() {
        clearInterval(this.interval);
        this.interval = -1;
        this.context.onChangeStatus(Status.DISCONNECTED);
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
            ...properties
        };
        this.setTopics(topics);
        this.context = this.createContext(properties);
        this.updateDelegateHandler(properties);
        this.context.onChangeStatus = this.onChangeStatus.bind(this);
        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
        this.context.init(properties);
        this.initialized = true;
    }

    createContext(properties) {
        throw Error('Should be overridden');
    }

    updateDelegateHandler(properties) {
        if(properties.startTime === 'now') {
            if(!isDefined(this.delegateRealTimeHandler)) {
                this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
            }
            this.delegateHandler = this.delegateRealTimeHandler;
        } else {
            if(!isDefined(this.delegateReplayHandler)) {
                this.delegateReplayHandler = new DelegateReplayHandler(this.context);
            }
            this.delegateHandler = this.delegateReplayHandler;
        }
        this.delegateHandler.init(properties);
    }

    async updateProperties(properties) {
        try {
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
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
        if(isDefined(topics.time)) {
            this.setTimeTopic(topics.time);
        }
    }

    setTimeTopic(timeTopic) {
        if(this.timeTopic === timeTopic) {
            return;
        }
        if(this.timeBroadcastChannel !== null) {
            console.warn(`Replace old topic ${this.timeTopic} by ${timeTopic}`)
            this.timeBroadcastChannel.close();
        }
        this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
        this.timeTopic = timeTopic;
    }

    handleData(data) {
        let lastTimestamp;

        // check if data is an array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
            }
            // store only last one
            lastTimestamp = data[data.length-1].timestamp;
        } else {
            this.values.push({
                data: data,
                version: this.version
            });
            lastTimestamp = data.timestamp;
        }

        // check for realTime data
        if(((isDefined(this.properties.batchSize) && this.values.length >= this.properties.batchSize))) {
            this.flush();
            if(this.timeBroadcastChannel !== null) {
                this.timeBroadcastChannel.postMessage({
                    timestamp: lastTimestamp,
                    type: EventType.TIME
                });
            }
        }
    }

    isConnected(){
        if(isDefined(this.delegateHandler.context)) {
            return this.delegateHandler.context.isConnected();
        } else {
            return false;
        }
    }

    connect() {
        this.delegateHandler.connect();
    }

    async disconnect() {
        this.delegateHandler.disconnect();
    }
}

export default TimeSeriesHandler;
