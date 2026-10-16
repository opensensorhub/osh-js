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

import {isDefined} from "../../../utils/Utils";
import {Status} from "../../../connector/Status";
import {EventType} from "../../../event/EventType";

class DataSourceHandler {
    constructor() {
        this.context = undefined;
        this.topic = undefined;
        this.broadcastChannel = undefined;
        this.values = [];
        // this.version = -Number.MAX_SAFE_INTEGER;
        this.version = 0;
        this.properties = {
            batchSize: 1
        };
        this.initialized = false;
    }

    createContext(properties) {
        throw Error('Should be overridden');
    }

    async init(properties, topics, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.properties = {
            ...this.properties,
            ...properties
        };
        this.setTopics(topics);
        this.context = this.createContext(properties);
        this.context.onChangeStatus = this.onChangeStatus.bind(this);
        this.context.handleData = this.handleData.bind(this); // bind context to handler
        await this.context.init(this.properties);
        this.initialized = true;
    }

    /**
     * Sets the current topic to listen
     * @param {Object} topics - the topics to listen
     * @param {String} topics.data - the topic to listen
     */
    setTopics(topics) {
        const topic = topics.data;
        if(this.topic === topic) {
            return;
        }

        if(isDefined(this.broadcastChannel)) {
            console.warn(`Replace old topic ${this.topic} by ${topic}`)
            this.broadcastChannel.close();
        }
        this.broadcastChannel = new BroadcastChannel(topic);
        this.topic = topic;
    }

    /**
     * Send a change status event into the broadcast channel
     * @param {Status} status - the new status
     */
    onChangeStatus(status) {
        if(status === Status.DISCONNECTED) {
            this.flushAll();
        }

        this.broadcastChannel.postMessage({
            type: EventType.STATUS,
            status: status,
            dataSourceId: this.dataSourceId
        });
    }

    handleData(data) {
        // check if data is an array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
            }
        } else {
            this.values.push({
                data: data,
                version: this.version
            });
        }
        // because parseData is ASYNC, the protocol can finish before the parsing method. In that case, we have to flushALl data
        if (!this.isConnected()) {
            this.flushAll();
        }
        if (this.values.length !== 0 && this.values.length >= this.properties.batchSize) {
            this.flush();
        }
    }

    connect(startTime = this.properties.startTime) {
        this.context.connect();
    }

    async disconnect() {
        return this.context.disconnect();
    }

    async updateProperties(properties) {
        await this.disconnect();
        this.properties = {
            ...this.properties,
            ...properties
        };
        this.version++;
        this.connect();
    }

    flushAll() {
        // while(this.values.length > 0) {
        //     this.flush();
        // }
    }

    flush() {
        let nbElements = this.values.length;
        // console.log('push message on ',this.broadcastChannel)
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values.splice(0, nbElements)
        });
    }

    isInitialized() {
        return this.initialized;
    }

    isConnected() {
        return this.context.isConnected();
    };
}

export default DataSourceHandler;
