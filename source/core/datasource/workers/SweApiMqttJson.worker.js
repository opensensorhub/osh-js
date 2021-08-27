import DataSourceHandler from './DataSourceHandler.js';
import SweApiMqttJsonParser from "../parsers/SweApiMqttJson.parser.js";

const dataSourceHandler = new DataSourceHandler(new SweApiMqttJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}