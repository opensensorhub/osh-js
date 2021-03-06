var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import DataSynchronizerAlgo from "./DataSynchronizerAlgo.js";
import { DATASOURCE_DATA_TOPIC } from "../Constants.js";
import { EventType } from "../event/EventType.js";
var bcChannels = {};
var dataSynchronizerAlgo;
var init = false;
var dataSourceBroadCastChannel = null;
self.currentTime = -1;
var dataSources = {};
var timeBroadcastChannel = null;
self.onmessage = function (event) {
    if (event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(event.data.dataSources, event.data.replaySpeed, event.data.timerResolution);
        dataSynchronizerAlgo.onData = onData;
        init = true;
        addDataSources(event.data.dataSources);
        initBroadcastChannel(event.data.dataTopic, event.data.timeTopic);
    }
    else if (event.data.message === 'add' && event.data.dataSources) {
        addDataSources(event.data.dataSources);
    }
    else if (event.data.message === 'current-time') {
        self.postMessage({
            message: 'current-time',
            data: self.currentTime
        });
    }
    else if (event.data.message === 'reset') {
        if (dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.reset();
        }
    }
    else if (event.data.message === 'replay-speed') {
        if (dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
        }
    }
    else if (event.data.message === 'data') {
        if (dataSynchronizerAlgo !== null) {
            dataSynchronizerAlgo.push(event.data.dataSourceId, {
                data: event.data.data,
                timeStamp: event.data.timeStamp
            });
        }
    }
};
function initBroadcastChannel(dataTopic, timeTopic) {
    dataSourceBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSourceBroadCastChannel.onmessage = function (event) {
        if (event.data.type === EventType.DATA) {
            for (var i = 0; i < event.data.values.length; i++) {
                dataSynchronizerAlgo.push(event.data.dataSourceId, __assign({}, event.data.values[i]));
            }
        }
        else if (event.data.type === EventType.STATUS) {
            var dataSourceId = event.data.dataSourceId;
            dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
            // bubble the message
            bcChannels[dataSourceId].postMessage(event.data);
        }
    };
    timeBroadcastChannel = new BroadcastChannel(timeTopic);
}
/**
 *
 * @param dataSources
 */
function addDataSources(dataSources) {
    for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
        var dataSource = dataSources_1[_i];
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
function onData(dataSourceId, data) {
    self.currentTime = data.timeStamp;
    bcChannels[dataSourceId].postMessage({
        values: [data],
        dataSourceId: dataSourceId,
        type: EventType.DATA
    });
    timeBroadcastChannel.postMessage({
        timestamp: data.timeStamp
    });
}
self.onclose = function () {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
};
//# sourceMappingURL=DataSynchronizer.worker.js.map
