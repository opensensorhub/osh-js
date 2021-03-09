import DataSourceHandler from './DataSourceHandler.js';
import FileParser from "../parsers/File.parser";

const dataSourceHandler = new DataSourceHandler(new FileParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


