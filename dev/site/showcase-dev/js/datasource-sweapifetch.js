import {EventType} from 'osh-js/core/event/EventType';
// #region snippet_datasource_sweapifetch
import SweApiFetch from "osh-js/core/datasource/sweapi/SweApi.datasource.js";
import {Mode} from "osh-js/core/datasource/Mode";

let gpsDataSource = new SweApiFetch("android-GPS", {
  endpointUrl: 'api.georobotix.io/ogc/t18/api',
  resource: '/datastreams/fled6eics1cl4/observations',
  tls: true,
  protocol: 'mqtt',
  mqttOpts: {
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18'
  },
  mode : Mode.REAL_TIME
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
