import DataSourceHandler from './DataSourceHandler.js';
import SosGetResultVideoWithRollParser from "../parsers/SosGetResultVideoWithRoll.parser";

const dataSourceHandler = new DataSourceHandler(new SosGetResultVideoWithRollParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


