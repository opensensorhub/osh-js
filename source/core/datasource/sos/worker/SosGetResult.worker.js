import SosGetResultParser from '../parser/SosGetResult.parser';
import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultParser(), self);

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


