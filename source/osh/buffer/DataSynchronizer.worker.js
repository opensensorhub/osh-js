self.dataSourceMap = {};
self.bufferingTime = 1000;
self.startBufferingTime = -1;
self.currentMasterTime = -1;

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
        self.startBufferingTime = Date.now();
        // start iterating on data after bufferingTime
        setTimeout(() => processData(data.timeStamp), self.bufferingTime);
    }

    ds.data.push(data);
    // can we use the same attribute to determine if the DS has already timed out?
    ds.timedOut = false;
    ds.lastReceivedTime = performance.now();
}

function processData(startTimeStamp) {
    const INTERVAL_FREQ = 5;
    let relativeSyncMasterTime = startTimeStamp;

    let endDeltaTime = -1;
    let refTimeStamp = startTimeStamp;
    let refClockTime = performance.now();

    this.interval = setInterval(() => {
        let currentDs;
        let waitTime = -1;
        let currentDsToShift = null;
        for (let currentDsId in self.dataSourceMap) {
            currentDs = self.dataSourceMap[currentDsId];

            if(currentDs.data.length > 0) {
                let diffTimeStamps = currentDs.data[0].timeStamp - refTimeStamp;
                let diffClockTime = performance.now() - refClockTime;
                if (diffTimeStamps <= diffClockTime) {
                    if(currentDsToShift === null) {
                        currentDsToShift = currentDs;
                    } else {
                        currentDsToShift = (currentDsToShift.data[0].timeStamp < currentDs.data[0].timeStamp ) ?
                            currentDsToShift : currentDs;
                    }
                }
            }
            else {
                // check timeout
                let currentWaitTime = currentDs.timeOut - performance.now() - currentDs.lastReceivedTime;
                // check maxWait time in case where we have multive dataSources to wait

                if (currentWaitTime > 0) {
                    // wait for timeout
                    waitTime = (currentWaitTime > waitTime) ? currentWaitTime : waitTime;
                }
            }
        }
        // 1) check wait time, if we have to wait, do not shift any dataSource
        if(waitTime <= 0 && currentDsToShift !== null)  {
            onData(currentDsToShift.id, currentDsToShift.data.shift());
        }
        endDeltaTime = performance.now();
    },INTERVAL_FREQ);
}

function addDataSource(dataSource) {
    self.dataSourceMap[dataSource.id] = {
        bufferingTime: dataSource.bufferingTime,
        timeOut: dataSource.timeOut ? dataSource.timeOut : 5000,
        data: [],
        startBufferingTime: -1,
        id: dataSource.id,
        lastReceivedTime: -1,
        timedOut: false,
        name: dataSource.name
    };
}

function onData(dataSourceId, data) {
    self.postMessage({
        dataSourceId: dataSourceId,
        data: data
    });
}

self.onclose = function() {
    clearInterval(this.interval);
}
