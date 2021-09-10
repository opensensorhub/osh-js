import MqttConnector from "../protocol/MqttConnector";
import TimeSeriesDataSourceHandler from "../../core/datasource/workers/TimeSeriesDataSourceHandler";

// expose as Global. static property is still experimental
class MqttDataSourceHandler  extends TimeSeriesDataSourceHandler {

    constructor(parser) {
        super(parser);
    }

    /**
     * Override default data connector build
     * @private
     */
    createConnector(propertiesStr, topic, dataSourceId) {
        const properties = JSON.parse(propertiesStr);

        const url = this.parser.buildUrl({
            ...properties,
            timeShift: this.timeShift
        });

        this.connector = new MqttConnector(url,properties,dataSourceId);

        // set the reconnectTimeout
        this.connector.setReconnectTimeout(this.reconnectTimeout);

        // connects the callback
        this.connector.onMessage = this.onMessage.bind(this);

        // bind change connection STATUS
        this.connector.onChangeStatus   = this.onChangeStatus.bind(this);
    }
}
export default MqttDataSourceHandler;

