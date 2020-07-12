self.interval=null;
self.pending = false;
let count = 0;
const bc = new BroadcastChannel('test_channel');

self.onmessage = (event) => {
    injectData(event.data.id, event.data.latency, event.data.freq);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNewData(dsId) {
    let time = Date.now();
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

function addNewData(dsId, latency) {
    if (self.pending) {
        return;
    }
    let data = getNewData(dsId, latency);
    if (latency > 0 && !self.pending) {
        // get one of the DS to simulate latency
        const doLatency = getRandomInt(0, 1);
        if (doLatency === 1) {
            self.pending = true;
            setTimeout(() => {
                data.data.delayed = true;
                data.data.clockTime = performance.now();
                // bufferDynamic.push(data.dataSourceId, data.data);
                pushBack(data.dataSourceId, data.data);
                self.pending = false;
            }, latency);
        } else {
            pushBack(data.dataSourceId, data.data);
        }
    } else {
        pushBack(data.dataSourceId, data.data);
    }
}

function pushBack(id, data) {
    bc.postMessage({
        message: 'data',
        id: id,
        data: data
    });
}
function injectData(id, latency, freq) {
    self.interval = setInterval(() => {
        addNewData(id, latency);
    }, freq);
}

