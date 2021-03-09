// #region snippet_leaflet_location_import
// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
// #endregion snippet_leaflet_location_import

// #region snippet_leaflet_location_datasource
let gpsDataSource = new SosGetResultJson("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:32Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: 2
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
gpsDataSource.connect();
// #endregion snippet_leaflet_location_connect

