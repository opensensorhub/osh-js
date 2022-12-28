// create data source for Android phone camera
import ChartJsView from 'osh-js/core/ui/view/chart/ChartJsView.js';
import CurveLayer from 'osh-js/core/ui/layer/CurveLayer.js';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";
import SweApiDatasource from "../../../source/core/datasource/sweapi/SweApi.datasource";
import {EventType} from "../../../source/core/event/EventType";

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const replayButtonElt = document.getElementById("replay");
const realtimeButtonElt = document.getElementById("realtime");
const dataContentElt = document.getElementById("data-content");
const masterTimeElt = document.getElementById("master-time");

let initSos = false;
let initSweapi = false;

let chartDataSource = new SosGetResult("weather", {
    endpointUrl: "sensiasoft.net/sensorhub/sos",
    offeringID: "urn:mysos:offering04",
    observedProperty: "http://sensorml.com/ont/swe/property/Weather",
    startTime: new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString(),
    endTime: new Date(Date.now()).toISOString(),
    mode: Mode.REPLAY,
    tls: true
});

const sosDataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    masterTimeRefreshRate: 250,
    startTime: new Date(Date.now() - 60 * 1000 * 60 * 1).toISOString(),
    endTime: new Date(Date.now()).toISOString(),
    dataSources: [chartDataSource]
});

async function startSosExample() {
    await sweapiDataSynchronizer.disconnect();
    replayButtonElt.onclick = async () => {
        await sosDataSynchronizer.setTimeRange(
            new Date(Date.now() - 60 * 1000 * 60 * 2).toISOString(),
            new Date(Date.now()).toISOString(),
            1.0,
            true,
            Mode.REPLAY
        );
        replayButtonElt.disabled = true;
        realtimeButtonElt.disabled = false;
        if (!initSos) {
            await sosDataSynchronizer.connect();
            initSos = true;
        }
    }

    realtimeButtonElt.onclick = async () => {
        await sosDataSynchronizer.setTimeRange(
            'now',
            '2055-01-01',
            1.0,
            true,
            Mode.REAL_TIME
        );
        realtimeButtonElt.disabled = true;
        replayButtonElt.disabled = false;
        if (!initSos) {
            await sosDataSynchronizer.connect();
            initSos = true;
        }
    }

    sosDataSynchronizer.subscribe(message => displayData(message), [EventType.DATA]);
    sosDataSynchronizer.subscribe(message => displayMasterTime(message), [EventType.MASTER_TIME]);

}

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:36:54.033333251Z';
const MODE = Mode.REPLAY;

const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
const MAX_TIME = '2012-06-29T14:36:54.033333251Z';
const tls = true;

const mqttProps = {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18',
    username: 'uxs-team',
    password: 'WR6zlso9h#'
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

const droneLocationDataSource = new SweApiDatasource('MISB UAS - Platform Location', {
    ...commonDatasourceOpts,
    resource: '/datastreams/fled6eics1cl4/observations',
    responseFormat: 'application/swe+json',
});

const droneOrientationDataSource = new SweApiDatasource('MISB UAS - Platform Attitude', {
    ...commonDatasourceOpts,
    resource: '/datastreams/adheadf9nghts/observations',
    responseFormat: 'application/swe+json',
});

const sweapiDataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    masterTimeRefreshRate: 250,
    startTime: START_TIME,
    endTime: END_TIME,
    dataSources: [droneOrientationDataSource, droneLocationDataSource]
});

async function startSweApiExample() {
    await sosDataSynchronizer.disconnect();
    replayButtonElt.onclick = async () => {
        await sweapiDataSynchronizer.setTimeRange(
            START_TIME,
            END_TIME,
            2.0,
            true,
            Mode.REPLAY
        );
        replayButtonElt.disabled = true;
        realtimeButtonElt.disabled = false;
        if (!initSweapi) {
            await sweapiDataSynchronizer.connect();
            initSweapi = true;
        }
    }

    realtimeButtonElt.onclick = async () => {
        await sweapiDataSynchronizer.setTimeRange(
            'now',
            '2055-01-01',
            1.0,
            true,
            Mode.REAL_TIME
        );
        realtimeButtonElt.disabled = true;
        replayButtonElt.disabled = false;

        if (!initSweapi) {
            await sweapiDataSynchronizer.connect();
            initSweapi = true;
        }
    }

    sweapiDataSynchronizer.subscribe(message => displayData(message), [EventType.DATA]);
    sweapiDataSynchronizer.subscribe(message => displayMasterTime(message), [EventType.MASTER_TIME]);
}

const listBoxElement = document.getElementById('services');
listBoxElement.onchange = (event) => {
    let value = event.target.value;
    if(value === 'sos') {
        startSosExample();
    } else if(value === 'sweapi') {
        startSweApiExample()
    }
}

let nbData = 0;
function displayData(data) {
    const values = data.values;
    dataContentElt.innerText = '';
    dataContentElt.innerText += JSON.stringify(values,null,2) + "\n";
}

function displayMasterTime(message) {
    masterTimeElt.innerText = new Date(message.timestamp).toISOString();
}
