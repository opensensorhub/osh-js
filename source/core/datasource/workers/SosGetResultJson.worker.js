import SosGetResultJsonParser from '../parsers/SosGetResultJson.parser';
import TimeSeriesDataSourceHandler from "../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultJsonParser(), self);

self.onmessage = (event) => {
    console.log('ici32')
    dataSourceHandler.handleMessage(event.data, self);
}


