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

import {randomUUID, isDefined} from '../utils/Utils';
import WebSocketConnector from "../dataconnector/WebSocketConnector";
import Ajax from "../dataconnector/Ajax";
import EventManager from "../events/EventManager";

/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
class DataSource {
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} properties.timeShift - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Boolean} properties.syncMasterTime - defines if the datasource is synchronize with the others one
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @return {String} the full url
     */
    constructor(name, properties) {
        this.id = "DataSource-" + randomUUID();
        this.name = name;
        this.properties = properties;
        this.timeShift = 0;
        this.connected = false;

        this.initDataSource(properties);

        this.lastTimeStamp = Date.now();
        this.lastStartTime = 'now';
    }

    /**
     * Inits the datasource with the constructor properties.
     * @private
     * @param properties
     */
    initDataSource(properties) {

        if (isDefined(properties.timeShift)) {
            this.timeShift = properties.timeShift;
        }

        if (isDefined(properties.syncMasterTime)) {
            this.syncMasterTime = properties.syncMasterTime;
        } else {
            this.syncMasterTime = false;
        }

        if (isDefined(properties.bufferingTime)) {
            this.bufferingTime = properties.bufferingTime;
        }

        if (isDefined(properties.timeOut)) {
            this.timeOut = properties.timeOut;
        }

        if (!isDefined(properties.connect)) {
            properties.connect = true;
        }

        // checks if type is WebSocketConnector
        if (properties.protocol.startsWith('ws')) {
            this.connector = new WebSocketConnector(this.buildUrl(properties));
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
        } else if (properties.protocol.startsWith('http')) {
            this.connector = new Ajax(this.buildUrl(properties));
            this.connector.responseType = 'arraybuffer';
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
        }

        this.connector.onReconnect = () => {
            // if not real time, preserve last timestamp
            if(this.lastStartTime !== 'now') {
                properties.startTime = new Date(this.lastTimeStamp).toISOString();
                this.connector.setUrl(this.buildUrl(properties));
            }
        }
    }

    /**
     * Disconnect the dataSource then the connector will be closed as well.
     */
    disconnect() {
        this.connector.disconnect();
        this.connected = false;

        // send data reset event
        EventManager.fire(EventManager.EVENT.DATA + "-" + this.id, {
            dataSourceId: this.id,
            reset: true
        });
    }

    /**
     * Connect the dataSource then the connector will be opened as well.
     */
    connect() {
        this.connector.connect();
        this.connected = true;
    }

    /**
     * The callback which receives data.
     * @event
     * @param {Object} data - data received
     */
    onMessage(data) {
        this.onData({
            timeStamp: this.parseTimeStamp(data) + this.timeShift,
            data: this.parseData(data)
        });
    }

    /**
     * The default timestamp parser
     * @param data - the full data message returned by the connector
     * @return {Number} the formatted timestamp
     */
    parseTimeStamp(data) {
        return new Date().getTime();
    }

    /**
     * The default data parser
     * @param data the full data message returned by the connector
     * @return {String|Object|number|ArrayBuffer|*} data the formatted data
     */
    parseData(data) {
        return data;
    }

    /**
     * Fires the EventManager.EVENT.DATA event
     * @param {Object} data the data object
     * data is represented as
     * data = {
     *    timeStamp: timeStamp // number
     *    data: data // data to render
     * };
     */
    onData(data) {
        EventManager.fire(EventManager.EVENT.DATA + "-" + this.id, {data: data});
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

    /**
     * Builds the full url.
     * @private
     * @param {Object} properties
     * @param {String} properties.protocol the connector protocol
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @return {String} the full url
     */
    buildUrl(properties) {
        let url = "";

        // adds protocol
        url += properties.protocol + "://";

        // adds endpoint url
        url += properties.endpointUrl + "?";

        // adds service
        url += "service=" + properties.service + "&";

        // adds version
        url += "version=2.0&";

        // adds request
        url += "request=GetResult&";

        // adds offering
        url += "offering=" + properties.offeringID + "&";

        // adds feature of interest urn
        if (properties.foiURN && properties.foiURN !== '') {
            url += 'featureOfInterest=' + properties.foiURN + '&';
        }

        // adds observedProperty
        url += "observedProperty=" + properties.observedProperty + "&";

        // adds temporalFilter
        this.lastStartTime = properties.startTime;

        let endTime = properties.endTime;
        url += "temporalFilter=phenomenonTime," + this.lastStartTime + "/" + endTime + "&";

        if (properties.replaySpeed) {
            // adds replaySpeed
            url += "replaySpeed=" + properties.replaySpeed;
        }

        // adds responseFormat (optional)
        if (properties.responseFormat) {
            url += "&responseFormat=" + properties.responseFormat;
        }

        return url;
    }

    /**
     * Set the delay before reconnecting the dataSource
     * @param {Number} timeout - the delay in ms after reconnecting the dataSource
     */
    setReconnectTimeout (timeout) {
        return  this.connector.setReconnectTimeout(timeout);
    }


}

export default DataSource;
