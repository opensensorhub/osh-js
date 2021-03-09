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
import { isDefined } from "../../utils/Utils.js";
import DataSourceHandler from "./DataSourceHandler";
var TimeSeriesDataSourceHandler = /** @class */ (function (_super) {
    __extends(TimeSeriesDataSourceHandler, _super);
    function TimeSeriesDataSourceHandler(parser) {
        var _this = _super.call(this, parser) || this;
        _this.lastTimeStamp = null;
        _this.lastStartTime = 'now';
        _this.timeShift = 0;
        _this.timeBroadcastChannel = null;
        return _this;
    }
    /**
     * @private
     */
    TimeSeriesDataSourceHandler.prototype.createDataConnector = function (properties) {
        var _this = this;
        _super.prototype.createDataConnector.call(this, __assign(__assign({}, properties), { timeShift: this.timeShift }));
        var lastStartTimeCst = this.parser.lastStartTime;
        this.connector.onReconnect = function () {
            // if not real time, preserve last timestamp to reconnect at the last time received
            // for that, we update the URL with the new last time received
            if (lastStartTimeCst !== 'now') {
                _this.connector.setUrl(_this.parser.buildUrl(__assign(__assign({}, properties), { lastTimeStamp: isDefined(_this.lastTimeStamp) ? new Date(_this.lastTimeStamp).toISOString() : properties.startTime })));
            }
            return true;
        };
    };
    TimeSeriesDataSourceHandler.prototype.onMessage = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var timeStamp, data, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.resolve(this.parser.parseTimeStamp(event) + this.timeShift)];
                    case 1:
                        timeStamp = _a.sent();
                        return [4 /*yield*/, Promise.resolve(this.parser.parseData(event))];
                    case 2:
                        data = _a.sent();
                        // check if data is array
                        if (Array.isArray(data)) {
                            for (i = 0; i < data.length; i++) {
                                this.values.push({
                                    data: data[i],
                                    timeStamp: timeStamp
                                });
                            }
                        }
                        else {
                            this.values.push({
                                data: data,
                                timeStamp: timeStamp
                            });
                        }
                        this.lastTimeStamp = timeStamp;
                        if (this.parser.lastStartTime === 'now' || ((isDefined(this.batchSize) && this.values.length >= this.batchSize))) {
                            this.flush();
                            if (this.timeBroadcastChannel !== null) {
                                this.timeBroadcastChannel.postMessage({
                                    timestamp: this.lastTimeStamp
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    TimeSeriesDataSourceHandler.prototype.getLastTimeStamp = function () {
        return this.lastTimeStamp;
    };
    TimeSeriesDataSourceHandler.prototype.updateProperties = function (properties) {
        this.disconnect();
        var lastTimestamp = new Date(this.lastTimeStamp).toISOString();
        if (properties.hasOwnProperty('startTime')) {
            lastTimestamp = properties.startTime;
        }
        else if (this.properties.startTime === 'now') {
            //handle RealTime
            lastTimestamp = 'now';
        }
        this.createDataConnector(__assign(__assign(__assign({}, this.properties), properties), { lastTimeStamp: lastTimestamp }));
        if (isDefined(properties) && isDefined(properties.reconnect) && properties.reconnect) {
            this.connect();
        }
    };
    TimeSeriesDataSourceHandler.prototype.handleMessage = function (message, worker) {
        _super.prototype.handleMessage.call(this, message, worker);
        if (message.message === 'last-timestamp') {
            var lastTimeStamp = this.getLastTimeStamp();
            worker.postMessage({
                message: 'last-timestamp',
                data: lastTimeStamp
            });
        }
        else if (message.message === 'topic') {
            this.setTimeTopic(message.timeTopic);
            _super.prototype.setTopic.call(this, message.topic);
        }
    };
    TimeSeriesDataSourceHandler.prototype.setTimeTopic = function (timeTopic) {
        if (this.timeBroadcastChannel !== null) {
            this.timeBroadcastChannel.close();
        }
        this.timeBroadcastChannel = new BroadcastChannel(timeTopic);
    };
    return TimeSeriesDataSourceHandler;
}(DataSourceHandler));
export default TimeSeriesDataSourceHandler;
//# sourceMappingURL=TimeSeriesDataSourceHandler.js.map