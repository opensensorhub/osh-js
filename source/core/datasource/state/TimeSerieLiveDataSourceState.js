import TimeSeriesDataSourceState from "./TimeSeriesDataSourceState";

class TimeSeriesLiveDataSourceState extends TimeSeriesDataSourceState {
    getType() {
        return "LIVE";
    }

    getStartTime() {
        return 'now';
    }

    getEndTime() {
        return '2055-01-01Z';
    }

    getReplaySpeed() {
        return undefined;
    }

    setConnector(connector) {
        super.setConnector(connector);
        this.connector.onReconnect = () => true;
    }
}

export default TimeSeriesLiveDataSourceState;
