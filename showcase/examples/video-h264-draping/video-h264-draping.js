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
const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:36:54.033333251Z';

const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
const MAX_TIME = '2055-06-29T14:36:54.033333251Z';

const REPLAY_SPEED = 1.0;
const altitudeOffset = -193;
const DTR = Math.PI / 180;

const commonDatasourceOpts = {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    protocol: 'mqtt',
    mqttOpts: {
        shared: true,
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: MIN_TIME,
    maxTime: MAX_TIME,
    mode: Mode.REAL_TIME,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
}
let droneVideoSource = new ConSysApi("MISB Drone - Video", {
    ...commonDatasourceOpts,
    resource: '/datastreams/h225hesual08g/observations',
    responseFormat: 'application/swe+binary',
});

let droneLocationDataSource = new ConSysApi('MISB UAS - Platform Location', {
   ...commonDatasourceOpts,
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
});

let droneOrientationDataSource = new ConSysApi('MISB UAS - Platform Attitude', {
   ...commonDatasourceOpts,
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/swe+json',
});

let droneCameraOrientationDataSource = new ConSysApi('MISB UAS - Gimbal Attitude', {
   ...commonDatasourceOpts,
    resource: '/datastreams/h75dmug8e3sae/observations',
    responseFormat: 'application/swe+binary',
});

const droneHFovDataSource = new ConSysApi('MISB UAS - Horizontal FoV', {
    ...commonDatasourceOpts,
    resource: '/datastreams/nhcs9rp6713ka/observations',
    responseFormat: 'application/swe+binary',
});

// show it in video view using FFMPEG JS decoder
let videoView = new VideoView({
    container: "video-container",
    css: "video-h264",
    name: "UAV Video",
    framerate:30,
    showTime: true,
    showStats: true,
    useWebCodecApi:false,
    layers: [
        new VideoDataLayer({
            dataSourceId: droneVideoSource.id,
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
        })
    ]
});

// add 3D model marker to Cesium view
let pointMarkerLayer = new PointMarkerLayer({
    label: "MISB UAS",
    labelColor: "#FFFFFF",
    labelOffset: [0, -20],
    getLocation : {
        dataSourceIds : [droneLocationDataSource.id],
        handler : function(rec) {
            const pos = {
                x : rec.location.lon,
                y : rec.location.lat,
                z : rec.location.alt + altitudeOffset
            };

            return pos;
        }
    },
    getOrientation : {
        dataSourceIds : [droneOrientationDataSource.getId()],
        handler : function(rec) {
            return {
                heading : rec.attitude.heading + 180 // model is reversed
            };
        }
    },
    icon: "./models/predator2.glb",
    iconScale: 0.1
});

// #region snippet_image_draping_layer
// style it with an image draping


let imageDrapingLayer = new ImageDrapingLayer({
    getPlatformLocation: {
        dataSourceIds: [droneLocationDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt + altitudeOffset
            };
        }
    },
    getPlatformOrientation: {
        dataSourceIds: [droneOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.heading,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    getGimbalOrientation: {
        dataSourceIds: [droneCameraOrientationDataSource.getId()],
        handler: function (rec) {
            return {
                heading : rec.attitude.yaw,
                pitch: rec.attitude.pitch,
                roll: rec.attitude.roll
            };
        }
    },
    getCameraModel: {
        dataSourceIds: [droneHFovDataSource.getId()],
        handler: function (rec) {
            let fx = 1. / (2. * Math.tan(rec.params.hfov * DTR / 2));
            let fy = fx * 640. / 480.;
            return {
                camProj: new Matrix3(
                    fx, 0.0, 0.5,
                    0.0,  fy, 0.5,
                    0.0, 0.0, 1.0),
                camDistR: new Cartesian3(0,0,0),
                camDistT: new Cartesian2(0,0)
            };
        }
    },
    cameraModel: {
        camProj: new Matrix3(
            1.0, 0.0, 0.5,
            0.0, 1.0, 0.5,
            0.0, 0.0, 1.0),
        camDistR: new Cartesian3(0,0,0),
        camDistT: new Cartesian2(0,0)
    },
    dataSourceId: droneLocationDataSource.id, // TODO: should not associated a datasource to get it working
    getImageSrc: async () => videoView.getVideoCanvas()
});

// #endregion snippet_image_draping_layer

let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarkerLayer, imageDrapingLayer],
});

cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();
cesiumView.viewer.camera.setView({
    destination: new Cartesian3(305721.4585559864, -5239510.338378854, 3615622.5459225853),
    orientation: {
        heading: 3.3910351920692143,
        pitch: -0.35343571662519757,
        roll: 0.000021768997500615228
    }
});
cesiumView.first = false;

// start streaming
const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REAL_TIME,
    dataSources: [
        droneLocationDataSource,
        droneVideoSource,
        droneOrientationDataSource,
        droneCameraOrientationDataSource,
        droneHFovDataSource
    ]
});
dataSynchronizer.connect();

