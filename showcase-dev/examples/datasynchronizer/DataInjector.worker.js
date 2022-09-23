import DummyDataSource from "./datasource/DummyDataSource";

self.interval=null;
self.pending = false;
let count = 0;
let bc=null;
self.onmessage = (event) => {
    bc = new BroadcastChannel(event.data.topicDs);
    injectData(event.data.id, event.data.name, event.data.latency, event.data.freq, event.data.replaySpeed);
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const startTime = "2010-05-05T15:00:00.00Z";
let currentTimeMillis = new Date(startTime).getTime();

function getNewData(id, name, freq) {
    currentTimeMillis += freq;
    let time = currentTimeMillis;
    // const id = ''+getRandomInt(1,3);
    return {
        dataSourceId: id,
        data: {
            data: '(' + name + ') ' + new Date(time).toISOString(),
            timeStamp: time,
            clockTime: performance.now(),
            delayed: false
        }
    };
}

function addNewData(id, name, latency, freq) {
    if (self.pending) {
        return;
    }
    let data = getNewData(id, name, freq);
    if (latency > 0 && !self.pending) {
        // get one of the DS to simulate latency
        const doLatency = count%2 === 0;//getRandomInt(0, 1) == 1;
        if (doLatency) {
            self.pending = true;
            setTimeout(() => {
                data.data.delayed = true;
                data.data.clockTime = performance.now();
                pushBack(id, data);
                self.pending = false;
            }, latency);
        } else {
            pushBack(id, data);
        }
    } else {
        pushBack(id, data);
    }
    count++;
}

function pushBack(id, data) {
    bc.postMessage({
        message: 'data',
        ...data
    })

}

function injectData(id, name, latency, freq, replaySpeed) {
    self.interval = setInterval(() => {
        addNewData(id, name, latency, freq, replaySpeed);
    }, freq/replaySpeed);
}

