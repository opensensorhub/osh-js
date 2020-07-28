import VideoParser from '../parsers/Video.parser.js';
import DataSourceHandler from './DataSourceHandler.js';

const dataSourceHandler = new DataSourceHandler(new VideoParser());

function onData(data) {
    self.postMessage(data);
}

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSourceHandler.createConnector(event.data.properties);
        dataSourceHandler.onData = onData;
    } else if (event.data.message === 'connect') {
        dataSourceHandler.connect();
    } else if (event.data.message === 'disconnect') {
        dataSourceHandler.disconnect();
    }
}


