import DataSourceHandler from './DataSourceHandler.js';
import FileParser from "../parsers/File.parser";
var dataSourceHandler = new DataSourceHandler(new FileParser());
self.onmessage = function (event) {
    dataSourceHandler.handleMessage(event.data, self);
};
//# sourceMappingURL=File.worker.js.map