import DataSourceHandler from 'osh/datareceiver/workers/DataSourceHandler';
import EQParser from "./EQParser";

const dataSourceHandler = new DataSourceHandler(new EQParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}
