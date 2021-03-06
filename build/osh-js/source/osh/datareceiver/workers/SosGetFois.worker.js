import DataSourceHandler from './DataSourceHandler.js';
import SosGetFoisParser from "../parsers/SosGetFois.parser";

const dataSourceHandler = new DataSourceHandler(new SosGetFoisParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


