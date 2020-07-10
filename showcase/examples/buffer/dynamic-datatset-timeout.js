// dynamic part
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startDataSet} from "./buffer";


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let count = 0;

function getNewData(dsId) {
    let time = Date.now();
    // const id = ''+getRandomInt(1,3);
    return {
        dataSourceId: dsId,
        data: {
            data: '(' + dsId + ') ' + new Date(time).toISOString(),
            timeStamp: time,
            delayed: false
        }
    };
}

const eltDynamic = document.getElementById("buffer-dynamic-data");

const pendingDs = {
    '1': false,
    '2': false,
    '3': false
};

function addNewData(dsId, latency) {
    const data = getNewData(dsId, latency);

    if (pendingDs[dsId]) {
        return;
    }
    if (latency > 0 && !pendingDs[dsId]) {
        // get one of the DS to simulate latencu
        const doLatency = getRandomInt(0, 1);
        if (doLatency === 1) {
            pendingDs[dsId] = true;
            setTimeout(() => {
                data.data.delayed = true;
                bufferDynamic.push(data.dataSourceId, data.data);
                pendingDs[dsId] = false;
            }, latency);
        } else {
            bufferDynamic.push(data.dataSourceId, data.data);
        }
    } else {
        bufferDynamic.push(data.dataSourceId, data.data);
    }
}

let bufferDynamic;

export function startDynamicWithTimeout(cbFinish) {
    eltDynamic.innerHTML = "";

    const duration = parseInt(document.getElementById("duration").value) * 1000;

    bufferDynamic = new DataSynchronizer({
        replayFactor: 1,
        dataSources: [{
            id: '1',
            bufferingTime: parseInt(document.getElementById("buffering1").value),
            timeOut: parseInt(document.getElementById("timeout1").value),
        },  {
            id: '2',
            bufferingTime: parseInt(document.getElementById("buffering2").value),
            timeOut: parseInt(document.getElementById("timeout2").value),
        },
        {
            id: '3',
            bufferingTime: parseInt(document.getElementById("buffering3").value),
            timeOut: parseInt(document.getElementById("timeout3").value),

        },
        {
            id: '4',
            bufferingTime: parseInt(document.getElementById("buffering4").value),
            timeOut: parseInt(document.getElementById("timeout4").value),
        },
        {
            id: '5',
            bufferingTime: parseInt(document.getElementById("buffering5").value),
            timeOut: parseInt(document.getElementById("timeout5").value),
        }]
    });

    startDataSet(bufferDynamic, eltDynamic);

    addDataInjection(1, parseInt(document.getElementById("freq1").value), parseInt(document.getElementById("latency1").value));
    addDataInjection(2, parseInt(document.getElementById("freq2").value), parseInt(document.getElementById("latency2").value));
    addDataInjection(3, parseInt(document.getElementById("freq3").value), parseInt(document.getElementById("latency3").value));
    addDataInjection(4, parseInt(document.getElementById("freq4").value), parseInt(document.getElementById("latency4").value));
    addDataInjection(5, parseInt(document.getElementById("freq5").value), parseInt(document.getElementById("latency5").value));

    function addDataInjection(dsId, freq, latency = 0) {
        // DS1
        const interval1 = setInterval(() => {
            addNewData(dsId, latency);
        }, freq);

        setTimeout(() => {
            clearInterval(interval1);
            bufferDynamic.terminate();
            cbFinish();
        }, duration);
    }
}
