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
import { randomUUID } from '../utils/Utils.js';
import { DATASOURCE_DATA_TOPIC } from "../Constants";
import { Status } from "../protocol/Status";
/**
 * The DataSource is the abstract class used to create different datasources.
 *
 */
var DataSource = /** @class */ (function () {
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
     * @param {Number} [properties.replaySpeed=1] the replay factor
     * @param {Number} [properties.responseFormat] the response format (e.g video/mp4)
     * @param {Number} [properties.reconnectTimeout=10000] - the time before reconnecting (in milliseconds)
     * @param {Number} [properties.batchSize=1] - the number of data to fetch
     * @param {Object} [properties.customUrlParams={}] - custom parameters appended to the URL as they are
     * @param {Object} worker - DataSource worker
     */
    function DataSource(name, properties, worker) {
        this.id = "DataSource-" + randomUUID();
        this.name = name;
        this.properties = properties;
        this.dataSourceWorker = worker;
        this.currentRunningProperties = {};
        this.initDataSource(properties);
    }
    /**
     * Inits the datasource with the constructor properties.
     * @protected
     * @param properties
     */
    DataSource.prototype.initDataSource = function (properties) {
        this.dataSourceWorker.postMessage({
            message: 'init',
            id: this.id,
            properties: JSON.stringify(properties),
            topic: this.getTopicId()
        });
    };
    /**
     * Disconnect the dataSource then the protocol will be closed as well.
     */
    DataSource.prototype.disconnect = function () {
        this.dataSourceWorker.postMessage({
            message: 'disconnect'
        });
    };
    /**
     * Trigger when the datasource is disconnected for some reason.
     */
    DataSource.prototype.onDisconnect = function () {
        var _this = this;
        return new Promise(function (resolve) {
            new BroadcastChannel(_this.getTopicId()).onmessage = function (event) {
                if (event.data.status === Status.DISCONNECTED) {
                    resolve();
                }
            };
        });
    };
    /**
     * Connect the dataSource then the protocol will be opened as well.
     */
    DataSource.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.dataSourceWorker.postMessage({
                    message: 'connect'
                });
                return [2 /*return*/, this.isConnected()];
            });
        });
    };
    DataSource.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                promise = new Promise(function (resolve) {
                    if (_this.dataSourceWorker !== null) {
                        _this.dataSourceWorker.onmessage = function (event) {
                            if (event.data.message === 'is-connected') {
                                resolve(event.data.data);
                            }
                        };
                    }
                });
                if (this.dataSourceWorker !== null) {
                    this.dataSourceWorker.postMessage({
                        message: 'is-connected'
                    });
                }
                return [2 /*return*/, promise];
            });
        });
    };
    /**
     * Gets the datasource id.
     * @return {String} the datasource id
     */
    DataSource.prototype.getId = function () {
        return this.id;
    };
    /**
     * Gets the datasource name.
     * @return {String} the datasource name
     */
    DataSource.prototype.getName = function () {
        return this.name;
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
     * @param {Number} properties.responseFormat the response format (e.g video/mp4)
     * @param {Number} properties.reconnectTimeout - the timeout before reconnecting
     */
    DataSource.prototype.updateProperties = function (properties) {
        // save current running properties
        this.currentRunningProperties = __assign(__assign({}, this.properties), properties);
        if (this.dataSourceWorker !== null) {
            this.dataSourceWorker.postMessage({
                message: 'update-url',
                data: properties
            });
        }
    };
    DataSource.prototype.getCurrentRunningProperties = function () {
        return this.currentRunningProperties;
    };
    DataSource.prototype.terminate = function () {
        if (this.dataSourceWorker !== null) {
            this.dataSourceWorker.terminate();
        }
    };
    DataSource.prototype.getTopicId = function () {
        return DATASOURCE_DATA_TOPIC + this.id;
    };
    return DataSource;
}());
export default DataSource;
//# sourceMappingURL=DataSource.js.map