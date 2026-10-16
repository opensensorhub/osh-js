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
import {isDefined} from "../../../utils/Utils";

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

        // adds temporalFilter
        queryString += "&temporalFilter=phenomenonTime," + startTime + "/" + endTime;
        // queryString += `&replaySpeed=${properties.replaySpeed}`;

        // TODO: server issue, waiting for fix
        // queryString += "&responseFormat=application/octet-stream";

        return queryString;
    }

    async checkInit() {
        return this.parser.checkInit();
    }

    async init(properties) {
        this.startTimestamp = new Date(properties.startTime).getTime();
        this.endTimestamp = new Date(properties.endTime).getTime();
        this.relativeDate = undefined;
        return super.init(properties);
    }

    async disconnect() {
        this.relativeDate = undefined;
    }

    async nextBatch(properties, masterTimestamp, status = {cancel:false}) {
        return new Promise(async (resolve, reject) => {
            try {
                let fetchDuration = this.properties.prefetchBatchDuration;

                const moveTimeCursor = async () => {
                    return new Promise(async (resolve, reject) => {
                        if(isDefined(this.relativeDate)) {
                            // move cursor ahead
                            this.relativeDate = new Date(this.relativeDate.getTime() + fetchDuration);
                        } else {
                            this.relativeDate = new Date(this.properties.startTime);
                        }
                        resolve();
                    });
                }
                const fetchNext = async (startTime, endTime) => {
                    const version = this.properties.version;
                    return new Promise(async (resolve, reject) => {
                        console.warn(`fetching ${startTime} -> ` +
                            `${endTime} for datasource ${this.properties.dataSourceId}`);
                        let data = await this.connector.doRequest('', this.getQueryString({
                            ...this.properties,
                            ...properties,
                            startTime: startTime,
                            endTime: endTime
                        }));

                        let results = [];

                        // this is because binary < 1.4 issue and the use of WS. In case in using WS, the data are provided in an array
                        if(Array.isArray(data)) {
                            for(let d of data) {
                                const parsedData  = await this.parseData(d);
                                parsedData.map(elt => {
                                    elt.version = version;
                                    return elt;
                                });
                                results.push(...parsedData);
                            }
                        } else {
                            const parsedData  = await this.parseData(data);
                            parsedData.map(elt => {
                                elt.version = version;
                                return elt;
                            });
                            results.push(...parsedData);
                        }
                        if(status.cancel) {
                            reject('Status=canceled');
                        } else {
                            resolve(results);
                        }
                    });
                }

                let data;
                do {
                    await moveTimeCursor();
                    data = await fetchNext(this.relativeDate.toISOString(), new Date(this.relativeDate.getTime() + fetchDuration).toISOString());
                } while (data.length === 0 && this.relativeDate.getTime() < this.endTimestamp);

                resolve(data);

            } catch (ex) {
                reject(ex);
            }
        });
    }

    async parseData(messages) {
        return this.parser.parseDataBlock(messages);
    }

    isConnected() {
        return isDefined(this.connector) && this.connector.isConnected();
    }

    async disconnect() {
    }
}

export default SosGetResultReplayContext;
