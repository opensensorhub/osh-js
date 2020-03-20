//@ sourceURL=leaflet-location.html.js

// create data source for Android phone GPS
import Json from "../../source/osh/datareceiver/osh-DataReceiver-DataSourceJSON.js";
import PointMarker from "../../source/osh/ui/styler/osh-UI-StylerPointMarker.js";
import LeafletView from "../../source/osh/ui/view/map/osh-UI-LeafletView.js";

let gpsDataSource = new Json("android-GPS", {
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
  locationFunc: {
    dataSourceIds: [gpsDataSource.getId()],
    handler: function (rec) {
      return {
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
      };
    }
  },
  icon: './images/car-location.png',
  iconAnchor: [16, 65]
});

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap",
    [{
      styler: pointMarker,
      name: "Android Phone GPS"
    }]
);

// start streaming
gpsDataSource.connect();
