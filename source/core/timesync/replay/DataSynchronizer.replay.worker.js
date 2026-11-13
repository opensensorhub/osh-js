import {DATASOURCE_DATA_TOPIC} from "../../Constants.js";
import {EventType} from "../../event/EventType.js";
import {isDefined} from "../../utils/Utils";
import DataSynchronizerAlgoReplay from "./DataSynchronizerAlgo.replay";

const bcChannels = {};
const dataSources = {};

let dataSynchronizerAlgo = null;
let dataSynchronizerBroadCastChannel = null;
let timeBroadcastChannel = null;
let topicTime;
let topicData;

let replaySpeed;
let startTimestamp;
let endTimestamp;
let timerResolution;
let version = -1;
let masterTimeRefreshRate;
let masterTimeInterval = undefined;

let lastData = undefined;
let lastTime = -1;
let masterTime;

self.onmessage = async (event) => {
    handleMessage(event);
}

async function handleMessage(event) {
    const resp = {};
    if (event.data.ackId) {
        resp.ackId = event.data.ackId;
    }
    
    let data = undefined;
    try {
        if (event.data.message === 'init') {
            replaySpeed = event.data.replaySpeed;
            startTimestamp = event.data.startTimestamp;
            endTimestamp = event.data.endTimestamp;
            version = event.data.version;
            timerResolution = event.data.timerResolution;
            masterTimeRefreshRate = event.data.masterTimeRefreshRate;
            topicData = event.data.topics.data;
            topicTime = event.data.topics.time;
            
            initBroadcastChannel(topicData, topicTime);
            dataSynchronizerAlgo = createAlgo(event.data.dataSources);
            syncChannels(event.data.dataSources);
        } else if (event.data.message === 'add' && event.data.dataSources) {
            console.log('Add datasource to synchronizer..');
            addDataSources(event.data.dataSources);
            updateTimestamps(event.data.startTimestamp, event.data.endTimestamp);
            reset();
        } else if (event.data.message === 'connect') {
            version = event.data.version;
            startMasterTimeInterval(masterTimeRefreshRate);
            dataSynchronizerAlgo.checkStart();
        } else if (event.data.message === 'is-connected') {
            data = isDefined(masterTimeInterval) && isDefined(dataSynchronizerAlgo) && isDefined(dataSynchronizerAlgo.interval);
        } else if (event.data.message === 'remove') {
            console.log('Remove datasource from synchronizer algorithm..');
            removeDataSources(event.data.dataSourceIds);
            updateTimestamps(event.data.startTimestamp, event.data.endTimestamp);
            reset();
        } else if (event.data.message === 'current-time') {
            data = dataSynchronizerAlgo ? dataSynchronizerAlgo.getCurrentTimestamp() : undefined;
        } else if (event.data.message === 'reset') {
            reset();
        } else if (event.data.message === 'replay-speed') {
            if (dataSynchronizerAlgo) {
                reset();
                replaySpeed = event.data.replaySpeed;
                dataSynchronizerAlgo.replaySpeed = replaySpeed;
            }
        } else if (event.data.message === 'set-max-time') {
            endTimestamp = event.data.maxTimestamp;
            dataSynchronizerAlgo.setEndTimestamp(endTimestamp);
        } else if (event.data.message === 'time-range') {
            setTimeRange(
                event.data.startTimestamp,
                event.data.endTimestamp,
                event.data.mode,
                event.data.replaySpeed,
                event.data.version,
                event.data.dataSources
            );
        } else if (event.data.message === 'data') {
            if (dataSynchronizerAlgo) {
                checkMasterTime();
                dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
            }
        } else if (event.data.message === 'close') {
            self.onclose();
        }
    } catch (ex) {
        console.error(ex);
        resp.error = ex;
    } finally {
        resp.data = data;
        self.postMessage(resp);
    }
}

function createAlgo(dsArray) {
    const algo = new DataSynchronizerAlgoReplay(
        dsArray,
        replaySpeed,
        startTimestamp,
        endTimestamp,
        timerResolution,
        version
    );
    algo.onEnd = onEnd;
    algo.onStart = onStart;
    algo.onClose = onClose;
    algo.onData = onData;
    return algo;
}

function disposeAlgo() {
    if (!dataSynchronizerAlgo) {
        return;
    }
    const noop = () => {};
    dataSynchronizerAlgo.onEnd = noop;
    dataSynchronizerAlgo.onStart = noop;
    dataSynchronizerAlgo.onClose = noop;
    dataSynchronizerAlgo.onData = noop;
    dataSynchronizerAlgo.close();
    dataSynchronizerAlgo = null;
}

function resetWorkerState() {
    lastData = undefined;
    lastTime = -1;
    masterTime = undefined;
}

function updateTimestamps(start, end) {
    startTimestamp = start;
    endTimestamp = end;
    if (dataSynchronizerAlgo) {
        dataSynchronizerAlgo.startTimestamp = start;
        dataSynchronizerAlgo.endTimestamp = end;
    }
}

function setTimeRange(newStartTimestamp, newEndTimestamp, mode, newReplaySpeed, newVersion, dsArray) {
    reset();
    disposeAlgo();
    resetWorkerState();
    
    startTimestamp = newStartTimestamp;
    endTimestamp = newEndTimestamp;
    replaySpeed = newReplaySpeed;
    version = newVersion;
    
    syncChannels(dsArray);
    dataSynchronizerAlgo = createAlgo(dsArray);
}

