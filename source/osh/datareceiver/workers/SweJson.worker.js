import SweJsonParser from '../parsers/SweJson.parser';
import DataSourceHandler from './DataSourceHandler.js';

const dataSourceHandler = new DataSourceHandler(new SweJsonParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


