import SosGetResultVideoWithRollParser from "../parser/SosGetResultVideoWithRoll.parser";
import TimeSeriesDataSourceHandler from "../../handler/TimeSeriesDataSourceHandler";

const dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoWithRollParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


