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
        this.broadcastChannel = null;
        this.messagePort = properties.mqttOpts && properties.mqttOpts.messagePort;
        this.pendingSubscriptions = new Map();
        this.openBroadcastChannel();
        this.topics = [];
    }

    openBroadcastChannel() {
        if (this.messagePort) {
            this.messagePort.onmessage = (message) => {
                if(message.data.message === 'subscribe-ack') {
                    this.clearSubscriptionRetry(message.data.topic);
                } else if(message.data.message === 'subscribe-error') {
                    this.clearSubscriptionRetry(message.data.topic);
                    console.error(`MQTT subscription failed for ${message.data.topic}: ${message.data.error}`);
                    this.onChangeStatus(Status.CLOSED_ERROR);
                } else if(message.data.topic === this.fullTopic &&
                    !message.data.message) {
                    this.onMessage(message.data.data);
                }
            };
            this.messagePort.start();
            return;
        }
        if (this.broadcastChannel !== null) {
            return;
        }
        this.broadcastChannel = new BroadcastChannel(this.url);
        this.broadcastChannel.onmessage = (message) => {
            if(message.data.message === 'subscribe-ack' &&
                message.data.connectorId === this.id) {
                this.clearSubscriptionRetry(message.data.topic);
            } else if(message.data.topic === this.fullTopic &&
                !message.data.message) {
                this.onMessage(message.data.data);
            }
        }
    }

    clearSubscriptionRetry(topic) {
        const retry = this.pendingSubscriptions.get(topic);
        if (retry) {
            clearInterval(retry);
            this.pendingSubscriptions.delete(topic);
        }
    }

    requestSubscription(topic) {
        if (this.messagePort) {
            this.messagePort.postMessage({
                message: 'subscribe',
                connectorId: this.id,
                topic: topic
            });
            return;
        }
        if (this.broadcastChannel === null) {
            return;
        }
        this.broadcastChannel.postMessage({
            message: 'subscribe',
            connectorId: this.id,
            topic: topic
        });
    }

    doRequest(topic = '',queryString= undefined) {
        this.openBroadcastChannel();
        this.fullTopic = topic + '?'+queryString;
        if (this.topics.includes(this.fullTopic)) {
            this.onChangeStatus(Status.CONNECTED);
            return;
        }
        this.requestSubscription(this.fullTopic);
        this.pendingSubscriptions.set(this.fullTopic, setInterval(() => {
            this.requestSubscription(this.fullTopic);
        }, 500));
        this.topics.push(this.fullTopic);
        this.opened = true;
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
        if (this.messagePort) {
            for(let topic of this.topics) {
                this.clearSubscriptionRetry(topic);
                this.messagePort.postMessage({
                    message: 'unsubscribe',
                    connectorId: this.id,
                    topic: topic,
                });
            }
            this.topics = [];
        }
        if (this.broadcastChannel != null) {
            for(let topic of this.topics) {
                this.clearSubscriptionRetry(topic);
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
        this.onChangeStatus(Status.DISCONNECTED);
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
        return (this.messagePort || this.broadcastChannel !== null) && this.opened;
    }

    checkStatus(status) {
        this.onChangeStatus(status);
        this.status = status;
    }
}

export default MqttTopicConnector;
