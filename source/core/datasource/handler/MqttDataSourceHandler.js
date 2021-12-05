import MqttConnector from "../../protocol/MqttConnector";
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

class MqttDataSourceHandler  extends TimeSeriesDataSourceHandler {

    constructor(parser) {
        super(parser);
    }

    /**
     * Override default data connector build
     * @protected
     */
    createDataConnector(properties, connector) {
        const url = properties.protocol + '://' + properties.endpointUrl;
        super.createDataConnector(properties, new MqttConnector(url,properties));
    }
}
export default MqttDataSourceHandler;

