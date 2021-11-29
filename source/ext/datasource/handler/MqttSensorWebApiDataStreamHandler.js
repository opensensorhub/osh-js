import MqttConnector from "../../protocol/MqttConnector";
import SensorWebApiDataStreamHandler from "../../../core/datasource/handler/SensorWebApiDataStreamHandler";

// expose as Global. static property is still experimental
class MqttSensorWebApiDataStreamHandler extends SensorWebApiDataStreamHandler {

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
export default MqttSensorWebApiDataStreamHandler;

