import DataConnector from "./DataConnector";

/**
 * Defines the FileConnector to read a File content
 * @extends DataConnector
 * @example
 * import FileConnector from 'core/protocol/TopicConnector.js';
 *
 * let protocol = new TopicConnector(<topic_name>);
 *
 * // connect
 * protocol.connect();
 *
 * // disconnect
 * protocol.disconnect();
 *
 * // close
 * protocol.close();
 *
 */
class TopicConnector extends DataConnector {
    /**
     *
     * @param properties -
     */
    constructor(properties) {
        super(properties);
        this.lastReceiveTime = -1;
        this.interval = -1;
        this.broadcastChannel = null;
    }

    /**
     * Connect to the broadcastChannel.
     */
    connect() {
        if (this.broadcastChannel === null) {
            //creates broadcastChannel
            this.broadcastChannel = new BroadcastChannel(this.getUrl());
            this.broadcastChannel.onmessage =  (event)  => {
                this.lastReceiveTime = Date.now();
                //callback data on message received
                this.onMessage(event.data.data);
            };

            // closes socket if any errors occur
            this.broadcastChannel.onerror =  (event) => {
                console.error('BroadcastChannel stream error: ' + event);
                this.broadcastChannel.close();
                this.init = false;
                this.lastReceiveTime = -1;
                this.opened = false;
            };
            this.opened = true;

            //init the reconnect handler
            if (this.interval === -1) {
                this.interval = setInterval(function () {
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
        if (this.broadcastChannel != null) {
            this.broadcastChannel.close();
            this.broadcastChannel = null;
        }
        if (removeInterval) {
            clearInterval(this.interval);
        }
        this.opened = false;
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

    isConnected() {
        return this.broadcastChannel !== null && this.opened;
    }
}

export default TopicConnector;
