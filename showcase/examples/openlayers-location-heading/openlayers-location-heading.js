// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';
import EllipseLayer from 'osh-js/core/ui/layer/EllipseLayer';
import {Mode} from "../../../source/core/datasource/Mode";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";

// create data source for Android phone GPS
let gpsDataSource = new SosGetResult("android-GPS", {
  endpointUrl: 'sensiasoft.net/sensorhub/sos',
  offeringID: 'urn:android:device:060693280a28e015-sos',
  observedProperty: 'http://sensorml.com/ont/swe/property/Location',
  startTime: '2015-02-16T07:58:15.447Z',
  endTime: '2015-02-16T08:09:00Z',
  mode: Mode.REPLAY,
  tls: true,
  timeShift: -16000
});

// create data source for Android phone orientation
let orientationDataSource = new SosGetResult("android-Att", {
  endpointUrl: "sensiasoft.net/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
  startTime: '2015-02-16T07:58:15.447Z',
  endTime: "2015-02-16T08:09:00Z",
  mode: Mode.REPLAY,
  tls: true,
  timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: 2,
  startTime: '2015-02-16T07:58:22.00Z',
  endTime: "2015-02-16T08:09:00Z",
  dataSources: [gpsDataSource, orientationDataSource]
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
  getOrientation : {
    dataSourceIds : [orientationDataSource.getId()],
    handler : (rec) => {
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
        heading : yaw-130
      };
    }
  },
  icon: 'images/car-location.png',
  iconAnchor: [16, 64],
  iconSize: [32, 64],
  name: "Android Phone GPS",
  zIndex: 10
});

let ellipse = new EllipseLayer({
  dataSourceId: gpsDataSource.id,
  getPosition: (rec) => ({
    x: rec.location.lon,
    y: rec.location.lat,
    z: rec.location.alt
  }),
  color: 'rgba(255,74,22, 0.5)',
  semiMinorAxis: 100,
  semiMajorAxis: 300,
  name: "Android Phone GPS Path",
  zIndex: 1
});


// #region snippet_ol_location_view
// create Cesium view
let olView = new OpenLayerView({
  container: 'ol-map',
  layers: [pointMarker, ellipse],
  autoZoomOnFirstMarker: true
});
// #endregion snippet_ol_location_view

// start streaming
dataSynchronizer.connect();
