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

import SweApiContext from "./SweApi.context";
import Control from "../../../sweapi/control/Control";
import DataStream from "../../../sweapi/datastream/DataStream";
import {isDefined} from "../../../utils/Utils";

class SweApiReplayContext extends SweApiContext {
    init(properties) {
        this.collection = undefined;
        this.relativeStartTimestamp = undefined;
        this.properties = properties;
        this.replayFunction = undefined;

        const networkProperties = {
            ...properties
        };
        let filter;
        let regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');

        // check control status
        if(regex.test(properties.resource)) {
            filter = this.createControlFilter(properties);
            // is observation streaming
            const match = regex.exec(properties.resource);

            let control = new Control({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.replayFunction = function(props, startTimestamp, endTimestamp) {
                const controlFilter = this.createControlFilter({
                    ...properties,
                    ...props,
                    startTime: new Date(startTimestamp).toISOString(),
                    endTime: new Date(endTimestamp).toISOString()
                });
                return control.searchStatus(controlFilter, 1);
            }
        } else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(properties.resource)) {
                // is observation streaming
                const match = regex.exec(properties.resource);
                let dataStream = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.dataStream = dataStream;
                this.replayFunction = function(props, startTime, endTime) {
                    const obsFilter = this.createObservationFilter({
                        ...properties,
                        ...props,
                        replaySpeed: undefined,
                        startTime: startTime,
                        endTime: endTime
                    });
                    return dataStream.searchObservations(obsFilter, properties.prefetchBatchSize);
                }
            }
        }
    }

    async disconnect() {
        this.collection = undefined;
        this.relativeStartTimestamp = undefined;
        this.replayFunction = undefined;
    }

    async nextBatch(properties, masterTimestamp, status = {cancel:false}) {
        return new Promise(async (resolve, reject) => {
            try {
                let data;
                let results = [];

                const moveTimeCursor = async () => {
                    let relativeStartTime;
                    if(isDefined(this.relativeStartTimestamp)) {
                        relativeStartTime = new Date(this.relativeStartTimestamp + 1).toISOString();
                    } else {
                        //TOCHECK: ISO or timestamp
                        relativeStartTime = new Date(this.properties.startTime).toISOString();
                    }

                    console.warn(`fetching ${relativeStartTime} -> ` +
                        `${this.properties.endTime} for datasource ${this.properties.dataSourceId}`);
                    this.collection = await this.replayFunction(properties, relativeStartTime, this.properties.endTime);
                }

                const fetchNext = async () => {
                    data = await this.collection.nextPage();
                    if (status.cancel) {
                        reject('Status has been cancelled');
                    }
                    if (data.length > 0) {
                        if (this.properties.responseFormat === 'application/om+json') {
                            for (let d of data) {
                                results.push({
                                    timestamp: d.timestamp,
                                    ...d.result
                                })
                            }
                        } else {
                            results = data;
                        }

                        if(status.cancel) {
                            reject('Status has been cancelled');
                        } else {
                            // start startTime cursor
                            this.relativeStartTimestamp = results[results.length-1].timestamp;
                            resolve(results);
                        }
                    }
                }

                await moveTimeCursor();
                await fetchNext();
            } catch (ex) {
                reject(ex);
            }
        });
    }
}


export default SweApiReplayContext;
