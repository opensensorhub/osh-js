/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
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
import { assertDefined, isDefined, randomUUID } from "../utils/Utils.js";
import DataSynchronizerWorker from './DataSynchronizer.worker.js';
import { DATA_SYNCHRONIZER_TOPIC, TIME_SYNCHRONIZER_TOPIC } from "../Constants.js";
import { Mode } from "../datasource/Mode";
var DataSynchronizer = /** @class */ (function () {
    /**
     * Creates The dataSynchronizer.
     * @param {Object} properties - the property of the object
     * @param {Number} [properties.replaySpeed=1] - replaySpeed value
     * @param {Number} [properties.timerResolution=5] - interval in which data is played (in milliseconds)
     * @param {Number} [properties.masterTimeRefreshRate=250] - interval in which time value is send through broadcast channel (in milliseconds)
     * @param {Number} [properties.mode=Mode.REPLAY] - mode of the data synchronizer
     * @param {String} properties.startTime - start time of the temporal run
     * @param {String} properties.endTime - end time of the temporal run
     * @param {Datasource[]} properties.dataSources - the dataSource array
     */
    function DataSynchronizer(properties) {
        this.bufferingTime = 1000; // default
        this.currentTime = Date.now();
        this.id = randomUUID();
        this.dataSources = properties.dataSources || [];
        this.replaySpeed = properties.replaySpeed || 1;
        this.timerResolution = properties.timerResolution || 5;
        this.masterTimeRefreshRate = properties.masterTimeRefreshRate || 250,
            this.mode = properties.mode || Mode.REPLAY;
        this.initialized = false;
        this.properties = {};
        this.properties.replaySpeed = this.replaySpeed;
        this.eventSubscriptionMap = {};
        this.messagesMap = {};
        if (this.mode !== Mode.REAL_TIME) {
            assertDefined(properties.startTime, 'startTime');
            assertDefined(properties.startTime, 'endTime');
            this.properties.startTime = properties.startTime;
            this.properties.endTime = properties.endTime;
        }
        else {
            this.properties.startTime = 'now';
            this.properties.endTime = '2055-01-01Z';
        }
    }
    DataSynchronizer.prototype.getTopicId = function () {
        return DATA_SYNCHRONIZER_TOPIC + this.id;
    };
    DataSynchronizer.prototype.getTimeTopicId = function () {
        return TIME_SYNCHRONIZER_TOPIC + this.id;
    };
    /**
     * @private
     */
    DataSynchronizer.prototype.initEventSubscription = function () {
        var _this = this;
        // listen for Events to callback to subscriptions
        new BroadcastChannel(this.getTopicId()).onmessage = function (message) {
            var type = message.data.type;
            if (type in _this.eventSubscriptionMap) {
                for (var i = 0; i < _this.eventSubscriptionMap[type].length; i++) {
                    _this.eventSubscriptionMap[type][i](message.data);
                }
            }
        };
        new BroadcastChannel(this.getTimeTopicId()).onmessage = function (message) {
            var type = message.data.type;
            if (type in _this.eventSubscriptionMap) {
                for (var i = 0; i < _this.eventSubscriptionMap[type].length; i++) {
                    _this.eventSubscriptionMap[type][i](message.data);
                }
            }
        };
    };
    /**
     * Gets the startTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    DataSynchronizer.prototype.getStartTime = function () {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.dataSources[0].properties.startTime;
    };
    /**
     * Gets the endTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    DataSynchronizer.prototype.getEndTime = function () {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return this.dataSources[0].properties.endTime;
    };
    /**
     * Gets the minTime of the first DataSource objet
     * @returns {String} - startTime as ISO date
     */
    DataSynchronizer.prototype.getMinTime = function () {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return isDefined(this.dataSources[0].properties.minTime) ? this.dataSources[0].properties.minTime : this.dataSources[0].properties.startTime;
    };
    /**
     * Gets the maxTime of the first DataSource objet
     * @returns {String} - endTime as ISO date
     */
    DataSynchronizer.prototype.getMaxTime = function () {
        if (this.dataSources.length === 0) {
            throw 'dataSource array is empty';
        }
        return isDefined(this.dataSources[0].properties.maxTime) ? this.dataSources[0].properties.maxTime : this.dataSources[0].properties.endTime;
    };
    DataSynchronizer.prototype.setMinTime = function (time) {
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var ds = _a[_i];
            ds.setMinTime(time);
        }
    };
    DataSynchronizer.prototype.setMaxTime = function (time) {
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var ds = _a[_i];
            ds.setMaxTime(time);
        }
    };
    /**
     * Gets the replaySpeed
     * @returns {Number} - the replay speed
     */
    DataSynchronizer.prototype.getReplaySpeed = function () {
        return this.replaySpeed;
    };
    /**
     * Terminate the corresponding running WebWorker by calling terminate() on it.
     */
    DataSynchronizer.prototype.terminate = function () {
        if (this.synchronizerWorker !== null) {
            this.synchronizerWorker.terminate();
            this.synchronizerWorker = null;
        }
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var dataSource = _a[_i];
            dataSource.terminate();
        }
    };
    DataSynchronizer.prototype.subscribe = function (fn, eventTypes) {
        // associate function to eventType
        for (var i = 0; i < eventTypes.length; i++) {
            if (!(eventTypes[i] in this.eventSubscriptionMap)) {
                this.eventSubscriptionMap[eventTypes[i]] = [];
            }
            this.eventSubscriptionMap[eventTypes[i]].push(fn);
        }
    };
    //----------- ASYNCHRONOUS FUNCTIONS -----------------//
    DataSynchronizer.prototype.initDataSources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var dataSourcesForWorker, mode, _i, _a, dataSource, dataSourceForWorker, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _b.trys.push([0, 6, , 7]);
                                    dataSourcesForWorker = [];
                                    mode = this.mode;
                                    _i = 0, _a = this.dataSources;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                    dataSource = _a[_i];
                                    return [4 /*yield*/, this.createDataSourceForWorker(dataSource)];
                                case 2:
                                    dataSourceForWorker = _b.sent();
                                    dataSourcesForWorker.push(dataSourceForWorker);
                                    mode = dataSource.mode;
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    this.synchronizerWorker = new DataSynchronizerWorker();
                                    this.handleWorkerMessage();
                                    return [4 /*yield*/, this.postMessage({
                                            message: 'init',
                                            dataSources: dataSourcesForWorker,
                                            replaySpeed: this.replaySpeed,
                                            timerResolution: this.timerResolution,
                                            masterTimeRefreshRate: this.masterTimeRefreshRate,
                                            startTime: this.properties.startTime,
                                            endTime: this.properties.endTime,
                                            mode: mode,
                                            topics: {
                                                data: this.getTopicId(),
                                                time: this.getTimeTopicId()
                                            }
                                        }, function () {
                                            this.initEventSubscription();
                                            this.initialized = true;
                                            resolve();
                                        }.bind(this), false)];
                                case 5:
                                    _b.sent();
                                    return [3 /*break*/, 7];
                                case 6:
                                    error_1 = _b.sent();
                                    console.log(error_1);
                                    reject(error_1);
                                    return [3 /*break*/, 7];
                                case 7: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * @private
     * @param dataSource
     */
    DataSynchronizer.prototype.createDataSourceForWorker = function (dataSource) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, ex_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = {
                            bufferingTime: dataSource.properties.bufferingTime || 0,
                            timeOut: dataSource.properties.timeOut || 0,
                            id: dataSource.id,
                            name: dataSource.name
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, dataSource.setDataSynchronizer(this)];
                    case 2:
                        _a.sent();
                        dataSource.properties.replaySpeed = this.replaySpeed;
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _a.sent();
                        console.error("Cannot set the synchronizer to this DataSource", ex_1);
                        throw ex_1;
                    case 4: return [2 /*return*/, obj];
                }
            });
        });
    };
    /**
     * Adds a new DataSource object to the list of datasources to synchronize.
     * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
     * @param {Datasource} dataSource - the new datasource to add
     * @param [lazy=false] lazy - add to current running synchronizer
     */
    DataSynchronizer.prototype.addDataSource = function (dataSource, lazy) {
        if (lazy === void 0) { lazy = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (lazy) {
                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            var dataSourceForWorker;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.createDataSourceForWorker(dataSource)];
                                    case 1:
                                        dataSourceForWorker = _a.sent();
                                        this.dataSources.push(dataSource);
                                        return [4 /*yield*/, this.postMessage({
                                                message: 'add',
                                                dataSources: [dataSourceForWorker]
                                            })];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, dataSource.connect()];
                                    case 3:
                                        _a.sent();
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                else {
                    this.dataSources.push(dataSource);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Removes a DataSource object from the list of datasources of the synchronizer.
     * @param {DataSource} dataSource - the new datasource to add
     * @param [lazy=false] lazy - remove from the current running synchronizer
     */
    DataSynchronizer.prototype.removeDataSource = function (dataSource, lazy) {
        if (lazy === void 0) { lazy = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (lazy) {
                    return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.dataSources = this.dataSources.filter(function (elt) { return elt.id !== dataSource.getId(); });
                                        return [4 /*yield*/, this.postMessage({
                                                message: 'remove',
                                                dataSources: [dataSource.getId()]
                                            })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, dataSource.disconnect()];
                                    case 2:
                                        _a.sent();
                                        resolve();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                else {
                    this.dataSources = this.dataSources.filter(function (elt) { return elt.id !== dataSource.getId(); });
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    DataSynchronizer.prototype.push = function (dataSourceId, data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(this.synchronizerWorker !== null)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.postMessage({
                                            type: 'data',
                                            dataSourceId: dataSourceId,
                                            data: data
                                        }, resolve)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Connects all dataSources
     */
    DataSynchronizer.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.checkInit()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.doConnect()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSynchronizer.prototype.checkInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var that;
            var _this = this;
            return __generator(this, function (_a) {
                that = this;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!isDefined(that.init)) {
                                        that.init = that.initDataSources();
                                    }
                                    return [4 /*yield*/, that.init];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DataSynchronizer.prototype.doConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _i, _a, dataSource;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _i = 0, _a = this.dataSources;
                                    _b.label = 1;
                                case 1:
                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                    dataSource = _a[_i];
                                    return [4 /*yield*/, dataSource.connect()];
                                case 2:
                                    _b.sent();
                                    _b.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4: return [4 /*yield*/, this.postMessage({
                                        message: 'connect',
                                    }, resolve)];
                                case 5:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Disconnects all dataSources
     */
    DataSynchronizer.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, dataSource;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.reset()];
                    case 1:
                        _b.sent();
                        _i = 0, _a = this.dataSources;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        dataSource = _a[_i];
                        return [4 /*yield*/, dataSource.disconnect()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the replaySpeed
     */
    DataSynchronizer.prototype.setReplaySpeed = function (replaySpeed) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.replaySpeed = replaySpeed;
                                    this.properties.replaySpeed = replaySpeed;
                                    return [4 /*yield*/, this.postMessage({
                                            message: 'replay-speed',
                                            replaySpeed: replaySpeed,
                                        }, resolve)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     * @param {Mode} mode - default dataSource mode
     */
    DataSynchronizer.prototype.setTimeRange = function (startTime, endTime, replaySpeed, reconnect, mode) {
        if (startTime === void 0) { startTime = this.getStartTime(); }
        if (endTime === void 0) { endTime = this.getEndTime(); }
        if (replaySpeed === void 0) { replaySpeed = this.getReplaySpeed(); }
        if (reconnect === void 0) { reconnect = false; }
        if (mode === void 0) { mode = this.mode; }
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.properties.startTime = startTime;
                                    this.properties.endTime = endTime;
                                    return [4 /*yield*/, this.postMessage({
                                            message: 'update-properties',
                                            mode: mode,
                                            replaySpeed: replaySpeed,
                                            startTime: startTime,
                                            endTime: endTime
                                        }, function () {
                                            for (var _i = 0, _a = _this.dataSources; _i < _a.length; _i++) {
                                                var ds = _a[_i];
                                                ds.setTimeRange(startTime, endTime, replaySpeed, reconnect, mode);
                                            }
                                            _this.mode = mode;
                                            resolve();
                                        })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DataSynchronizer.prototype.updateProperties = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, ds;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.dataSources; _i < _a.length; _i++) {
                    ds = _a[_i];
                    ds.updateProperties(properties);
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Resets reference time
     */
    DataSynchronizer.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.checkInit()];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, this.postMessage({
                                            message: 'reset'
                                        }, resolve)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    DataSynchronizer.prototype.getCurrentTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.postMessage({
                                        message: 'current-time'
                                    }, resolve)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    DataSynchronizer.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, ds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _i = 0, _a = this.dataSources;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        ds = _a[_i];
                        return [4 /*yield*/, ds.isConnected()];
                    case 2:
                        if (!(_b.sent())) {
                            return [2 /*return*/, false];
                        }
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    DataSynchronizer.prototype.postMessage = function (props, Fn, checkInit) {
        if (checkInit === void 0) { checkInit = true; }
        return __awaiter(this, void 0, void 0, function () {
            var messageId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!checkInit) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.checkInit()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        messageId = randomUUID();
                        this.synchronizerWorker.postMessage(__assign(__assign({}, props), { messageId: messageId }));
                        if (isDefined(Fn)) {
                            this.messagesMap[messageId] = Fn;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DataSynchronizer.prototype.handleWorkerMessage = function () {
        var _this = this;
        this.synchronizerWorker.onmessage = function (event) {
            var id = event.data.messageId;
            if (id in _this.messagesMap) {
                _this.messagesMap[id](event.data.data);
                delete _this.messagesMap[id];
            }
        };
    };
    return DataSynchronizer;
}());
export default DataSynchronizer;
//# sourceMappingURL=DataSynchronizer.js.map