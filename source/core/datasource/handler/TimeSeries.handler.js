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

import {EventType} from "../../event/EventType";
import {isDefined} from "../../utils/Utils";
import WebSocketConnector from "../../connector/WebSocketConnector";
import MqttConnector from "../../connector/MqttConnector";
import DataSourceHandler from "./DataSource.handler";
import HttpConnector from "../../connector/HttpConnector";

class DelegateHandler {
    constructor(context) {
        this.context = context;
        this.connector = undefined;
    }

    init(properties) {
        this.connector = this.createDataConnector(properties);
    }

    createDataConnector(properties) {
        throw Error('should be overridden');
    }

    handleData(data){}
}

class DelegateRealTimeHandler extends DelegateHandler {

    createDataConnector(properties) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;
        let connector;

        // if we switch of protocol
        if (properties.protocol === 'ws') {
            connector = new WebSocketConnector(url, properties);
        } else if(properties.protocol === 'mqtt') {
            const tls = (properties.tls) ? 's' : '';
            const url = properties.protocol + tls + '://' + properties.mqttOpts.endpointUrl;
            connector =  new MqttConnector(url, properties);
        } else {
            throw Error(`Unsupported connector ${properties.protocol}`);
        }
        return connector;
    }

    onMessage(message, format) {
        this.parseData(message).then(data => this.handleData(data,format));
    }
}

class ReplayDelegateHandler extends DelegateHandler  {
    constructor(context) {
        super(context);
        this.interval = undefined;
    }

    createDataConnector(properties) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;
        return new HttpConnector(url, properties);
    }

    connect() {
        if(!isDefined(this.interval)) {

        } // otherwise skip, the loop is already running
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
        this.updateDelegateHandler(properties);
        super.init(properties, topics, dataSourceId);
    }

    updateDelegateHandler(properties) {
        if(properties.startTime === 'now') {
            if(!isDefined(this.delegateRealTimeHandler)) {
                this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
            }
            this.delegateHandler = this.delegateRealTimeHandler;
        } else {
            if(!isDefined(this.delegateReplayHandler)) {
                this.delegateReplayHandler = new DelegateRealTimeHandler(this.context);
            }
            this.delegateHandler = this.delegateReplayHandler;
        }
        this.delegateHandler.init(properties);
    }

    createDataConnector(properties) {
        return this.delegateHandler.connector;
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
            }, this.connector);

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
}

export default TimeSeriesHandler;
