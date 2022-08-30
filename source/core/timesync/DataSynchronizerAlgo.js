import {isDefined} from "../utils/Utils.js";
import {Status} from "../connector/Status.js";
import BinaryHeap from './BinaryHeap';

class DataSynchronizerAlgo {
    constructor(dataSources, replaySpeed = 1, timerResolution = 5) {
        this.dataSourceMap = {};
        this.tsRun = 0;
        this.replaySpeed = replaySpeed;
        this.timerResolution = timerResolution;
        this.heap = new BinaryHeap((d0,d1) => {
            if(d0.data.data.timestamp === d1.data.data.timestamp) {
                return true;
            } else return d0.data.data.timestamp < d1.data.data.timestamp
        });
        for (let ds of dataSources) {
            this.addDataSource(ds);
        }
    }

    push(dataSourceId, dataBlock) {
        const ds = this.dataSourceMap[dataSourceId];
        if (!this.checkVersion(ds, dataBlock)) {
            return;
        }

        let latency = 0;
        if (this.tsRun > 0) {
            latency = this.tsRun - dataBlock.data.timestamp;
        }
        ds.latency = latency > ds.latency ? latency : (ds.latency + latency) / 2;

        this.heap.insert({
            id: dataSourceId,
            data: dataBlock
        });

        if(!isDefined(this.interval)) {
            this.processData();
        }
    }

    reset() {
        this.heap = new BinaryHeap((d0,d1) => {
            if(d0.data.data.timestamp === d1.data.data.timestamp) {
                return true;
            } else return d0.data.data.timestamp < d1.data.data.timestamp
        });
        console.log('reset synchronizer algo')
        this.close();
        for (let currentDsId in this.dataSourceMap) {
            const currentDs = this.dataSourceMap[currentDsId];
            currentDs.dataBuffer = [];
            currentDs.latency=0;
            currentDs.status= Status.DISCONNECTED;
            currentDs.version = undefined;
        }
        this.tsRun = 0;
    }

    processData() {
        let tsRef = -1;
        let clockTimeRef = performance.now();

        const minElement = this.heap.findMin();
        tsRef = (tsRef === -1 || !isDefined(minElement) || minElement.data.data.timestamp < tsRef) ? minElement.data.data.timestamp : tsRef;

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
        if(this.heap.size() > 0 ) {
            const minElement = this.heap.findMin();
            let currentDs;

            // compute max latency
            let maxLatency = 0;
            let minLatency = 0;
            currentDs = this.dataSourceMap[minElement.id];
            if (currentDs.latency > 0) {
                let latency = Math.min(currentDs.latency, currentDs.timeOut);
                maxLatency = (latency > maxLatency) ? latency : maxLatency;
                minLatency = (currentDs.latency < minLatency) ? currentDs.latency : minLatency;
            }
            maxLatency *= this.replaySpeed;
            minLatency *= this.replaySpeed;

            const dClock = (performance.now() - refClockTime)  * this.replaySpeed;
            this.tsRun = tsRef + dClock;

            // compute next data to return
            const dTs = (minElement.data.data.timestamp - tsRef);
            const dClockAdj = dClock - maxLatency;
            // we use an intermediate object to store the data to shift because we want to return the oldest one
            // only
            if (dTs <= dClockAdj) {
                this.heap.extractMin();
                // add latency flag to data record before we dispatch it
                // this is relative latency in millis compared to the DS with the lowest latency
                // so it is accurate even if local device time is not set properly
                minElement.data['@latency'] = currentDs.latency - minLatency;
                this.onData(minElement.id, minElement.data);
                return true;
            }
        }
        return false;
    }

    /**
     * Add dataSource to be synchronized
     * @param {DataSourceDatasource} dataSource - the dataSource to synchronize
     */
    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            timeOut: dataSource.timeOut || 0,
            dataBuffer: [],
            startBufferingTime: -1,
            id: dataSource.id,
            timedOut: false,
            name: dataSource.name || dataSource.id,
            latency: 0,
            status: Status.DISCONNECTED, //MEANING Enabled, 0 = Disabled
            version: undefined
        };
    }

    checkVersion(datasource, dataBlock) {
        if(!isDefined(datasource.version) && datasource.status !== Status.DISCONNECTED) {
            return true;
        } else if(datasource.status === Status.DISCONNECTED && datasource.version !== dataBlock.version) {
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
    }

    close() {
        if (isDefined(this.interval)) {
            clearInterval(this.interval);
            this.interval = null;
        }
        if(isDefined(this.timeoutBuffering)) {
            clearTimeout(this.timeoutBuffering);
            this.timeoutBuffering = null;
        }
        console.log("Data synchronizer terminated successfully");

    }
}

export default DataSynchronizerAlgo;

