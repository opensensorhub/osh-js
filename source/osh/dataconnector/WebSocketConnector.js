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

/**
 * Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @extends DataConnector
 * @example
 * import Buffer from 'osh/dataconnector/WebSocketConnector.js';
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
        this.blobURL = URL.createObjectURL(new Blob(['(',

                function () {
                    var ws = null;
                    self.onmessage = function (e) {
                        if (e.data === 'close') {
                            close();
                        } else {
                            // is URL
                            init(e.data);
                        }
                    }

                    function init(url) {
                        ws = new WebSocket(url);
                        ws.binaryType = 'arraybuffer';
                        ws.onmessage = function (event) {
                            //callback data on message received
                            if (event.data.byteLength > 0) {
                                self.postMessage(event.data, [event.data]);
                            }
                        }

                        ws.onerror = function (event) {
                            console.error('WebSocket WebWorker stream error: ' + event);
                            close();
                        };
                    }

                    function close() {
                        if(ws.readyState === WebSocket.OPEN) {
                            ws.close();
                        }
                    }
                }.toString(), ')()'],
            {type: 'application/javascript'}));
        this.interval = -1;
        this.lastReceiveTime = -1;
    }

    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     */
    connect() {
        if (!this.init) {
            this.init = true;
            //creates Web Socket
            if (isWebWorker()) {
                var url = this.getUrl();
                this.worker = new Worker(this.blobURL);

                this.worker.postMessage(url);
                this.worker.onmessage = function (e) {
                    this.lastReceiveTime = Date.now();
                    this.onMessage(e.data);
                }.bind(this);

                // closes socket if any errors occur
                this.worker.onerror = function (event) {
                    console.error('WebSocket stream error: ' + event);
                    this.worker.close();
                    this.init = false;
                }.bind(this);

            } else {
                this.ws = new WebSocket(this.getUrl());
                this.ws.binaryType = 'arraybuffer';
                this.ws.onmessage = function (event) {
                    this.lastReceiveTime = Date.now();
                    //callback data on message received
                    if (event.data.byteLength > 0) {
                        this.onMessage(event.data);
                    }
                }.bind(this);

                // closes socket if any errors occur
                this.ws.onerror = function (event) {
                    console.error('WebSocket stream error: ' + event);
                    this.ws.close();
                    this.init = false;
                    this.lastReceiveTime = -1;
                }.bind(this);
            }

            //init the reconnect handler
            if (this.interval === -1) {
                this.interval = window.setInterval(function () {
                    let delta = Date.now() - this.lastReceiveTime;
                    // -1 means the WS went in error
                    if (this.lastReceiveTime === -1 || (delta >= this.reconnectTimeout)) {
                        console.warn(`trying to reconnect after ${this.reconnectTimeout} ..`);
                        this.reconnect();
                    }
                }.bind(this), this.reconnectTimeout);
            }
        }
    }

    /**
     * Disconnects the websocket.
     */
    disconnect() {
        this.fullDisconnect(true);
    }

    /**
     * Fully disconnect the websocket connection by sending a close message to the webWorker.
     * @param {Boolean} removeInterval  - force removing the interval
     */
    fullDisconnect(removeInterval) {
        if (this.worker != null) {
            this.worker.postMessage("close");
            this.worker.terminate();
            this.init = false;
        } else if (this.ws != null) {
            this.ws.close();
            this.init = false;
        }
        if (removeInterval) {
            window.clearInterval(this.interval);
        }
    }

    /**
     * Try to reconnect if the connexion if closed
     */
    reconnect() {
        this.onReconnect();
        if (this.init) {
            this.fullDisconnect(false);
        }
        this.connect();

    }

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @event
     */
    onMessage(data) {
    }

    /**
     * Closes the webSocket.
     */
    close() {
        this.disconnect();
    }
}

export default WebSocketConnector;
