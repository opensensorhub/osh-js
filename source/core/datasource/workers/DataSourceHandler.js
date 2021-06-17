import WebSocketConnector from "../../protocol/WebSocketConnector.js";
import Ajax from "../../protocol/Ajax.js";
import {isDefined} from "../../utils/Utils.js";
import TopicConnector from "../../protocol/TopicConnector.js";
import {EventType} from "../../event/EventType.js";
import {Status} from "../../protocol/Status";
import FileConnector from "../../protocol/FileConnector";

class DataSourceHandler {

    constructor(parser) {
        this.parser = parser;
        this.connector = null;
        this.reconnectTimeout = 1000 * 10; // 10 secs
        this.values = [];
        this.version = -Number.MAX_SAFE_INTEGER;
    }

    createConnector(propertiesStr, topic, dataSourceId) {
        this.dataSourceId = dataSourceId;
        // check for existing protocol
        if(this.connector !== null) {
            this.connector.disconnect();
            this.connector = null;
        }

        this.broadcastChannel = new BroadcastChannel(topic);

        const properties = JSON.parse(propertiesStr);

        if (isDefined(properties.timeShift)) {
            this.timeShift = properties.timeShift;
        }

        if (isDefined(properties.bufferingTime)) {
            this.bufferingTime = properties.bufferingTime;
        }

        if (isDefined(properties.timeOut)) {
            this.timeOut = properties.timeOut;
        }

        if (isDefined(properties.reconnectTimeout)) {
            this.reconnectTimeout = properties.reconnectTimeout;
        }

        if(properties.startTime === 'now') {
            this.batchSize = 1;
        } else {
            if (isDefined(properties.replaySpeed)) {
                if (!isDefined(properties.batchSize)) {
                    this.batchSize = 1;
                }
            }

            if (isDefined(properties.batchSize)) {
                this.batchSize = properties.batchSize;
            }
        }

        this.properties = properties;
        this.createDataConnector(this.properties);
    }

    /**
     * @private
     */
    createDataConnector(properties) {
        const url = this.parser.buildUrl({
            ...properties,
            timeShift: this.timeShift
        });

        // checks if type is WebSocketConnector
        if (properties.protocol.startsWith('ws')) {
            this.connector = new WebSocketConnector(url);
        } else if (properties.protocol.startsWith('http')) {
            this.connector = new Ajax(url);
            this.connector.responseType = properties.responseType || 'arraybuffer';
        } else if (properties.protocol.startsWith('topic')) {
            this.connector = new TopicConnector(url);
        } else if (properties.protocol.startsWith('file')) {
            this.connector = new FileConnector(url,properties);
        }

        if (this.connector !== null) {
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.reconnectTimeout);

            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);

            // bind change connection STATUS
            this.connector.onChangeStatus   = this.onChangeStatus.bind(this);
        }
    }

    /**
     * Sets the current topic to listen
     * @param {String} topic - the topic to listen
     */
    setTopic(topic) {
        if(isDefined(this.broadcastChannel)) {
            this.broadcastChannel.close();
        }
        this.broadcastChannel = new BroadcastChannel(topic);
        this.topic = topic;
    }

    connect() {
        if(this.connector !== null) {
            this.connector.connect();
        }
    }

    disconnect() {
        if(this.connector !== null) {
            this.connector.disconnect();
        }
    }

    async onMessage(event) {
        const data   = await Promise.resolve(this.parser.parseData(event));

        // check if data is array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
                if (isDefined(this.batchSize) && this.values.length >= this.batchSize) {
                    this.flush();
                }
            }
        } else {
            this.values.push({
                data: data,
                version: this.version
            });
        }
        // because parseData is ASYNC, the protocol can finish before the parsing method. In that case, we have to flushALl data
        if (!this.isConnected()) {
            this.flushAll();
        } else if (isDefined(this.batchSize) && this.values.length !== 0 && this.values.length >= this.batchSize) {
            this.flush();
        }
    }

    /**
     * Send a change status event into the broadcast channel
     * @param {Status} status - the new status
     */
    onChangeStatus(status) {
        if(status === Status.DISCONNECTED) {
            this.flushAll();
        }

        this.broadcastChannel.postMessage({
            type: EventType.STATUS,
            status: status,
            dataSourceId: this.dataSourceId
        });
    }

    updateProperties(properties) {
        this.disconnect();

        this.createDataConnector({
            ...this.properties,
            ...properties
        });

        this.version++;
        this.connect();
    }

    flushAll() {
        while(this.values.length > 0) {
            this.flush();
        }
    }

    flush() {
        let nbElements = this.values.length;
        if (isDefined(this.batchSize) && this.values.length > this.batchSize) {
            nbElements = this.batchSize;
        }
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values.splice(0, nbElements)
        });
    }

    isConnected() {
        return (this.connector === null)? false: this.connector.isConnected();
    };

    handleMessage(message, worker) {
        if(message.message === 'init') {
            this.createConnector(message.properties, message.topic, message.id);
        } else if (message.message === 'connect') {
            this.connect();
        } else if (message.message === 'disconnect') {
            this.disconnect();
        } else if (message.message === 'topic') {
            this.setTopic(message.topic);
        } else if (message.message === 'update-url') {
            this.updateProperties(message.data);
        } else if (message.message === 'is-connected') {
            worker.postMessage({
                message: 'is-connected',
                data: this.isConnected()
            })
        }
    }
}
export default DataSourceHandler;

