import DataSourceState from "./DataSourceState";

class TimeSeriesReplayDataSourceState extends DataSourceState {
    init(props) {
        super.init(props);
        this.startTime = props.startTime;
        this.endTime = props.endTime;
        this.replaySpeed = props.replaySpeed;
        this.lastTimestamp = null;
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

    setConnector(connector) {
        super.setConnector(connector);
        this.connector.onReconnect = () => {
            // if not real time, preserve last timestamp to reconnect at the last time received
            // for that, we update the URL with the new last time received
            this.connector.queryString = this.getQueryString({
                ...this.props,
                startTime: this.getStartTime(),
                endTime: this.getEndTime(),
                replaySpeed: this.getReplaySpeed()
            });
            return true;
        }
    }

    setLastTimestamp(timestamp) {
        this.setTime(new Date(timestamp).toISOString());
        this.lastTimestamp = timestamp;
    }
}

export default TimeSeriesReplayDataSourceState;

