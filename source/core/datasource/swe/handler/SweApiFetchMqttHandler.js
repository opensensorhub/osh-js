import MqttConnector from "../../../protocol/MqttConnector";
import SensorWebApiFetchHandler from "./SweApiFetchHandler";

class SweApiFetchMqttHandler extends SensorWebApiFetchHandler {
    constructor(parser) {
        super(parser);
    }

    async createDataConnector(properties, connector) {
        const tls = (properties.tls) ? 's' : '';
        const url = properties.protocol + tls + '://' + properties.endpointUrl;
        super.createDataConnector(properties, new MqttConnector(url, properties));
    }
}
export default SweApiFetchMqttHandler;
