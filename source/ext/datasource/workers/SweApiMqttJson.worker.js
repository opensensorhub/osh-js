import SweApiMqttJsonParser from "../parsers/SweApiMqttJson.parser.js";
import MqttDataSourceHandler from "../MqttDataSourceHandler";

const dataSourceHandler = new MqttDataSourceHandler(new SweApiMqttJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}
