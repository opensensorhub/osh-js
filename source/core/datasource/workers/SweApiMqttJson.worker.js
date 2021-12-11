import SweApiMqttJsonParser from "../parsers/sensorwebapi/SweApiMqttJson.parser.js";
import MqttDataSourceHandler from "../handler/MqttDataSourceHandler";

const dataSourceHandler = new MqttDataSourceHandler(new SweApiMqttJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}
