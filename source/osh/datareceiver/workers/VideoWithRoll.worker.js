import DataSourceHandler from './DataSourceHandler.js';
import VideoWithRollParser from "../parsers/VideoWithRoll.parser";

const dataSourceHandler = new DataSourceHandler(new VideoWithRollParser());

function onData(data) {
    self.postMessage(data);
}

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSourceHandler.createConnector(event.data.properties, event.data.topic);
        dataSourceHandler.onData = onData;
    } else if (event.data.message === 'connect') {
        dataSourceHandler.connect();
    } else if (event.data.message === 'disconnect') {
        dataSourceHandler.disconnect();
    } else if (event.data.message === 'topic') {
        dataSourceHandler.setTopic(event.data.topic);
    }
}


