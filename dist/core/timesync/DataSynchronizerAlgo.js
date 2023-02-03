import { isDefined } from "../utils/Utils.js";
var DataSynchronizerAlgo = /** @class */ (function () {
    function DataSynchronizerAlgo(dataSources, timerResolution) {
        if (timerResolution === void 0) { timerResolution = 5; }
        this.dataSourceMap = {};
        this.tsRun = undefined;
        this.timerResolution = timerResolution;
        this.interval = null;
        this.datasources = [];
        for (var _i = 0, dataSources_1 = dataSources; _i < dataSources_1.length; _i++) {
            var ds = dataSources_1[_i];
            this.addDataSource(ds);
        }
    }
    DataSynchronizerAlgo.prototype.removeDataSource = function (dataSourceId) {
        this.datasources = this.datasources.filter(function (elt) { return elt.id !== dataSourceId; });
        delete this.dataSourceMap[dataSourceId];
    };
    DataSynchronizerAlgo.prototype.push = function (dataSourceId, dataBlocks) {
    };
    DataSynchronizerAlgo.prototype.getCurrentTimestamp = function () {
        return this.tsRun;
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
            if (currentDs.dataBuffer.length > 0) {
                tsRef = (tsRef === -1 || currentDs.dataBuffer[0].data.timestamp < tsRef) ? currentDs.dataBuffer[0].data.timestamp :
                    tsRef;
            }
        }
        this.interval = setInterval(function () {
            // 1) return the oldest data if any
            while (_this.computeNextData(tsRef, clockTimeRef))
                ;
        }, this.timerResolution);
        console.warn("Started Algorithm with  tsRef=".concat(new Date(tsRef).toISOString()));
    };
    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    DataSynchronizerAlgo.prototype.computeNextData = function (tsRef, refClockTime) {
        throw Error('Should be overridden');
    };
    /**
     * Add dataSource to be synchronized
     * @param {Datasource} dataSource - the dataSource to synchronize
     */
    DataSynchronizerAlgo.prototype.addDataSource = function (dataSource) {
        throw Error('Should be overridden');
    };
    DataSynchronizerAlgo.prototype.checkVersion = function (datasource, dataBlock) {
        throw Error('Should be overridden');
    };
    DataSynchronizerAlgo.prototype.onData = function (dataSourceId, dataBlock) {
    };
    DataSynchronizerAlgo.prototype.checkStart = function () { };
    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    DataSynchronizerAlgo.prototype.setStatus = function (dataSourceId, status) {
        throw Error('Should be overridden');
    };
    DataSynchronizerAlgo.prototype.close = function () {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
        console.log("Data synchronizer terminated successfully");
    };
    DataSynchronizerAlgo.prototype.onStart = function () { };
    return DataSynchronizerAlgo;
}());
export default DataSynchronizerAlgo;
//# sourceMappingURL=DataSynchronizerAlgo.js.map