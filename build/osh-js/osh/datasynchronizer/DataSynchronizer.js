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
import { isDefined, randomUUID } from "../utils/Utils.js";
import DataSynchronizerWorker from './DataSynchronizer.worker.js';
import { DATA_SYNCHRONIZER_TOPIC, TIME_SYNCHRONIZER_TOPIC } from "../Constants.js";
var DataSynchronizer = /** @class */ (function () {
    /**
     * Creates The timeSync.
     * @param {Object} properties - the property of the object
     * @param {Number} [properties.replaySpeed=1] - replaySpeed value
     * @param {Number} [properties.timerResolution=5] - interval in which data is played (in milliseconds)
     * @param {DataSource[]} properties.dataSources - the dataSource array
     */
    function DataSynchronizer(properties) {
        if (!isDefined(properties.dataSources)) {
            throw 'You must specify a dataSource array';
        }
        this.bufferingTime = 1000; // default
        this.currentTime = Date.now();
        this.id = randomUUID();
        this.dataSources = [];
        this.replaySpeed = 1;
        this.timerResolution = 5;
        if (isDefined(properties.replaySpeed)) {
            this.replaySpeed = properties.replaySpeed;
        }
        if (isDefined(properties.timerResolution)) {
            this.timerResolution = properties.timerResolution;
        }
        this.initWorker(properties.dataSources, this.timerResolution);
        this.properties = {};
        this.properties.replaySpeed = this.replaySpeed;
    }
    /**
     * @private
     */
    DataSynchronizer.prototype.initWorker = function (dataSources, timerResolution) {
        // build object for Worker because DataSource is not clonable
        var dataSourcesForWorker = [];
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var dataSource = dataSources_1[_i];
            var dataSourceForWorker = this.createDataSourceForWorker(dataSource);
            dataSourcesForWorker.push(dataSourceForWorker);
            this.dataSources.push(dataSource);
        }
        this.synchronizerWorker = new DataSynchronizerWorker();
        this.synchronizerWorker.postMessage({
            message: 'init',
            dataSources: dataSourcesForWorker,
            replaySpeed: this.replaySpeed,
            timerResolution: timerResolution,
            dataTopic: this.getTopicId(),
            timeTopic: this.getTimeTopicId(),
        });
    };
    /**
     * @private
     * @param dataSource
     */
    DataSynchronizer.prototype.createDataSourceForWorker = function (dataSource) {
        console.log(dataSource);
        var obj = {
            bufferingTime: dataSource.properties.bufferingTime || 0,
            timeOut: dataSource.properties.timeOut || 0,
            id: dataSource.id
        };
        // bind dataSource data onto timeSync data
        try {
            dataSource.setDataSynchronizer(this);
            dataSource.properties.replaySpeed = this.replaySpeed;
        }
        catch (ex) {
            console.error("Cannot set the synchronizer to this DataSource", ex);
        }
        return obj;
    };
    /**
    * Adds a new DataSource object to the list of datasources to synchronize.
    * note: don't forget to call reset() to be sure to re-init the synchronizer internal properties.
    * @param {DataSource} dataSource - the new datasource to add
    *
    */
    DataSynchronizer.prototype.addDataSource = function (dataSource) {
        var dataSourceForWorker = this.createDataSourceForWorker(dataSource);
        this.dataSources.push(dataSource);
        this.synchronizerWorker.postMessage({
            message: 'add',
            dataSources: [dataSourceForWorker]
        });
    };
    /**
     * @param {String} dataSourceId - the dataSource id
     * @param {Object} data - the data to push into the data synchronizer
     */
    DataSynchronizer.prototype.push = function (dataSourceId, data) {
        if (this.synchronizerWorker !== null) {
            this.synchronizerWorker.postMessage({
                type: 'data',
                dataSourceId: dataSourceId,
                data: data
            });
        }
    };
    /**
     * Connects all dataSources
     */
    DataSynchronizer.prototype.connect = function () {
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var dataSource = _a[_i];
            dataSource.connect();
        }
    };
    /**
     * Disconnects all dataSources
     */
    DataSynchronizer.prototype.disconnect = function () {
        this.reset();
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var dataSource = _a[_i];
            dataSource.disconnect();
        }
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
    /**
     * Gets the replaySpeed
     * @returns {Number} - the replay speed
     */
    DataSynchronizer.prototype.getReplaySpeed = function () {
        return this.replaySpeed;
    };
    /**
     * Sets the replaySpeed
     */
    DataSynchronizer.prototype.setReplaySpeed = function (replaySpeed) {
        this.replaySpeed = replaySpeed;
        this.properties.replaySpeed = replaySpeed;
        this.synchronizerWorker.postMessage({
            message: 'replay-speed',
            replaySpeed: replaySpeed,
        });
    };
    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     */
    DataSynchronizer.prototype.setTimeRange = function (startTime, endTime, replaySpeed, reconnect) {
        if (reconnect === void 0) { reconnect = false; }
        if (this.replaySpeed !== replaySpeed) {
            this.setReplaySpeed(replaySpeed);
        }
        this.reset();
        for (var _i = 0, _a = this.dataSources; _i < _a.length; _i++) {
            var ds = _a[_i];
            ds.setTimeRange(startTime, endTime, replaySpeed, reconnect);
        }
    };
    /**
     * Resets reference time
     */
    DataSynchronizer.prototype.reset = function () {
        if (this.synchronizerWorker !== null) {
            this.synchronizerWorker.postMessage({
                message: 'reset'
            });
        }
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
    DataSynchronizer.prototype.getCurrentTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    if (_this.synchronizerWorker !== null) {
                        _this.synchronizerWorker.onmessage = function (event) {
                            if (event.data.message === 'current-time') {
                                resolve(event.data.data);
                            }
                        };
                    }
                });
                if (this.synchronizerWorker !== null) {
                    this.synchronizerWorker.postMessage({
                        message: 'current-time'
                    });
                }
                return [2 /*return*/, promise];
            });
        });
    };
    DataSynchronizer.prototype.getTopicId = function () {
        return DATA_SYNCHRONIZER_TOPIC + this.id;
    };
    DataSynchronizer.prototype.getTimeTopicId = function () {
        return TIME_SYNCHRONIZER_TOPIC + this.id;
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
                        if (_b.sent()) {
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
    return DataSynchronizer;
}());
export default DataSynchronizer;
//# sourceMappingURL=DataSynchronizer.js.map
