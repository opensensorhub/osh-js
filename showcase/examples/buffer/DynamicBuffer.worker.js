import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";

const bc = new BroadcastChannel('test_channel');

function str2ab(str) {
    const buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}

self.onmessage = (event) => {
    self.buffer = new DataSynchronizer({
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
        // const dataArray = str2ab(JSON.stringify(data));
        const objData = {
            message: 'data',
            dataSourceId: dataSourceId,
            data: data
        };
        // self.postMessage(objData, [objData.data]);
        self.postMessage(objData);
    }
}
