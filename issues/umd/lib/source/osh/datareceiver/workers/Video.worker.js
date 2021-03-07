import VideoParser from '../parsers/Video.parser.js';
import DataSourceHandler from './DataSourceHandler.js';

const dataSourceHandler = new DataSourceHandler(new VideoParser());

self.onmessage = (event) => {
    dataSourceHandler.handleMessage(event.data, self);
}


