import DataSynchronizerAlgo from "./DataSynchronizerAlgo";

const bcChannels = {};
let dataSynchronizerAlgo;

let init = false;
self.onmessage = (event) => {
    if(event.data.message === 'init') {
        dataSynchronizerAlgo = new DataSynchronizerAlgo(
            event.data.dataSources,
            event.data.replayFactor,
            event.data.intervalRate
        );
        dataSynchronizerAlgo.onData = onData;
        dataSynchronizerAlgo.onWait = onWait;
        init = true;
        addDataSources(event.data.dataSources);
    } else if(event.data.message === 'add' && event.data.dataSources) {
        addDataSources(event.data.dataSources);
    } else if(dataSynchronizerAlgo !== null) {
        dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
    }
}

function addDataSources(dataSources) {
    for(let ds of dataSources) {
        dataSynchronizerAlgo.addDataSource(ds);
        bcChannels[ds.id] = new BroadcastChannel('datasource-data-' + ds.id);
        // listen for this specific DS
        bcChannels[ds.id].onmessage = (event) => {
            dataSynchronizerAlgo.push(event.data.dataSourceId, event.data.data);
        };
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
