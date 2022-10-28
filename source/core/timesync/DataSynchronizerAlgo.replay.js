import {isDefined} from "../utils/Utils.js";
import {Status} from "../connector/Status.js";
import DataSynchronizerAlgo from "./DataSynchronizerAlgo";

class DataSynchronizerAlgoReplay extends DataSynchronizerAlgo {
    constructor(dataSources, replaySpeed = 1, startTimestamp, endTimestamp, timerResolution = 5) {
        super(dataSources,replaySpeed,timerResolution);
        this.replaySpeed = replaySpeed;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
    }

    push(dataSourceId, dataBlocks) {
        if(dataBlocks.length === 0) {
            return;
        }

        const ds = this.dataSourceMap[dataSourceId];
        const lastData = dataBlocks[dataBlocks.length-1];
        if (!this.checkVersion(ds, lastData)) {
            console.warn(`[DataSynchronizer] incompatible version ${ds.version} ~ ${lastData.version}, skipping data`);
            return;
        }
        ds.dataBuffer.push(...dataBlocks);
    }

    processData() {
        let clockTimeRef = performance.now();

        this.interval = setInterval(() => {
            // 1) return the oldest data if any
            while (this.computeNextData(this.startTimestamp, clockTimeRef)) {}
            this.checkEnd();
        }, this.timerResolution);
        console.warn(`Started Replay Algorithm with tsRef=${new Date(this.startTimestamp).toISOString()}`);
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
     * @param {Datasource} dataSource - the dataSource to synchronize
     */
    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            dataBuffer: [],
            id: dataSource.id,
            name: dataSource.name || dataSource.id,
            status: Status.DISCONNECTED, //MEANING Enabled, 0 = Disabled
            version: undefined
        };
        this.datasources.push(dataSource);
    }

    checkVersion(datasource, dataBlock) {
        if(!isDefined(datasource.version)) {
            return true;
        } else if(datasource.version !== dataBlock.version) {
            return false;
        }
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
            let nbDatasourcesFetchedOk = 0;
            let totalDataSources = Object.keys(this.dataSourceMap).length;

            for(let dataSourceID in this.dataSourceMap) {
                if(this.dataSourceMap[dataSourceID].status === Status.FETCH_STARTED) nbDatasourcesFetchedOk++;
            }

            console.warn(`[Synchronizer] Fetched ${nbDatasourcesFetchedOk}/${totalDataSources} datasources`);
            if(nbDatasourcesFetchedOk === totalDataSources) {
                console.warn('Starting Replay Algorithm...');
                this.processData();
                this.onStart();
            }
        }
    }

    checkEnd() {
        if(this.getCurrentTimestamp() >= this.endTimestamp) {
            this.onEnd();
            this.reset();
        }
    }

    reset() {
        this.tsRun = undefined;
        console.log('reset synchronizer algo')
        this.close();
        for (let currentDsId in this.dataSourceMap) {
            this.resetDataSource(currentDsId);
        }
    }

    resetDataSource(datasourceId) {
        const currentDs = this.dataSourceMap[datasourceId];
        currentDs.dataBuffer = [];
        currentDs.status= Status.DISCONNECTED;
        currentDs.version = undefined;
    }

    onEnd() {}
    onStart() {}
}

export default DataSynchronizerAlgoReplay;
