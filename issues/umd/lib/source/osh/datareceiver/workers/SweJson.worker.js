import SosGetResultJsonParser from '../parsers/SosGetResultJson.parser';
import DataSourceHandler from './DataSourceHandler.js';

const dataSourceHandler = new DataSourceHandler(new SosGetResultJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


