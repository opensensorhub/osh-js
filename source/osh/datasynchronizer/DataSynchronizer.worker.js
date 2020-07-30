import DataSynchronizerAlgo from "./DataSynchronizerAlgo";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_DATA_TOPIC} from "../Constants";

const bcChannels = {};
let dataSynchronizerAlgo;

let broadcastChannel;
let init = false;
self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replayFactor,
            event.data.intervalRate
        );
        dataSynchronizerAlgo.onData = onData;
        dataSynchronizerAlgo.onWait = onWait;
        init = true;
        addDataSources(event.data.dataSources);
        // listen for this specific data synchronizer
        broadcastChannel.onmessage = (event) => {
            dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
        };
    } else if(event.data.message === 'add' && event.data.dataSources) {
        addDataSources(event.data.dataSources);
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
    bcChannels[dataSourceId].postMessage({
        message: 'data',
        dataSourceId: dataSourceId,
        data: data
    });
}

function onWait(dataSourceId, time, total) {
    self.postMessage({
        message: 'wait',
        dataSourceId: dataSourceId,
        time: time,
        total: total
    });
}

self.onclose = function() {
    clearInterval(this.interval);
    console.log("Data Synchronizer has been terminated successfully");
}
