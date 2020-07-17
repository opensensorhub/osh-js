import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";

const bc = new BroadcastChannel('test_channel');

const bcChannels = {};

self.onmessage = (event) => {
    const buffer = new DataSynchronizer({
        replayFactor: 1,
        dataSources: event.data.dataSources
    });

    bc.onmessage = function (event) {
        self.buffer.push(event.data.id, event.data.data);
    }

    buffer.onWait = (dataSourceId, time ,total) => {
        self.postMessage({
            message: 'wait',
            dataSourceId: dataSourceId,
            time: time,
            total: total
        });
    }

    buffer.onData = function (dataSourceId, data) {
        if(!(dataSourceId in bcChannels)) {
            bcChannels[dataSourceId] = new BroadcastChannel('test_channel-'+dataSourceId);
        }
        // const dataArray = str2ab(JSON.stringify(data));
        const objData = {
            message: 'data',
            dataSourceId: dataSourceId,
            data: data
        };
        self.postMessage(objData);
        // bcChannels[dataSourceId].postMessage(objData);
    }
}
