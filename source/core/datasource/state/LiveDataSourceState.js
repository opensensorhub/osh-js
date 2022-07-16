import DataSourceState from "./DataSourceState";

class LiveDataSourceState extends DataSourceState {
    getType() {
        return "LIVE";
    }

    getStartTime() {
        return 'now';
    }

    getEndTime() {
        return '2055-01-01Z';
    }

    setConnector(connector) {
        super.setConnector(connector);
        this.connector.onReconnect = () => true;
    }
}

export default LiveDataSourceState;
