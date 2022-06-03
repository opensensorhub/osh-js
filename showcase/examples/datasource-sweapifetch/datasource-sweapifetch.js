import {EventType} from 'osh-js/core/event/EventType';
// #region snippet_datasource_sweapifetch
import SweApiFetch from "osh-js/core/datasource/sweapi/SweApiFetch";

let gpsDataSource = new SweApiFetch("android-GPS", {
  endpointUrl:  'ogct17.georobotix.io:8080/sensorhub/api',
  collection: '/datastreams/gal7w6j6v7n9/observations',
  tls: false,
  protocol: 'mqtt',
  mqttOpts: {
    prefix: '/api',
    endpointUrl: 'ogct17.georobotix.io:8083'
  },
});

// #endregion snippet_datasource_sweapifetch

gpsDataSource.subscribe(async (message) => {
  let dataEvent;
  for (let i = 0; i < message.values.length; i++) {
    dataEvent = message.values[i];
    const str = JSON.stringify(dataEvent.data,null,2);
    document.getElementById('json-container').innerHTML = str;
  }
}, [EventType.DATA])


// start streaming onclick
gpsDataSource.connect();
