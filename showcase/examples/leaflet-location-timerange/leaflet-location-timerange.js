// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import RangeSlider from 'osh-js/ext/ui/view/rangeslider/RangeSliderView.js';
import LeafletView from "osh-js/core/ui/view/map/LeafletView";

let gpsDataSource = new SosGetResult("android-GPS", {
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

// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarkerLayer],
    autoZoomOnFirstMarker:true
});

let rangeSlider = new RangeSlider({
    container: "rangeSlider",
    startTime: "2015-02-16T07:58:32Z",
    endTime: "2015-02-16T08:20:00Z",
    dataSource: gpsDataSource
});

// start streaming
gpsDataSource.connect();

