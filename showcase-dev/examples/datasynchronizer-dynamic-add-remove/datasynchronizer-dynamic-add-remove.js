import {EventType} from 'osh-js/core/event/EventType';
import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource.js";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:36:54.033333251Z';
const REPLAY_SPEED = 2.6;

const commonDatasourceOpts = {
  endpointUrl:  'api.georobotix.io/ogc/t18/api',
  tls: true,
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250
};

const ds0 = new SweApiDatasource('MISB Drone - Video', {
  ...commonDatasourceOpts,
  resource: '/datastreams/8ni90dbu4uf0g/observations',
  responseFormat: 'application/swe+binary',
});

const ds1 = new SweApiDatasource('MISB UAS - Platform Location', {
  ...commonDatasourceOpts,
  resource: '/datastreams/fled6eics1cl4/observations',
  responseFormat: 'application/swe+json',
});

const ds2 = new SweApiDatasource('MISB UAS - Platform Attitude', {
  ...commonDatasourceOpts,
  resource: '/datastreams/adheadf9nghts/observations',
  responseFormat: 'application/swe+json',
});


const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  masterTimeRefreshRate: 250,
  startTime: START_TIME,
  endTime: END_TIME,
  dataSources: []
});


const timeSyncElt = document.getElementById('timeSync');
const ds0Elt = document.getElementById('ds0');
const ds1Elt = document.getElementById('ds1');
const ds2Elt = document.getElementById('ds2');

dataSynchronizer.subscribe((message) => timeSyncElt.innerText = new Date(message.timestamp).toISOString(), [EventType.MASTER_TIME]);
ds0.subscribe(async (message) => ds0Elt.innerText = new Date(message.values[0].data.timestamp).toISOString(), [EventType.DATA]);
ds1.subscribe(async (message) => ds1Elt.innerText = new Date(message.values[0].data.timestamp).toISOString(), [EventType.DATA]);
ds2.subscribe(async (message) => ds2Elt.innerText = new Date(message.values[0].data.timestamp).toISOString(), [EventType.DATA]);


// ACTIONS TimeSync

const timeSyncButtonStart = document.getElementById('timeSync-button-start');
const timeSyncButtonStop = document.getElementById('timeSync-button-stop');

timeSyncButtonStart.onclick = () => { dataSynchronizer.connect(); timeSyncButtonStart.disabled = true;  timeSyncButtonStop.disabled = false};
timeSyncButtonStop.onclick = () => { dataSynchronizer.disconnect(); timeSyncButtonStart.disabled = false;  timeSyncButtonStop.disabled = true};

// ACTIONS DS

addDS('ds0', ds0);
addDS('ds1', ds1);
addDS('ds2', ds2);

function addDS(dsNumber, ds) {
  const dsButtonAdd = document.getElementById(dsNumber+'-button-add');
  const dsButtonRemove = document.getElementById(dsNumber+'-button-remove');

  dsButtonAdd.onclick = async () => {
    dsButtonAdd.disabled = true;
    dsButtonRemove.disabled = false;
    await dataSynchronizer.addDataSource(ds, true)
  };

  dsButtonRemove.onclick = async () => {
    dsButtonAdd.disabled = false;
    dsButtonRemove.disabled = true;
    await dataSynchronizer.removeDataSource(ds, true)
  };
}

