import SosGetResultJsonParser from '../parser/SosGetResultJson.parser';
import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultJsonParser(), self);

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


