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
import { DATA_SYNCHRONIZER_TOPIC, DATASOURCE_TIME_TOPIC } from "../Constants";
import { assertDefined, isDefined } from "../utils/Utils";
import DataSource from "./DataSource.datasource";
/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
var TimeSeriesDatasource = /** @class */ (function (_super) {
    __extends(TimeSeriesDatasource, _super);
    function TimeSeriesDatasource(name, properties) {
        var _this = _super.call(this, name, properties) || this;
        assertDefined(properties, 'Some properties must be defined');
        _this.dataSynchronizer = undefined;
        return _this;
    }
    TimeSeriesDatasource.prototype.getTimeTopicId = function () {
        return DATASOURCE_TIME_TOPIC + this.id;
    };
    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    TimeSeriesDatasource.prototype.getStartTime = function () {
        return this.properties.startTime;
    };
    /**
     * Gets the mode
     * @returns {Mode} - Datasource mode
     */
    TimeSeriesDatasource.prototype.getMode = function () {
        return this.properties.mode;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDatasource.prototype.getEndTime = function () {
        return this.properties.endTime;
    };
    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    TimeSeriesDatasource.prototype.getMinTime = function () {
        return this.properties.minTime;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDatasource.prototype.getMaxTime = function () {
        return this.properties.maxTime;
    };
    /**
     * Sets the min time
     */
    TimeSeriesDatasource.prototype.setMinTime = function (time) {
        this.properties.minTime = time;
    };
    /**
     * Sets the max time
     */
    TimeSeriesDatasource.prototype.setMaxTime = function (time) {
        this.properties.maxTime = time;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDatasource.prototype.getReplaySpeed = function () {
        return this.properties.replaySpeed;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDatasource.prototype.setReplaySpeed = function (replaySpeed) {
        this.properties.replaySpeed = replaySpeed;
    };
    //----------- ASYNCHRONOUS FUNCTIONS -----------------//
    /**
     * @private
     * @param dataSynchronizer
     * @returns {Promise}
     */
    TimeSeriesDatasource.prototype.setDataSynchronizer = function (dataSynchronizer) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var topic;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.checkInit()];
                                case 1:
                                    _a.sent();
                                    topic = DATA_SYNCHRONIZER_TOPIC + dataSynchronizer.id;
                                    this.dataSynchronizer = dataSynchronizer;
                                    this.postMessage({
                                        message: 'topics',
                                        topics: {
                                            data: topic,
                                            time: this.getTimeTopicId(),
                                            sync: dataSynchronizer.getTimeTopicId()
                                        },
                                    }, resolve);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    TimeSeriesDatasource.prototype.disconnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this.checkInit()];
                                case 1:
                                    _a.sent();
                                    this.postMessage({
                                        message: 'disconnect'
                                    }, resolve);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    TimeSeriesDatasource.prototype.doConnect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
                        var startTime, st;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    startTime = this.properties.startTime;
                                    if (!isDefined(this.dataSynchronizer)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, this.dataSynchronizer.getCurrentTime()];
                                case 1:
                                    st = (_a.sent()).data;
                                    if (isDefined(st)) {
                                        startTime = new Date(st).toISOString();
                                    }
                                    _a.label = 2;
                                case 2:
                                    this.postMessage({
                                        message: 'connect',
                                        startTime: startTime
                                    }, resolve);
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    TimeSeriesDatasource.prototype.initDataSource = function (properties) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, _super.prototype.initDataSource.call(this, properties)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    this.postMessage({
                                        message: 'topics',
                                        topics: {
                                            data: this.getTopicId(),
                                            time: this.getTimeTopicId()
                                        },
                                    }, function () { return __awaiter(_this, void 0, void 0, function () {
                                        var datasourceBroadcastChannel;
                                        var _this = this;
                                        return __generator(this, function (_a) {
                                            datasourceBroadcastChannel = new BroadcastChannel(this.getTimeTopicId());
                                            datasourceBroadcastChannel.onmessage = function (message) { return __awaiter(_this, void 0, void 0, function () {
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0: return [4 /*yield*/, this.handleTimeMessage(message)];
                                                        case 1:
                                                            _a.sent();
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); };
                                            resolve();
                                            return [2 /*return*/];
                                        });
                                    }); });
                                    return [2 /*return*/];
                                });
                            }); })];
                }
            });
        });
    };
    TimeSeriesDatasource.prototype.handleTimeMessage = function (message) {
        return __awaiter(this, void 0, void 0, function () {
            var type, i;
            return __generator(this, function (_a) {
                type = message.data.type;
                if (type in this.eventSubscriptionMap) {
                    for (i = 0; i < this.eventSubscriptionMap[type].length; i++) {
                        this.eventSubscriptionMap[type][i](message.data);
                    }
                }
                return [2 /*return*/];
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
    TimeSeriesDatasource.prototype.setTimeRange = function (startTime, endTime, replaySpeed, reconnect, mode) {
        if (startTime === void 0) { startTime = this.getStartTime(); }
        if (endTime === void 0) { endTime = this.getEndTime(); }
        if (replaySpeed === void 0) { replaySpeed = this.getReplaySpeed(); }
        if (reconnect === void 0) { reconnect = false; }
        if (mode === void 0) { mode = this.getMode(); }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.updateProperties({
                        startTime: startTime,
                        endTime: endTime,
                        replaySpeed: replaySpeed,
                        reconnect: reconnect,
                        mode: mode
                    })];
            });
        });
    };
    return TimeSeriesDatasource;
}(DataSource));
export default TimeSeriesDatasource;
//# sourceMappingURL=TimeSeries.datasource.js.map