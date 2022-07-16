import {Status} from "../../protocol/Status";

class DataSourceState {
    constructor() {
        this.connector = undefined;
        this.initialized = false;
        this.status = Status.CONNECTED;
    }

    init(props) {
        this.props = props;
    }
    setConnector(connector) {
        this.connector = connector;
        // bind change connection STATUS
        this.connector.onChangeStatus   = this.setStatus.bind(this);
    }

    setStatus(status) {
        this.status  = status;
        this.onChangeStatus(status);
    }

    onChangeStatus(status) {}

    isReplay() {
        return this.getType() === 'REPLAY';
    }

    isLive() {
        return this.getType() === 'LIVE';
    }

    updateState(props) {

    }

    getType() {
        throw Error('Unsupported Operation Error');
    }
}

export default DataSourceState;
