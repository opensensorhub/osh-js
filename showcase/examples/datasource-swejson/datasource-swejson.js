// create data source for Android phone GPS
// #region snippet_datasource_swejson
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import {EventType} from 'osh-js/core/event/EventType';

const platformLocationDataSource = new SosGetResult('android-GPS', {
  protocol: 'ws',
  service: 'SOS',
  endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  replaySpeed: 1.0
});

const locationDivElement = document.getElementById('datasource-gps');
platformLocationDataSource.subscribe((message) => locationDivElement.value += JSON.stringify(message) +'\n', [EventType.DATA,EventType.TIME_CHANGED, EventType.STATUS])

// start streaming onclick
const runButtonElement = document.getElementById('run-datasource-button');
runButtonElement.onclick = () => platformLocationDataSource.connect();
// #endregion snippet_datasource_swejson
