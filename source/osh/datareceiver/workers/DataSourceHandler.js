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
        this.reconnectTimeout = 1000 * 60 * 2; //2 min
        this.connected = false;
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

        const url = this.parser.buildUrl({
            ...properties,
            timeShift: this.timeShift
        });
        // checks if type is WebSocketConnector
        if (properties.protocol.startsWith('ws')) {
            this.connector = new WebSocketConnector(url);
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
        } else if (properties.protocol.startsWith('http')) {
            this.connector = new Ajax(url);
            this.connector.responseType = 'arraybuffer';
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
        } else if (properties.protocol.startsWith('topic')) {
            this.connector = new TopicConnector(url);
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
        }

        const lastStartTimeCst  = this.parser.lastStartTime;
        if(this.connector !== null) {
            this.connector.onReconnect = () => {
                // if not real time, preserve last timestamp to reconnect at the last time received
                // for that, we update the URL with the new last time received
                if (lastStartTimeCst !== 'now') {
                    this.connector.setUrl(this.parser.buildUrl(
                        {
                            lastTimeStamp: new Date(this.lastTimeStamp).toISOString(),
                            ...properties
                        }));
                }
            }
        }
    }

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
}
export default DataSourceHandler;

