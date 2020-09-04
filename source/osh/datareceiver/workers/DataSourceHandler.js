import WebSocketConnector from "../../dataconnector/WebSocketConnector";
import Ajax from "../../dataconnector/Ajax";
import {isDefined} from "../../utils/Utils";
import TopicConnector from "../../dataconnector/TopicConnector";

class DataSourceHandler {

    constructor(parser) {
        this.parser = parser;
        this.connector = null;

        this.lastTimeStamp = null;
        this.lastStartTime = 'now';
        this.timeShift = 0;
        this.reconnectTimeout = 1000 * 10; // 10 secs
    }

    createConnector(propertiesStr, topic, dataSourceId) {
        this.dataSourceId = dataSourceId;
        // check for existing connector
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
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.reconnectTimeout);
        } else if (properties.protocol.startsWith('http')) {
            this.connector = new Ajax(url);
            this.connector.responseType = 'arraybuffer';
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.reconnectTimeout);
        } else if (properties.protocol.startsWith('topic')) {
            this.connector = new TopicConnector(url);
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.reconnectTimeout);
        }

        const lastStartTimeCst  = this.parser.lastStartTime;
        const lastProperties = properties;
        if(this.connector !== null) {
            this.connector.onReconnect = () => {
                // if not real time, preserve last timestamp to reconnect at the last time received
                // for that, we update the URL with the new last time received
                if (lastStartTimeCst !== 'now') {
                    this.connector.setUrl(this.parser.buildUrl(
                        {
                            ...properties,
                            lastTimeStamp: new Date(this.lastTimeStamp).toISOString(),
                        }));
                }
                return true;
            }
        }
    }

    /**
     * Sets the current topic to listen
     * @param {String} topic - the topic to listen
     */
    setTopic(topic) {
        if(this.broadcastChannel !== null) {
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

    onMessage(event) {
        const obj = {
            dataSourceId: this.dataSourceId,
            timeStamp: this.parser.parseTimeStamp(event) + this.timeShift,
            data: this.parser.parseData(event)
        };
        this.lastTimeStamp = obj.timeStamp;
        this.broadcastChannel.postMessage(obj);
    }

    getLastTimeStamp() {
        return this.lastTimeStamp;
    }

    updateUrl(properties) {
        const isConnected = this.connector.isConnected();
        if(isConnected) {
            this.disconnect();
        }
        let lastTimestamp =  new Date(this.lastTimeStamp).toISOString();

        if(properties.hasOwnProperty('startTime')) {
            lastTimestamp = properties.startTime;
        } else if(this.properties.startTime === 'now'){
            //handle RealTime
            lastTimestamp = 'now';
        }

        this.createDataConnector({
            ...this.properties,
            ...properties,
            lastTimeStamp: lastTimestamp
        });
        if(isConnected) {
            this.connect();
        }
    }

    handleMessage(message, worker) {
        if(message.message === 'init') {
            this.createConnector(message.properties, message.topic, message.id);
        } else if (message.message === 'connect') {
            this.connect();
        } else if (message.message === 'disconnect') {
            this.disconnect();
        } else if (message.message === 'topic') {
            this.setTopic(message.topic);
        } else if (message.message === 'last-timestamp') {
            const lastTimeStamp = this.getLastTimeStamp();
            worker.postMessage({
                message: 'last-timestamp',
                data: lastTimeStamp
            })
        }  else if (message.message === 'update-url') {
            this.updateUrl(message.data);
        } else if (message.message === 'is-connected') {
            worker.postMessage({
                message: 'is-connected',
                data: this.connector.isConnected()
            })
        }
    }
}
export default DataSourceHandler;

