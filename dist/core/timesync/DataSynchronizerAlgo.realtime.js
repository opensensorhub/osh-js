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
import { isDefined } from "../utils/Utils.js";
import { Status } from "../connector/Status.js";
import DataSynchronizerAlgo from "./DataSynchronizerAlgo";
var DataSynchronizerAlgoRealtime = /** @class */ (function (_super) {
    __extends(DataSynchronizerAlgoRealtime, _super);
    function DataSynchronizerAlgoRealtime() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataSynchronizerAlgoRealtime.prototype.push = function (dataSourceId, dataBlocks) {
        var _a;
        if (dataBlocks.length === 0) {
            return;
        }
        var ds = this.dataSourceMap[dataSourceId];
        var lastData = dataBlocks[dataBlocks.length - 1];
        if (!this.checkVersion(ds, lastData)) {
            return;
        }
        var latency = 0;
        if (this.tsRun > 0) {
            latency = this.tsRun - lastData.data.timestamp;
        }
        ds.latency = latency > ds.latency ? latency : (ds.latency + latency) / 2;
        (_a = ds.dataBuffer).push.apply(_a, dataBlocks);
        if (!isDefined(this.interval)) {
            this.processData();
        }
    };
    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    DataSynchronizerAlgoRealtime.prototype.computeNextData = function (tsRef, refClockTime) {
        var currentDs;
        var currentDsToShift = null;
        // compute max latency
        var maxLatency = 0;
        var minLatency = 0;
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.latency > 0) {
                var latency = Math.min(currentDs.latency, currentDs.timeOut);
                maxLatency = (latency > maxLatency) ? latency : maxLatency;
                minLatency = (currentDs.latency < minLatency) ? currentDs.latency : minLatency;
            }
        }
        var dClock = (performance.now() - refClockTime);
        this.tsRun = tsRef + dClock;
        // compute next data to return
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.dataBuffer.length > 0) {
                var dTs = (currentDs.dataBuffer[0].data.timestamp - tsRef);
                var dClockAdj = dClock - maxLatency;
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClockAdj) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    }
                    else {
                        // take the oldest data
                        currentDsToShift = (currentDsToShift.dataBuffer[0].data.timestamp < currentDs.dataBuffer[0].data.timestamp) ?
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
     * @param {Datasource} dataSource - the dataSource to synchronize
     */
    DataSynchronizerAlgoRealtime.prototype.addDataSource = function (dataSource) {
        this.dataSourceMap[dataSource.id] = {
            timeOut: dataSource.timeOut || 0,
            dataBuffer: [],
            id: dataSource.id,
            timedOut: false,
            name: dataSource.name || dataSource.id,
            latency: 0,
            status: Status.DISCONNECTED,
            version: undefined
        };
        this.datasources.push(dataSource);
    };
    DataSynchronizerAlgoRealtime.prototype.checkVersion = function (datasource, dataBlock) {
        if (datasource.status !== Status.DISCONNECTED) {
            return true;
        }
        else if (datasource.status === Status.DISCONNECTED && datasource.version !== dataBlock.version) {
            return false;
        }
    };
    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    DataSynchronizerAlgoRealtime.prototype.setStatus = function (dataSourceId, status) {
        if (dataSourceId in this.dataSourceMap) {
            this.dataSourceMap[dataSourceId].status = status;
            console.warn(status + ' DataSource ' + dataSourceId + ' from the synchronizer ');
        }
    };
    DataSynchronizerAlgoRealtime.prototype.reset = function () {
        this.tsRun = undefined;
        console.log('reset synchronizer algo');
        this.close();
        for (var currentDsId in this.dataSourceMap) {
            this.resetDataSource(currentDsId);
        }
    };
    DataSynchronizerAlgoRealtime.prototype.resetDataSource = function (datasourceId) {
        var currentDs = this.dataSourceMap[datasourceId];
        currentDs.dataBuffer = [];
        currentDs.startBufferingTime = -1;
        currentDs.latency = 0;
        currentDs.status = Status.DISCONNECTED;
        currentDs.version = undefined;
    };
    return DataSynchronizerAlgoRealtime;
}(DataSynchronizerAlgo));
export default DataSynchronizerAlgoRealtime;
//# sourceMappingURL=DataSynchronizerAlgo.realtime.js.map