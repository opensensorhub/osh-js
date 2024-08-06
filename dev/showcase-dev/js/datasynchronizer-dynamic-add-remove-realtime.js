import {EventType} from 'osh-js/core/event/EventType';
import SweApiDatasource from "osh-js/core/datasource/sweapi/SweApi.datasource.js";
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";

const commonDatasourceOpts = {
  endpointUrl:  'api.georobotix.io/ogc/t18/api',
  tls: true,
  mode: Mode.REAL_TIME,
  protocol: 'mqtt',
  mqttOpts: {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18'
  },
};

const ds0 = new SweApiDatasource('MISB Drone - Video', {
  ...commonDatasourceOpts,
  resource: '/datastreams/h225hesual08g/observations',
  responseFormat: 'application/swe+binary',
});

const ds1 = new SweApiDatasource('MISB UAS - Platform Location', {
  ...commonDatasourceOpts,
  resource: '/datastreams/o7pce3e60s0ie/observations',
  responseFormat: 'application/swe+json',
});

const ds2 = new SweApiDatasource('MISB UAS - Platform Attitude', {
  ...commonDatasourceOpts,
  resource: '/datastreams/mlme3gtdfepvc/observations',
  responseFormat: 'application/swe+json',
});


const dataSynchronizer = new DataSynchronizer({
  masterTimeRefreshRate: 50,
  mode: Mode.REAL_TIME,
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
  const dsButtonConnect = document.getElementById(dsNumber+'-button-connect');

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

  dsButtonConnect.onclick = async () => {
    await ds.connect();
  };
}

