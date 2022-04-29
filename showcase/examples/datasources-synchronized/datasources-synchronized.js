import {displayLocation, displayVideo, displayOrientation, displayError} from './display-values';
import {EventType} from 'osh-js/core/event/EventType';

// #region snippet_datasource_synchronized
// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';

const START_TIME = '2015-12-19T21:04:29.231Z';
// const END_TIME = '2015-12-19T21:04:30.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_SPEED = 1.0;
const BUFFERING_TIME = 800;
const TIMEOUT = 1000;

const videoDataSource = new SosGetResult("drone-Video", {
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
const platformLocationDataSource = new SosGetResult('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED,
  bufferingTime: BUFFERING_TIME,
  responseFormat: 'application/json',
  timeOut: TIMEOUT
});
const platformOrientationDataSource = new SosGetResult('android-Heading', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED,
  bufferingTime: BUFFERING_TIME,
  timeOut: TIMEOUT
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  timerResolution: 5,
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
