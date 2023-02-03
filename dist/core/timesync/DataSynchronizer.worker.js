var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { DATASOURCE_DATA_TOPIC } from "../Constants.js";
import { EventType } from "../event/EventType.js";
import { isDefined } from "../utils/Utils";
import { Mode } from "../datasource/Mode";
import DataSynchronizerAlgoReplay from "./DataSynchronizerAlgo.replay";
import DataSynchronizerAlgoRealtime from "./DataSynchronizerAlgo.realtime.js";
var bcChannels = {};
var dataSynchronizerAlgo;
var init = false;
var dataSourceBroadCastChannel = null;
var lastData = undefined;
var dataSources = {};
var timeBroadcastChannel = null;
var topicTime;
var topicData;
var replaySpeed;
var masterTimeInterval = undefined;
var cTime;
var cId;
var lastTime = -1;
var version = -1;
var promise;
var masterTimeRefreshRate;
var startTimestamp;
var endTimestamp;
self.onmessage = function (event) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!isDefined(promise)) return [3 /*break*/, 2];
                return [4 /*yield*/, promise];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                promise = handleMessage(event);
                return [2 /*return*/];
        }
    });
}); };
function handleMessage(event) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var sendResponse, data, datasources, ex_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 7, , 8]);
                                sendResponse = true;
                                data = undefined;
                                if (!(event.data.message === 'init')) return [3 /*break*/, 1];
                                replaySpeed = event.data.replaySpeed;
                                startTimestamp = new Date(event.data.startTime).getTime();
                                endTimestamp = new Date(event.data.endTime).getTime();
                                if (event.data.mode === Mode.REPLAY) {
                                    dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(event.data.dataSources, event.data.replaySpeed, startTimestamp, endTimestamp, event.data.timerResolution);
                                    dataSynchronizerAlgo.onEnd = onEnd;
                                    dataSynchronizerAlgo.onStart = onStart;
                                }
                                else {
                                    dataSynchronizerAlgo = new DataSynchronizerAlgoRealtime(event.data.dataSources, event.data.replaySpeed, event.data.timerResolution);
                                }
                                dataSynchronizerAlgo.onData = onData;
                                init = true;
                                addDataSources(event.data.dataSources);
                                topicData = event.data.topics.data;
                                topicTime = event.data.topics.time;
                                initBroadcastChannel(topicData, topicTime);
                                masterTimeRefreshRate = event.data.masterTimeRefreshRate;
                                return [3 /*break*/, 6];
                            case 1:
                                if (!(event.data.message === 'add' && event.data.dataSources)) return [3 /*break*/, 2];
                                console.log('Add datasource to synchronizer..');
                                addDataSources(event.data.dataSources);
                                return [3 /*break*/, 6];
                            case 2:
                                if (!(event.data.message === 'connect')) return [3 /*break*/, 3];
                                startMasterTimeInterval(masterTimeRefreshRate);
                                dataSynchronizerAlgo.checkStart();
                                return [3 /*break*/, 6];
                            case 3:
                                if (!(event.data.message === 'remove' && event.data.dataSources)) return [3 /*break*/, 5];
                                console.log('Remove datasource from synchronizer..');
                                return [4 /*yield*/, removeDataSources(event.data.dataSources)];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 6];
                            case 5:
                                if (event.data.message === 'current-time') {
                                    data = {
                                        message: 'current-time',
                                        data: dataSynchronizerAlgo.getCurrentTimestamp()
                                    };
                                }
                                else if (event.data.message === 'reset') {
                                    reset();
                                }
                                else if (event.data.message === 'replay-speed') {
                                    if (dataSynchronizerAlgo !== null) {
                                        reset();
                                        dataSynchronizerAlgo.replaySpeed = event.data.replaySpeed;
                                    }
                                }
                                else if (event.data.message === 'update-properties') {
                                    reset();
                                    datasources = [];
                                    if (dataSynchronizerAlgo !== null) {
                                        datasources = dataSynchronizerAlgo.datasources;
                                    }
                                    startTimestamp = new Date(event.data.startTime).getTime();
                                    endTimestamp = new Date(event.data.endTime).getTime();
                                    if (event.data.mode === Mode.REPLAY) {
                                        dataSynchronizerAlgo = new DataSynchronizerAlgoReplay(datasources, event.data.replaySpeed, startTimestamp, endTimestamp, dataSynchronizerAlgo.timerResolution);
                                        dataSynchronizerAlgo.onEnd = onEnd;
                                        dataSynchronizerAlgo.onStart = onStart;
                                    }
                                    else {
                                        dataSynchronizerAlgo = new DataSynchronizerAlgoRealtime(datasources, dataSynchronizerAlgo.timerResolution);
                                    }
                                    dataSynchronizerAlgo.onData = onData;
                                }
                                else if (event.data.message === 'data') {
                                    checkMasterTime();
                                    if (dataSynchronizerAlgo !== null) {
                                        dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
                                    }
                                }
                                else {
                                    // skip response
                                    sendResponse = false;
                                }
                                _a.label = 6;
                            case 6:
                                if (sendResponse) {
                                    self.postMessage({
                                        message: event.data.message,
                                        data: data,
                                        messageId: event.data.messageId
                                    });
                                }
                                resolve();
                                return [3 /*break*/, 8];
                            case 7:
                                ex_1 = _a.sent();
                                reject(ex_1);
                                return [3 /*break*/, 8];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
