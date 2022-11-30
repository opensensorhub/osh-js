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

timeSyncButtonStart.onclick = () => dataSynchronizer.connect();
timeSyncButtonStop.onclick = () => dataSynchronizer.disconnect();

// ACTIONS DS

const ds0ButtonAdd = document.getElementById('ds0-button-add');
const ds0ButtonRemove = document.getElementById('ds0-button-remove');

ds0ButtonAdd.onclick = () => addButton(ds0, ds0ButtonAdd);

async function addButton(ds, elt) {
  elt.disabled = true;
  await dataSynchronizer.addDataSource(ds, true);
}
