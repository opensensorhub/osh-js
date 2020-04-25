/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2017 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 * @example
 * var url = ...;
 * var connector = new OSH.DataConnector.WebSocketDataConnector(url);
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
OSH.DataConnector.WebSocketDataConnector = OSH.DataConnector.DataConnector.extend({

    initialize: function(properties) {
        this._super(properties);
        this.blobURL = URL.createObjectURL(new Blob(['(',

                function () {
                    var ws = null;
                    self.onmessage = function (e) {
                        if(e.data === 'close') {
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
                                self.postMessage(event.data,[event.data]);
                            }
                        }

                        ws.onerror = function(event) {
                            console.error('WebSocket WbeWorker stream error: '+event);
                            ws.close();
                        };
                    }

                    function close() {
                        ws.close();
                    }
                }.toString(), ')()'],
            {type: 'application/javascript'}));
        this.interval = -1;
        this.lastTimestamp = -1;
    },

    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    connect: function () {
        if (!this.init) {
            this.init = true;
            //creates Web Socket
            if (OSH.Utils.isWebWorker()){
                var url = this.getUrl();
                this.worker = new Worker(this.blobURL);

                this.worker.postMessage(url);
                this.worker.onmessage = function (e) {
                    this.lastTimestamp = Date.now();
                    this.onMessage(e.data);
                }.bind(this);

                // closes socket if any errors occur
                this.worker.onerror = function(event) {
                    console.error('WebSocket stream error: '+event);
                    this.worker.close();
                    this.init = false;
                }.bind(this);

            } else {
                this.ws = new WebSocket(this.getUrl());
                this.ws.binaryType = 'arraybuffer';
                this.ws.onmessage = function (event) {
                    this.lastTimestamp = Date.now();
                    //callback data on message received
                    if (event.data.byteLength > 0) {
                        this.onMessage(event.data);
                    }
                }.bind(this);

                // closes socket if any errors occur
                this.ws.onerror = function(event) {
                    console.error('WebSocket stream error: '+event);
                    this.ws.close();
                    this.init = false;
                    this.lastTimestamp = -1;
                }.bind(this);
            }

            //init the reconnect handler
            if(this.interval === -1) {
                this.interval = window.setInterval(function () {
                    let currentTimestamp = Date.now();
                    let delta = currentTimestamp - this.lastTimestamp;
                    if (this.lastTimestamp === -1 || (delta >= this.reconnectTimeout)) {
                        console.warn('trying to reconnect..');
                        this.reconnect();
                    }
                }.bind(this), this.reconnectTimeout);
            }
        }
    },

    /**
     * Disconnects the websocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    disconnect: function() {
        this.fullDisconnect(true);
    },

    /**
     * Disconnects the websocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    fullDisconnect: function(removeInterval) {
        if (OSH.Utils.isWebWorker() && this.worker != null) {
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
    },

    /**
     * Try to reconnect if the connexion is closed
     */
    reconnect: function() {
        if(this.init) {
            this.fullDisconnect(false);
        }
        this.connect();
    },
    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    onMessage: function (data) {
    },

    /**
     * Closes the webSocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    close: function() {
        this.disconnect();
    }
});
