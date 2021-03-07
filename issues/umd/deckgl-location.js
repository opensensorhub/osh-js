// create data source for Android phone GPS
let gpsDataSource = new OSH.SosGetResultJson("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:32Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: 2
});

let pointMarker = new OSH.PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({ x: rec.location.lon, y: rec.location.lat, z: 0}),
  icon: './images/car-location.png',
  iconAnchor: [16, 64],
  iconSize: [32, 65],
  iconScale: 10,
  label: 'GPS Toulouse',
  labelColor: '#FFFFFF'
});

window.CESIUM_BASE_URL = './';

// create Leaflet view
let leafletView = new OSH.LeafletView({
      container: "container",
      layers: [pointMarker],
      autoZoomOnFirstMarker: true
    }
);

// start streaming
gpsDataSource.connect();

