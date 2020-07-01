import DataConnector from "./DataConnector";

class SimConnector extends DataConnector {

    constructor(properties) {
        super(properties);
        this.interval = 1000;
        this.lastTimestamp = -1;

        if (properties.hasOwnProperty('interval')) {
            this.interval = properties.interval;
        }
        if (properties.hasOwnProperty('dataCallback')) {
            this.dataCallback = properties.dataCallback;
        }
    }

    connect() {
        console.log('Connecting...')
        if (!this.init) {
            this.worker = new Worker('../datareceiver/SimWorker.js');
            this.worker.postMessage({cmd: 'start', msg: 'Start Data'});
            this.worker.postMessage({cmd: 'setInterval', msg: this.interval, interval: this.interval});
            this.worker.postMessage({cmd: 'setDataCallback', callback: this.dataCallback});

            this.worker.onmessage = (ev) => {
                this.lastTimestamp = Date.now();
                this.onMessage(ev.data);
            }; // Do we need a binding here?

            this.worker.postMessage({cmd: 'startData'});
        }
    }

    /**
     * Disconnects the websocket.
     */
    disconnect() {
        // this.fullDisconnect(true);
        this.worker.postMessage({cmd: 'stop', msg: 'Stop Worker'});
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

export default SimConnector;