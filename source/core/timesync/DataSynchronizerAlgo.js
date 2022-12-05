import {isDefined} from "../utils/Utils.js";
import {Status} from "../connector/Status.js";

class DataSynchronizerAlgo {
    constructor(dataSources, timerResolution = 5) {
        this.dataSourceMap = {};
        this.tsRun = undefined;
        this.timerResolution = timerResolution;
        this.interval = null;
        this.datasources = [];
        for (let ds of dataSources) {
            this.addDataSource(ds);
        }
    }

    removeDataSource(dataSourceId) {
        this.datasources = this.datasources.filter( elt => elt.id !== dataSourceId);
        delete this.dataSourceMap[dataSourceId];
    }

    push(dataSourceId, dataBlocks) {
    }

    getCurrentTimestamp() {
        return this.tsRun;
    }

    processData() {
        let tsRef = -1;
        let clockTimeRef = performance.now();

        // get reference start timestamp
        // the reference start timestamp should the oldest one
        let currentDs;
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.dataBuffer.length > 0) {
                tsRef = (tsRef === -1 || currentDs.dataBuffer[0].data.timestamp < tsRef) ? currentDs.dataBuffer[0].data.timestamp :
                    tsRef;
            }
        }

        this.interval = setInterval(() => {
            // 1) return the oldest data if any
            while (this.computeNextData(tsRef, clockTimeRef)) ;

        }, this.timerResolution);
        console.warn(`Started Replay Algorithm with tsRef=${new Date(tsRef).toISOString()}`);
    }

    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    computeNextData(tsRef, refClockTime) {
        throw Error('Should be overridden');
    }

    /**
     * Add dataSource to be synchronized
     * @param {Datasource} dataSource - the dataSource to synchronize
     */
    addDataSource(dataSource) {
        throw Error('Should be overridden');
    }

    checkVersion(datasource, dataBlock) {
        throw Error('Should be overridden');
    }

    onData(dataSourceId, dataBlock) {
    }

    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    setStatus(dataSourceId, status) {
        throw Error('Should be overridden');
    }

    close() {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
        console.log("Data synchronizer terminated successfully");
    }

    onStart()  {}
}

export default DataSynchronizerAlgo;
