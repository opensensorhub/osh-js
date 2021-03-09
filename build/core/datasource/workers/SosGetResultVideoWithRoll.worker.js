import SosGetResultVideoWithRollParser from "../parsers/SosGetResultVideoWithRoll.parser";
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
var dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoWithRollParser());
self.onmessage = function (event) {
    dataSourceHandler.handleMessage(event.data, self);
};
//# sourceMappingURL=SosGetResultVideoWithRoll.worker.js.map