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

import {isDefined, randomUUID} from '../utils/Utils.js';
import {DATASOURCE_DATA_TOPIC} from "../Constants";
import DataSourceWorker from './worker/DataSource.worker';
import {Mode} from "./Mode";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class DataSource {
    constructor(name, properties) {
        this.id = properties.id || "DataSource-" + randomUUID();
        this.name = name;
        this.properties = properties;
        this.eventSubscriptionMap = {};
        this.init = undefined;
        this.messagesMap = {};
        this.mode = Mode.REAL_TIME;

        if(isDefined(properties.mode)) {
            this.mode = properties.mode;
        }
    }

    /**
     * Gets the datasource id.
     * @return {String} the datasource id
     */
    getId() {
        return this.id;
    }

    /**
     * Gets the datasource name.
     * @return {String} the datasource name
     */
    getName() {
        return this.name;
    }

    terminate() {
        if(this.dataSourceWorker !== null) {
            this.dataSourceWorker.terminate();
        }
    }

    getTopicId() {
        return DATASOURCE_DATA_TOPIC + this.id;
    }

    getVersion() {
        return 0;
    }

    subscribe(fn, eventTypes) {
        // associate function to eventType
        for(let i=0;i < eventTypes.length;i++) {
            if (!(eventTypes[i] in this.eventSubscriptionMap)) {
                this.eventSubscriptionMap[eventTypes[i]] = [];
            }
            this.eventSubscriptionMap[eventTypes[i]].push(fn);
        }
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//
    async createWorker(properties) {
        return new DataSourceWorker();
    }

    /**
     * Update properties
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    async updateProperties(properties) {
        this.properties = {
            ...this.properties,
            ...properties
        };
        return new Promise(resolve => {
            this.postMessage({
                message: 'update-properties',
                data: properties
            }, resolve);
        });
    }

    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    async connect() {
        await this.checkInit();
        await this.doConnect();
    }

     async initDataSource() {
        return new Promise(async (resolve, reject) => {
            this.dataSourceWorker = await this.createWorker(this.properties);
            this.handleWorkerMessage();
            this.postMessage({
                message: 'init',
                id: this.id,
                properties: this.properties,
                topics:  {
                    data: this.getTopicId()
                }
            }, async (message) => {
                // listen for Events to callback to subscriptions
                const datasourceBroadcastChannel = new BroadcastChannel(this.getTopicId());
                datasourceBroadcastChannel.onmessage = async (message) => {
                   await this.handleMessage(message);
                };
                resolve(message);
            });
        });
    }
    async handleMessage(message) {
        const type = message.data.type;
        if (type in this.eventSubscriptionMap) {
            for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                this.eventSubscriptionMap[type][i](message.data);
            }
        }
    }

    async checkInit() {
        return new Promise(async (resolve, reject) => {
            if(!isDefined(this.init)) {
                this.init = this.initDataSource();
            }
            await this.init;
            resolve();
        });
    }

    async doConnect() {
        return new Promise(async resolve => {
            this.postMessage({
                message: 'connect'
            }, resolve);
        });
    }
    async isConnected() {
        return new Promise(async resolve => {
            await this.checkInit();
            this.postMessage({
                message: 'is-connected'
            }, resolve);
        });
    }

    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    async disconnect() {
        return new Promise(async resolve => {
            await this.checkInit();
            this.postMessage({
                message: 'disconnect'
            }, resolve);
        });
    }

    postMessage(props, Fn) {
        const messageId = randomUUID();
        this.dataSourceWorker.postMessage({
            ...props,
            messageId: messageId
        });
        if(isDefined(Fn)) {
            this.messagesMap[messageId] = Fn;
        }
    }

    handleWorkerMessage() {
        this.dataSourceWorker.onmessage = (event) => {
            const id = event.data.messageId;
            if(id in this.messagesMap){
                this.messagesMap[id](event.data.data);
                delete this.messagesMap[id];
            }
        };
    }

    async onDisconnect(){}

    reset() {}
}

export default DataSource;
