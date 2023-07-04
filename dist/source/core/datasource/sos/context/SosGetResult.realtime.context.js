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

import SosGetResultContext from "./SosGetResult.context";
import WebSocketConnector from "../../../connector/WebSocketConnector";
import MqttConnector from "../../../connector/MqttConnector";
import {isDefined} from "../../../utils/Utils";

class SosGetResultRealTimeContext extends SosGetResultContext {

    /**
     * Builds the full url.
     * @protected
     * @param {Object} properties
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay factor
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Object} properties.customUrlParams - the encoding options
     * @return {String} the full url
     */
    getQueryString(properties) {
        let queryString     = super.getQueryString(properties);

        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime,now/2055-01-01Z";

        return queryString;
    }

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

    async onMessage(messages, format) {
        this.handleData(await this.parseData(messages));
    }

    connect() {
        if(isDefined(this.connector)) {
            this.connector.doRequest('', this.getQueryString(this.properties));
        } else {
            throw Error('there is no connector defined');
        }
    }

    async disconnect() {
        this.connector.disconnect();
    }

    async parseData(messages) {
        return this.parser.parseDataBlock(messages);
    }

    onChangeStatus(status) {
        console.log(status)
    }
}

export default SosGetResultRealTimeContext;
