//@ sourceURL=leaflet-location.html.js

// create data source for Android phone GPS
import Json from "../../source/osh/datareceiver/osh-DataReceiver-DataSourceJSON.js";
import PointMarker from "../../source/osh/ui/styler/osh-UI-StylerPointMarker.js";
import LeafletView from "../../source/osh/ui/view/map/osh-UI-LeafletView.js";

let replaySpeed = 2;

// create data source for Android phone GPS
let gpsDataSource = new Json("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:32Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: replaySpeed
});

// create data source for Android phone orientation
let attitudeDataSource = new Json("android-Att", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: replaySpeed
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
  orientationFunc : {
    dataSourceIds : [attitudeDataSource.getId()],
    handler : function(rec) {
      let qx = rec.orient.qx;
      let qy = rec.orient.qy;
      let qz = rec.orient.qz;
      let qw = rec.orient.q0;

      // look dir vector
      let x = 0;
      let y = 0;
      let z = -1;

      // compute quat * vector
      let ix =  qw * x + qy * z - qz * y;
      let iy =  qw * y + qz * x - qx * z;
      let iz =  qw * z + qx * y - qy * x;
      let iw = - qx * x - qy * y - qz * z;

      // compute result * inverse quat
      let xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
      let yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
      let zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

      let yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

      return {
        heading : yaw+70
      };
    }
  },
  icon: 'images/car-topview.png',
  iconAnchor: [16, 30]
});

// create Leaflet view
let leafletMapView = new LeafletView("leafletMap",
    [{
      styler: pointMarker,
      name: "Android Phone GPS"
    }]
);

// start streaming
attitudeDataSource.connect();
gpsDataSource.connect();
