import {isDefined} from "../../utils/Utils.js";
import DataSourceHandler from "./DataSourceHandler";
import {EventType} from "../../event/EventType";
import TimeSeriesReplayDataSourceState from "../state/TimeSeriesReplayDataSourceState";
import TimeSerieLiveDataSourceState from "../state/TimeSerieLiveDataSourceState";

class TimeSeriesDataSourceHandler extends DataSourceHandler {

    constructor() {
        super();
        this.timeBroadcastChannel = null;
        this.liveState = new TimeSerieLiveDataSourceState();
        this.replayState = new TimeSeriesReplayDataSourceState();
    }

    async onMessage(event) {
        let data = await this.parseData(event);
        let lastTimestamp;

        // check if data is an array
        if (Array.isArray(data)) {
            for(let i=0;i < data.length;i++) {
                this.values.push({
                    data: data[i],
                    version: this.version
                });
            }
            // store only last one
            lastTimestamp = data[data.length-1].timestamp;
        } else {
            this.values.push({
                data: data,
                version: this.version
            });
            lastTimestamp = data.timestamp;
        }

        this.state.setLastTimestamp(lastTimestamp);
        if(this.state.isLive() || ((isDefined(this.batchSize) && this.values.length >= this.batchSize))) {
            this.flush();
            if(this.timeBroadcastChannel !== null) {
                this.timeBroadcastChannel.postMessage({
                    timestamp: lastTimestamp,
                    type: EventType.TIME
                });
            }
        }
    }

    async createState() {
        if(this.properties.startTime === 'now') {
            this.state = this.liveState;
        } else {
            this.state = this.replayState;
        }
        await this.updateState();
    }

    async updateState() {
        this.state.init(this.properties);
    }

    getLastTimeStamp() {
        return this.state.lastTimestamp;
    }

    async updateProperties(properties) {
        try {
            await this.disconnect();
            this.properties = properties;
            this.timeBroadcastChannel.postMessage({
                dataSourceId: this.dataSourceId,
                type: EventType.TIME_CHANGED
            });
            // update state if switching from Replay to Live
            if(properties.startTime === 'now') {
                this.state = this.liveState;
            } else {
                this.state = this.replayState;
            }

            await this.updateState();
            if (properties && properties.reconnect) {
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

