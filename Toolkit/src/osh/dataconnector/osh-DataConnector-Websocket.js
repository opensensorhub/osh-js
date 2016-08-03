OSH.DataConnector.WebSocketDataConnector = Class.create(OSH.DataConnector.DataConnector, {
    connect: function () {
        if (this.ws == null) {
            //creates Web Socket
            if (OSH.Utils.isWebWorker()) {
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

        }
    },

    disconnect: function() {
        if (OSH.Utils.isWebWorker() && this.worker != null) {
            this.worker.postMessage("close");
            this.worker = null;
        } else if (this.ws != null) {
            this.ws.close();
            this.ws = null;
        }
    },

    onMessage: function (data) {
    }
});

