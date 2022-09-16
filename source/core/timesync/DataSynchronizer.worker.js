import DataSynchronizerAlgo from "./DataSynchronizerAlgo.js";
import {DATASOURCE_DATA_TOPIC} from "../Constants.js";
import {EventType} from "../event/EventType.js";
import {isDefined} from "../utils/Utils";
import {Mode} from "../datasource/Mode";
import DataSynchronizerAlgoReplay from "./DataSynchronizerAlgo.replay";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSourceBroadCastChannel = null;
let lastData = undefined;
const dataSources = {};
let timeBroadcastChannel = null;
let topicTime;
let topicData;
let replaySpeed;
let masterTimeInterval = undefined;
let cTime;
let cId;
let lastTime = -1;
let version = -1;
let promise;

self.onmessage = async (event) => {
    if(isDefined(promise)) {
        await promise;
    }
    promise = handleMessage(event);
}

async function handleMessage(event) {
    return new Promise(resolve => {
        let sendResponse = true;
        let data = undefined;
        if (event.data.message === 'init') {
            replaySpeed = event.data.replaySpeed;
            if (event.data.mode === Mode.REPLAY) {
                dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(
                    event.data.dataSources,
                    event.data.replaySpeed,
                    event.data.timerResolution
                );
            } else {
                dataSynchronizerAlgo = new DataSynchronizerAlgo(
                    event.data.dataSources,
                    event.data.replaySpeed,
                    event.data.timerResolution
                );
            }
            dataSynchronizerAlgo.onData = onData;
            init = true;
            addDataSources(event.data.dataSources);
            topicData = event.data.topics.data;
            topicTime = event.data.topics.time;
            initBroadcastChannel(topicData, topicTime);
            startMasterTimeInterval(event.data.masterTimeRefreshRate);
        } else if (event.data.message === 'add' && event.data.dataSources) {
            addDataSources(event.data.dataSources);
        } else if (event.data.message === 'current-time') {
            data = {
                message: 'current-time',
                data: self.currentTime
            };
        } else if (event.data.message === 'reset') {
            reset();
        } else if (event.data.message === 'replay-speed') {
            if (dataSynchronizerAlgo !== null) {
                dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
            }
        } else if (event.data.message === 'update-properties') {
            if (dataSynchronizerAlgo !== null) {
                reset();
                const dataSourcesMap = dataSynchronizerAlgo.dataSourceMap;
                if (event.data.mode === Mode.REPLAY && !(dataSynchronizerAlgo instanceof DataSynchronizerAlgoReplay)) {
                    dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(
                        [],
                        event.data.replaySpeed,
                        dataSynchronizerAlgo.timerResolution
                    );
                } else if (!(dataSynchronizerAlgo instanceof DataSynchronizerAlgo)) {
                    dataSynchronizerAlgo = new DataSynchronizerAlgo(
                        [],
                        dataSynchronizerAlgo.timerResolution
                    );
                }

                dataSynchronizerAlgo.dataSourceMap = dataSourcesMap;
                dataSynchronizerAlgo.onData = onData;
            }
        } else if (event.data.message === 'data') {
            if (dataSynchronizerAlgo !== null) {
                dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
            }
            if (!isDefined(masterTimeInterval)) {
                startMasterTimeInterval();
            }
        } else {
            // skip response
            sendResponse = false;
        }
        if(sendResponse) {
            self.postMessage({
                message: event.data.message,
                data: data,
                messageId: event.data.messageId
            });
        }
        resolve();
    });
}
function reset() {
    version = -1;
    if(dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.reset();
    }
    timeBroadcastChannel.postMessage({
        type: EventType.TIME_CHANGED
    });
}
function initBroadcastChannel(dataTopic, timeTopic) {
    console.log('listen on topic ',dataTopic)

    dataSourceBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSourceBroadCastChannel.onmessage = async (event) => {
        if(event.data.type === EventType.DATA) {
            dataSynchronizerAlgo.push(event.data.dataSourceId,event.data.values);
        } else if(event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            console.log(dataSources[dataSourceId].name + ": status=" + event.data.status);
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

async function onData(dataSourceId, dataBlock) {
    if((version === -1 && (isDefined(lastData) ) && dataBlock.version === lastData.dataBlock.version)){
        return;
    }

    version = dataBlock.version;
    lastData = {
        dataSourceId: dataSourceId,
        dataBlock: dataBlock
    };
    bcChannels[dataSourceId].postMessage({
            values: [dataBlock],
            dataSourceId:dataSourceId,
            type: EventType.DATA
        }
    );
}
self.onclose = function() {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
}

function startMasterTimeInterval(masterTimeRefreshRate) {
    setInterval(() => {
        // check version
        if (!isDefined(lastData) || version !== lastData.dataBlock.version || version === -1) {
            return;
        }
        cTime = lastData.dataBlock.data.timestamp;
        cId = lastData.dataSourceId;

        if ((cTime !== -1 && lastTime === -1) || (lastTime !== -1 && cTime !== lastTime)) { // does not send the same data twice
            timeBroadcastChannel.postMessage({
                timestamp: cTime,
                dataSourceId: cId,
                type: EventType.TIME
            });
        }
        lastTime = cTime;
    }, masterTimeRefreshRate);
}
