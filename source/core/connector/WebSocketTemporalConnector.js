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

import WebSocketConnector from "./WebSocketConnector";
import {isDefined} from "../utils/Utils";
import {Status} from "./Status";

/**
 * Defines the WebSocketTemporalConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh-js/dataconnector/WebSocketTemporalConnector.js';
 *
 * let url = ...;
 * let connector = new WebSocketTemporalConnector(url);
 *
 * // connect
 * connector.connect();
 *
 * // disconnect
 * connector.disconnect();
 *
 * // close
 * connector.close();
 *
 */


class WebSocketTemporalConnector extends WebSocketConnector {

    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    doRequest(extraUrl = this.extraUrl,queryString= this.queryString, callbackFn) {
        return new Promise(async (resolve, reject) => {
            if (!this.init) {
                this.extraUrl = extraUrl;
                this.queryString = queryString;
                let fullUrl = this.getUrl() + extraUrl;

                if (isDefined(queryString)) {
                    fullUrl += '?' + queryString;
                }

                this.closed = false;
                this.init = true;
                //creates Web Socket
                this.ws = new WebSocket(fullUrl);
                this.ws.binaryType = 'arraybuffer';
                this.checkStatus(Status.CONNECTING);
                console.warn('WebSocket stream connecting');

                this.ws.onopen = function (event) {
                    this.checkAndClearReconnection();
                    this.checkStatus(Status.CONNECTED);
                    console.warn('WebSocket stream connected');
                }.bind(this);

                this.ws.onmessage = function (event) {
                    this.lastReceiveTime = Date.now();
                    //callback data on message received
                    if (event.data.byteLength > 0) {
                        callbackFn(event.data);
                    }
                }.bind(this);

                // closes socket if any errors occur
                this.ws.onerror = function (event) {
                    console.error('WebSocket stream error');
                    this.checkStatus(Status.CLOSED_ERROR);
                    this.init = false;
                    this.lastReceiveTime = -1;
                    this.createReconnection();
                }.bind(this);

                this.ws.onclose = (event) => {
                    console.warn('WebSocket stream closed: ', event.reason, event.code);
                    if (event.code !== 1000 && !this.closed) {
                        this.checkStatus(Status.CLOSED_ERROR);
                        this.createReconnection();
                    } else {
                        this.disconnect();
                    }
                    resolve();
                };
                if (this.reconnectionInterval !== -1) {
                    clearInterval(this.reconnectionInterval);
                    this.reconnectionInterval = -1;
                }
            }
        });
    }

    /**
     * Disconnects and close the websocket.
     */
    async disconnect() {
       // super.disconnect();
       this.init = false;
       this.closed = true;
       if (this.ws != null && this.ws.readyState !== WebSocket.CLOSED) {
           this.ws.close();
       }
    }
}

export default WebSocketTemporalConnector;
