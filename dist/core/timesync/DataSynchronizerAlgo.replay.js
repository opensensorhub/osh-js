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
var DataSynchronizerAlgoReplay = /** @class */ (function (_super) {
    __extends(DataSynchronizerAlgoReplay, _super);
    function DataSynchronizerAlgoReplay(dataSources, replaySpeed, startTimestamp, endTimestamp, timerResolution) {
        if (replaySpeed === void 0) { replaySpeed = 1; }
        if (timerResolution === void 0) { timerResolution = 5; }
        var _this = _super.call(this, dataSources, replaySpeed, timerResolution) || this;
        _this.replaySpeed = replaySpeed;
        _this.startTimestamp = startTimestamp;
        _this.endTimestamp = endTimestamp;
        return _this;
    }
    DataSynchronizerAlgoReplay.prototype.push = function (dataSourceId, dataBlocks) {
        var _a;
        if (dataBlocks.length === 0) {
            return;
        }
        var ds = this.dataSourceMap[dataSourceId];
        var lastData = dataBlocks[dataBlocks.length - 1];
        if (!this.checkVersion(ds, lastData)) {
            console.warn("[DataSynchronizer] incompatible version ".concat(ds.version, " ~ ").concat(lastData.version, ", skipping data"));
            return;
        }
        (_a = ds.dataBuffer).push.apply(_a, dataBlocks);
    };
    DataSynchronizerAlgoReplay.prototype.processData = function () {
        var _this = this;
        var clockTimeRef = performance.now();
        this.interval = setInterval(function () {
            // 1) return the oldest data if any
            while (_this.computeNextData(_this.startTimestamp, clockTimeRef)) { }
            _this.checkEnd();
        }, this.timerResolution);
        console.warn("Started Replay Algorithm with tsRef=".concat(new Date(this.startTimestamp).toISOString()));
    };
    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    DataSynchronizerAlgoReplay.prototype.computeNextData = function (tsRef, refClockTime) {
        var currentDs;
        var currentDsToShift = null;
        var dClock = (performance.now() - refClockTime) * this.replaySpeed;
        this.tsRun = tsRef + dClock;
        // compute next data to return
        for (var currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.dataBuffer.length > 0) {
                var dTs = (currentDs.dataBuffer[0].data.timestamp - tsRef);
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClock) {
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
            this.onData(currentDsToShift.id, currentDsToShift.dataBuffer.shift());
            return true;
        }
        return false;
    };
    /**
     * Add dataSource to be synchronized
     * @param {Datasource} dataSource - the dataSource to synchronize
     */
    DataSynchronizerAlgoReplay.prototype.addDataSource = function (dataSource) {
        this.dataSourceMap[dataSource.id] = {
            dataBuffer: [],
            id: dataSource.id,
            name: dataSource.name || dataSource.id,
            status: Status.DISCONNECTED,
            version: undefined
        };
        this.datasources.push(dataSource);
    };
    DataSynchronizerAlgoReplay.prototype.checkVersion = function (datasource, dataBlock) {
        if (!isDefined(datasource.version)) {
            return true;
        }
        else if (datasource.version !== dataBlock.version) {
            return false;
        }
    };
    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    DataSynchronizerAlgoReplay.prototype.setStatus = function (dataSourceId, status) {
        if (dataSourceId in this.dataSourceMap) {
            this.dataSourceMap[dataSourceId].status = status;
            console.warn(status + ' DataSource ' + dataSourceId + ' from the synchronizer ');
        }
        this.checkStart();
    };
    DataSynchronizerAlgoReplay.prototype.checkStart = function () {
        if (!isDefined(this.interval)) {
            var nbDatasourcesFetchedOk = 0;
            var totalDataSources = Object.keys(this.dataSourceMap).length;
            for (var dataSourceID in this.dataSourceMap) {
                if (this.dataSourceMap[dataSourceID].status === Status.FETCH_STARTED)
                    nbDatasourcesFetchedOk++;
            }
            console.warn("[Synchronizer] Fetched ".concat(nbDatasourcesFetchedOk, "/").concat(totalDataSources, " datasources"));
            if (nbDatasourcesFetchedOk === totalDataSources) {
                console.warn('Starting Replay Algorithm...');
                this.processData();
                this.onStart();
            }
        }
    };
    DataSynchronizerAlgoReplay.prototype.checkEnd = function () {
        if (this.getCurrentTimestamp() >= this.endTimestamp) {
            this.onEnd();
            this.reset();
        }
    };
    DataSynchronizerAlgoReplay.prototype.reset = function () {
        this.tsRun = undefined;
        console.log('reset synchronizer algo');
        this.close();
        for (var currentDsId in this.dataSourceMap) {
            this.resetDataSource(currentDsId);
        }
    };
    DataSynchronizerAlgoReplay.prototype.resetDataSource = function (datasourceId) {
        var currentDs = this.dataSourceMap[datasourceId];
        currentDs.dataBuffer = [];
        currentDs.status = Status.DISCONNECTED;
        currentDs.version = undefined;
    };
    DataSynchronizerAlgoReplay.prototype.onEnd = function () { };
    DataSynchronizerAlgoReplay.prototype.onStart = function () { };
    return DataSynchronizerAlgoReplay;
}(DataSynchronizerAlgo));
export default DataSynchronizerAlgoReplay;
//# sourceMappingURL=DataSynchronizerAlgo.replay.js.map