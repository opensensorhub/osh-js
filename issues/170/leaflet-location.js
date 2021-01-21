// create data source for Android phone GPS
import SosGetResultJson from 'osh/datareceiver/SosGetResultJson.js';
import PointMarker from "osh/ui/layer/PointMarker.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";

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
let pointMarker = new PointMarker({
  getLocation: {
    dataSourceIds: [gpsDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      };
    }
  },
  zoomLevel: 15,
  location: {
    x: 0,
    y: 0,
    z: 0
  },
  icon: './images/car-location.png',
  iconAnchor: [16, 65]
});

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap",
    [{
      layer: pointMarker,
      name: "Android Phone GPS"
    }],
    {
      autoZoomOnFirstMarker:true,
      follow:true
    }
);

// start streaming
gpsDataSource.connect();
