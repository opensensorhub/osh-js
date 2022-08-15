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
        this.buffer = [];
        this.batchSizeInMillis = 10000/2; // 10 sec
        this.deltaTimeThreshold = 3000; // fetch if remaining only 3 sec of data
        this.replaySpeed = 1;
        this.context.onMessage = this.onMessage.bind(this);
    }

    async onMessage(message, format) {
        const data = await this.context.parseData(message);
        this.buffer.push(...data);
    }

    startLoop() {

        if(this.interval === -1) {
            let endTimestamp = new Date(this.properties.endTime).getTime();
            let tsRef = -1;
            let tsRun = 0;
            let refClockTime = performance.now();
            this.currentTimestamp = new Date(this.properties.startTime).getTime();

            const existingRequest = new Set();

            this.interval = setInterval(async () => {
                // fetch if less or equal than deltaTimeThreshold
                // console.log(this.buffer.length);
                if (this.buffer.length === 0) {
                    // console.log('fetch')
                    //either fetch new batch or disconnect because there is no more data
                    let deltaTimeToFetch = this.batchSizeInMillis;
                    if ((deltaTimeToFetch + this.currentTimestamp) > endTimestamp) {
                        deltaTimeToFetch = endTimestamp - this.currentTimestamp;
                    }
                    //TODO fetch data
                    if(existingRequest.has(this.currentTimestamp)) {
                        return;
                    }
                    console.log(`fetching ${new Date(this.currentTimestamp).toISOString()} -> ${new Date(this.currentTimestamp + deltaTimeToFetch).toISOString()}`);
                    existingRequest.add(this.currentTimestamp);
                    const data = await this.context.doTemporalRequest(this.properties, this.currentTimestamp, this.currentTimestamp + deltaTimeToFetch);
                    for(let i=0; i < data.length; i++) {
                        this.buffer.push(...await this.context.parseData(data[i]));
                    }

                    this.currentTimestamp += deltaTimeToFetch;
                    if (this.currentTimestamp >= endTimestamp) {
                        console.log(`clearing interval: ${new Date(this.currentTimestamp).toISOString()} >= ${this.properties.endTime}`)
                        clearInterval(this.interval); // end of stream, no more data
                    }
                } else {
                    if (tsRef === -1) {
                        tsRef = this.buffer[0].timestamp;
                    } else if (this.buffer[0].timestamp < tsRef) {
                        tsRef = this.buffer[0].timestamp;
                    }
                    // console.log(tsRef)
                    const dClock = (performance.now() - refClockTime) * this.replaySpeed;
                    tsRun = tsRef + dClock;
                    const dTs = (this.buffer[0].timestamp - tsRef);
                    // console.log(dTs, dClock);
                    if (dTs <= dClock) {
                        // console.log('shift data');
                        this.handleData(this.buffer.shift());
                    }
                }
            },5);
        }
    }

    connect() {
        this.startLoop();
        // const data = this.context.doTemporalHttpRequest(this.properties, new Date(this.properties.startTime).getTime(), new Date(this.properties.endTime).getTime());
    }

    async disconnect() {
        // clearInterval(this.interval);
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
