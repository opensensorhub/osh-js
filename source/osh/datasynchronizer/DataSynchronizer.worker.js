import DataSynchronizerAlgo from "./DataSynchronizerAlgo";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_DATA_TOPIC} from "../Constants";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
self.currentTime = -1;

const dataSources = {};

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replaySpeed,
            event.data.intervalRate
        );
        dataSynchronizerAlgo.onData = onData;
        init = true;
        addDataSources(event.data.dataSources);
        initBroadcastChannel(event.data.topic);
    } else if(event.data.message === 'add' && event.data.dataSources) {
        addDataSources(event.data.dataSources);
    } else if(event.data.message === 'current-time') {
        self.postMessage({
            message: 'current-time',
            data: self.currentTime
        });
    }  else if(event.data.message === 'reset') {
        dataSynchronizerAlgo.reset();
    } else if(dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
    }
}

function initBroadcastChannel(topic) {
    dataSourceBroadCastChannel = new BroadcastChannel(topic);
    dataSourceBroadCastChannel.onmessage = (event) => {
        if(event.data.type === 'data') {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        } else if(event.data.type === 'message') {
            const dataSourceId = event.data.dataSourceId;
            if(event.data.status === 'disconnected') {
                dataSynchronizerAlgo.disable(dataSourceId);
            } else  if(event.data.status === 'connected') {
                dataSynchronizerAlgo.enable(dataSourceId);
            }
            // bubble the message
            bcChannels[dataSourceId].postMessage(event.data);
        }
    }
}

/**
 *
 * @param dataSources
 */
function addDataSources(dataSources) {
    for(let dataSource of dataSources) {
        addDataSource(dataSource);
    }
}

function addDataSource(dataSource) {
    dataSynchronizerAlgo.addDataSource(dataSource);
    // create a BC to push back the synchronized data into the DATA Stream.
    bcChannels[dataSource.id] = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSource.id);

    if(!(dataSource.id in dataSources)) {
        dataSources[dataSource.id] = dataSource;
    }
}

function onData(dataSourceId, data) {
    self.currentTime = data.timeStamp;
    bcChannels[dataSourceId].postMessage({
        type: 'data',
        dataSourceId: dataSourceId,
        ...data
    });
}


self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}
