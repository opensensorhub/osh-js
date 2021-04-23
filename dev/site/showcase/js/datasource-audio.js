// create data source for Android phone GPS
import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';
// #region snippet_datasource_audio
import SosGetResultAudio from "osh-js/core/datasource/SosGetResultAudio";

let audioDataSource = new SosGetResultAudio("alex-audio", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:dd90fceba7fd5b47-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/AudioFrame",
  startTime: "2021-04-12T10:48:45Z",
  endTime: "2021-04-12T10:49:45Z",
  replaySpeed: 1.0,
  bufferingTime: 1000
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const audioBroadcastChannel = new BroadcastChannel(DATASOURCE_DATA_TOPIC + audioDataSource.id);
const divElement = document.getElementById('datasource-audio');

audioBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    let dataEvent;
    for(let i=0;i < message.data.values.length;i++) {
      dataEvent =  message.data.values[i];
      dataEvent.data.frameData = message.data.values[i].data.frameData.slice(0,10);
      divElement.value += JSON.stringify( [dataEvent]) + '\n';
    }
  }
}

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => audioDataSource.connect();
// #endregion snippet_datasource_audio
