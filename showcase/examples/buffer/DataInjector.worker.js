self.interval=null;
self.pending = false;
let count = 0;

self.onmessage = (event) => {
    self.bc = new BroadcastChannel('datasource-data-'+event.data.id);
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
    let data = getNewData(dsId);
    if (latency > 0 && !self.pending) {
        // get one of the DS to simulate latency
        const doLatency = count%2 == 0;//getRandomInt(0, 1) == 1;
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
function injectData(id, latency, freq) {
    self.interval = setInterval(() => {
        addNewData(id, latency);
    }, freq);
}

