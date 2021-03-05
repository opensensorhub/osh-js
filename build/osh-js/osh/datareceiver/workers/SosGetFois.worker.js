import DataSourceHandler from './DataSourceHandler.js';
import SosGetFoisParser from "../parsers/SosGetFois.parser";
var dataSourceHandler = new DataSourceHandler(new SosGetFoisParser());
self.onmessage = function (event) {
    dataSourceHandler.handleMessage(event.data, self);
};
//# sourceMappingURL=SosGetFois.worker.js.map