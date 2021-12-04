import {displayVideo0, displayVideo1, displayVideo2, displayError} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';

import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_SPEED = 4.2;
const BUFFERING_TIME = 500;
const TIMEOUT = 1000;

const videoDataSource0 = new SosGetResultVideo("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED,
  bufferingTime: BUFFERING_TIME,
  timeOut: TIMEOUT
});

const videoDataSource1 = new SosGetResultVideo("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED,
  bufferingTime: BUFFERING_TIME,
  timeOut: TIMEOUT
});

const videoDataSource2 = new SosGetResultVideo("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED,
  bufferingTime: BUFFERING_TIME,
  timeOut: TIMEOUT
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  timerResolution: 5,
  dataSources: [videoDataSource0, videoDataSource1, videoDataSource2]
})

videoDataSource0.subscribe((message) => displayVideo0(message.values), [EventType.DATA])
videoDataSource1.subscribe((message) => displayVideo1(message.values), [EventType.DATA])
videoDataSource2.subscribe((message) => displayVideo2(message.values), [EventType.DATA])
dataSynchronizer.subscribe((message) => displayError(message.timestamp), [EventType.TIME])

// start streaming
dataSynchronizer.connect();
