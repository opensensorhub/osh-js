// dynamic part
import {startDataSet} from "./datasynchronizer";
import DataInjectorWorker from './DataInjector.worker';
import DataSynchronizer from "../../../source/osh/datasynchronizer/DataSynchronizer";

const eltDynamic = document.getElementById("buffer-dynamic-data");
const eltDynamicErrors = document.getElementById("buffer-dynamic-errors");
const eltCurrentTime = document.getElementById("current-time");

export function startDynamicWithTimeout(cbFinish) {
    eltDynamic.innerHTML = '';
    eltDynamicErrors.innerHTML = '';

    const duration = parseInt(document.getElementById("duration").value) * 1000;
    const dataSources = [{
            id: '1t',
            bufferingTime: parseInt(document.getElementById("buffering1").value),
            timeOut: parseInt(document.getElementById("timeout1").value),
        },  {
            id: '2t',
            bufferingTime: parseInt(document.getElementById("buffering2").value),
            timeOut: parseInt(document.getElementById("timeout2").value),
        },
        {
            id: '3t',
            bufferingTime: parseInt(document.getElementById("buffering3").value),
            timeOut: parseInt(document.getElementById("timeout3").value),

        },
        {
            id: '4t',
            bufferingTime: parseInt(document.getElementById("buffering4").value),
            timeOut: parseInt(document.getElementById("timeout4").value),
        },
        {
            id: '5t',
            bufferingTime: parseInt(document.getElementById("buffering5").value),
            timeOut: parseInt(document.getElementById("timeout5").value),
        }];

    const replayFactor = parseInt(document.getElementById("replay-factor").value);

    new DataSynchronizer({
        replayFactor: replayFactor,
        dataSources:  dataSources,
        intervalRate: 5
    });

    startDataSet(eltDynamic, 100, eltDynamicErrors, [],['1t','2t','3t','4t','5t']);

    addDataInjection(
        '1t',
        parseInt(document.getElementById("freq1").value),
        parseInt(document.getElementById("latency1").value),
        replayFactor
        );
    addDataInjection(
        '2t',
        parseInt(document.getElementById("freq2").value),
        parseInt(document.getElementById("latency2").value),
        replayFactor
    );
    addDataInjection(
        '3t',
        parseInt(document.getElementById("freq3").value),
        parseInt(document.getElementById("latency3").value),
        replayFactor
    );
    addDataInjection(
        '4t',
        parseInt(document.getElementById("freq4").value),
        parseInt(document.getElementById("latency4").value),
        replayFactor
        );
    addDataInjection(
        '5t',
        parseInt(document.getElementById("freq5").value),
        parseInt(document.getElementById("latency5").value),
        replayFactor
    );

    function addDataInjection(dsId, freq, latency = 0,replayFactor) {
        // DS1
        const dataInjector = new DataInjectorWorker();
        dataInjector.postMessage({
           freq: freq,
           id: dsId,
           latency:latency,
           replayFactor: replayFactor
        });

        setTimeout(() => {
            console.log('calling terminate..');
            dataInjector.terminate();
            cbFinish();
        }, duration);
    }
}
