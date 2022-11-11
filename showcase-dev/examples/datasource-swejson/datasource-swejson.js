// create data source for Android phone GPS
// #region snippet_datasource_swejson
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import {EventType} from 'osh-js/core/event/EventType';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

const platformLocationDataSource = new SosGetResult('android-GPS', {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:mysos:solo:nav2',
  observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  mode: Mode.REPLAY,
  tls: true
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: 3.0,
  startTime: '2015-12-19T21:04:29.231Z',
  endTime: '2015-12-19T21:09:19.675Z',
  dataSources: [platformLocationDataSource]
});

const locationDivElement = document.getElementById('datasource-gps');
platformLocationDataSource.subscribe((message) => locationDivElement.innerText = JSON.stringify(message, null, 2),
    [EventType.DATA,EventType.TIME_CHANGED, EventType.STATUS])

dataSynchronizer.connect();
// #endregion snippet_datasource_swejson
