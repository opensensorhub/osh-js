/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import DataSource from "./DataSource";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_TIME_TOPIC} from "../Constants";
import {assertDefined, isDefined} from "../utils/Utils";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class TimeDataSource extends DataSource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Object} [properties.customUrlParams={}] - custom parameters appended to the URL as they are
     * @param {Object} worker - DataSource worker
     */
    constructor(name, properties) {
        super(name,properties);
        assertDefined(properties,'Some properties must be defined');
        this.timeSync = null;
    }

    getTimeTopicId() {
        return DATASOURCE_TIME_TOPIC + this.id;
    }

    //----------- ASYNCHRONOUS FUNCTIONS -----------------//

    async setDataSynchronizer(timeSync) {
        return new Promise(async (resolve, reject) => {
            await this.checkInit();
            const topic = DATA_SYNCHRONIZER_TOPIC + timeSync.id;
            this.timeSync = timeSync;
            this.postMessage({
                message: 'topic',
                topic: topic,
                timeTopic: this.getTimeTopicId()
            }, resolve);
        });
    }

    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    async initDataSource(properties) {
        await super.initDataSource(properties);
        return new Promise(async resolve => {
            this.postMessage({
                message: 'topic',
                topic: this.getTopicId(),
                timeTopic: this.getTimeTopicId()
            }, async () => {
                // listen for Events to callback to subscriptions
                const datasourceBroadcastChannel = new BroadcastChannel(this.getTimeTopicId());
                datasourceBroadcastChannel.onmessage = async (message) => {
                   this.handleTimeMessage(message);
                };
                resolve();
            });
        });
    }

    async handleTimeMessage(message) {
        const type = message.data.type;
        if (type in this.eventSubscriptionMap) {
            for (let i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                this.eventSubscriptionMap[type][i](message.data);
            }
        }
    }

    async getCurrentTime() {
        if(isDefined(this.timeSync)) {
            return this.timeSync.getCurrentTime();
        } else {
            return new Promise(resolve => {
                this.postMessage({
                    message: 'last-timestamp'
                }, resolve);
            });
        }
    }
}

export default TimeDataSource;
