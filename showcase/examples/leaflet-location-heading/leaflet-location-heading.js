//@ sourceURL=leaflet-location.html.js
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import {Mode} from "../../../source/core/datasource/Mode";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

// create data source for Android phone GPS
let gpsDataSource =  new ConSysApi('android-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: '2023-06-06T14:26:12Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/frmhs11ofiilm/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

// create data source for Android phone orientation
let attitudeDataSource =  new ConSysApi('android-Heading', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: '2023-06-06T14:26:12Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/t2fedgd9i3m16/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
  replaySpeed: 2,
    startTime: '2023-06-06T14:26:12Z',
    endTime: '2023-06-06T22:23:47Z',
  dataSources: [gpsDataSource, attitudeDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
  name: "Android Phone GPS",
  dataSourceIds: [gpsDataSource.id, attitudeDataSource.id],
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
dataSynchronizer.connect();
