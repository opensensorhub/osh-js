import SosGetResultVideoWithRollParser from "../parsers/SosGetResultVideoWithRoll.parser";
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoWithRollParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


