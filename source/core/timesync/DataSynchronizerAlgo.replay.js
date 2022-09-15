import {isDefined} from "../utils/Utils.js";
import {Status} from "../connector/Status.js";

class DataSynchronizerAlgoReplay {
    constructor(dataSources, replaySpeed = 1, timerResolution = 5) {
        this.dataSourceMap = {};
        this.replaySpeed = replaySpeed;
        this.timerResolution = timerResolution;
        this.interval = null;
        for (let ds of dataSources) {
            this.addDataSource(ds);
        }
    }

    push(dataSourceId, dataBlocks) {
        if(dataBlocks.length === 0) {
            return;
        }

        const ds = this.dataSourceMap[dataSourceId];
        const lastData = dataBlocks[dataBlocks.length-1];
        if (!this.checkVersion(ds, lastData)) {
            return;
        }

        ds.dataBuffer.push(...dataBlocks);
    }

    reset() {
        console.log('reset synchronizer algo')
        this.close();
        for (let currentDsId in this.dataSourceMap) {
            const currentDs = this.dataSourceMap[currentDsId];
            currentDs.dataBuffer = [];
            currentDs.status= Status.DISCONNECTED;
            currentDs.version = undefined;
        }
        this.tsRun = 0;
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
    }

    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param tsRef - the timestamp of the first data
     * @param refClockTime - the absolute diff time really spent
     */
    computeNextData(tsRef, refClockTime) {
        let currentDs;
        let currentDsToShift = null;

        const dClock = (performance.now() - refClockTime) * this.replaySpeed;
        this.tsRun = tsRef + dClock;
        // compute next data to return
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.dataBuffer.length > 0) {
                const dTs = (currentDs.dataBuffer[0].data.timestamp - tsRef);
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClock) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    } else {
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
    }

    /**
     * Add dataSource to be synchronized
     * @param {DataSourceDatasource} dataSource - the dataSource to synchronize
     */
    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            dataBuffer: [],
            id: dataSource.id,
            name: dataSource.name || dataSource.id,
            status: Status.DISCONNECTED, //MEANING Enabled, 0 = Disabled
            version: undefined
        };
    }

    checkVersion(datasource, dataBlock) {
        if(!isDefined(datasource.version)) {
            return true;
        } else if(datasource.version !== dataBlock.version) {
            return false;
        }
    }

    onData(dataSourceId, dataBlock) {
    }

    /**
     * Change the dataSource status
     * @param {Status} status - the new status
     * @param {String} dataSourceId - the corresponding dataSource id
     */
    setStatus(dataSourceId, status) {
        if (dataSourceId in this.dataSourceMap) {
            this.dataSourceMap[dataSourceId].status = status;
            console.warn(status+' DataSource ' + dataSourceId + ' from the synchronizer ');
        }
        this.checkStart();
    }

    checkStart() {
        if(!isDefined(this.interval)) {
            let fetchStartOk = true;
            for(let dataSourceID in this.dataSourceMap) {
                fetchStartOk &= (this.dataSourceMap[dataSourceID].status === Status.FETCH_STARTED);
            }
            if(fetchStartOk) {
                this.processData();
            }
        }
    }
    close() {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
        console.log("Data synchronizer terminated successfully");

    }
}

export default DataSynchronizerAlgoReplay;
