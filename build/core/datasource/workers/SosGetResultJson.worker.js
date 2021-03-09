import SosGetResultJsonParser from '../parsers/SosGetResultJson.parser';
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
var dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultJsonParser());
self.onmessage = function (event) {
    dataSourceHandler.handleMessage(event.data, self);
};
//# sourceMappingURL=SosGetResultJson.worker.js.map