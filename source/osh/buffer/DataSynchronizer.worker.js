self.dataSourceMap = {};
self.bufferingTime = 1000;
self.startBufferingTime = -1;
self.currentMasterTime = -1;

const timedOutDsSet  = new Set([]);
self.onmessage = (event) => {
    if (event.data.dataSources) {
        let maxBufferingTime = -1;
        for (let ds of event.data.dataSources) {
            addDataSource(ds);
            maxBufferingTime = ds.bufferingTime > maxBufferingTime? ds.bufferingTime: maxBufferingTime;
        }
        if(maxBufferingTime !== -1) {
            self.bufferingTime = maxBufferingTime;
        }
    } else {
        push(event.data.dataSourceId, event.data.data);
    }
}

function push(dataSourceId, data) {
    const ds = self.dataSourceMap[dataSourceId];

    if (self.startBufferingTime === -1) {
        self.startBufferingTime = performance.now();
        // start iterating on data after bufferingTime
        setTimeout(() => processData(), self.bufferingTime);
    }

    if(timedOutDsSet.has(ds.id)) {
        timedOutDsSet.delete(ds.id);
    }
    ds.data.push(data);
}

function processData() {
    const INTERVAL_FREQ = 5;
    let refTimeStamp = -1;
    const refClockTime = performance.now();
    let currentDs;

    // get reference start timestamp
    // the reference start timestamp should the oldest one
    for (let currentDsId in self.dataSourceMap) {
        currentDs = self.dataSourceMap[currentDsId];
        if(currentDs.data.length > 0) {
            refTimeStamp = (refTimeStamp === -1 || currentDs.data[0].timeStamp < refTimeStamp)? currentDs.data[0].timeStamp:
                refTimeStamp;
        }
    }

    let currentTimeOutData = null;
    //TODO: missing replayFactor
    //TODO: add interval as worker argument
    this.interval = setInterval(() => {
        const clockTime = performance.now();
        const diffClockTime = clockTime - refClockTime;

        // 1) check if we are waiting
       const checkWait = checkWaiting(currentTimeOutData);
       if(checkWait.wait) {
           onWait(currentTimeOutData.dsId, checkWait.time,currentTimeOutData.timeOut);
           return;
       }
        // 2) check if we have to wait for a DS
        currentTimeOutData = computeWaitTime(currentTimeOutData);
        // wait time detected?
        if(currentTimeOutData !== null) {
            onWait(currentTimeOutData.dsId, 0, currentTimeOutData.timeOut);
            return;
        }
        // 3) return the oldest data if any
        computeNextData(refTimeStamp, diffClockTime);

    },INTERVAL_FREQ);
}

/**
 * Function to check if we are currently waiting for a DataSource which has no data.
 * We compare 2 things: the time between the current time using performance.now() and the
 * time at the moment we have created the object to compare the absolute time.
 * @param currentTimeOutData - the object holding the information of the current DS being timingOut
 * @returns {boolean} - true if the data source has data or if the real time spent is > timeOut of the DS
 */
function checkWaiting(currentTimeOutData) {
    // first check wait time & data source data array length
    if(currentTimeOutData !== null && !timedOutDsSet.has(currentTimeOutData.dsId)) {
        // meaning we have to wait for this DS timeOut
        // check array
        let currentDs = self.dataSourceMap[currentTimeOutData.dsId];
        // do we have wait for the required time?
        const clockTime = performance.now();
        const diffClockTime = clockTime - currentTimeOutData.refClockTime;
        if(currentDs.data.length === 0) {
            if( diffClockTime < currentDs.timeOut) {
                // continue to wait
                return { 'time':diffClockTime, 'total':currentDs.timeOut, 'wait': true };
            } else {
                // times up, add the dataSource to the Set to be sure we will not loop on it at the next iteration
                // the values is reset when a new data is pushed into this DS
                timedOutDsSet.add(currentDs.id);
            }
        }
    }
    return { 'time':0, 'wait': false, 'total':0  };
}

/**
 * Compute the DS to wait if any. We have to wait if the DS has no data. If multiple DS has no data, we take
 * the maximum of their timeOut value.
 * @param currentTimeOutData - the object holding the information of the current DS being timingOut
 * @returns {Object | null} - the object holding the new information of the DS to wait, null otherwise
 */
function computeWaitTime(currentTimeOutData) {
    let waitTime = -1;
    let currentDs;
    let timeOutData = null;
    // second compute wait time
    for (let currentDsId in self.dataSourceMap) {
        currentDs = self.dataSourceMap[currentDsId];
        if (currentDs.data.length === 0) {
            // console.log("ds "+currentDs.id+" has no data");
            // case where the current DS is the same that we have already wait and it is currently timedOut
            // skip it until new data comes up
            if (currentTimeOutData !== null && timedOutDsSet.has(currentDs.id)) {
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
function computeNextData(refTimeStamp, diffClockTime) {
    let currentDs;
    let currentDsToShift = null;
    // third compute next data to return
    for (let currentDsId in self.dataSourceMap) {
        currentDs = self.dataSourceMap[currentDsId];

        if (currentDs.data.length > 0) {
            let diffTimeStamps = currentDs.data[0].timeStamp - refTimeStamp;
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
        }
    }
    // finally shift the data
    if (currentDsToShift !== null) {
        onData(currentDsToShift.id, currentDsToShift.data.shift());
    }
}

function addDataSource(dataSource) {
    self.dataSourceMap[dataSource.id] = {
        bufferingTime: dataSource.bufferingTime,
        timeOut: dataSource.timeOut,
        data: [],
        startBufferingTime: -1,
        id: dataSource.id,
        timedOut: false,
        name: dataSource.name
    };
}

function onData(dataSourceId, data) {
    self.postMessage({
        message: 'data',
        dataSourceId: dataSourceId,
        data: data
    });
}

function onWait(dataSourceId, time, total) {
    self.postMessage({
        message: 'wait',
        dataSourceId: dataSourceId,
        time: time,
        total: total
    });
}

self.onclose = function() {
    clearInterval(this.interval);
}
