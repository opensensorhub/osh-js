//@ sourceURL=leaflet-location.html.js

// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';

let replaySpeed = 2;

// create data source for Android phone GPS
let gpsDataSource = new SosGetResultJson("android-GPS", {
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
let attitudeDataSource = new SosGetResultJson("android-Att", {
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
let pointMarker = new PointMarkerLayer({
  name: "Android Phone GPS",
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
  getOrientation : {
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
  iconSize: [16,32],
  iconAnchor: [16, 30]
});

// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarker],
    autoZoomOnFirstMarker:true
});

// start streaming
attitudeDataSource.connect();
gpsDataSource.connect();
