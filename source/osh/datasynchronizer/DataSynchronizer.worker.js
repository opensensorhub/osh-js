import DataSynchronizerAlgo from "./DataSynchronizerAlgo";
import {DATA_SYNCHRONIZER_TOPIC, DATASOURCE_DATA_TOPIC} from "../Constants";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let currentTimeBroadCastChannel = null;

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replayFactor,
            event.data.intervalRate
        );
        dataSynchronizerAlgo.onData = onData;
        init = true;
        addDataSources(event.data.dataSources);
        currentTimeBroadCastChannel = new BroadcastChannel(event.data.topic);
        currentTimeBroadCastChannel.onmessage = (event) => {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        }
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
        ...data
    });
    currentTimeBroadCastChannel.postMessage({
        currentTime: data.timeStamp
    })
}


self.onclose = function() {
    clearInterval(this.interval);
    console.log("Data Synchronizer has been terminated successfully");
}
