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
import HttpConnector from "./HttpConnector";
var TimeSeriesHistoricalHttpConnector = /** @class */ (function (_super) {
    __extends(TimeSeriesHistoricalHttpConnector, _super);
    function TimeSeriesHistoricalHttpConnector(url, properties, timeSeriesReplayState) {
        var _this = _super.call(this, url, properties) || this;
        _this.method = "GET";
        _this.interval = -1;
        _this.buffer = [];
        _this.batchSizeInMillis = 10000; // 10 sec
        _this.deltaTimeThreshold = 3000; // fetch if remaining only 3 sec of data
        _this.timeSeriesReplayState = timeSeriesReplayState;
        _this.loadState();
        return _this;
    }
    TimeSeriesHistoricalHttpConnector.prototype.loadState = function () {
        this.startTimestamp = new Date(this.timeSeriesReplayState.getStartTime()).getTime();
        this.endTimestamp = new Date(this.timeSeriesReplayState.getEndTime()).getTime();
        this.replaySpeed = this.timeSeriesReplayState.getReplaySpeed();
        this.currentTimestamp = this.startTimestamp; // current offset of the time into the current stream
    };
    /**
     * This is the callback method in case of getting error connection.
     * @param event The error details
     * @event
     */
    TimeSeriesHistoricalHttpConnector.prototype.onError = function (event) {
    };
    TimeSeriesHistoricalHttpConnector.prototype.startLoop = function () {
        var _this = this;
        if (this.interval === -1) {
            var tsRef_1 = -1;
            var tsRun_1 = 0;
            var refClockTime_1 = performance.now();
            this.interval = setInterval(function () {
                // fetch if less or equal than deltaTimeThreshold
                if (_this.buffer.length === 0) {
                    //either fetch new batch or disconnect because there is no more data
                    var deltaTimeToFetch = _this.batchSizeInMillis;
                    if ((deltaTimeToFetch + _this.currentTimestamp) > _this.endTimestamp) {
                        deltaTimeToFetch = _this.endTimestamp - _this.currentTimestamp;
                    }
                    //TODO fetch data
                    _this.currentTimestamp += deltaTimeToFetch;
                    if (_this.currentTimestamp >= _this.endTimestamp) {
                        _this.disconnect(); // end of stream, no more data
                    }
                }
                else {
                    var dClock = (performance.now() - refClockTime_1) * _this.replaySpeed;
                    tsRun_1 = tsRef_1 + dClock;
                    var dTs = (_this.buffer.data.timestamp - tsRef_1);
                    if (dTs <= dClock) {
                        _this.onMessage(_this.buffer.shift());
                    }
                }
            }, 5);
        }
    };
    /**
     * This is the callback method in case of getting success connection.
     * @param event
     * @event
     */
    TimeSeriesHistoricalHttpConnector.prototype.onMessage = function (event) {
    };
    TimeSeriesHistoricalHttpConnector.prototype.disconnect = function () {
        //TODO: stop loop
        clearInterval(this.interval);
    };
    /**
     * Sends the request
     * @private
     */
    TimeSeriesHistoricalHttpConnector.prototype.connect = function () {
        //TODO: start Loop if not started yet
        this.startLoop();
    };
    TimeSeriesHistoricalHttpConnector.prototype.isConnected = function () {
        //TODO: check currentTime <= endTime && values.length > 0
        return false;
    };
    return TimeSeriesHistoricalHttpConnector;
}(HttpConnector));
export default TimeSeriesHistoricalHttpConnector;
//# sourceMappingURL=TimeSeriesHistoricalHttpConnector.js.map