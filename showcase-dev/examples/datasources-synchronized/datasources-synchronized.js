import {displayLocation, displayVideo, displayOrientation, displayError} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource.js";
// #region snippet_datasource_synchronized
// create data source for Android phone GPS
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:36:54.033333251Z';

const REPLAY_SPEED = 5.0;

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
  dataSources: [videoDataSource, platformLocationDataSource, platformOrientationDataSource]
})

// connects each DataSource
dataSynchronizer.connect();

videoDataSource.subscribe((message) => displayVideo(message.values), [EventType.DATA])
platformLocationDataSource.subscribe((message) => displayLocation(message.values), [EventType.DATA])
platformOrientationDataSource.subscribe((message) => displayOrientation(message.values), [EventType.DATA])
dataSynchronizer.subscribe((message) => displayError(message.timestamp), [EventType.TIME])

// start streaming
dataSynchronizer.connect();
// #endregion snippet_datasource_synchronized
