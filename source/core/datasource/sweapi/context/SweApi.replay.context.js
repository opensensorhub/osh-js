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
import {Status} from "../../../connector/Status";

class SweApiReplayContext extends SweApiContext {
    init(properties) {
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
                this.replayFunction = function(props, startTimestamp, endTimestamp) {
                    const obsFilter = this.createObservationFilter({
                        ...properties,
                        ...props,
                        replaySpeed: undefined,
                        startTime: new Date(startTimestamp).toISOString(),
                        endTime: new Date(endTimestamp).toISOString()
                    });
                    return dataStream.searchObservations(obsFilter, 25);
                }
            }
        }
    }

    async doTemporalRequest(properties, startTimestamp, endTimestamp, callback, status = {cancel:false}) {
        return new Promise(async (resolve, reject) => {
            const collection = await this.replayFunction(properties, startTimestamp, endTimestamp);
            // const data = await (await this.replayFunction(properties, startTimestamp, endTimestamp)).nextPage();
            let data;
            while (collection.hasNext() && !status.cancel) {
                data = await collection.nextPage();
                if(status.cancel) {
                    break;
                }
                if (data.length > 0) {
                    if (this.properties.responseFormat === 'application/om+json') {
                        let results = [];
                        for (let d of data) {
                            results.push({
                                timestamp: d.timestamp,
                                ...d.result
                            })
                        }
                        callback(results);
                    } else {
                        callback(data);
                    }
                }
            }
            resolve();
            /*const that = this;
            return new Promise(resolve => {
                let url = `ogct17.georobotix.io:8443/sensorhub/api/datastreams/uxzna8pldpiv/observations?phenomenonTime=${new Date(startTimestamp).toISOString()}/${new Date(endTimestamp).toISOString()}&format=application/swe%2Bbinary&offset=0&limit=100000000`;
               /*
                let ws = new WebSocket(`wss://ogct17.georobotix.io:8443/sensorhub/api/datastreams/uxzna8pldpiv/observations?phenomenonTime=${new Date(startTimestamp).toISOString()}/${new Date(endTimestamp).toISOString()}&format=application/swe%2Bbinary&offset=0&limit=100000000`);
                ws.binaryType = 'arraybuffer';
                const results = [];

                ws.onmessage = async function (event) {
                    if (event.data.byteLength > 0) {
                        console.log('ici')
                        results.push((await that.dataStream.sweApiResultParser.parseDataBlock(event.data, 'application/swe+binary'))[0]);
                    }
                };
                ws.onclose = (event) => {
                    console.warn('WebSocket stream closed: ',event.reason, event.code);
                    if(event.code !== 1000 && !this.closed) {
                    } else {
                        console.log(results);
                        resolve(results);
                    }
                };
                fetch(`https://${url}`, {
                    method: 'GET',
                    headers: {}
                }).then((response) => {
                    if (!response.ok) {
                        const err = new Error(`Got ${response.status} response from ${url}`);
                        err.response = response;
                        throw err;
                    }
                    return response.arrayBuffer();
                }).then(async encodedData => {
                    console.log(encodedData);
                    const decodedData = await that.dataStream.sweApiResultParser.parseDataBlock(encodedData, 'application/swe+binary');
                    console.log(decodedData);
                    resolve(decodedData);
                })
            });*/
        });
    }
}


export default SweApiReplayContext;
