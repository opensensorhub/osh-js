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

import HttpConnector from "../../../connector/HttpConnector";
import SosGetResultContext from "./SosGetResult.context";
import WebSocketTemporalConnector from "../../../connector/WebSocketTemporalConnector";

class SosGetResultReplayContext extends SosGetResultContext {

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
        const startTime     = properties.startTime;
        const endTime       = properties.endTime;
        const replaySpeed   = properties.replaySpeed;

        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime," + startTime + "/" + endTime;

        // TODO: server issue, waiting for fix
        // queryString += "&responseFormat=application/octet-stream";

        return queryString;
    }

    createDataConnector(properties) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;

        return new WebSocketTemporalConnector(url, properties);
    }

    async doTemporalRequest(properties, startTimestamp, endTimestamp, callback, status = {cancel:false}) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.connector.doRequest(
                    '',
                    this.getQueryString({
                            ...properties,
                            startTime: new Date(startTimestamp).toISOString(),
                            endTime: new Date(endTimestamp).toISOString()
                    }),
                    async (encodedData) => {
                        if(!status.cancel) { callback(await this.parseData(encodedData)) }
                    }
                );
                resolve();
            } catch (ex) {
                reject(ex);
            }
        });
    }

    async parseData(messages) {
        return this.parser.parseDataBlock(messages);
    }
    isConnected() {
        return true;
    }
}

export default SosGetResultReplayContext;
