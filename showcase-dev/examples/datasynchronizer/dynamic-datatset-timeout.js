// dynamic part
import {startDataSet} from './datasynchronizer';
import DataInjectorWorker from './DataInjector.worker';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {DATA_SYNCHRONIZER_TOPIC} from 'osh-js/core/Constants';
import DummyDataSource from './datasource/DummyDataSource';
import {randomUUID} from 'osh-js/core/utils/Utils';

const eltDynamic = document.getElementById("buffer-dynamic-data");
const eltDynamicErrors = document.getElementById("buffer-dynamic-errors");
const eltCurrentTime = document.getElementById("current-time");

export function startDynamicWithTimeout(cbFinish) {
    eltDynamic.innerHTML = '';
    eltDynamicErrors.innerHTML = '';

    const duration = parseInt(document.getElementById("duration").value) * 1000;
    const replaySpeed = parseInt(document.getElementById("replay-factor").value);

    const dataSources = [
        new DummyDataSource('1t',{
            replaySpeed: replaySpeed,
            bufferingTime:  parseInt(document.getElementById("buffering1").value),
            timeOut:  parseInt(document.getElementById("timeout1").value),
            name: '1t',
            protocol: 'topic',
            topicName: randomUUID()
        }),
        new DummyDataSource('2t',{
            replaySpeed: replaySpeed,
            bufferingTime:  parseInt(document.getElementById("buffering2").value),
            timeOut:  parseInt(document.getElementById("timeout2").value),
            name: '2t',
            protocol: 'topic',
            topicName: randomUUID()
        }),
        new DummyDataSource('3t',{
            replaySpeed: replaySpeed,
            bufferingTime:  parseInt(document.getElementById("buffering3").value),
            timeOut:  parseInt(document.getElementById("timeout3").value),
            name: '3t',
            protocol: 'topic',
            topicName: randomUUID()
        }),
        new DummyDataSource('4t',{
            replaySpeed: replaySpeed,
            bufferingTime:  parseInt(document.getElementById("buffering4").value),
            timeOut:  parseInt(document.getElementById("timeout4").value),
            name: '4t',
            protocol: 'topic',
            topicName: randomUUID()
        }),
        new DummyDataSource('5t',{
            replaySpeed: replaySpeed,
            bufferingTime:  parseInt(document.getElementById("buffering5").value),
            timeOut:  parseInt(document.getElementById("timeout5").value),
            name: '5t',
            protocol: 'topic',
            topicName: randomUUID()
        })
    ];

    const timeSync = new DataSynchronizer({
        replaySpeed: replaySpeed,
        dataSources:  dataSources,
        timerResolution: 5
    });

    const currentTimeBroadCastChannel = new BroadcastChannel(DATA_SYNCHRONIZER_TOPIC+timeSync.id);
    console.log('listen for currentTime',DATA_SYNCHRONIZER_TOPIC+timeSync.id)
    currentTimeBroadCastChannel.onmessage = async (event) => {
      eltCurrentTime.innerText = new Date(await timeSync.getCurrentTime()).toISOString();
    };

    startDataSet(eltDynamic, 100, eltDynamicErrors, [],
        [dataSources[0].id,dataSources[1].id,dataSources[2].id,dataSources[3].id,dataSources[4].id]);

    addDataInjection(
        dataSources[0],
        parseInt(document.getElementById("freq1").value),
        parseInt(document.getElementById("latency1").value),
        replaySpeed,
        DATA_SYNCHRONIZER_TOPIC+timeSync.id
        );
    addDataInjection(
        dataSources[1],
        parseInt(document.getElementById("freq2").value),
        parseInt(document.getElementById("latency2").value),
        replaySpeed,
        DATA_SYNCHRONIZER_TOPIC+timeSync.id
    );
    addDataInjection(
        dataSources[2],
        parseInt(document.getElementById("freq3").value),
        parseInt(document.getElementById("latency3").value),
        replaySpeed,
        DATA_SYNCHRONIZER_TOPIC+timeSync.id
    );
    addDataInjection(
        dataSources[3],
        parseInt(document.getElementById("freq4").value),
        parseInt(document.getElementById("latency4").value),
        replaySpeed,
        DATA_SYNCHRONIZER_TOPIC+timeSync.id
        );
    addDataInjection(
        dataSources[4],
        parseInt(document.getElementById("freq5").value),
        parseInt(document.getElementById("latency5").value),
        replaySpeed,
        DATA_SYNCHRONIZER_TOPIC+timeSync.id
    );

    function addDataInjection(dummyDataSource, freq, latency = 0,replaySpeed, topic) {
        dummyDataSource.connect();
        const dataInjector = new DataInjectorWorker();
        dataInjector.postMessage({
           freq: freq,
           id: dummyDataSource.id,
           latency:latency,
           replaySpeed: replaySpeed,
           topic: topic,
           name: dummyDataSource.name,
           topicDs: dummyDataSource.properties.topicName
        });

        setTimeout(() => {
            console.log('calling terminate..');
            dataInjector.terminate();
            timeSync.terminate();
            cbFinish();
        }, duration);
    }
}
