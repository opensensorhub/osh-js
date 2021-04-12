// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';

// create data source for Android phone GPS
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

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({
      x: rec.location.lon,
      y: rec.location.lat
  }),
  orientation: {
    heading: 0
  },
  icon: 'images/car-location.png',
  iconAnchor: [16, 64],
  iconSize: [32, 64],
  name: "Android Phone GPS"
});

// #region snippet_ol_location_view
// create Cesium view
let olView = new OpenLayerView({
  container: 'ol-map',
  layers: [pointMarker],
  autoZoomOnFirstMarker: true
});
// #endregion snippet_ol_location_view

// start streaming
gpsDataSource.connect();
