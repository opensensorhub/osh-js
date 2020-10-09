import DataSynchronizerAlgo from "./DataSynchronizerAlgo.js";
import {DATASOURCE_DATA_TOPIC} from "../Constants.js";
import {Status} from "../dataconnector/Status.js";
import {isDefined} from "../utils/Utils";
import {EventType} from "../event/EventType";

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
        if(dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.reset();
        }
    } else if(event.data.message === 'data') {
        if(dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        }
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
        } else if(event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
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
