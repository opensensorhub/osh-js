import SosGetResultVideoParser from '../parsers/SosGetResultVideo.parser.js';
import TimeSeriesDataSourceHandler from "./TimeSeriesDataSourceHandler";
var dataSourceHandler = new TimeSeriesDataSourceHandler(new SosGetResultVideoParser());
self.onmessage = function (event) {
    dataSourceHandler.handleMessage(event.data, self);
};
//# sourceMappingURL=SosGetResultVideo.worker.js.map