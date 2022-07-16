import WebSocketConnector from "../../protocol/WebSocketConnector.js";
import {isDefined, randomUUID} from "../../utils/Utils.js";
import TopicConnector from "../../protocol/TopicConnector.js";
import {EventType} from "../../event/EventType.js";
import {Status} from "../../protocol/Status";
import HttpConnector from "../../protocol/HttpConnector";
import MqttConnector from "../../protocol/MqttConnector";
import TimeSeriesLiveDataSourceState from "../state/LiveDataSourceState";
import TimeSeriesReplayDataSourceState from "../state/ReplayArchiveDataSourceState";
import DataSourceState from "../state/DataSourceState";

class DataSourceHandler {

    constructor() {
        this.connector = null;
        this.values = [];
        this.version = -Number.MAX_SAFE_INTEGER;
        this.state = undefined;
        this.properties = {
            reconnectTimeout: 1000 * 10,
            timeOut: 0
        }
        this.batchSize = 1;
    }

    init(propertiesStr, topic, dataSourceId) {
        this.dataSourceId = dataSourceId;
        this.setTopic(topic);
        this.handleProperties(propertiesStr);
        this.createDataConnector(this.properties).then((connector) => this.createState(connector));
    }

    createState(connector) {
       this.state = new DataSourceState();
       this.state.setConnector(connector);
       this.onChangeStatus = this.state.onChangeStatus;
    }

    handleProperties(properties) {
        this.properties = {
            ...this.properties,
            properties
        };
    }

    /**
     * @protected
     */
    async createDataConnector(properties, connector = undefined) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;

        if(!isDefined(connector)) {
            // checks if type is WebSocketConnector
            if (properties.protocol.startsWith('ws')) { // for wss
                this.connector = new WebSocketConnector(url, properties);
            } else if (properties.protocol.startsWith('http')) { //for https
                this.connector = new HttpConnector(url, {
                    responseType: properties.responseType || 'arraybuffer',
                    method: 'GET'
                });
            } else if (properties.protocol === 'topic') {
                this.connector = new TopicConnector(url);
            } else if(properties.protocol === 'mqtt') {
                const tls = (properties.tls) ? 's' : '';
                const url = properties.protocol + tls + '://' + properties.mqttOpts.endpointUrl;
                this.connector =  new MqttConnector(url, properties);
            }
        } else {
            this.connector = connector;
        }
        await this.setUpConnector(properties);
        return this.connector;
    }

    async setUpConnector(properties) {
        if (this.connector !== null) {
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.properties.reconnectTimeout);

            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);

            await this.updateAferCreatingConnector(properties);
        }
    }

    async updateAferCreatingConnector(properties) {}

    /**
     * Sets the current topic to listen
     * @param {String} topic - the topic to listen
     */
    setTopic(topic) {
        if(this.topic === topic) {
            return;
        }

        if(isDefined(this.broadcastChannel)) {
            console.warn(`Replace old topic ${this.topic} by ${topic}`)
            this.broadcastChannel.close();
        }
        this.broadcastChannel = new BroadcastChannel(topic);
        this.topic = topic;
    }

    connect() {
        if(this.connector !== null) {
            this.connector.doRequest('', this.getQueryString(this.state.props));
        }
    }

    getQueryString(properties) {}

    disconnect() {
        if(this.connector !== null) {
            this.connector.disconnect();
        }
    }

    async parseData(message){}

    async onMessage(event) {
        let data = await this.parseData(event);

        // check if data is an array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
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
        }
        if (this.values.length !== 0 && this.values.length >= this.batchSize) {
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
        this.properties = properties;
        this.disconnect();
        this.createDataConnector(properties).then(() => {
            this.version++;
            this.connect();
        });
    }

    flushAll() {
        while(this.values.length > 0) {
            this.flush();
        }
    }

    flush() {
        let nbElements = this.values.length;
        // console.log('push message on ',this.broadcastChannel)
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values.splice(0, nbElements)
        });
    }

    isInitialized() {
        return this.state.initialized;
    }

    isConnected() {
        return this.state.status === Status.CONNECTED;
    };

    handleMessage(message, worker) {
        let value = undefined;

        if(message.message === 'init') {
            if(!this.isInitialized()) {
                this.init(message.properties, message.topic, message.id);
            }
            value = this.isInitialized();
        } else if (message.message === 'connect') {
            this.connect();
        } else if (message.message === 'disconnect') {
            this.disconnect();
        } else if (message.message === 'topic') {
            this.setTopic(message.topic);
        } else if (message.message === 'update-url') {
            this.updateProperties(
                {
                    ...this.properties,
                    ...message.data
                });
        } else if (message.message === 'is-connected') {
            value = this.isConnected();
        } else if (message.message === 'is-init') {
            value = this.isInitialized();
        } else {
            // skip response
            return;
        }
        worker.postMessage({
            message: message.message,
            data: value,
            messageId: message.messageId
        })
    }
}
export default DataSourceHandler;

