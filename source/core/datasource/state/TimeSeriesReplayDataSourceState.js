import TimeSeriesDataSourceState from "./TimeSeriesDataSourceState";

class TimeSeriesReplayDataSourceState extends TimeSeriesDataSourceState {
    init(props) {
        super.init(props);
        this.startTime = props.startTime;
        this.endTime = props.endTime;
        this.replaySpeed = props.replaySpeed;
    }

    setTime(startTime = this.startTime, endTime = this.endTime, replaySpeed = this.replaySpeed) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.replaySpeed = replaySpeed;
    }

    setReplaySpeed(replaySpeed = this.replaySpeed) {
        this.replaySpeed = replaySpeed;
    }

    getType() {
        return "REPLAY";
    }

    getStartTime() {
        return this.startTime;
    }

    getEndTime() {
        return this.endTime;
    }

    getReplaySpeed() {
        return this.replaySpeed;
    }

    setConnector(connector, queryStringFn) {
        super.setConnector(connector);
        this.connector.onReconnect = () => {
            // if not real time, preserve last timestamp to reconnect at the last time received
            // for that, we update the URL with the new last time received
            this.connector.queryString = queryStringFn({
                ...this.props,
                startTime: this.getStartTime(),
                endTime: this.getEndTime(),
                replaySpeed: this.getReplaySpeed()
            });
            return true;
        }
    }

    setLastTimestamp(timestamp) {
        if(timestamp) {
            super.setLastTimestamp(timestamp);
            this.setTime(new Date(timestamp).toISOString());
        }
    }
}

export default TimeSeriesReplayDataSourceState;

