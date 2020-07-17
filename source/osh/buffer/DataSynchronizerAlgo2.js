const bcChannels = {};
const dataSynchronizerChannel =  new BroadcastChannel('test_channel-datasync');

class DataSynchronizerAlgo {
    constructor(dataSources) {
        this.dataSourceMap = {};
        this.bufferingTime = 1000;
        this.startBufferingTime = -1;
        this.currentMasterTime = -1;
        this.timedOutDsSet = new Set([]);
        this.refReceiveTime = {};

        let maxBufferingTime = -1;
        const that = this;
        for (let ds of dataSources) {
            this.addDataSource(ds);
            maxBufferingTime = ds.bufferingTime > maxBufferingTime ? ds.bufferingTime : maxBufferingTime;
            bcChannels[ds.id] = new BroadcastChannel('test_channel-data-' + ds.id);
            // listen for this specific DS
            bcChannels[ds.id].onmessage = (event) => {
                that.push(event.data.id, event.data.data);
            };
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

        if (this.timedOutDsSet.has(ds.id)) {
            this.timedOutDsSet.delete(ds.id);
        }

        if(!(dataSourceId in this.refReceiveTime)) {
            this.refReceiveTime[dataSourceId] = {
                refTime: performance.now(),
                clockTime: performance.now()
            };
        } else {
            this.refReceiveTime[dataSourceId].clockTime = performance.now();
        }
        ds.data.push(data);
    }

    processData() {
        const INTERVAL_FREQ = 5;
        let refTimeStamp = -1;
        const refClockTime = performance.now();
        let currentDs;

        // get reference start timestamp
        // the reference start timestamp should the oldest one
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.data.length > 0) {
                refTimeStamp = (refTimeStamp === -1 || currentDs.data[0].timeStamp < refTimeStamp) ? currentDs.data[0].timeStamp :
                    refTimeStamp;
            }
        }

        let currentTimeOutData = null;
        //TODO: missing replayFactor
        //TODO: add interval as worker argument
        this.interval = setInterval(() => {
            const clockTime = performance.now();

            // 1) check if we are waiting
            const checkWait = this.checkWaiting(currentTimeOutData);
            if (checkWait.wait) {
                this.onWait(currentTimeOutData.dsId, checkWait.time, currentTimeOutData.timeOut);
                return;
            }
            // 2) check if we have to wait for a DS
            currentTimeOutData = this.computeWaitData();
            // wait time detected?
            if (currentTimeOutData !== null) {
                this.onWait(currentTimeOutData.dsId, 0, currentTimeOutData.timeOut);
                return;
            }
            // 3) return the oldest data if any
            while (this.computeNextData(refTimeStamp, refClockTime)) ;

        }, INTERVAL_FREQ);
    }

    /**
     * Function to check if we are currently waiting for a DataSource which has no data.
     * We compare 2 things: the time between the current time using performance.now() and the
     * time at the moment we have created the object to compare the absolute time.
     * @param currentTimeOutData - the object holding the information of the current DS being timingOut
     * @returns {boolean} - true if the data source has data or if the real time spent is > timeOut of the DS
     */
    checkWaiting(currentTimeOutData) {
        // first check wait time & data source data array length
        if (currentTimeOutData !== null && !this.timedOutDsSet.has(currentTimeOutData.dsId)) {
            // meaning we have to wait for this DS timeOut
            // check array
            let currentDs = this.dataSourceMap[currentTimeOutData.dsId];
            // do we have wait for the required time?
            const clockTime = performance.now();
            const diffClockTime = clockTime - currentTimeOutData.refClockTime;
            if (currentDs.data.length === 0) {
                if (diffClockTime < currentDs.timeOut) {
                    // continue to wait
                    return {'time': diffClockTime, 'total': currentDs.timeOut, 'wait': true};
                } else {
                    // times up, add the dataSource to the Set to be sure we will not loop on it at the next iteration
                    // the values is reset when a new data is pushed into this DS
                    this.timedOutDsSet.add(currentDs.id);
                }
            }
        }
        return {'time': 0, 'wait': false, 'total': 0};
    }

    /**
     * Compute the DS to wait if any. We have to wait if the DS has no data. If multiple DS has no data, we take
     * the maximum of their timeOut value.
     * @returns {Object | null} - the object holding the new information of the DS to wait, null otherwise
     */
    computeWaitData() {
        let waitTime = -1;
        let currentDs;
        let timeOutData = null;
        // second compute wait time
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];
            if (currentDs.data.length === 0) {
                // console.log("ds "+currentDs.id+" has no data");
                // case where the current DS is the same that we have already wait and it is currently timedOut
                // skip it until new data comes up
                if (this.timedOutDsSet.has(currentDs.id)) {
                    continue;
                }
                // we have to wait for this DS
                // If we have to wait for multiple DS, we take the max of the time to wait
                if (currentDs.timeOut > 0 && currentDs.timeOut > waitTime) {
                    // check timeout
                    waitTime = currentDs.timeOut;
                    timeOutData = {
                        dsId: currentDs.id,
                        refClockTime: performance.now(),
                        timeOut: currentDs.timeOut
                    }
                }
            }
        }
        return timeOutData;
    }

    /**
     * Compute the next data if any. We return only 1 value for this iteration. If there are multiple values to return,
     * we return only the oldest one.
     * @param refTimeStamp - the timestamp of the first data
     * @param diffClockTime - the absolute diff time really spent
     */
    computeNextData(refTimeStamp, refClockTime) {
        const diffClockTime = performance.now() - refClockTime;
        let currentDs;
        let currentDsToShift = null;
        // third compute next data to return
        for (let currentDsId in this.dataSourceMap) {
            currentDs = this.dataSourceMap[currentDsId];

            if (currentDs.data.length > 0) {
                const diffTimeStamps = currentDs.data[0].timeStamp - refTimeStamp;
                console.log(currentDsId, performance.now() - this.refReceiveTime[currentDs.id].clockTime,
                    this.refReceiveTime[currentDs.id].clockTime- this.refReceiveTime[currentDs.id].refTime);
                // we use an intermediate object to store the data to shift because we want to return the oldest one
                // only
                if (diffTimeStamps <= diffClockTime) {
                    // no other one to compare
                    if (currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    } else {
                        // take the oldest data
                        currentDsToShift = (currentDsToShift.data[0].timeStamp < currentDs.data[0].timeStamp) ?
                            currentDsToShift : currentDs;
                    }
                }
            } else if (!this.timedOutDsSet.has(currentDs.id)) {
                // case where there were some data before shifting. Once the data has been shifted, there
                // is no data anymore in this DS and we have to check again to figure out if we have to wait.
                return false;
            }
        }
        // finally shift the data
        if (currentDsToShift !== null) {
            console.log(currentDsToShift.data[0].data, performance.now());
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
            minLatency:0,
            tsRun:0
        };
    }

    onData(dataSourceId, data) {
        console.log(data, performance.now());
        // self.postMessage({
        //     message: 'data',
        //     dataSourceId: dataSourceId,
        //     data: data
        // });
        // dataSynchronizerChannel.postMessage({
        //     message: 'data',
        //     dataSourceId: dataSourceId,
        //     data: data
        // });
    }

    onWait(dataSourceId, time, total) {
        // self.postMessage({
        //     message: 'wait',
        //     dataSourceId: dataSourceId,
        //     time: time,
        //     total: total
        // });
    }

    close() {
        clearInterval(this.interval);
        console.log("Buffer has been terminated successfully");
    }
}
export default DataSynchronizerAlgo;
