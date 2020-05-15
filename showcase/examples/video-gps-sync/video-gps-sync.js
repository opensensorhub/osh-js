// create data source for Android phone camera
import VideoMjpeg from "osh/datareceiver/VideoMjpeg.js";
import MjpegView from "osh/ui/view/video/MjpegView.js";
// create data source for Android phone GPS
import SweJsonDataSource from "../../../source/osh/datareceiver/SweJsonDataSource.js";
import PointMarker from "../../../source/osh/ui/styler/PointMarker.js";
import LeafletView from "../../../source/osh/ui/view/map/LeafletView.js";
import {randomUUID} from "../../../source/osh/utils/Utils";
import DataReceiverController from "../../../source/osh/datareceiver/DataReceiverController";

const REPLAY_FACTOR = 1.0;
const BUFFERING = 5000;

let videoDataSource = new VideoMjpeg("android-Video", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  syncMasterTime: true,
  bufferingTime: BUFFERING,
  replaySpeed: REPLAY_FACTOR
});

let gpsDataSource = new SweJsonDataSource("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  syncMasterTime: true,
  timeShift: -16000,
  bufferingTime: BUFFERING,
  replaySpeed: REPLAY_FACTOR
});

let gpsDataSourceNoSync = new SweJsonDataSource("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:35Z",
  endTime: "2015-02-16T08:09:00Z",
  syncMasterTime: true,
  timeShift: -16000,
  bufferingTime: BUFFERING,
  replaySpeed: REPLAY_FACTOR
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

let pointMarkerNoSync = new PointMarker({
  locationFunc: {
    dataSourceIds: [gpsDataSourceNoSync.getId()],
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
let leafletMapView = new LeafletView("leafletMapLeft",
    [{
      styler: pointMarker,
      name: "Android Phone GPS"
    }],
    {
      watch: true,
      autoZoomOnFirstMarker: true
    }
);

// create Leaflet view
let leafletMapNoSyncView = new LeafletView("leafletMapRight",
    [{
      styler: pointMarkerNoSync,
      name: "Android Phone GPS"
    }],
    {
      watch: true,
      autoZoomOnFirstMarker: true
    }
);

// show it in video view
let videoView = new MjpegView("video-container", {
  dataSourceId: videoDataSource.id,
  css: "video-mjpeg",
  name: "Android Video",
  keepRatio: true,
  showTime: true
});

let androidEntity = {
  id : "entity-"+randomUUID(),
  name: "Android Phone",
  dataSources: [gpsDataSource, videoDataSource,gpsDataSourceNoSync]
};

let dataProviderController = new DataReceiverController({
  replayFactor : REPLAY_FACTOR
});

// We can add a group of dataSources and set the options
dataProviderController.addEntity(androidEntity);
// starts streaming
dataProviderController.connectAll();

//update timestamp after getting data
