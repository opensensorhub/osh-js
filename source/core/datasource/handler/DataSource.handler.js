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

import {isDefined} from "../../utils/Utils";
import TopicConnector from "../../connector/TopicConnector";
import {Status} from "../../connector/Status";
import {EventType} from "../../event/EventType";
import DataSourceState from "../../datasource/state/DataSource.state";
import HttpConnector from "../../connector/HttpConnector";

class DataSourceHandler {
    constructor(context) {
        this.context = context;
        this.connector = undefined;
        this.topic = undefined;
        this.broadcastChannel = undefined;
        this.values = [];
        this.version = -Number.MAX_SAFE_INTEGER;
        this.properties = {
            batchSize: 1
        };
        this.state = undefined;
    }

    init(properties, topics, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.properties = {
            ...this.properties,
            ...properties
        };
        this.setTopics(topics);
        this.connector = this.createDataConnector(this.properties);
        this.setUpConnector(this.connector);
        this.createState(this.properties);
        this.context.init(properties, this.connector);
    }

    createState(properties) {
        this.state = new DataSourceState();
        this.updateState(properties);
    }

    updateState(properties) {
        this.state.init(properties);
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
     * @protected
     */
    createDataConnector(properties) {
        let connector;
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;

        if (properties.protocol === 'topic') {
            connector = new TopicConnector(url);
        } else if (properties.protocol.startsWith('http')) { //for https
            connector = new HttpConnector(url, {
                responseType: properties.responseType || 'arraybuffer',
                method: 'GET'
            });
        } else {
            throw Error(`Unsupported connector ${properties.protocol}`);
        }
        return connector;
    }

    setUpConnector(connector) {
        // bind status & messages
        connector.onChangeStatus = this.onChangeStatus.bind(this);
        connector.onMessage = this.onMessage.bind(this);
    }

    async parseData(message){
        return this.context.getParser().parseDataBlock(message);
    }

    /**
     * Send a change status event into the broadcast channel
     * @param {Status} status - the new status
     */
    onChangeStatus(status) {
        this.state.setStatus(status);
        if(status === Status.DISCONNECTED) {
            this.flushAll();
        }

        this.broadcastChannel.postMessage({
            type: EventType.STATUS,
            status: status,
            dataSourceId: this.dataSourceId
        });
    }

    async onMessage(event) {
        let data = await this.parseData(event);

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

    connect() {
        if(this.connector !== null) {
            this.connector.doRequest('', this.context.getPath(this.state.props));
        }
    }

    disconnect() {
        if(this.connector !== null) {
            this.connector.disconnect();
        }
    }

    async updateProperties(properties) {
        this.disconnect();
        this.properties = {
            ...this.properties,
            ...properties
        };
        // create new connector?
        this.connector.close();
        this.updateState(this.properties);
        await this.createDataConnector(this.properties);
        // update version for next packets
        this.version++;
        // rebind connector function
        await this.setUpConnector(this.connector);
        this.connect();
    }

    flushAll() {
        while(this.values.length > 0) {
            this.flush();
        }
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
        return this.state && this.state.initialized;
    }

    isConnected() {
        return this.state.status === Status.CONNECTED;
    };
}

export default DataSourceHandler;
