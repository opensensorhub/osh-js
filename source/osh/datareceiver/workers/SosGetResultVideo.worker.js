import SosGetResultVideoParser from '../parsers/SosGetResultVideo.parser.js';
import DataSourceHandler from './DataSourceHandler.js';

const dataSourceHandler = new DataSourceHandler(new SosGetResultVideoParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


