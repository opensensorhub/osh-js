import DataSourceState from "./DataSourceState";

class TimeSeriesDataSourceState extends DataSourceState {
    init(props) {
        super.init(props);
        this.lastTimestamp = null;
    }

    setLastTimestamp(timestamp) {
        if(timestamp) {
            this.lastTimestamp = timestamp;
        }
    }
}

export default TimeSeriesDataSourceState;
