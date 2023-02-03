/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// v1
import DataSourceHandler from "./DataSource.handler";
import { assertDefined, isDefined } from "../../../utils/Utils";
import { EventType } from "../../../event/EventType";
import { Status } from "../../../connector/Status";
import { Mode } from "../../Mode";
var DelegateHandler = /** @class */ (function () {
    function DelegateHandler(context) {
        this.context = context;
        this.status = {
            cancel: false
        };
    }
    DelegateHandler.prototype.setContext = function (context) {
        this.context = context;
    };
    DelegateHandler.prototype.init = function (properties) {
        this.properties = properties;
    };
    DelegateHandler.prototype.handleData = function (data) {
    };
    DelegateHandler.prototype.connect = function () {
        this.status.cancel = false;
        this.context.connect();
    };
    DelegateHandler.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.status.cancel = true;
                return [2 /*return*/, this.context.disconnect()];
            });
        });
    };
    DelegateHandler.prototype.setTimeTopic = function (timeTopic) {
        this.timeTopic = timeTopic;
    };
    return DelegateHandler;
}());
var DelegateRealTimeHandler = /** @class */ (function (_super) {
    __extends(DelegateRealTimeHandler, _super);
    function DelegateRealTimeHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelegateRealTimeHandler.prototype.init = function (properties) {
        var _this = this;
        _super.prototype.init.call(this, __assign(__assign({}, properties), { startTime: 'now', endTime: '2055-01-01' }));
        this.status = {
            cancel: false
        };
        this.context.handleData = function (data) {
            if (!_this.status.cancel) {
                _this.handleData(data);
            }
        };
    };
    DelegateRealTimeHandler.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.status.cancel = true;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var ex_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 2, 3, 4]);
                                    return [4 /*yield*/, this.context.disconnect()];
                                case 1:
                                    _a.sent();
                                    return [3 /*break*/, 4];
                                case 2:
                                    ex_1 = _a.sent();
                                    console.error(ex_1);
                                    return [3 /*break*/, 4];
                                case 3:
                                    resolve();
                                    return [7 /*endfinally*/];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return DelegateRealTimeHandler;
}(DelegateHandler));
var DelegateBatchHandler = /** @class */ (function (_super) {
    __extends(DelegateBatchHandler, _super);
    function DelegateBatchHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DelegateBatchHandler.prototype.fetchData = function (startTime, endTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.warn("fetching ".concat(new Date(startTime).toISOString(), " -> ") +
                    "".concat(new Date(endTime).toISOString(), " for datasource ").concat(this.context.properties.dataSourceId));
                return [2 /*return*/, this.context.nextBatch(this.properties, startTime, endTime, this.status)];
            });
        });
    };
    DelegateBatchHandler.prototype.connect = function () {
        var _this = this;
        this.context.onChangeStatus(Status.FETCH_STARTED);
        this.fetchData(this.properties.startTime, this.properties.endTime).then(function (data) {
            if (!_this.status.cancel) {
                _this.handleData(data);
            }
        });
        this.context.onChangeStatus(Status.FETCH_ENDED);
    };
    DelegateBatchHandler.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return DelegateBatchHandler;
}(DelegateHandler));
var DelegateReplayHandler = /** @class */ (function (_super) {
    __extends(DelegateReplayHandler, _super);
    function DelegateReplayHandler(context) {
        var _this = _super.call(this, context) || this;
        _this.initialized = false;
        _this.prefetchBatchDuration = 10000; // 10 sec
        _this.prefetchNextBatchThreshold = 0.5; // 50%, fetch before the end
        _this.prefetchBatchDuration = 5000;
        _this.startTime = undefined;
        return _this;
    }
    DelegateReplayHandler.prototype.init = function (properties) {
        _super.prototype.init.call(this, properties);
        this.prefetchBatchDuration = properties.prefetchBatchDuration || this.prefetchBatchDuration;
        this.status = {
            cancel: false
        };
        if (!isDefined(this.startTime)) {
            this.startTime = properties.startTime;
        }
    };
    DelegateReplayHandler.prototype.startLoop = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startTimestamp, endTimestamp, replaySpeed, prefetchBatchDuration, lastTimestamp, data_1, masterTimestamp_1, fetching_1, ex_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTimestamp = new Date(this.startTime).getTime();
                        endTimestamp = new Date(this.properties.endTime).getTime();
                        if (startTimestamp >= endTimestamp) {
                            console.warn("Did not connect DataSource ".concat(this.context.properties.dataSourceId) +
                                " because startTime=".concat(this.startTime, " >= endTime=").concat(this.properties.endTime));
                            return [2 /*return*/];
                        }
                        if (!this.initialized) {
                            this.initialized = true;
                            this.status = {
                                cancel: false
                            };
                        }
                        replaySpeed = this.properties.replaySpeed || 1;
                        prefetchBatchDuration = this.properties.prefetchBatchDuration * replaySpeed;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.context.nextBatch()];
                    case 2:
                        data_1 = _a.sent();
                        this.context.onChangeStatus(Status.FETCH_STARTED);
                        if (this.status.cancel) {
                            return [2 /*return*/];
                        }
                        else if (data_1.length > 0) {
                            this.handleData(data_1);
                            lastTimestamp = data_1[data_1.length - 1].timestamp;
                        }
                        if (lastTimestamp < endTimestamp) {
                            fetching_1 = false;
                            this.timeBc = new BroadcastChannel(this.timeTopic);
                            this.timeBc.onmessage = function (event) { return __awaiter(_this, void 0, void 0, function () {
                                var dTimestamp;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(event.data.type === EventType.MASTER_TIME)) return [3 /*break*/, 5];
                                            masterTimestamp_1 = event.data.timestamp;
                                            if (!(masterTimestamp_1 >= endTimestamp)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.disconnect()];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                        case 2:
                                            if (!(lastTimestamp < endTimestamp && !fetching_1)) return [3 /*break*/, 5];
                                            fetching_1 = true;
                                            dTimestamp = lastTimestamp - masterTimestamp_1;
                                            if (!(dTimestamp <= prefetchBatchDuration)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.context.nextBatch()];
                                        case 3:
                                            // request next batch
                                            data_1 = _a.sent();
                                            if (!this.status.cancel && data_1.length > 0) {
                                                this.handleData(data_1);
                                                lastTimestamp = data_1[data_1.length - 1].timestamp;
                                            }
                                            _a.label = 4;
                                        case 4:
                                            fetching_1 = false;
                                            _a.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); };
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        ex_2 = _a.sent();
                        if (this.status.cancel) {
                            console.warn(ex_2);
                        }
                        else {
                            console.error(ex_2);
                            throw Error(ex_2);
                        }
                        return [3 /*break*/, 4];
                    case 4:
                        assertDefined(this.timeTopic, 'TimeTopic');
                        return [2 /*return*/];
                }
            });
        });
    };
    DelegateReplayHandler.prototype.connect = function (startTime) {
        if (startTime) {
            this.startTime = startTime;
            this.context.properties.startTime = this.startTime;
        }
        this.startLoop();
    };
    DelegateReplayHandler.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!this.initialized) {
                    console.warn("The dataSource ".concat(this.context.properties.dataSourceId, " is not connected"));
                    return [2 /*return*/];
                }
                this.status.cancel = true;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var ex_3;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, 4, 5]);
                                    if (!isDefined(this.promise)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.promise];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [3 /*break*/, 5];
                                case 3:
                                    ex_3 = _a.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    try {
                                        this.promise = undefined;
                                        this.context.onChangeStatus(Status.FETCH_ENDED);
                                        this.context.onChangeStatus(Status.DISCONNECTED);
                                        this.context.disconnect();
                                        if (isDefined(this.timeBc)) {
                                            this.timeBc.close();
                                        }
                                        this.initialized = false;
                                    }
                                    catch (ex) {
                                        console.error(ex);
                                    }
                                    finally {
                                        resolve();
                                    }
                                    return [7 /*endfinally*/];
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    return DelegateReplayHandler;
}(DelegateHandler));
var TimeSeriesHandler = /** @class */ (function (_super) {
    __extends(TimeSeriesHandler, _super);
    function TimeSeriesHandler() {
        var _this = _super.call(this) || this;
        _this.timeBroadcastChannel = null;
        _this.delegateHandler = undefined;
        _this.promiseDisconnect = new Promise(function (resolve) { resolve(); }); // default one
        _this.contexts = {};
        return _this;
    }
    TimeSeriesHandler.prototype.init = function (properties, topics, dataSourceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataSourceId = dataSourceId;
                        this.properties = __assign(__assign(__assign({}, this.properties), properties), { dataSourceId: dataSourceId, version: this.version });
                        this.setTopics(topics);
                        this.contexts[this.properties.mode] = this.createContext(this.properties);
                        this.context = this.contexts[this.properties.mode];
                        this.context.onChangeStatus = this.onChangeStatus.bind(this);
                        return [4 /*yield*/, this.context.init(this.properties)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.updateDelegateHandler(properties)];
                    case 2:
                        _a.sent();
                        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
                        this.initialized = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesHandler.prototype.createContext = function (properties) {
        throw Error('Should be overridden');
    };
    TimeSeriesHandler.prototype.updateDelegateHandler = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!isDefined(this.delegateHandler)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.delegateHandler.disconnect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (properties.mode === Mode.REAL_TIME) {
                            this.delegateRealTimeHandler = new DelegateRealTimeHandler(this.context);
                            this.delegateHandler = this.delegateRealTimeHandler;
                        }
                        else if (properties.mode === Mode.REPLAY) {
                            this.delegateReplayHandler = new DelegateReplayHandler(this.context);
                            this.delegateHandler = this.delegateReplayHandler;
                        }
                        else if (properties.mode === Mode.BATCH) {
                            this.delegateBatchHandler = new DelegateBatchHandler(this.context);
                            this.delegateHandler = this.delegateBatchHandler;
                        }
                        this.delegateHandler.init(properties);
                        this.delegateHandler.setTimeTopic(this.timeSyncTopic);
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesHandler.prototype.updateProperties = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var ex_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        this.timeBroadcastChannel.postMessage({
                            dataSourceId: this.dataSourceId,
                            type: EventType.TIME_CHANGED
                        });
                        return [4 /*yield*/, this.disconnect()];
                    case 1:
                        _a.sent();
                        this.properties = __assign(__assign(__assign({}, this.properties), properties), { version: ++this.version });
                        if (!(this.properties.mode in this.contexts)) {
                            console.warn("creating new context for mode ".concat(this.properties.mode));
                            this.contexts[this.properties.mode] = this.createContext(this.properties);
                        }
                        this.context = this.contexts[this.properties.mode];
                        this.context.onChangeStatus = this.onChangeStatus.bind(this);
                        return [4 /*yield*/, this.context.init(this.properties)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.updateDelegateHandler(this.properties)];
                    case 3:
                        _a.sent();
                        this.delegateHandler.handleData = this.handleData.bind(this); // bind context to handler
                        this.connect();
                        return [3 /*break*/, 5];
                    case 4:
                        ex_4 = _a.sent();
                        console.error(ex_4);
                        throw ex_4;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesHandler.prototype.setTopics = function (topics) {
        _super.prototype.setTopics.call(this, topics);
        this.timeSyncTopic = undefined;
        if (isDefined(topics.time)) {
            this.setTimeTopic(topics.time);
        }
        if (isDefined(topics.sync)) {
            this.timeSyncTopic = topics.sync;
            this.delegateHandler.setTimeTopic(this.timeSyncTopic);
        }
    };
    TimeSeriesHandler.prototype.setTimeTopic = function (timeTopic) {
        if (this.timeTopic === timeTopic) {
            return;
        }
        if (this.timeBroadcastChannel !== null) {
            console.warn("Replace old topic ".concat(this.timeTopic, " by ").concat(timeTopic));
            this.timeBroadcastChannel.close();
        }
        this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
        this.timeTopic = timeTopic;
    };
    TimeSeriesHandler.prototype.flushAll = function () {
        if (this.properties.mode !== Mode.BATCH && this.values.length > 0) {
            this.flush();
        }
    };
    TimeSeriesHandler.prototype.flush = function () {
        // console.log('push message on ',this.broadcastChannel)
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values
        });
        this.values = [];
    };
    TimeSeriesHandler.prototype.handleData = function (data) {
        var results = [];
        if (Array.isArray(data)) {
            if (data.length === 0) {
                console.warn("Data array is empty for datasource ".concat(this.dataSourceId));
                return;
            }
            var d = void 0;
            for (var i = 0; i < data.length; i++) {
                d = {
                    data: data[i],
                    version: this.context.properties.version
                };
                results.push(d);
            }
        }
        else {
            results.push({
                data: data,
                version: this.context.properties.version
            });
        }
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: results
        });
        if (this.timeBroadcastChannel !== null) {
            if (data.length > 0) {
                this.timeBroadcastChannel.postMessage({
                    timestamp: data[data.length - 1].timestamp,
                    type: EventType.LAST_TIME
                });
            }
        }
    };
    TimeSeriesHandler.prototype.isConnected = function () {
        if (isDefined(this.delegateHandler.context)) {
            return this.delegateHandler.context.isConnected();
        }
        else {
            return false;
        }
    };
    TimeSeriesHandler.prototype.checkDisconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.promiseDisconnect];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesHandler.prototype.connect = function (startTime) {
        if (startTime === void 0) { startTime = this.properties.startTime; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkDisconnect()];
                    case 1:
                        _a.sent();
                        if (this.delegateHandler instanceof DelegateReplayHandler && !isDefined(this.timeSyncTopic)) {
                            throw Error('DataSynchronizer must be used in case of Mode.REPLAY');
                        }
                        this.version++;
                        this.context.init(this.properties);
                        this.delegateHandler.connect(startTime);
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesHandler.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.promiseDisconnect = this.delegateHandler.disconnect();
                return [2 /*return*/, this.promiseDisconnect];
            });
        });
    };
    return TimeSeriesHandler;
}(DataSourceHandler));
export default TimeSeriesHandler;
//# sourceMappingURL=TimeSeries.handler.js.map