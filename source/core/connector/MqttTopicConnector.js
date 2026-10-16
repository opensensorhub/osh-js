import DataConnector from "./DataConnector";
import {Status} from "./Status";

/**
 * Defines the MqttTopicConnector to communicate with Shared MqttConnector using broadcast channel
 * @extends DataConnector
 */
class MqttTopicConnector extends DataConnector {
    /**
     *
     * @param properties -
     */
    constructor(url, properties) {
        super(url, properties);
        this.lastReceiveTime = -1;
        this.interval = -1;
        this.broadcastChannel = new BroadcastChannel(url);
        this.broadcastChannel.onmessage = (message) => {
            if(message.data.topic === this.fullTopic) {
                this.onMessage(message.data.data);
            }
        }
        this.topics = [];
    }

    doRequest(topic = '',queryString= undefined) {
        this.fullTopic = topic + '?'+queryString;
        this.broadcastChannel.postMessage({
            message: 'subscribe',
            connectorId: this.id,
            topic: this.fullTopic
        });
        this.topics.push(this.fullTopic);
        this.onChangeStatus(Status.CONNECTED);
    }
    /**
     * Disconnects.
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
            for(let topic of this.topics) {
                this.broadcastChannel.postMessage({
                    message: 'unsubscribe',
                    connectorId: this.id,
                    topic: topic,
                });
            }
            this.broadcastChannel.close();
            this.broadcastChannel = null;
            this.topics = [];
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

    checkStatus(status) {
        this.onChangeStatus(status);
        this.status = status;
    }
}

export default MqttTopicConnector;
