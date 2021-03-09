import { isDefined } from "../utils/Utils.js";
import { Status } from "../protocol/Status.js";
var DataSynchronizerAlgo = /** @class */ (function () {
    function DataSynchronizerAlgo(dataSources, replaySpeed, timerResolution) {
        if (replaySpeed === void 0) { replaySpeed = 1; }
        if (timerResolution === void 0) { timerResolution = 5; }
        this.dataSourceMap = {};
        this.bufferingTime = 1000;
        this.startBufferingTime = -1;
        this.tsRun = 0;
        this.replaySpeed = replaySpeed;
        this.timerResolution = timerResolution;
        var maxBufferingTime = -1;
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var ds = dataSources_1[_i];
            this.addDataSource(ds);
            maxBufferingTime = ds.bufferingTime > maxBufferingTime ? ds.bufferingTime : maxBufferingTime;
        }
        if (maxBufferingTime !== -1) {
            this.bufferingTime = maxBufferingTime;
        }
    }
    DataSynchronizerAlgo.prototype.push = function (dataSourceId, data) {
        var _this = this;
        var ds = this.dataSourceMap[dataSourceId];
        if (ds.status === Status.DISCONNECTED) {
            return;
        }
        if (this.startBufferingTime === -1) {
            this.startBufferingTime = performance.now();
            // start iterating on data after bufferingTime
            setTimeout(function () { return _this.processData(); }, this.bufferingTime);
        }
        var latency = 0;
        if (this.tsRun > 0) {
            latency = this.tsRun - data.timeStamp;
        }
        ds.latency = latency > ds.latency ? latency : (ds.latency + latency) / 2;
        ds.dataBuffer.push(data);
    };
    DataSynchronizerAlgo.prototype.reset = function () {
        this.close();
        for (var currentDsId in this.dataSourceMap) {
            var currentDs = this.dataSourceMap[currentDsId];
            currentDs.dataBuffer = [];
        }
        this.startBufferingTime = -1;
    };
    DataSynchronizerAlgo.prototype.processData = function () {
        var _this = this;
        var tsRef = -1;
        var clockTimeRef = performance.now();
        // get reference start timestamp
        // the reference start timestamp should the oldest one
        var currentDs;
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.dataBuffer.length > 0) {
                tsRef = (tsRef === -1 || currentDs.dataBuffer[0].timeStamp < tsRef) ? currentDs.dataBuffer[0].timeStamp :
                    tsRef;
            }
        }
        this.interval = setInterval(function () {
            // 1) return the oldest data if any
            while (_this.computeNextData(tsRef, clockTimeRef))
                ;
        }, this.timerResolution);
    };
    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    DataSynchronizerAlgo.prototype.computeNextData = function (tsRef, refClockTime) {
        var currentDs;
        var currentDsToShift = null;
        // compute max latency
        var maxLatency = 0;
        var minLatency = 0;
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.latency > 0) {
                var latency = Math.min(currentDs.latency, currentDs.timeOut);
                maxLatency = (latency > maxLatency) ? latency : maxLatency;
                minLatency = (currentDs.latency < minLatency) ? currentDs.latency : minLatency;
            }
        }
        var dClock = performance.now() - refClockTime;
        this.tsRun = tsRef + dClock;
        // compute next data to return
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.status === Status.DISCONNECTED) {
                continue;
            }
            if (currentDs.dataBuffer.length > 0) {
                var dTs = currentDs.dataBuffer[0].timeStamp - tsRef;
                var dClockAdj = dClock - maxLatency;
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClockAdj * this.replaySpeed) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    }
                    else {
                        // take the oldest data
                        currentDsToShift = (currentDsToShift.dataBuffer[0].timeStamp < currentDs.dataBuffer[0].timeStamp) ?
                            currentDsToShift : currentDs;
                    }
                }
            }
        }
        // finally pop the data from DS queue
        if (currentDsToShift !== null) {
            var rec = currentDsToShift.dataBuffer.shift();
            // add latency flag to data record before we dispatch it
            // this is relative latency in millis compared to the DS with the lowest latency
            // so it is accurate even if local device time is not set properly
            rec['@latency'] = currentDs.latency - minLatency;
            this.onData(currentDsToShift.id, rec);
            return true;
        }
        return false;
    };
    /**
     * Add dataSource to be synchronized
     * @param {DataSource} dataSource - the dataSource to synchronize
     */
    DataSynchronizerAlgo.prototype.addDataSource = function (dataSource) {
        this.dataSourceMap[dataSource.id] = {
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut || 0,
            dataBuffer: [],
            startBufferingTime: -1,
            id: dataSource.id,
            timedOut: false,
            name: dataSource.name || dataSource.id,
            latency: 0,
            status: Status.DISCONNECTED //MEANING Enabled, 0 = Disabled
        };
    };
    DataSynchronizerAlgo.prototype.onData = function (dataSourceId, data) {
    };
    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    DataSynchronizerAlgo.prototype.setStatus = function (dataSourceId, status) {
        if (dataSourceId in this.dataSourceMap) {
            this.dataSourceMap[dataSourceId].status = status;
            if (status === Status.DISCONNECTED) {
                // reset latency and buffer
                this.dataSourceMap[dataSourceId].latency = 0;
                this.dataSourceMap[dataSourceId].dataBuffer = [];
            }
            console.warn(status + ' DataSource ' + dataSourceId + ' from the synchronizer ');
        }
    };
    DataSynchronizerAlgo.prototype.close = function () {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            console.log("Data synchronizer terminated successfully");
        }
    };
    return DataSynchronizerAlgo;
}());
export default DataSynchronizerAlgo;
//# sourceMappingURL=DataSynchronizerAlgo.js.map