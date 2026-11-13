// create data source for Android phone camera
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";
import {EventType} from "osh-js/core/event/EventType";

const replayButtonElt = document.getElementById("replay");
const realtimeButtonElt = document.getElementById("realtime");
const dataContentElt = document.getElementById("data-content");
const masterTimeElt = document.getElementById("master-time");

const MODE = Mode.REPLAY;
const START_TIME = '2026-11-13T18:13:59.673Z';
const END_TIME = '2026-11-13T18:24:42Z';
const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
const MAX_TIME = '2055-06-29T14:36:54.033333251Z';
const tls = true;

const mqttProps = {
    shared: true,
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18'
};

const commonDatasourceOpts = {
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    tls: tls,
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: MIN_TIME,
    maxTime: MAX_TIME,
    mode: MODE,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250
};

const droneLocationDataSource = new ConSysApi('MISB UAS - Platform Location', {
    ...commonDatasourceOpts,
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
});

const droneOrientationDataSource = new ConSysApi('MISB UAS - Platform Attitude', {
    ...commonDatasourceOpts,
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/swe+json',
});

const consysapiDataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    masterTimeRefreshRate: 250,
    startTime: START_TIME,
    endTime: END_TIME,
    dataSources: [
        droneOrientationDataSource,
        droneLocationDataSource
    ]
});

async function startConSysApiExample() {
    replayButtonElt.onclick = async () => {
        await consysapiDataSynchronizer.setMode(Mode.REPLAY);
        replayButtonElt.disabled = true;
        realtimeButtonElt.disabled = false;
        await consysapiDataSynchronizer.connect();
    }

    realtimeButtonElt.onclick = async () => {
        await consysapiDataSynchronizer.setMode(Mode.REAL_TIME);
        realtimeButtonElt.disabled = true;
        replayButtonElt.disabled = false;

        await consysapiDataSynchronizer.connect();
    }

    consysapiDataSynchronizer.subscribe(message => displayData(message), [EventType.DATA]);
    consysapiDataSynchronizer.subscribe(message => displayMasterTime(message), [EventType.MASTER_TIME]);
}

startConSysApiExample()

function displayData(data) {
    console.log('DATA event:', data);
    const values = data.values;
    dataContentElt.innerText = '';
    dataContentElt.innerText += JSON.stringify(values,null,2) + "\n";
}

function displayMasterTime(message) {
    masterTimeElt.innerText = new Date(message.timestamp).toISOString();
}
