// create data source for Android phone GPS
import {DATASOURCE_DATA_TOPIC} from 'osh-js/core/Constants';
// #region snippet_datasource_swejson
import SweJson from 'osh-js/core/datasource/SosGetResultJson.js';

const platformLocationDataSource = new SweJson('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

// Data are received through Broadcast channel in a separate thread.
// When you create a View object, it automatically subscribes to the corresponding datasource channel(s).
// If you don't have view, or don't need, you can directly subscribe to the channel

const locationBroadcastChannel  = new BroadcastChannel(DATASOURCE_DATA_TOPIC + platformLocationDataSource.id);
const locationDivElement = document.getElementById('datasource-gps');

locationBroadcastChannel.onmessage = (message) => {
  if(message.data.type === 'data') {
    locationDivElement.value += JSON.stringify(message.data.values) +'\n';
  }
}

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => platformLocationDataSource.connect();
// #endregion snippet_datasource_swejson
