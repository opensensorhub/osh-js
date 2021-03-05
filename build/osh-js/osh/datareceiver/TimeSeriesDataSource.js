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
import DataSource from "./DataSource";
import { DATA_SYNCHRONIZER_TOPIC, DATASOURCE_TIME_TOPIC } from "../Constants";
import { assertDefined, isDefined } from "../utils/Utils";
/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
var TimeSeriesDataSource = /** @class */ (function (_super) {
    __extends(TimeSeriesDataSource, _super);
    /**
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} [properties.timeShift=false] - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} [properties.bufferingTime=0 - defines the time during the data has to be buffered. Useful only when used with DataSynchronizer
     * @param {Number} [properties.timeOut=0] - defines the limit time before data has to be skipped. Useful only when used with DataSynchronizer
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {String} [properties.minTime=properties.startTime] the min range time (ISO format)
     * @param {String} [properties.maxTime=properties.endTime] the max range time (ISO format)
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Number} [properties.batchSize=1] - the number of data to fetch
     * @param {Object} [properties.customUrlParams={}] - custom parameters appended to the URL as they are
     * @param {Object} worker - DataSource worker
     */
    function TimeSeriesDataSource(name, properties, worker) {
        var _this = _super.call(this, name, properties, worker) || this;
        assertDefined(properties, 'Some properties must be defined');
        assertDefined(properties.startTime, 'startTime must must be defined');
        assertDefined(properties.endTime, 'startTime must must be defined');
        _this.timeSync = null;
        return _this;
    }
    TimeSeriesDataSource.prototype.setDataSynchronizer = function (timeSync) {
        this.timeSync = timeSync;
        this.dataSourceWorker.postMessage({
            message: 'topic',
            topic: DATA_SYNCHRONIZER_TOPIC + this.timeSync.id,
            timeTopic: this.getTimeTopicId()
        });
    };
    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    TimeSeriesDataSource.prototype.initDataSource = function (properties) {
        _super.prototype.initDataSource.call(this, properties);
        this.dataSourceWorker.postMessage({
            message: 'topic',
            topic: this.getTopicId(),
            timeTopic: this.getTimeTopicId()
        });
    };
    /**
     * Sets the data source time range
     * @param {String} startTime - the startTime (in date ISO)
     * @param {String} endTime - the startTime (in date ISO)
     * @param {Number} replaySpeed - the replay speed
     * @param {boolean} reconnect - reconnect if was connected
     */
    TimeSeriesDataSource.prototype.setTimeRange = function (startTime, endTime, replaySpeed, reconnect) {
        if (reconnect === void 0) { reconnect = false; }
        var replay = {};
        if (isDefined(replaySpeed)) {
            replay = {
                replaySpeed: replaySpeed
            };
        }
        this.updateProperties(__assign(__assign(__assign(__assign({}, this.currentRunningProperties), { startTime: startTime, endTime: endTime }), replay), { reconnect: reconnect }));
    };
    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    TimeSeriesDataSource.prototype.getStartTime = function () {
        return this.properties.startTime;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDataSource.prototype.getEndTime = function () {
        return this.properties.endTime;
    };
    /**
     * Gets the startTime
     * @returns {String} - startTime as ISO date
     */
    TimeSeriesDataSource.prototype.getMinTime = function () {
        return this.properties.minTime;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDataSource.prototype.getMaxTime = function () {
        return this.properties.maxTime;
    };
    /**
     * Gets the endTime
     * @returns {String} - endTime as ISO date
     */
    TimeSeriesDataSource.prototype.getReplaySpeed = function () {
        return isDefined(this.properties.replaySpeed) ? this.properties.replaySpeed : 1;
    };
    TimeSeriesDataSource.prototype.getCurrentTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                if (isDefined(this.timeSync)) {
                    return [2 /*return*/, this.timeSync.getCurrentTime()];
                }
                else {
                    promise = new Promise(function (resolve) {
                        if (_this.dataSourceWorker !== null) {
                            _this.dataSourceWorker.onmessage = function (event) {
                                if (event.data.message === 'last-timestamp') {
                                    resolve(event.data.data);
                                }
                            };
                        }
                    });
                    if (this.dataSourceWorker !== null) {
                        this.dataSourceWorker.postMessage({
                            message: 'last-timestamp'
                        });
                    }
                    return [2 /*return*/, promise];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Update properties
     * @param {String} name - the datasource name
     * @param {Object} properties - the datasource properties
     * @param {Boolean} properties.timeShift - fix some problem with some android devices with some timestamp shift to 16 sec
     * @param {Number} properties.bufferingTime - defines the time during the data has to be buffered
     * @param {Number} properties.timeOut - defines the limit time before data has to be skipped
     * @param {String} properties.protocol - defines the protocol of the datasource. @see {@link DataConnector}
     * @param {String} properties.endpointUrl the endpoint url
     * @param {String} properties.service the service
     * @param {String} properties.offeringID the offeringID
     * @param {String} properties.observedProperty the observed property
     * @param {String} properties.startTime the start time (ISO format)
     * @param {String} properties.endTime the end time (ISO format)
     * @param {Number} properties.replaySpeed the replay speed
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    TimeSeriesDataSource.prototype.updateProperties = function (properties) {
        _super.prototype.updateProperties.call(this, properties);
    };
    TimeSeriesDataSource.prototype.getTimeTopicId = function () {
        return DATASOURCE_TIME_TOPIC + this.id;
    };
    return TimeSeriesDataSource;
}(DataSource));
export default TimeSeriesDataSource;
//# sourceMappingURL=TimeSeriesDataSource.js.map
