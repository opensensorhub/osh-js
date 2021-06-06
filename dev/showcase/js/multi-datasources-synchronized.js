import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';
import {displayVideo0, displayVideo1, displayVideo2, displayError} from './display-values';

import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {TIME_SYNCHRONIZER_TOPIC} from 'osh-js/core/Constants';

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_SPEED = 4.0;
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

// connects each DataSource
dataSynchronizer.connect();

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const video0BroadcastChannel     = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource0.id);
const video1BroadcastChannel     = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource1.id);
const video2BroadcastChannel     = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource2.id);

const syncTimeBroadcastChannel  = new BroadcastChannel(TIME_SYNCHRONIZER_TOPIC + dataSynchronizer.id);


video0BroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    displayVideo0(message.data.values);
  }
}

video1BroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    displayVideo1(message.data.values);
  }
}

video2BroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    displayVideo2(message.data.values);
  }
}

syncTimeBroadcastChannel.onmessage = (message) => {
    displayError(message.data.timestamp);
}

// start streaming
dataSynchronizer.connect();
