// create data source for Android phone GPS
// #region snippet_datasource_video
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import {EventType} from 'osh-js/core/event/EventType';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';

const videoDataSource = new SosGetResult("drone-Video", {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:mysos:solo:video2',
  observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  mode: Mode.REPLAY,
  tls: true
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: 2,
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  dataSources: [videoDataSource]
});

const videoDivElement = document.getElementById('datasource-video');

videoDataSource.subscribe((message) => {
  let dataEvent;
  for(let i=0;i < message.values.length;i++) {
    dataEvent =  message.values[i];
    dataEvent.data.videoFrame.data = message.values[i].data.videoFrame.data.slice(0,10);
    videoDivElement.innerText = JSON.stringify( [dataEvent], null, 2);
  }
}, [EventType.DATA])


dataSynchronizer.connect()
// #endregion snippet_datasource_video
