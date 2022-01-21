import DataSourceHandler from '../../handler/DataSourceHandler.js';
import SosGetFoisParser from "../parser/SosGetFois.parser";

const dataSourceHandler = new DataSourceHandler(new SosGetFoisParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
};


