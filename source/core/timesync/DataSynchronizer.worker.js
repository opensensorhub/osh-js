import DataSynchronizerAlgo from "./DataSynchronizerAlgo.js";
import {DATASOURCE_DATA_TOPIC} from "../Constants.js";
import {EventType} from "../event/EventType.js";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
self.currentTime = -1;

const dataSources = {};
let timeBroadcastChannel = null;
let topicTime;
let topicData;

self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replaySpeed,
            event.data.timerResolution
        );
        dataSynchronizerAlgo.onData = onData;
        init = true;
        addDataSources(event.data.dataSources);
        topicData = event.data.dataTopic;
        topicTime = event.data.timeTopic;
        initBroadcastChannel(topicData,topicTime );
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
        timeBroadcastChannel.postMessage({
            type: EventType.TIME_CHANGED
        });
    }  else if(event.data.message === 'replay-speed') {
        if(dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
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

function initBroadcastChannel(dataTopic, timeTopic) {
    dataSourceBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSourceBroadCastChannel.onmessage = (event) => {
        if(event.data.type === EventType.DATA) {
            for(let i=0; i < event.data.values.length;i++) {
                dataSynchronizerAlgo.push(
                    event.data.dataSourceId,
                    {
                        ...event.data.values[i]
                    }
                );
            }
        } else if(event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            // bubble the message
            bcChannels[dataSourceId].postMessage(event.data);
        }
    }

    timeBroadcastChannel = new BroadcastChannel(timeTopic);

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
            values: [data],
            dataSourceId:dataSourceId,
            type: EventType.DATA
        }
    );

    timeBroadcastChannel.postMessage({
        timestamp: data.timeStamp,
        dataSourceId: dataSourceId,
        type: EventType.DATA
    });
}


self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}
