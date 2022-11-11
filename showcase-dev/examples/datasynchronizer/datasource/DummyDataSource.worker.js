import DataSourceHandler from 'osh-js/core/datasource/workers/DataSourceHandler';
import DummyParser from './DummyParser';

const dataSourceHandler = new DataSourceHandler(new DummyParser());

function onData(data) {
    self.postMessage(data);
}

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSourceHandler.createConnector(event.data.properties, event.data.topic, event.data.id);
        dataSourceHandler.onData = onData;
    } else if (event.data.message === 'connect') {
        dataSourceHandler.connect();
    } else if (event.data.message === 'disconnect') {
        dataSourceHandler.disconnect();
    } else if (event.data.message === 'topic') {
        dataSourceHandler.setTopic(event.data.topic);
    } else if(event.data.message === 'data') {
        dataSourceHandler.onMessage(event.data.data);
    }
}
