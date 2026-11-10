import CesiumView from 'osh-js/source/core/ui/view/map/CesiumView.js';
import {
    Matrix3,
    Cartesian3,
    Cartesian2, Ion,
    EllipsoidTerrainProvider
} from "@cesium/engine";
import VideoView from 'osh-js/source/core/ui/view/video/VideoView.js';
import ImageDrapingLayer from 'osh-js/source/core/ui/layer/ImageDrapingLayer.js';
import PointMarkerLayer from 'osh-js/source/core/ui/layer/PointMarkerLayer.js';
import VideoDataLayer from "osh-js/source/core/ui/layer/VideoDataLayer";
import DataSynchronizer from "osh-js/source/core/timesync/DataSynchronizer";
import {Mode} from 'osh-js/source/core/datasource/Mode';
import ConSysApi from 'osh-js/source/core/datasource/consysapi/ConSysApi.datasource';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const startTime = '2026-11-10T18:32:58.000Z';
const endTime = '2026-11-10T18:43:22.675Z';
const REPLAY_SPEED = 1.0;

let videoDataSource = new ConSysApi("drone-Video", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2012-06-29T14:32:34.099333251Z',
    endTime: '2012-06-29T14:36:54.033333251Z',
    minTime: '2012-06-29T14:32:34.099333251Z',
    maxTime: '2055-06-29T14:36:54.033333251Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/8ni90dbu4uf0g/observations',
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
    useWebCodecApi: false,
    layers: [
        new VideoDataLayer({
            dataSourceId: videoDataSource.id,
            getFrameData: (rec) => rec.videoFrame,
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
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
});

let platformOrientationDataSource = new ConSysApi('drone-Heading', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/h75dmug8e3sae/observations',
    responseFormat: 'application/swe+json',
});

let gimbalOrientationDataSource = new ConSysApi('android-Heading', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: startTime,
    endTime: endTime,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/t2fedgd9i3m16/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
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
    startTime: '2015-12-19T21:04:29.231Z',
    endTime: '2015-12-19T21:09:19.675Z',
    dataSources: [
        videoDataSource,
        platformLocationDataSource,
        platformOrientationDataSource,
        gimbalOrientationDataSource
    ]
});
dataSynchronizer.connect();

