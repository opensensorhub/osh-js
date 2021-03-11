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

import DataConnector from './DataConnector.js';
import {isWebWorker} from '../utils/Utils.js';
import {Status} from './Status.js';

/**
 * Defines the WebSocketConnector to connect to a remote server by creating a WebSocket channel.
 * @extends DataConnector
 * @example
 * import WebSocketConnector from 'osh-js/dataconnector/WebSocketConnector.js';
 *
 * let url = ...;
 * let connector = new WebSocketConnector(url);
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

class WebSocketConnector extends DataConnector {
    /**
     *
     * @param properties -
     */
    constructor(properties) {
        super(properties);
        this.interval = -1;
        this.lastReceiveTime = 0;
    }

    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    async connect() {
        if (!this.init) {
            this.closed = false;
            this.init = true;
            //creates Web Socket
            this.ws = new WebSocket(this.getUrl());
            this.ws.binaryType = 'arraybuffer';
            this.checkStatus(Status.CONNECTING);
            console.warn('WebSocket stream connecting');
            this.ws.onopen = function(event) {
                this.checkAndClearReconnection();
                this.checkStatus(Status.CONNECTED);
                console.warn('WebSocket stream connected');
            }.bind(this);

            this.ws.onmessage = function (event) {
                this.lastReceiveTime = Date.now();
                //callback data on message received
                if (event.data.byteLength > 0) {
                    this.onMessage(event.data);
                }
            }.bind(this);

            // closes socket if any errors occur
            this.ws.onerror = function (event) {
                console.error('WebSocket stream error');
                this.checkStatus(Status.DISCONNECTED);
                this.init = false;
                this.lastReceiveTime = -1;
                this.createReconnection();
            }.bind(this);

            this.ws.onclose = (event) => {
                this.checkStatus(Status.DISCONNECTED);
                console.warn('WebSocket stream closed: ',event.reason, event.code);
                this.init = false;
                if(event.code !== 1000 && !this.closed) {
                    this.createReconnection();
                }
            };
        }
    }

    createReconnection() {
        if(!this.closed && this.reconnectionInterval === -1 && this.onReconnect()) {
            this.reconnectionInterval =  setInterval(function () {
                let delta = Date.now() - this.lastReceiveTime;
                // -1 means the WS went in error
                if (this.lastReceiveTime === -1 || (delta >= this.reconnectTimeout)) {
                    console.warn('trying to reconnect', this.url);
                    this.connect();
                }
            }.bind(this), this.reconnectTimeout);
        }
    }

    /**
     * Disconnects and close the websocket.
     */
    disconnect() {
       super.disconnect();
       this.init = false;
       this.closed = true;
       if (this.ws != null && this.ws.readyState !== WebSocket.CLOSED) {
           this.ws.close();
       }
    }

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */
    onMessage(data) {
    }


    isConnected() {
        return (this.ws != null && this.ws.readyState === WebSocket.OPEN);
    }
}

export default WebSocketConnector;
