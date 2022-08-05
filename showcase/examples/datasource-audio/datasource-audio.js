// create data source for Android phone GPS
// #region snippet_datasource_audio
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import {EventType} from "osh-js/core/event/EventType";

let audioDataSource = new SosGetResult("alex-audio", {
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

const divElement = document.getElementById('datasource-audio');

audioDataSource.subscribe((message) => {
  let dataEvent;
  for(let i=0;i < message.values.length;i++) {
    dataEvent =  message.values[i];
    dataEvent.data.frameData = message.values[i].data.frameData.slice(0,10);
    divElement.value += JSON.stringify( [dataEvent]) + '\n';
  }
}, [EventType.DATA])

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => audioDataSource.connect();
// #endregion snippet_datasource_audio
