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
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:05:59.675Z';
const REPLAY_SPEED = 5.0;

const videoDataSource = new SosGetResult("drone-Video", {
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY
});

const platformLocationDataSource = new SosGetResult('android-GPS', {
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: START_TIME,
  endTime: END_TIME,
  responseFormat: 'application/json',
  mode: Mode.REPLAY
});
const platformOrientationDataSource = new SosGetResult('android-Heading', {
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
  startTime: START_TIME,
  endTime: END_TIME,
  mode: Mode.REPLAY
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: REPLAY_SPEED,
  timerResolution: 5,
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

// start streaming
dataSynchronizer.connect();


const connectGpsButtonElt = document.getElementById("connect-gps-button");
const disconnectGpsButtonElt = document.getElementById("disconnect-gps-button");

connectGpsButtonElt.onclick = () => {
  platformLocationDataSource.connect();
}
disconnectGpsButtonElt.onclick = () => {
  platformLocationDataSource.disconnect();
}
