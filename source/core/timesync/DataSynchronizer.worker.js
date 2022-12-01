import {DATASOURCE_DATA_TOPIC} from "../Constants.js";
import {EventType} from "../event/EventType.js";
import {isDefined} from "../utils/Utils";
import {Mode} from "../datasource/Mode";
import DataSynchronizerAlgoReplay from "./DataSynchronizerAlgo.replay";
import DataSynchronizerAlgoRealtime from "./DataSynchronizerAlgo.realtime.js";

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
let masterTimeRefreshRate;
let startTimestamp;
let endTimestamp;

self.onmessage = async (event) => {
    if(isDefined(promise)) {
        await promise;
    }
    promise = handleMessage(event);
}

async function handleMessage(event) {
    return new Promise(async (resolve, reject) => {
        try {
            let sendResponse = true;
            let data = undefined;
            if (event.data.message === 'init') {
                replaySpeed = event.data.replaySpeed;
                startTimestamp = new Date(event.data.startTime).getTime();
                endTimestamp = new Date(event.data.endTime).getTime();

                if (event.data.mode === Mode.REPLAY) {
                    dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(
                        event.data.dataSources,
                        event.data.replaySpeed,
                        startTimestamp,
                        endTimestamp,
                        event.data.timerResolution
                    );
                    dataSynchronizerAlgo.onEnd = onEnd;
                    dataSynchronizerAlgo.onStart = onStart;
                } else {
                    dataSynchronizerAlgo = new DataSynchronizerAlgoRealtime(
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
                masterTimeRefreshRate = event.data.masterTimeRefreshRate;
            } else if (event.data.message === 'add' && event.data.dataSources) {
                console.log('Add datasource to synchronizer..')
                addDataSources(event.data.dataSources);
            } else if (event.data.message === 'connect') {
                startMasterTimeInterval(masterTimeRefreshRate);
                dataSynchronizerAlgo.checkStart();
            } else if (event.data.message === 'remove' && event.data.dataSources) {
                console.log('Remove datasource from synchronizer..')
                await removeDataSources(event.data.dataSources);
            } else if (event.data.message === 'current-time') {
                data = {
                    message: 'current-time',
                    data: dataSynchronizerAlgo.getCurrentTimestamp()
                };
            } else if (event.data.message === 'reset') {
                reset();
            } else if (event.data.message === 'replay-speed') {
                if (dataSynchronizerAlgo !== null) {
                    reset();
                    dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
                }
            } else if (event.data.message === 'update-properties') {
                reset();
                let datasources = [];
                if (dataSynchronizerAlgo !== null) {
                    datasources = dataSynchronizerAlgo.datasources;
                }

                startTimestamp = new Date(event.data.startTime).getTime();
                endTimestamp = new Date(event.data.endTime).getTime();

                if (event.data.mode === Mode.REPLAY) {
                    dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(
                        datasources,
                        event.data.replaySpeed,
                        startTimestamp,
                        endTimestamp,
                        dataSynchronizerAlgo.timerResolution
                    );
                    dataSynchronizerAlgo.onEnd = onEnd;
                    dataSynchronizerAlgo.onStart = onStart;
                } else {
                    dataSynchronizerAlgo = new DataSynchronizerAlgoRealtime(
                        datasources,
                        dataSynchronizerAlgo.timerResolution
                    );
                }

                dataSynchronizerAlgo.onData = onData;
            } else if (event.data.message === 'data') {
                checkMasterTime();
                if (dataSynchronizerAlgo !== null) {
                    dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
                }
            } else {
                // skip response
                sendResponse = false;
            }
            if (sendResponse) {
                self.postMessage({
                    message: event.data.message,
                    data: data,
                    messageId: event.data.messageId
                });
            }
            resolve();
        } catch (ex) {
            reject(ex);
        }
    });
}
function reset() {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
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
        checkMasterTime();
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

/**
 *
 * @param dataSources
 */
async function removeDataSources(dataSources) {
    for(let dataSource of dataSources) {
        await removeDataSource(dataSource);
    }
}

async function removeDataSource(dataSource) {
    await dataSynchronizerAlgo.removeDataSource(dataSource);
    // create a BC to push back the synchronized data into the DATA Stream.
    delete bcChannels[dataSource.id];
    delete dataSources[dataSource.id];
}

function checkMasterTime() {
    if(!isDefined(masterTimeInterval)) {
        startMasterTimeInterval(masterTimeRefreshRate);
    }
}
async function onEnd() {
    const masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    // end at this time
    timeBroadcastChannel.postMessage({
        timestamp: masterTime,
        type: EventType.MASTER_TIME
    });
}

async function onStart() {
    // checkMasterTime();
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

let masterTime;
function startMasterTimeInterval(masterTimeRefreshRate) {
    if (!isDefined(masterTimeInterval)) {
        masterTimeInterval = setInterval(() => {
            masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
            if (isDefined(masterTime)) {
                timeBroadcastChannel.postMessage({
                    timestamp: masterTime,
                    type: EventType.MASTER_TIME
                });
            }

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
                    type: EventType.LAST_TIME
                });
            }
            lastTime = cTime;
        }, masterTimeRefreshRate);
    }
}
