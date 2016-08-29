/**
 * @type {OSH.DataConnector.DataConnector}
 * @classdesc Defines the AjaxConnector to connect to a remote server by making AjaxRequest.
 * @class
 * @augments OSH.DataConnector.DataConnector
 */
OSH.DataConnector.WebSocketDataConnector = Class.create(OSH.DataConnector.DataConnector, {
    /**
     * Connect to the webSocket. If the system supports WebWorker, it will automatically creates one otherwise use
     * the main thread.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    connect: function () {
        if (!this.init) {
            //creates Web Socket
            if (OSH.Utils.isWebWorker()){
                var url = this.getUrl();
                var blobURL = URL.createObjectURL(new Blob(['(',

                        function () {
                            var ws = null;
                            self.onmessage = function (e) {
                                if(e.data == "close") {
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
                                        //this.onMessage(event.data);
                                        self.postMessage(event.data);
                                    }
                                }

                                ws.onerror = function(event) {
                                    ws.close();
                                }
                            }

                            function close() {
                                ws.close();
                            }
                        }.toString(), ')()'],
                    {type: 'application/javascript'}));

                this.worker = new Worker(blobURL);

                this.worker.postMessage(url);
                this.worker.onmessage = function (e) {
                    this.onMessage(e.data);
                }.bind(this);

                // Won't be needing this anymore
                URL.revokeObjectURL(blobURL);
            } else {
                this.ws = new WebSocket(this.getUrl());
                this.ws.binaryType = 'arraybuffer';
                this.ws.onmessage = function (event) {
                    //callback data on message received
                    if (event.data.byteLength > 0) {
                        this.onMessage(event.data);
                    }
                }.bind(this);

                // closes socket if any errors occur
                this.ws.onerror = function(event) {
                    this.ws.close();
                }.bind(this);
            }
            this.init = true;
        }
    },

    /**
     * Disconnects the websocket.
     * @instance
     * @memberof OSH.DataConnector.WebSocketDataConnector
     */
    disconnect: function() {
        if (OSH.Utils.isWebWorker() && this.worker != null) {
            this.worker.postMessage("close");
            this.worker.terminate();
            this.init = false;
        } else if (this.ws != null) {
            this.ws.close();
            this.init = false;
        }
    },

    /**
     * The onMessage method used by the websocket to callback the data
     * @param data the callback data
     */
    onMessage: function (data) {
    },

    /**
     * Closes the webSocket.
     */
    close: function() {
        this.disconnect();
    }
});

