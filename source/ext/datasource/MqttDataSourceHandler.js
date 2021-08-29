import MqttConnector from "../protocol/MqttConnector";
import TimeSeriesDataSourceHandler from "../../core/datasource/workers/TimeSeriesDataSourceHandler";

// expose as Global. static property is still experimental
const mqttConnectors = {};

class MqttDataSourceHandler  extends TimeSeriesDataSourceHandler {

    constructor(parser) {
        super(parser);
    }

    /**
     * Override default data connector build
     * @private
     */
    createDataConnector(properties) {
        const url = this.parser.buildUrl({
            ...properties,
            timeShift: this.timeShift
        });

        if(!(url in mqttConnectors)) {
            mqttConnectors[url] = new MqttConnector(url,properties,this);
        }
        this.connector = mqttConnectors[url];

        // set the reconnectTimeout
        this.connector.setReconnectTimeout(this.reconnectTimeout);

        // connects the callback
        this.connector.onMessage = this.onMessage.bind(this);

        // bind change connection STATUS
        this.connector.onChangeStatus   = this.onChangeStatus.bind(this);
    }
}
export default MqttDataSourceHandler;

