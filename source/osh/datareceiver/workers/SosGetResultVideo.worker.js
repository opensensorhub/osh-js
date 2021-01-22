import SosGetResultVideoParser from '../parsers/SosGetResultVideo.parser.js';
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


