import {
  displayLocation,
  displayVideo,
  displayOrientation,
  displayError,
  displayMasterTime,
  displayLastTime
} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';

// #region snippet_datasource_synchronized
// create data source for Android phone GPS
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource.js";
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';

const START_TIME = (new Date(Date.now() - 60 * 1000 * 2).toISOString());
const END_TIME = (new Date().toISOString());
const REPLAY_SPEED = 2.0;

const commonDatasourceOpts = {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
        shared: true,
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
}

const videoDataSource = new ConSysApi("drone-Video", {
    ...commonDatasourceOpts,
    resource: '/datastreams/h225hesual08g/observations',
    responseFormat: 'application/swe+binary',
});

const platformLocationDataSource = new ConSysApi('misb-GPS', {
    ...commonDatasourceOpts,
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
});

const platformOrientationDataSource = new ConSysApi('misb-Attitude', {
    ...commonDatasourceOpts,
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/swe+json',
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  timerResolution: 5,
  startTime: START_TIME,
  endTime: END_TIME,
  masterTimeRefreshRate: 25,
  dataSources: []
})

videoDataSource.subscribe((message) => displayVideo(message.values), [EventType.DATA])
platformLocationDataSource.subscribe((message) => displayLocation(message.values), [EventType.DATA])
platformOrientationDataSource.subscribe((message) => displayOrientation(message.values), [EventType.DATA])
dataSynchronizer.subscribe((message) => displayError(message), [EventType.LAST_TIME, EventType.MASTER_TIME])
dataSynchronizer.subscribe((message) => displayMasterTime(message.timestamp), [EventType.MASTER_TIME])
dataSynchronizer.subscribe((message) => displayLastTime(message.timestamp), [EventType.LAST_TIME])

// #endregion snippet_datasource_synchronized

dataSynchronizer.addDataSource(platformLocationDataSource);
dataSynchronizer.addDataSource(platformOrientationDataSource);
dataSynchronizer.addDataSource(videoDataSource);

// start streaming
dataSynchronizer.connect();


const connectGpsButtonElt = document.getElementById("connect-gps-button");
const disconnectGpsButtonElt = document.getElementById("disconnect-gps-button");

const connectVideButtonElt = document.getElementById("connect-video-button");
const disconnectVideoButtonElt = document.getElementById("disconnect-video-button");

const connectOrientationButtonElt = document.getElementById("connect-orientation-button");
const disconnectOrientationButtonElt = document.getElementById("disconnect-orientation-button");

connectGpsButtonElt.onclick = () => {
  platformLocationDataSource.connect();
}
disconnectGpsButtonElt.onclick = () => {
  platformLocationDataSource.disconnect();
}

connectVideButtonElt.onclick = () => {
  videoDataSource.connect();
}
disconnectVideoButtonElt.onclick = () => {
  videoDataSource.disconnect();
}

connectOrientationButtonElt.onclick = () => {
  platformOrientationDataSource.connect();
}
disconnectOrientationButtonElt.onclick = () => {
  platformOrientationDataSource.disconnect();
}
