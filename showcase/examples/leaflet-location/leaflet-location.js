// #region snippet_leaflet_location_import
// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import {Mode} from 'osh-js/core/datasource/Mode';
// #endregion snippet_leaflet_location_import

// #region snippet_leaflet_location_datasource
let gpsDataSource = new SosGetResult("android-GPS", {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:android:device:060693280a28e015-sos',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: '2015-02-16T07:58:15.447Z',
    endTime: '2015-02-16T08:09:00Z',
    mode: Mode.REPLAY,
    tls: true,
    timeShift: -16000
  // responseFormat: 'application/octet-stream',
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

