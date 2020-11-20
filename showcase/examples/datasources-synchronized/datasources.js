// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
import Video from "osh/datareceiver/Video";

const START_TIME = '2015-12-19T21:04:29.231Z';
const END_TIME = '2015-12-19T21:09:19.675Z';
const REPLAY_FACTOR = 1.0;

const videoDataSource = new Video("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_FACTOR
});
const platformLocationDataSource = new SweJson('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_FACTOR
});
const platformOrientationDataSource = new SweJson('android-Heading', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
  startTime: START_TIME,
  endTime: END_TIME,
  replaySpeed: REPLAY_FACTOR
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const videoBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource.id);
const gpsBroadcastChannel  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformLocationDataSource.id);
const orientBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformOrientationDataSource.id);


const locationDivElement = document.getElementById('datasource-gps');
const orientationDivElement = document.getElementById('datasource-orientation');
const videoDivElement = document.getElementById('datasource-video');


gpsBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    locationDivElement.value += JSON.stringify(message.data.values) +'\n';
  }
}

orientBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    orientationDivElement.value += JSON.stringify(message.data.values) +'\n';
  }
}

videoBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    let dataEvent;
    for(let i=0;i < message.data.values.length;i++) {
      dataEvent =  message.data.values[i];
      dataEvent.data.frameData = message.data.values[i].data.frameData.slice(0,10);
      videoDivElement.value += JSON.stringify( [dataEvent]) + '\n';
    }
  }
}

// start streaming
videoDataSource.connect();
platformLocationDataSource.connect();
platformOrientationDataSource.connect();