function reset() {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    if (dataSynchronizerAlgo) {
        dataSynchronizerAlgo.reset();
    }
    if (timeBroadcastChannel) {
        timeBroadcastChannel.postMessage({type: EventType.TIME_CHANGED});
        timeBroadcastChannel.postMessage({type: EventType.CLOSED});
    }
    if (dataSynchronizerBroadCastChannel) {
        dataSynchronizerBroadCastChannel.postMessage({
            type: EventType.STATUS,
            status: 'not_running',
        });
    }
    resetWorkerState();
}

function initBroadcastChannel(dataTopic, timeTopic) {
    console.log('listen on topic ', dataTopic);
    
    dataSynchronizerBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSynchronizerBroadCastChannel.onmessage = async (event) => {
        if (!dataSynchronizerAlgo) {
            return;
        }
        if (event.data.type === EventType.DATA) {
            checkMasterTime();
            dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.values);
        } else if (event.data.type === EventType.STATUS) {
            const dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            if (dataSourceId in bcChannels) {
                console.log(dataSources[dataSourceId].name + ": status=" + event.data.status);
                bcChannels[dataSourceId].postMessage(event.data);
            }
        }
    }
    
    timeBroadcastChannel = new BroadcastChannel(timeTopic);
}

function openChannel(dataSource) {
    if (!(dataSource.id in bcChannels)) {
        bcChannels[dataSource.id] = new BroadcastChannel(DATASOURCE_DATA_TOPIC + dataSource.id);
    }
    dataSources[dataSource.id] = dataSource;
}

function closeChannel(dataSourceId) {
    if (dataSourceId in bcChannels) {
        bcChannels[dataSourceId].close();
    }
    delete bcChannels[dataSourceId];
    delete dataSources[dataSourceId];
}

function syncChannels(dsArray) {
    const ids = new Set(dsArray.map(ds => String(ds.id)));
    for (const id of Object.keys(bcChannels)) {
        if (!ids.has(id)) {
            closeChannel(id);
        }
    }
    dsArray.forEach(openChannel);
}

function addDataSources(dsArray) {
    for (const dataSource of dsArray) {
        addDataSource(dataSource);
    }
}

function addDataSource(dataSource) {
    dataSynchronizerAlgo.addDataSource(dataSource);
    openChannel(dataSource);
}

function removeDataSources(dataSourceIds) {
    for (const dataSourceId of dataSourceIds) {
        removeDataSource(dataSourceId);
    }
}

function removeDataSource(dataSourceId) {
    dataSynchronizerAlgo.removeDataSource(dataSourceId);
    console.log('deleting BC for datasource ' + dataSourceId);
    closeChannel(dataSourceId);
}

function checkMasterTime() {
    if (!isDefined(masterTimeInterval)) {
        startMasterTimeInterval(masterTimeRefreshRate);
    }
}

async function onEnd() {
    const endTime = dataSynchronizerAlgo.getCurrentTimestamp();
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    timeBroadcastChannel.postMessage({
        timestamp: endTime,
        type: EventType.MASTER_TIME
    });
    dataSynchronizerBroadCastChannel.postMessage({
        type: EventType.STATUS,
        status: 'not_running',
    });
}

async function onStart() {
    checkMasterTime();
}

function onClose() {
    timeBroadcastChannel.postMessage({
        type: EventType.CLOSED
    });
    dataSynchronizerBroadCastChannel.postMessage({
        type: EventType.STATUS,
        status: 'not_running',
    });
}

async function onData(dataSourceId, dataBlock) {
    if (dataBlock.version !== version) {
        console.error('version are different:', dataBlock.version, version);
        return;
    }
    if (!(dataSourceId in bcChannels)) {
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
    });
}

self.onclose = function () {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    disposeAlgo();
    Object.keys(bcChannels).forEach(closeChannel);
    console.log("Data Synchronizer has been terminated successfully");
    if (dataSynchronizerBroadCastChannel) {
        dataSynchronizerBroadCastChannel.postMessage({
            type: EventType.STATUS,
            status: 'not_running',
        });
    }
}

function startMasterTimeInterval(refreshRate) {
    if (isDefined(masterTimeInterval)) {
        return;
    }
    masterTimeInterval = setInterval(() => {
        if (!dataSynchronizerAlgo) {
            return;
        }
        masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
        if (isDefined(masterTime)) {
            timeBroadcastChannel.postMessage({
                timestamp: masterTime,
                type: EventType.MASTER_TIME,
                version: version
            });
        }
        
        if (isDefined(lastData)) {
            const cTime = lastData.dataBlock.data.timestamp;
            const cId = lastData.dataSourceId;
            
            if ((cTime !== -1 && lastTime === -1) || (lastTime !== -1 && cTime !== lastTime)) {
                timeBroadcastChannel.postMessage({
                    timestamp: cTime,
                    dataSourceId: cId,
                    type: EventType.LAST_TIME
                });
            }
            lastTime = cTime;
        }
    }, refreshRate);
    
    dataSynchronizerBroadCastChannel.postMessage({
        type: EventType.STATUS,
        status: 'running',
    });
}
