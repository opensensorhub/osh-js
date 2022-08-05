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

import RealTimeDataSourceState from "../state/RealTime.state";
import ReplayState from "../state/Replay.state";
import {EventType} from "../../event/EventType";
import {isDefined} from "../../utils/Utils";
import WebSocketConnector from "../../connector/WebSocketConnector";
import MqttConnector from "../../connector/MqttConnector";
import DataSourceHandler from "./DataSource.handler";

class TimeSeriesHandler extends DataSourceHandler {

    constructor(context) {
        super(context);
        this.timeBroadcastChannel = null;
        this.realTimeState = new RealTimeDataSourceState();
        this.replayState = new ReplayState();
    }

    async updateProperties(properties) {
        try {
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
            this.createState({
                ...this.properties,
                ...properties
            })
            await super.updateProperties(properties);
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

    createDataConnector(properties) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;
        let connector;

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

    async onMessage(event) {
        let data = await this.parseData(event);
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

        this.state.setLastTimestamp(lastTimestamp);
        if(this.state.isLive() || ((isDefined(this.properties.batchSize) && this.values.length >= this.properties.batchSize))) {
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
