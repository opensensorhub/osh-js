OSH.DataConnector.WebSocketDataConnector = Class.create(OSH.DataConnector.DataConnector, {
    connect: function () {
        if (this.ws == null) {
            //creates Web Socket
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
    },

    disconnect: function() {
        if(this.ws != null) {
            this.ws.close();
            this.ws = null;
        }
    },

    onMessage: function (data) {
    }
});

