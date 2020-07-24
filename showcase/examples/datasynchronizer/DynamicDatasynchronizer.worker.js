import DataSynchronizer from "../../../source/osh/datasynchronizer/DataSynchronizer";

self.onmessage = (event) => {
    const buffer = new DataSynchronizer({
        replayFactor: event.data.replayFactor,
        dataSources:  event.data.dataSources,
        intervalRate: 5
    });

    buffer.onWait = (dataSourceId, time ,total) => {
        self.postMessage({
            message: 'wait',
            dataSourceId: dataSourceId,
            time: time,
            total: total
        });
    }

    buffer.onData = function (dataSourceId, data) {
        const objData = {
            message: 'data',
            dataSourceId: dataSourceId,
            data: data
        };
        self.postMessage(objData);
    }
}
