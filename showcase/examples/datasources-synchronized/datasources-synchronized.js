import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
import {displayLocation, displayVideo, displayOrientation} from './display-values';

// #region snippet_datasource_synchronized
// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import Video from "osh/datareceiver/Video";
import DataSynchronizer from "osh/datasynchronizer/DataSynchronizer";

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_SPEED = 1.0;

const videoDataSource = new Video("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED
});
const platformLocationDataSource = new SweJson('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED
});
const platformOrientationDataSource = new SweJson('android-Heading', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_SPEED
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  intervalRate: 5,
  dataSources: [videoDataSource, platformLocationDataSource, platformOrientationDataSource]
})

// connects each DataSource
dataSynchronizer.connect();

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const videoBroadcastChannel     = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource.id);
const gpsBroadcastChannel       = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformLocationDataSource.id);
const orientBroadcastChannel    = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformOrientationDataSource.id);

gpsBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    displayLocation(message.data.values);
  }
}

orientBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
   displayOrientation(message.data.values);
  }
}

videoBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    displayVideo(message.data.values);
  }
}

// start streaming
dataSynchronizer.connect();

// #endregion snippet_datasource_synchronized