import {isDefined} from "../../utils/Utils.js";
import DataSourceHandler from "./DataSourceHandler";
import {EventType} from "../../event/EventType";

class TimeSeriesDataSourceHandler extends DataSourceHandler {

    constructor() {
        super();
        this.lastTimestamp = null;
        this.lastStartTime = 'now';
        this.timeShift = 0;
        this.timeBroadcastChannel = null;
    }

    /**
     * @protected
     */
    async createDataConnector(properties, connector) {
        await super.createDataConnector({
            ...properties,
            timeShift: this.timeShift
        }, connector);

        let lastStartTimeCst = this.lastStartTime ;
        if(isDefined(properties.startTime)) {
            lastStartTimeCst = properties.startTime;
        }

        this.connector.onReconnect = () => {
            // if not real time, preserve last timestamp to reconnect at the last time received
            // for that, we update the URL with the new last time received
            if (lastStartTimeCst !== 'now') {
                this.connector.queryString = this.getQueryString({
                    ...properties,
                    startTime: isDefined(this.lastTimestamp) ? new Date(this.lastTimestamp).toISOString() : properties.startTime,
                });
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
        let data = await this.parseData(event);

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

            let lastTimestampStr;
            console.log('ici')
            if (properties.hasOwnProperty('startTime')) {
                lastTimestampStr = properties.startTime;
            } else if (this.properties.startTime === 'now') {
                //handle RealTime
                lastTimestampStr = 'now';
            } else if(this.lastTimestamp) {
                lastTimestampStr = new Date(this.lastTimestamp).toISOString();
            } else {
                throw Error('Neither startTime, now or lastTimestamp are defined');
            }

            this.version++;

            await this.createDataConnector({
                ...this.properties,
                ...properties,
                lastTimestamp: lastTimestampStr
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

