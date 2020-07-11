// dynamic part
import DataSynchronizer from "../../../source/osh/buffer/DataSynchronizer";
import {startDataSet} from "./buffer";
import DataInjectorWorker from './DataInjector.worker';
import DynamicBuffer from './DynamicBuffer.worker';

const eltDynamic = document.getElementById("buffer-dynamic-data");
const eltDynamicErrors = document.getElementById("buffer-dynamic-errors");

let bufferDynamic;

export function startDynamicWithTimeout(cbFinish) {
    eltDynamic.innerHTML = '';
    eltDynamicErrors.innerHTML = '';

    const duration = parseInt(document.getElementById("duration").value) * 1000;
    const dataSources = [{
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
        }];

    const dynamicBuffer = new DynamicBuffer();
    dynamicBuffer.postMessage({
        dataSources: dataSources
    });

    const virtBuffer = {
        onWait: function (dataSourceId, time ,total){},
        onData: function (databaseId, data){}
    };

    dynamicBuffer.onmessage = (event) => {
        if(event.data.message === 'data') {
            //virtBuffer.onData(event.data.dataSourceId, event.data.data);
        } else if(event.data.message === 'wait') {
            //virtBuffer.onWait(event.data.dataSourceId, event.data.time, event.data.total);
        }
    }

    startDataSet(virtBuffer, eltDynamic, 100, eltDynamicErrors);

    addDataInjection(1, parseInt(document.getElementById("freq1").value), parseInt(document.getElementById("latency1").value));
    addDataInjection(2, parseInt(document.getElementById("freq2").value), parseInt(document.getElementById("latency2").value));
    addDataInjection(3, parseInt(document.getElementById("freq3").value), parseInt(document.getElementById("latency3").value));
    addDataInjection(4, parseInt(document.getElementById("freq4").value), parseInt(document.getElementById("latency4").value));
    addDataInjection(5, parseInt(document.getElementById("freq5").value), parseInt(document.getElementById("latency5").value));

    function addDataInjection(dsId, freq, latency = 0) {
        // DS1
        const dataInjector = new DataInjectorWorker();
        dataInjector.postMessage({
           freq: freq,
           id: dsId,
           latency:latency
        });

        // dataInjector.onmessage = (event) => {
        //     bufferDynamic.push(event.data.id, event.data.data);
        // };

        setTimeout(() => {
            console.log('calling terminate..');
            dataInjector.terminate();
            dynamicBuffer.terminate();
            cbFinish();
        }, duration);
    }
}
