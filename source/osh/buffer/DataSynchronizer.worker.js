import DataSynchronizerAlgo from "./DataSynchronizerAlgo";

const bcChannels = {};
const dataSynchronizerChannel =  new BroadcastChannel('test_channel-datasync');
let dataSynchronizerAlgo;
self.onmessage = (event) => {
    if(event.data.dataSources) {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(event.data.dataSources);
        dataSynchronizerAlgo.onData = onData;
        dataSynchronizerAlgo.onWait = onWait;
    } else if(dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
    }
}

function onData(dataSourceId, data) {
    self.postMessage({
        message: 'data',
        dataSourceId: dataSourceId,
        data: data
    });
    // dataSynchronizerChannel.postMessage({
    //     message: 'data',
    //     dataSourceId: dataSourceId,
    //     data: data
    // });
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
    console.log("Buffer has been terminated successfully");
}
