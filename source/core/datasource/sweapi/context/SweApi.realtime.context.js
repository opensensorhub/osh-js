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
import {Status} from "../../../connector/Status.js";
import {isDefined} from "../../../utils/Utils";

/**
 * Backoff schedule (in milliseconds) used by {@link SweApiRealTimeContext#fetchLatestObservationsWithRetry}
 * when attempting to retrieve the most recent observation after a (re)connection.
 *
 * @type {number[]}
 */
const FETCH_LATEST_RETRY_DELAYS_MS = [100, 400, 1200, 3000];

/**
 * Promisified `setTimeout` used to await between retry attempts without blocking the event loop.
 *
 * @param {number} ms - Number of milliseconds to wait before the returned promise resolves.
 * @returns {Promise<void>} A promise that resolves once `ms` milliseconds have elapsed.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class SweApiRealTimeContext extends SweApiContext {
    init(properties) {
        this.properties = properties;

        const networkProperties = {
            ...properties,
            streamProtocol: properties.protocol
        };
        let filter;
        let regex = new RegExp('\\/systems\\/(.*)\\/controls\\/(.*)\\/status');

        this.streamObject = undefined;

        // check control status
        if(regex.test(properties.resource)) {
            filter = this.createControlFilter(properties);
            // is observation streaming
            const match = regex.exec(properties.resource);

            this.streamObject = new Control({
                id: match[2],
                'system@id': match[1]
            }, networkProperties);
            this.streamFunction = function() {
                this.streamObject.streamStatus(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
            }
        } else {
            // check for datastream observations
            regex = new RegExp('\\/(.*\\/)(.*)\\/observations'); // /datastreams/abc13/observations
            if(regex.test(properties.resource)) {
                filter = this.createObservationFilter(properties);
                // is observation streaming
                const match = regex.exec(properties.resource);
                this.streamObject = new DataStream({
                    id: match[2]
                }, networkProperties);
                this.streamFunction = function() {
                    this.streamObject.streamObservations(filter, (messages) => this.onStreamMessage(messages, filter.props.format));
                }
            }
        }

        if (isDefined(this.streamObject)) {
            this.streamObject.stream().onChangeStatus = this.onStreamConnectorStatus.bind(this);
        }
    }

    /**
     * Stream connector status callback.
     *
     * Wraps the user-facing `onChangeStatus` hook (forwarding the raw status) and, additionally,
     * triggers a fetch of the latest observation whenever the underlying stream transitions to
     * {@link Status.CONNECTED}. This guarantees that consumers (e.g. map layers, point markers)
     * are seeded with the most recent value as soon as the websocket/stream is (re)established,
     * even if no new observation has been pushed yet.
     *
     * Only data streams that expose `searchObservations` (i.e. SWE API DataStreams) trigger the
     * "fetch latest" logic; control status streams are forwarded transparently.
     *
     * @param {string} status - The new connector status (see {@link Status}).
     */
    onStreamConnectorStatus(status) {
        if (this.onChangeStatus) {
            this.onChangeStatus(status);
        }
        if (status === Status.CONNECTED && this.streamObject && this.streamObject.searchObservations) {
            this.scheduleFetchLatestObservations();
        }
    }

    /**
     * 150ms debounce on {@link SweApiRealTimeContext#fetchLatestObservationsWithRetry}
     */
    scheduleFetchLatestObservations() {
        if (this._fetchLatestDebounce) {
            clearTimeout(this._fetchLatestDebounce);
        }
        this._fetchLatestDebounce = setTimeout(() => {
            this._fetchLatestDebounce = undefined;
            this.fetchLatestObservationsWithRetry();
        }, 150);
    }

    /**
     * Fetches the most recent observation from the SWE API DataStream with a retry/backoff loop.
     *
     * No-op if the underlying `streamObject` is not a DataStream (i.e. has no
     * `searchObservations`)
     *
     * @returns {Promise<void>} Resolves when either the latest observation has been delivered
     *                          to {@link handleData} or all retry attempts have been exhausted.
     */
    async fetchLatestObservationsWithRetry() {
        if (!this.streamObject || !this.streamObject.searchObservations) {
            return;
        }
        const responseFormat = this.properties.responseFormat;
        let lastErr;
        for (let i = 0; i < FETCH_LATEST_RETRY_DELAYS_MS.length; i++) {
            await delay(FETCH_LATEST_RETRY_DELAYS_MS[i]);
            try {
                const filter = this.createObservationFilter(this.properties);
                filter.props.phenomenonTime = 'now';
                const collection = await this.streamObject.searchObservations(filter);
                const data = await collection.nextPage();
                if (data && data.length) {
                    data.forEach(d => {
                        d.version = this.properties.version;
                    });
                    this.handleData(data, responseFormat);
                    return;
                }
            } catch (err) {
                lastErr = err;
            }
        }
        if (lastErr) {
            console.error('[SweApiRealTimeContext] fetch latest observations failed after retries', lastErr);
        }
    }

    onStreamMessage(messages, format) {
         // in case of om+json, we have to add the timestamp which is not included for each record but at the root level
        let results = messages;
        let version = this.properties.version;
        for(let message of messages) {
            message.version = version;
        }
        this.handleData(results, format);
    }

    /**
     * Opens the underlying real-time stream
     */
    connect() {
        this.streamFunction();
        if (this.streamObject && this.streamObject.searchObservations) {
            this.scheduleFetchLatestObservations();
        }
    }

    async disconnect() {
        if(isDefined(this.streamObject)) {
            this.streamObject.stream().disconnect();
        }
    }

    isConnected() {
        return this.streamObject.stream().status;
    }
}


export default SweApiRealTimeContext;
