// create data source for Android phone camera
import Video from "osh/datareceiver/Video.js";
import MjpegView from "osh/ui/view/video/MjpegView.js";
// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/styler/PointMarker.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import DataReceiverController from "osh/datareceiver/DataReceiverController.js";
import EventManager from "osh/events/EventManager.js";
import Entity from "osh/entity/Entity.js";

const REPLAY_FACTOR = 1.0;
const BUFFERING = 5000;

let videoDataSource = new Video("android-Video", {
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

let gpsDataSource = new SweJson("android-GPS", {
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

let gpsDataSourceNoSync = new SweJson("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:35Z",
    endTime: "2015-02-16T08:09:00Z",
    syncMasterTime: false,
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

const entity = new Entity("Android phone", [gpsDataSource, videoDataSource, gpsDataSourceNoSync]);
let dataProviderController = new DataReceiverController({
    replayFactor: REPLAY_FACTOR
});

// We can add a group of dataSources and set the options
dataProviderController.addEntity(entity);
// starts streaming
dataProviderController.connectAll();

let timeStampNoSyncElt = document.getElementById("gps-timestamp-left");
let timeStampSyncElt = document.getElementById("gps-timestamp-right");
//update timestamp after getting data
EventManager.observe(EventManager.EVENT.DATA + "-" + gpsDataSourceNoSync.getId(), (event) => {
  timeStampNoSyncElt.innerHTML = new Date(event.data.timeStamp).toISOString() + " > NoSync";
});

EventManager.observe(EventManager.EVENT.DATA + "-" + gpsDataSource.getId(), (event) => {
  timeStampSyncElt.innerHTML = new Date(event.data.timeStamp).toISOString() + " < Sync ";
});
