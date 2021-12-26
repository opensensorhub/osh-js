// create data source for Android phone GPS
// #region snippet_datasource_video
import SosGetResultVideo from 'osh-js/core/datasource/sos/SosGetResultVideo';
import {EventType} from 'osh-js/core/event/EventType';

const videoDataSource = new SosGetResultVideo("drone-Video", {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

const videoDivElement = document.getElementById('datasource-video');

videoDataSource.subscribe((message) => {
  let dataEvent;
  for(let i=0;i < message.values.length;i++) {
    dataEvent =  message.values[i];
    dataEvent.data.frameData = message.values[i].data.frameData.slice(0,10);
    videoDivElement.value += JSON.stringify( [dataEvent]) + '\n';
  }
}, [EventType.DATA])


// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => videoDataSource.connect();
// #endregion snippet_datasource_video
