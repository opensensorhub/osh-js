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
import WebSocketConnector from "../../dataconnector/WebSocketConnector.js";
import Ajax from "../../dataconnector/Ajax.js";
import { isDefined } from "../../utils/Utils.js";
import TopicConnector from "../../dataconnector/TopicConnector.js";
import { EventType } from "../../event/EventType.js";
import { Status } from "../../dataconnector/Status";
import FileConnector from "../../dataconnector/FileConnector";
var DataSourceHandler = /** @class */ (function () {
    function DataSourceHandler(parser) {
        this.parser = parser;
        this.connector = null;
        this.reconnectTimeout = 1000 * 10; // 10 secs
        this.values = [];
    }
    DataSourceHandler.prototype.createConnector = function (propertiesStr, topic, dataSourceId) {
        this.dataSourceId = dataSourceId;
        // check for existing protocol
        if (this.connector !== null) {
            this.connector.disconnect();
            this.connector = null;
        }
        this.broadcastChannel = new BroadcastChannel(topic);
        var properties = JSON.parse(propertiesStr);
        if (isDefined(properties.timeShift)) {
            this.timeShift = properties.timeShift;
        }
        if (isDefined(properties.bufferingTime)) {
            this.bufferingTime = properties.bufferingTime;
        }
        if (isDefined(properties.timeOut)) {
            this.timeOut = properties.timeOut;
        }
        if (isDefined(properties.reconnectTimeout)) {
            this.reconnectTimeout = properties.reconnectTimeout;
        }
        if (properties.startTime === 'now') {
            this.batchSize = 1;
        }
        else {
            if (isDefined(properties.replaySpeed)) {
                if (!isDefined(properties.batchSize)) {
                    this.batchSize = 1;
                }
            }
            if (isDefined(properties.batchSize)) {
                this.batchSize = properties.batchSize;
            }
        }
        this.properties = properties;
        this.createDataConnector(this.properties);
    };
    /**
     * @private
     */
    DataSourceHandler.prototype.createDataConnector = function (properties) {
        var url = this.parser.buildUrl(__assign(__assign({}, properties), { timeShift: this.timeShift }));
        // checks if type is WebSocketConnector
        if (properties.protocol.startsWith('ws')) {
            this.connector = new WebSocketConnector(url);
        }
        else if (properties.protocol.startsWith('http')) {
            this.connector = new Ajax(url);
            this.connector.responseType = properties.responseType || 'arraybuffer';
        }
        else if (properties.protocol.startsWith('topic')) {
            this.connector = new TopicConnector(url);
        }
        else if (properties.protocol.startsWith('file')) {
            this.connector = new FileConnector(url, properties);
        }
        if (this.connector !== null) {
            // set the reconnectTimeout
            this.connector.setReconnectTimeout(this.reconnectTimeout);
            // connects the callback
            this.connector.onMessage = this.onMessage.bind(this);
            // bind change connection STATUS
            this.connector.onChangeStatus = this.onChangeStatus.bind(this);
        }
    };
    /**
     * Sets the current topic to listen
     * @param {String} topic - the topic to listen
     */
    DataSourceHandler.prototype.setTopic = function (topic) {
        if (isDefined(this.broadcastChannel)) {
            this.broadcastChannel.close();
        }
        this.broadcastChannel = new BroadcastChannel(topic);
        this.topic = topic;
    };
    DataSourceHandler.prototype.connect = function () {
        if (this.connector !== null) {
            this.connector.connect();
        }
    };
    DataSourceHandler.prototype.disconnect = function () {
        if (this.connector !== null) {
            this.connector.disconnect();
        }
    };
    DataSourceHandler.prototype.onMessage = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.parser.parseData(event))];
                    case 1:
                        data = _a.sent();
                        // check if data is array
                        if (Array.isArray(data)) {
                            for (i = 0; i < data.length; i++) {
                                this.values.push({
                                    data: data[i]
                                });
                                if (isDefined(this.batchSize) && this.values.length >= this.batchSize) {
                                    this.flush();
                                }
                            }
                        }
                        else {
                            this.values.push({
                                data: data
                            });
                        }
                        // because parseData is ASYNC, the protocol can finish before the parsing method. In that case, we have to flushALl data
                        if (!this.isConnected()) {
                            this.flushAll();
                        }
                        else if (isDefined(this.batchSize) && this.values.length !== 0 && this.values.length >= this.batchSize) {
                            this.flush();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Send a change status event into the broadcast channel
     * @param {Status} status - the new status
     */
    DataSourceHandler.prototype.onChangeStatus = function (status) {
        if (status === Status.DISCONNECTED) {
            this.flushAll();
        }
        this.broadcastChannel.postMessage({
            type: EventType.STATUS,
            status: status,
            dataSourceId: this.dataSourceId
        });
    };
    DataSourceHandler.prototype.updateProperties = function (properties) {
        this.disconnect();
        this.createDataConnector(__assign(__assign({}, this.properties), properties));
        this.connect();
    };
    DataSourceHandler.prototype.flushAll = function () {
        while (this.values.length > 0) {
            this.flush();
        }
    };
    DataSourceHandler.prototype.flush = function () {
        var nbElements = this.values.length;
        if (isDefined(this.batchSize) && this.values.length > this.batchSize) {
            nbElements = this.batchSize;
        }
        this.broadcastChannel.postMessage({
            dataSourceId: this.dataSourceId,
            type: EventType.DATA,
            values: this.values.splice(0, nbElements)
        });
    };
    DataSourceHandler.prototype.isConnected = function () {
        return (this.connector === null) ? false : this.connector.isConnected();
    };
    ;
    DataSourceHandler.prototype.handleMessage = function (message, worker) {
        if (message.message === 'init') {
            this.createConnector(message.properties, message.topic, message.id);
        }
        else if (message.message === 'connect') {
            this.connect();
        }
        else if (message.message === 'disconnect') {
            this.disconnect();
        }
        else if (message.message === 'topic') {
            this.setTopic(message.topic);
        }
        else if (message.message === 'update-url') {
            this.updateProperties(message.data);
        }
        else if (message.message === 'is-connected') {
            worker.postMessage({
                message: 'is-connected',
                data: this.isConnected()
            });
        }
    };
    return DataSourceHandler;
}());
export default DataSourceHandler;
//# sourceMappingURL=DataSourceHandler.js.map
