// #region snippet_leaflet_location_import
// create data source for Android phone GPS

import PointMarkerLayer from 'osh-js/source/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/source/core/ui/view/map/LeafletView.js';
import DataSynchronizer from 'osh-js/source/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/source/core/datasource/Mode';
import ConSysApi from "osh-js/source/core/datasource/consysapi/ConSysApi.datasource";

// #endregion snippet_leaflet_location_import

// #region snippet_leaflet_location_datasource
let gpsDataSource =  new ConSysApi('android-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: '2023-06-06T14:26:12Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/frmhs11ofiilm/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    startTime: '2015-02-16T07:58:22.00Z',
    endTime: "2015-02-16T08:09:00Z",
    dataSources: [gpsDataSource]
});

// #endregion snippet_leaflet_location_datasource

// #region snippet_leaflet_location_marker
// style it with a moving point marker
let pointMarkerLayer = new PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
  }),
  icon: './images/car-location.png',
  iconSize: [32, 64],
  iconAnchor: [16, 65],
  name: 'Car',
  description: 'GPS car Toulouse'
});
// #endregion snippet_leaflet_location_marker

// #region snippet_leaflet_location_view
// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarkerLayer],
    autoZoomOnFirstMarker:true
});
// #endregion snippet_leaflet_location_view

// #region snippet_leaflet_location_connect
// start streaming
dataSynchronizer.connect();
// #endregion snippet_leaflet_location_connect

