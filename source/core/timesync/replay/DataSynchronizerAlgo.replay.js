import {isDefined} from "../../utils/Utils.js";
import {Status} from "../../connector/Status.js";
import DataSynchronizerAlgo from "../DataSynchronizerAlgo";

class DataSynchronizerAlgoReplay extends DataSynchronizerAlgo {
    constructor(dataSources, replaySpeed = 1, startTimestamp, endTimestamp, timerResolution = 5, version) {
        super(dataSources,replaySpeed,timerResolution);
        this.replaySpeed = replaySpeed;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
        this.version = version;
    }

    push(dataSourceId, dataBlocks) {
        if(dataBlocks.length === 0) {
            return;
        }
        if(dataSourceId in this.dataSourceMap) {
            const ds = this.dataSourceMap[dataSourceId];
            const lastData = dataBlocks[dataBlocks.length - 1];
            if (!this.checkVersion(lastData)) {
                console.warn(`[DataSynchronizer] incompatible version ${lastData.version} ~ ${this.version}, skipping data`);
                return;
            }
            ds.dataBuffer.push(...dataBlocks);
        }
    }

    processData() {
        this.clockTimeRef = performance.now();

        this.interval = setInterval(() => {
            // 1) return the oldest data if any
            while (this.computeNextData(this.startTimestamp, this.clockTimeRef )) {
                this.checkEnd();
            }
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
        try {
            let currentDs;
            let currentDsToShift = null;

            const dClock = (performance.now() - refClockTime) * this.replaySpeed;
            let tsRun = tsRef + dClock;

            let computeNext = false;
            // compute next data to return
            for (let currentDsId in this.dataSourceMap) {
                currentDs = this.dataSourceMap[currentDsId];
                if (currentDs.skip) {
                    // if datasource is in current range
                    if (tsRun > currentDs.minTimestamp && tsRun < currentDs.maxTimestamp) {
                        currentDs.skip = false;
                    }
                }
                // skip DatSource if out of time range
                if (currentDs.skip) continue;
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
                if (currentDsToShift.id in this.dataSourceMap) {
                    this.onData(currentDsToShift.id, currentDsToShift.dataBuffer.shift());
                }
                computeNext = true;
            }
            this.tsRun = tsRun;
            return computeNext;
        } catch (ex) {
            console.log(ex);
            return false;
        }
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
            minTimestamp: dataSource.minTimestamp,
            maxTimestamp: dataSource.maxTimestamp,
            skip: false
        };
        if(dataSource.maxTimestamp < this.getCurrentTimestamp() || dataSource.minTimestamp > this.getCurrentTimestamp()) {
            this.dataSourceMap[dataSource.id].skip = true;
            console.warn(`Skipping new added dataSource ${dataSource.id} because timeRange of the dataSource is not intersecting the synchronizer one`);
        }
        this.datasources.push(dataSource);
    }

    checkVersion(dataBlock) {
        return (dataBlock.version === this.version);
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
            let nbSkip = 0;
            let nbFetch = 0
            let totalDataSources = Object.keys(this.dataSourceMap).length;

            if(totalDataSources === 0) {
                return;
            }
            let dataSource;
            for(let dataSourceID in this.dataSourceMap) {
                dataSource = this.dataSourceMap[dataSourceID];
                dataSource.skip = (this.startTimestamp < dataSource.minTimestamp) || (this.startTimestamp > dataSource.maxTimestamp);
                if(dataSource.status === Status.FETCH_STARTED){
                    nbFetch++;
                } else if(dataSource.skip) {
                    nbSkip++;
                }
            }

            console.warn(`[Synchronizer] Fetched ${nbFetch}/${totalDataSources} datasources`);
            console.warn(`[Synchronizer] Skipped ${nbSkip}/${totalDataSources} datasources`);
            if((nbFetch + nbSkip) === totalDataSources) {
                console.warn('Starting Replay Algorithm...');
                this.processData();
                this.onStart();
            }
        }
    }

    checkEnd() {
        if (this.getCurrentTimestamp() > this.endTimestamp) {
            this.onEnd();
            this.reset();
        }
    }

    reset() {
        console.log('reset synchronizer algo')
        this.close();
        for (let currentDsId in this.dataSourceMap) {
            this.resetDataSource(currentDsId);
        }
        this.tsRun = undefined;
    }

    resetDataSource(datasourceId) {
        const currentDs = this.dataSourceMap[datasourceId];
        currentDs.dataBuffer = [];
        currentDs.status= Status.DISCONNECTED;
        currentDs.version = undefined;
        currentDs.skip = false;
    }

    removeDataSource(dataSourceId) {
        super.removeDataSource(dataSourceId);
        // looking for next start Timestamp
        let currentTimestamp = this.getCurrentTimestamp();
        let min, ds;
        for(let dsKey in this.dataSourceMap) {
            ds = this.dataSourceMap[dsKey];
            if(currentTimestamp >= ds.minTimestamp && currentTimestamp <= ds.maxTimestamp) {
                // continue because this datasource is in the current range
                return;
            } else {
                // otherwise
                // looking for next range and reset algo
                if(!min) {
                    min = ds.minTimestamp;
                } else if(ds.minTimestamp < min) {
                    min = ds.minTimestamp;
                }
            }
        }
    }

    setEndTimestamp(maxTimestamp) {
        this.endTimestamp = maxTimestamp;
    }
    setTimeRange(startTimestamp, endTimestamp, replaySped) {
        this.replaySpeed = replaySped;
        this.startTimestamp = startTimestamp;
        this.endTimestamp = endTimestamp;
        this.clockTimeRef = performance.now();
        this.reset();
        this.checkStart();
    }

    onEnd() {}
    onStart() {}
}

export default DataSynchronizerAlgoReplay;
