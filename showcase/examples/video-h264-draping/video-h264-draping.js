import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {
    EllipsoidTerrainProvider,
    Matrix3,
    Cartesian3,
    Cartesian2, Ion
} from "cesium";
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import ImageDrapingLayer from 'osh-js/core/ui/layer/ImageDrapingLayer.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from 'osh-js/core/datasource/Mode';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

let videoDataSource = new SosGetResult("drone-Video", {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:mysos:solo:video2',
    observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    mode: Mode.REPLAY,
    tls: true
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: 'video-h264-draping-container',
    css: "video-h264",
    name: "UAV Video",
    framerate:25,
    showTime: true,
    showStats: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.videoFrame,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// create data source for Android phone GPS
let platformLocationDataSource = new SosGetResult('android-GPS', {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:mysos:solo:nav2',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    mode: Mode.REPLAY,
    tls: true
});

let platformOrientationDataSource = new SosGetResult('android-Heading', {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:mysos:solo:nav2',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    mode: Mode.REPLAY,
    tls: true
});

let gimbalOrientationDataSource = new SosGetResult('android-Heading', {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:mysos:solo:nav2',
    observedProperty: 'http://sensorml.com/ont/swe/property/OSH/0/GimbalOrientation',
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    mode: Mode.REPLAY,
    tls: true
});

// add 3D model marker to Cesium view
let pointMarkerLayer = new PointMarkerLayer({
    dataSourceIds: [platformLocationDataSource.id, platformOrientationDataSource.id],
    label: "3DR Solo",
    getLocation : {
        dataSourceIds : [platformLocationDataSource.getId()],
        handler : function(rec) {
            return {
                x : rec.loc.lon,
                y : rec.loc.lat,
                z : rec.loc.alt - 184 // model offset
            };
        }
    },
    getOrientation : {
        dataSourceIds : [platformOrientationDataSource.getId()],
        handler : function(rec) {
            return {
                heading : rec.attitude.yaw
            };
        }
    },
    icon: "./models/Drone+06B.glb",
    name: 'Solo draping marker'
});

// #region snippet_image_draping_layer
// style it with an image draping
let canvas;

let imageDrapingLayer = new ImageDrapingLayer({
    getPlatformLocation: {
        dataSourceIds: [platformLocationDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.loc.lon,
                y: rec.loc.lat,
                z: rec.loc.alt - 184
            };
        }
    },
    getPlatformOrientation: {
        dataSourceIds: [platformOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    getGimbalOrientation: {
        dataSourceIds: [gimbalOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    cameraModel: {
        camProj: new Matrix3(747.963/1280.,     0.0,       650.66/1280.,
          0.0,        769.576/738.,  373.206/738.,
          0.0,            0.0,          1.0),
        camDistR: new Cartesian3(-2.644e-01, 8.4e-02, 0.0),
        camDistT: new Cartesian2(-8.688e-04, 6.123e-04)
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40],
    dataSourceId: videoDataSource.id, // define canvas refresh rate
    getImageSrc: async () => videoView.getVideoCanvas(),
    name: 'Solo draping'
});

videoView.getVideoCanvas().then(canvasElt => {
    canvas = canvasElt;
});

// #endregion snippet_image_draping_layer

// create Cesium view
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjczNTA4NS1jNjBhLTQ3OGUtYTQz' +
    'Ni01ZjcxOTNiYzFjZGQiLCJpZCI6MzIzODMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTY4OTU3MjB9.hT6fWdvIqu4GIHR7' +
    '2WfIX0QHiZcOjVaXI92stjDh4fI';

let cesiumView = new CesiumView({
    container: 'cesium-h264-draping-container',
    layers: [pointMarkerLayer, imageDrapingLayer]
});

cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
cesiumView.viewer.scene.logarithmicDepthBuffer = false;
cesiumView.viewer.camera.setView({
    destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
});

// select bing maps as default imagery
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
// baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    dataSources: [
        videoDataSource,
        platformLocationDataSource,
        platformOrientationDataSource,
        gimbalOrientationDataSource
    ]
});
dataSynchronizer.connect()

