import {DATASOURCE_DATA_TOPIC} from "../../Constants.js";
import {EventType} from "../../event/EventType.js";
import {isDefined} from "../../utils/Utils";
import DataSynchronizerAlgoRealtime from "./DataSynchronizerAlgo.realtime.js";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
let dataSynchronizerBroadCastChannel = null;
let lastData = undefined;
const dataSources = {};
let timeBroadcastChannel = null;
let topicTime;
let topicData;
let masterTimeInterval = undefined;
let cTime;
let cId;
let lastTime = -1;
let version = -1;
let promise;
let masterTimeRefreshRate;

self.onmessage = async (event) => {
    handleMessage(event);
}

async function handleMessage(event) {
    let resp = {};
    if (event.data.ackId) {
        resp.ackId = event.data.ackId;
    }

    let data = undefined;
    try {
        if (event.data.message === 'init') {
            version = event.data.version;

            dataSynchronizerAlgo = new DataSynchronizerAlgoRealtime(
                event.data.dataSources,
                event.data.replaySpeed,
                event.data.timerResolution
            );
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
            version = event.data.version;
        } else if (event.data.message === 'is-connected') {
            data = {
                message: 'is-connected',
                data: isDefined(masterTimeInterval)
            };
        } else if (event.data.message === 'remove' && event.data.dataSourceIds) {
            console.log('Remove datasource from synchronizer..')
            await removeDataSources(event.data.dataSourceIds);
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
            }
        } else if (event.data.message === 'data') {
            checkMasterTime();
            if (dataSynchronizerAlgo !== null) {
                dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
            }
        }
    } catch (ex) {
        console.error(ex);
        resp.error = ex;
    } finally {
        resp.data = data;
        self.postMessage(resp);
    }

}

function reset() {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    if (dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.reset();
    }
    timeBroadcastChannel.postMessage({
        type: EventType.TIME_CHANGED
    });
    timeBroadcastChannel.postMessage({
        type: EventType.CLOSED
    });
    dataSynchronizerBroadCastChannel.postMessage({
        type: EventType.STATUS,
        status: 'not_running',
    });
}

function initBroadcastChannel(dataTopic, timeTopic) {
    console.log('listen on topic ', dataTopic)

    dataSynchronizerBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSynchronizerBroadCastChannel.onmessage = (event) => {
        checkMasterTime();
        if (event.data.type === EventType.DATA) {
            dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.values);
        } else if (event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            // bubble the message
            if (dataSourceId in bcChannels) {
                console.log(dataSources[dataSourceId].name + ": status=" + event.data.status);
                bcChannels[dataSourceId].postMessage(event.data);
            }
        }
    }

    timeBroadcastChannel = new BroadcastChannel(timeTopic);

}

/**
 *
 * @param dataSources
 */
function addDataSources(dataSources) {
    for (let dataSource of dataSources) {
        addDataSource(dataSource);
    }
}

function addDataSource(dataSource) {
    dataSynchronizerAlgo.addDataSource(dataSource);
    // create a BC to push back the synchronized data into the DATA Stream.
    bcChannels[dataSource.id] = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSource.id);

    if (!(dataSource.id in dataSources)) {
        dataSources[dataSource.id] = dataSource;
    }
}

/**
 *
 * @param dataSourceIds
 */
async function removeDataSources(dataSourceIds) {
    for (let dataSourceId of dataSourceIds) {
        await removeDataSource(dataSourceId);
    }
}

async function removeDataSource(dataSourceId) {
    await dataSynchronizerAlgo.removeDataSource(dataSourceId);
    // create a BC to push back the synchronized data into the DATA Stream.
    console.log('deleting BC for datasource ' + dataSourceId);
    delete bcChannels[dataSourceId];
    delete dataSources[dataSourceId];
}

function checkMasterTime() {
    if (!isDefined(masterTimeInterval)) {
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
    checkMasterTime();
}

function onClose() {
    timeBroadcastChannel.postMessage({
        type: EventType.CLOSED
    });
}

async function onData(dataSourceId, dataBlock) {
    if (dataBlock.version !== version) {
        console.error('version are different:', dataBlock.version, version);
        return;
    }
    lastData = {
        dataSourceId: dataSourceId,
        dataBlock: dataBlock,
    };
    bcChannels[dataSourceId].postMessage({
            values: [dataBlock],
            dataSourceId: dataSourceId,
            type: EventType.DATA
        }
    );
}

self.onclose = function () {
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

            if (isDefined(lastData)) {
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
            }
        }, masterTimeRefreshRate);
        dataSynchronizerBroadCastChannel.postMessage({
            type: EventType.STATUS,
            status: 'running',
        });
    }
}
