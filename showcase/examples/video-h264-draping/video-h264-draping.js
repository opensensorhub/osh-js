import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {
    Matrix3,
    Cartesian3,
    Cartesian2, Ion,
    EllipsoidTerrainProvider
} from "@cesium/engine";
import VideoView from 'osh-js/core/ui/view/video/VideoView.js';
import ImageDrapingLayer from 'osh-js/core/ui/layer/ImageDrapingLayer.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";
import {Mode} from 'osh-js/core/datasource/Mode';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const startTime = '2023-06-06T14:33:34Z';
const endTime = '2023-06-06T22:22:50Z';
const REPLAY_SPEED = 1.0;

let videoDataSource = new ConSysApi("drone-Video", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    minTime: startTime,
    maxTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/19katg6mleqtc/observations',
    responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: 'video-h264-draping-container',
    css: "video-h264",
    name: "UAV Video",
    framerate:25,
    showTime: true,
    showStats: true,
    useWebCodecApi: true,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// create data source for Android phone GPS
let platformLocationDataSource = new ConSysApi('drone-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/kq89s7j4afths/observations',
    responseFormat: 'application/swe+json',
});

let platformOrientationDataSource = new ConSysApi('platform-orientation', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/gr2v8duogtt8i/observations',
    responseFormat: 'application/swe+json',
});

let sensorOrientationDatasource = new ConSysApi('sensor-orientation', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/h75dmug8e3sae/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

// add 3D model marker to Cesium view
let pointMarkerLayer = new PointMarkerLayer({
    dataSourceIds: [platformLocationDataSource.id, platformOrientationDataSource.id],
    label: "dji drone",
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
                heading : rec.attitude.heading
            };
        }
    },
    icon: "./models/predator2.glb",
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
                heading : rec.attitude.heading,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    getGimbalOrientation: {
        dataSourceIds: [sensorOrientationDatasource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    cameraModel: {
        camProj: new Matrix3(747.963/1280.0, 0.0, 650.66/1280.0,
          0.0,769.576/738,373.206/738.0,
          0.0,0.0,1.0),
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

let cesiumView = new CesiumView({
    container: 'cesium-h264-draping-container',
    layers: [pointMarkerLayer, imageDrapingLayer],
    options: {
        layers: ['Bing Maps Aerial', 'Bing Maps Aerial with Labels', 'Bing Maps Roads']
    },
});

cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
cesiumView.viewer.scene.logarithmicDepthBuffer = false;
cesiumView.viewer.camera.setView({
    destination : Cartesian3.fromDegrees(-86.5812,34.6904,1000)
});

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: startTime,
    endTime: endTime,
    dataSources: [
        videoDataSource,
        platformLocationDataSource,
        platformOrientationDataSource,
        sensorOrientationDatasource
    ]
});
dataSynchronizer.connect();

