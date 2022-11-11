import {displayVideo0, displayVideo1, displayVideo2, displayError} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';

import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from "../../../source/core/datasource/Mode";

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_SPEED = 1.2;

const videoDataSource0 = new SosGetResult("drone-Video", {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY,
  tls: true
});

const videoDataSource1 = new SosGetResult("drone-Video", {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY,
  tls: true
});

const videoDataSource2 = new SosGetResult("drone-Video", {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY,
  tls: true
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  masterTimeRefreshRate: 150,
  startTime: START_TIME,
  endTime: END_TIME,
  dataSources: [videoDataSource0, videoDataSource1, videoDataSource2]
})

videoDataSource0.subscribe((message) => displayVideo0(message.values), [EventType.DATA])
videoDataSource1.subscribe((message) => displayVideo1(message.values), [EventType.DATA])
videoDataSource2.subscribe((message) => displayVideo2(message.values), [EventType.DATA])
dataSynchronizer.subscribe((message) => displayError(message.timestamp), [EventType.TIME])

// start streaming
dataSynchronizer.connect();
