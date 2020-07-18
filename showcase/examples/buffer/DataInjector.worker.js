self.interval=null;
self.pending = false;
let count = 0;

self.onmessage = (event) => {
    self.bc = new BroadcastChannel('datasource-data-'+event.data.id);
    injectData(event.data.id, event.data.latency, event.data.freq, event.data.replayFactor);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startTime = "2010-05-05T15:00:00.00Z";
let currentTimeMillis = new Date(startTime).getTime();

function getNewData(dsId, freq) {
    currentTimeMillis += freq;
    let time = currentTimeMillis;
    // const id = ''+getRandomInt(1,3);
    return {
        dataSourceId: dsId,
        data: {
            data: '(' + dsId + ') ' + new Date(time).toISOString(),
            timeStamp: time,
            clockTime: performance.now(),
            delayed: false
        }
    };
}

function addNewData(dsId, latency, freq) {
    if (self.pending) {
        return;
    }
    let data = getNewData(dsId, freq);
    if (latency > 0 && !self.pending) {
        // get one of the DS to simulate latency
        const doLatency = count%2 === 0;//getRandomInt(0, 1) == 1;
        if (doLatency) {
            self.pending = true;
            setTimeout(() => {
                data.data.delayed = true;
                data.data.clockTime = performance.now();
                pushBack(data.dataSourceId, data.data);
                self.pending = false;
            }, latency);
        } else {
            pushBack(data.dataSourceId, data.data);
        }
    } else {
        pushBack(data.dataSourceId, data.data);
    }
    count++;
}

function pushBack(id, data) {
    self.bc.postMessage({
        message: 'data',
        dataSourceId: id,
        data: data
    });
}
function injectData(id, latency, freq, replayFactor) {
    self.interval = setInterval(() => {
        addNewData(id, latency, freq, replayFactor);
    }, freq/replayFactor);
}

