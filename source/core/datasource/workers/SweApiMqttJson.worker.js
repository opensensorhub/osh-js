import DataSourceHandler from './DataSourceHandler.js';
import SweApiMqttJsonParser from "../parsers/SweApiMqttJson.parser.js";
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SweApiMqttJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}