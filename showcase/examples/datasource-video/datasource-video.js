// create data source for Android phone GPS
import {DATASOURCE_DATA_TOPIC} from "osh/Constants";
// #region snippet_datasource_video
import Video from "osh/datareceiver/Video";

const videoDataSource = new Video("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const videoBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + videoDataSource.id);
const videoDivElement = document.getElementById('datasource-video');

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

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => videoDataSource.connect();
// #endregion snippet_datasource_video
