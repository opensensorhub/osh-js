class DataSynchronizerAlgo {
    constructor(dataSources, replayFactor = 1, intervalRate = 5) {
        this.dataSourceMap = {};
        this.bufferingTime = 1000;
        this.startBufferingTime = -1;
        this.tsRun = 0;
        this.replayFactor = replayFactor;
        this.intervalRate = intervalRate;
        let maxBufferingTime = -1;

        for (let ds of dataSources) {
            this.addDataSource(ds);
            maxBufferingTime = ds.bufferingTime > maxBufferingTime ? ds.bufferingTime : maxBufferingTime;
        }
        if (maxBufferingTime !== -1) {
            this.bufferingTime = maxBufferingTime;
        }
    }

    push(dataSourceId, data) {
        const ds = this.dataSourceMap[dataSourceId];

        if (this.startBufferingTime === -1) {
            this.startBufferingTime = performance.now();
            // start iterating on data after bufferingTime
            setTimeout(() => this.processData(), this.bufferingTime);
        }

        let latency = 0;
        if (this.tsRun > 0) {
            latency = this.tsRun - data.timeStamp;
        }
        ds.latency = latency > ds.latency ? latency : (ds.latency + latency) / 2;
        ds.data.push(data);
    }

    processData() {
        let tsRef = -1;
        const clockTimeRef = performance.now();

        // get reference start timestamp
        // the reference start timestamp should the oldest one
        let currentDs;
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.data.length > 0) {
                tsRef = (tsRef === -1 || currentDs.data[0].timeStamp < tsRef) ? currentDs.data[0].timeStamp :
                    tsRef;
            }
        }

        //TODO: missing replayFactor
        //TODO: add interval as worker argument
        this.interval = setInterval(() => {
            // 1) return the oldest data if any
            while (this.computeNextData(tsRef, clockTimeRef)) ;

        }, this.intervalRate);
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

        // compute max latency
        let maxLatency = 0;
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.latency > 0) {
                let latency = Math.min(currentDs.latency, currentDs.timeOut);
                maxLatency = (latency > maxLatency) ? latency : maxLatency;
            }
        }

        const dClock = performance.now() - refClockTime;
        this.tsRun = tsRef + dClock;

        // compute next data to return
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.data.length > 0) {
                const dTs = currentDs.data[0].timeStamp - tsRef;
                const dClockAdj = dClock - maxLatency;
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (dTs <= dClockAdj*this.replayFactor) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    } else {
                        // take the oldest data
                        currentDsToShift = (currentDsToShift.data[0].timeStamp < currentDs.data[0].timeStamp) ?
                            currentDsToShift : currentDs;
                    }
                }
            }
        }
        // finally shift the data
        if (currentDsToShift !== null) {
            this.onData(currentDsToShift.id, currentDsToShift.data.shift());
            return true;
        }
        return false;
    }

    addDataSource(dataSource) {
        this.dataSourceMap[dataSource.id] = {
            bufferingTime: dataSource.bufferingTime,
            timeOut: dataSource.timeOut,
            data: [],
            startBufferingTime: -1,
            id: dataSource.id,
            timedOut: false,
            name: dataSource.name,
            latency: 0
        };
    }

    onData(dataSourceId, data) {
    }

    close() {
        clearInterval(this.interval);
        console.log("Data synchronizer terminated successfully");
    }
}
export default DataSynchronizerAlgo;
