import DataSynchronizerAlgo from "./DataSynchronizerAlgo";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_DATA_TOPIC} from "../Constants";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
self.currentTime = -1;

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
        dataSourceBroadCastChannel = new BroadcastChannel(event.data.topic);
        dataSourceBroadCastChannel.onmessage = (event) => {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        }
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

function addDataSources(dataSources) {
    for(let ds of dataSources) {
        dataSynchronizerAlgo.addDataSource(ds);
        bcChannels[ds.id] = new BroadcastChannel(DATASOURCE_DATA_TOPIC + ds.id);
    }
}

function onData(dataSourceId, data) {
    self.currentTime = data.timeStamp;
    bcChannels[dataSourceId].postMessage({
        message: 'data',
        dataSourceId: dataSourceId,
        ...data
    });
}


self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}
