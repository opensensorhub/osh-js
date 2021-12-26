import SosGetResultVideoParser from '../parser/SosGetResultVideo.parser.js';
import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


