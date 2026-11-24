import {displayVideo0, displayVideo1, displayVideo2, displayError} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from "../../../source/core/datasource/Mode";
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

const START_TIME = '2026-11-13T18:33:59.00Z';
const END_TIME = '2026-11-13T18:44:40.00Z';
const REPLAY_SPEED = 1.2;

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
    mode: Mode.REAL_TIME,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/h225hesual08g/observations',
    responseFormat: 'application/swe+binary',
};
const videoDataSource0 = new ConSysApi("Video 0", {
    ...commonDatasourceOpts
});

const videoDataSource1 = new ConSysApi("Video 1", {
    ...commonDatasourceOpts
});

const videoDataSource2 = new ConSysApi("Video 2", {
    ...commonDatasourceOpts
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  masterTimeRefreshRate: 150,
  startTime: START_TIME,
  endTime: END_TIME,
    mode: Mode.REAL_TIME,
  dataSources: [videoDataSource0, videoDataSource1, videoDataSource2]
})

videoDataSource0.subscribe((message) => displayVideo0(message.values), [EventType.DATA])
videoDataSource1.subscribe((message) => displayVideo1(message.values), [EventType.DATA])
videoDataSource2.subscribe((message) => displayVideo2(message.values), [EventType.DATA])
dataSynchronizer.subscribe((message) => displayError(message.timestamp), [EventType.TIME])

// start streaming
dataSynchronizer.connect();