function reset() {
    clearInterval(masterTimeInterval);
    masterTimeInterval = undefined;
    version = -1;
    if (dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.reset();
    }
    timeBroadcastChannel.postMessage({
        type: EventType.TIME_CHANGED
    });
}
function initBroadcastChannel(dataTopic, timeTopic) {
    var _this = this;
    console.log('listen on topic ', dataTopic);
    dataSourceBroadCastChannel = new BroadcastChannel(dataTopic);
    dataSourceBroadCastChannel.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var dataSourceId;
        return __generator(this, function (_a) {
            checkMasterTime();
            if (event.data.type === EventType.DATA) {
                dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.values);
            }
            else if (event.data.type === EventType.STATUS) {
                dataSourceId = event.data.dataSourceId;
                dataSynchronizerAlgo.setStatus(dataSourceId, event.data.status);
                console.log(dataSources[dataSourceId].name + ": status=" + event.data.status);
                // bubble the message
                bcChannels[dataSourceId].postMessage(event.data);
            }
            return [2 /*return*/];
        });
    }); };
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
/**
 *
 * @param dataSources
 */
function removeDataSources(dataSources) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, dataSources_2, dataSource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, dataSources_2 = dataSources;
                    _a.label = 1;
                case 1:
                    if (!(_i < dataSources_2.length)) return [3 /*break*/, 4];
                    dataSource = dataSources_2[_i];
                    return [4 /*yield*/, removeDataSource(dataSource)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function removeDataSource(dataSource) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dataSynchronizerAlgo.removeDataSource(dataSource)];
                case 1:
                    _a.sent();
                    // create a BC to push back the synchronized data into the DATA Stream.
                    delete bcChannels[dataSource.id];
                    delete dataSources[dataSource.id];
                    return [2 /*return*/];
            }
        });
    });
}
function checkMasterTime() {
    if (!isDefined(masterTimeInterval)) {
        startMasterTimeInterval(masterTimeRefreshRate);
    }
}
function onEnd() {
    return __awaiter(this, void 0, void 0, function () {
        var masterTime;
        return __generator(this, function (_a) {
            masterTime = dataSynchronizerAlgo.getCurrentTimestamp();
            clearInterval(masterTimeInterval);
            masterTimeInterval = undefined;
            // end at this time
            timeBroadcastChannel.postMessage({
                timestamp: masterTime,
                type: EventType.MASTER_TIME
            });
            return [2 /*return*/];
        });
    });
}
function onStart() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
function onData(dataSourceId, dataBlock) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if ((version === -1 && (isDefined(lastData)) && dataBlock.version === lastData.dataBlock.version)) {
                return [2 /*return*/];
            }
            version = dataBlock.version;
            lastData = {
                dataSourceId: dataSourceId,
                dataBlock: dataBlock
            };
            bcChannels[dataSourceId].postMessage({
                values: [dataBlock],
                dataSourceId: dataSourceId,
                type: EventType.DATA
            });
            return [2 /*return*/];
        });
    });
}
self.onclose = function () {
    dataSynchronizerAlgo.close();
    console.log("Data Synchronizer has been terminated successfully");
};
var masterTime;
function startMasterTimeInterval(masterTimeRefreshRate) {
    if (!isDefined(masterTimeInterval)) {
        masterTimeInterval = setInterval(function () {
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
//# sourceMappingURL=DataSynchronizer.worker.js.map