import SosGetResultJsonParser from '../parsers/SosGetResultJson.parser';
import TimeSeriesDataSourceHandler from "../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


