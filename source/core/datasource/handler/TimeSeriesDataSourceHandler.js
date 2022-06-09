import {isDefined} from "../../utils/Utils.js";
import DataSourceHandler from "./DataSourceHandler";
import {EventType} from "../../event/EventType";

class TimeSeriesDataSourceHandler extends DataSourceHandler {

    constructor(parser) {
        super(parser);
        this.lastTimeStamp = null;
        this.lastStartTime = 'now';
        this.timeShift = 0;
        this.timeBroadcastChannel = null;
    }

    /**
     * @protected
     */
    async createDataConnector(properties, connector) {
        super.createDataConnector({
            ...properties,
            timeShift: this.timeShift
        }, connector);

        const lastStartTimeCst = this.parser && this.lastStartTime || properties.startTime;
        const endpoint = properties.protocol + '://' + properties.endpointUrl;

        this.connector.onReconnect = () => {
            // if not real time, preserve last timestamp to reconnect at the last time received
            // for that, we update the URL with the new last time received
            if (lastStartTimeCst !== 'now') {
                this.connector.setUrl(endpoint + '?' + this.parser.buildUrl({
                        ...properties,
                        lastTimeStamp: isDefined(this.lastTimeStamp) ? new Date(this.lastTimeStamp).toISOString() : properties.startTime,
                    }));
            }
            return true;
        }
    }

    handleProperties(properties) {
        super.handleProperties(properties);

        if (isDefined(properties.timeShift)) {
            this.timeShift = properties.timeShift;
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
    }

    async onMessage(event) {
        let data;
        if(isDefined(this.parser)) {
            data   = await Promise.resolve(this.parser.parseDataBlock(event));
        } else {
            // pass through
            data = event;
        }
        // check if data is array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
                this.lastTimestamp = data[i].timestamp;
            }
        } else {
            this.values.push({
                data: data,
                version: this.version
            });
            this.lastTimestamp = data.timestamp;
        }

        if(this.lastStartTime === 'now' || ((isDefined(this.batchSize) && this.values.length >= this.batchSize))) {
            this.flush();
            if(this.timeBroadcastChannel !== null) {
                this.timeBroadcastChannel.postMessage({
                    timestamp: this.lastTimestamp,
                    type: EventType.TIME
                });
            }
        }
    }

    getLastTimeStamp() {
        return this.lastTimestamp;
    }

    async updateProperties(properties) {
        try {
            await this.disconnect();
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });

            let lastTimestamp;
            if (properties.hasOwnProperty('startTime')) {
                lastTimestamp = properties.startTime;
            } else if (this.properties.startTime === 'now') {
                //handle RealTime
                lastTimestamp = 'now';
            } else if(this.lastTimestamp) {
                lastTimestamp = new Date(this.lastTimestamp).toISOString();
            } else {
                throw Error('Neither startTime, now or lastTimestamp are defined');
            }

            this.version++;

            await this.createDataConnector({
                ...this.properties,
                ...properties,
                lastTimestamp: lastTimestamp
            });

            if (isDefined(properties) && isDefined(properties.reconnect) && properties.reconnect) {
                this.connect();
            }
        } catch (ex) {
            console.error(ex);
            throw ex;
        }
    }

    handleMessage(message, worker) {
        super.handleMessage(message, worker);

        let data = undefined;
        if (message.message === 'last-timestamp') {
            data = this.getLastTimeStamp();
        } else if (message.message === 'topic') {
            this.setTimeTopic(message.timeTopic);
        } else {
            // skip response
            return;
        }
        worker.postMessage({
            message: message.message,
            data: data,
            messageId: message.messageId
        })
    }

    setTimeTopic(timeTopic) {
        if(this.timeTopic === timeTopic) {
            return;
        }
        if(this.timeBroadcastChannel !== null) {
            console.warn(`Replace old topic ${this.timeTopic} by ${timeTopic}`)
            this.timeBroadcastChannel.close();
        }
        this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
        this.timeTopic = timeTopic;
    }
}
export default TimeSeriesDataSourceHandler;

