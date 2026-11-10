import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import FrustumLayer from "osh-js/core/ui/layer/FrustumLayer";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer";
import {Cartesian3, Ion} from "cesium";

import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:37:44.033333251Z';

const tls = true;
const apiEndpoint = 'api.georobotix.io/ogc/demo1/api';
const dsReplaySpeed = 1.0;

const droneLocationDataSource = new ConSysApi('MISB UAS - Platform Location', {
    endpointUrl:  'api.georobotix.io/ogc/demo1/api',
    tls: true,
    startTime: '2023-05-14T15:22:00Z ',
    endTime: '2025-03-24T20:28:56.820333496Z',
    minTime: '2023-05-14T15:22:00Z',
    maxTime: '2025-03-24T20:28:56.820333496Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
});

const droneOrientationDataSource = new ConSysApi('MISB UAS - Platform Orientation', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: '2023-05-14T15:22:00Z ',
    endTime: '2025-03-24T20:28:56.820333496Z',
    minTime: '2023-05-14T15:22:00Z',
    maxTime: '2025-03-24T20:28:56.820333496Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/swe+json',
});

const droneCameraOrientationDataSource = new ConSysApi('MISB UAS - Sensor Orientation', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: '2023-05-14T15:22:00Z ',
    endTime: '2025-03-24T20:28:56.820333496Z',
    minTime: '2023-05-14T15:22:00Z',
    maxTime: '2025-03-24T20:28:56.820333496Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/h75dmug8e3sae/observations',
    responseFormat: 'application/swe+json',
});

const droneHFovDataSource = new ConSysApi('MISB UAS - Horizontal FoV', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: '2023-05-14T15:22:00Z ',
    endTime: '2025-03-24T20:28:56.820333496Z',
    minTime: '2023-05-14T15:22:00Z',
    maxTime: '2025-03-24T20:28:56.820333496Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/nhcs9rp6713ka/observations',
    responseFormat: 'application/swe+json',
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: dsReplaySpeed,
    startTime: START_TIME,
    endTime: END_TIME,
    dataSources: [droneLocationDataSource, droneOrientationDataSource, droneCameraOrientationDataSource, droneHFovDataSource]
});

const altitudeOffset = -193;

const droneFrustumLayer = new FrustumLayer({
    getOrigin: {
        dataSourceIds: [droneLocationDataSource.getId()],
        handler: function(rec) {
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt + altitudeOffset
            };
        }
    },
    getFov: {
        dataSourceIds: [droneHFovDataSource.getId()],
        handler: function(rec) {
            return rec.params.hfov;
        }
    },
    getRange: {
        dataSourceIds: [droneLocationDataSource.getId()],
        handler: function(rec) {
            return rec.location.alt*5;
        }
    },
    getPlatformOrientation: {
        dataSourceIds: [droneOrientationDataSource.getId()],
        handler: function(rec) {
            return rec.attitude;
        }
    },
    getSensorOrientation: {
        dataSourceIds: [droneCameraOrientationDataSource.getId()],
        handler: function(rec) {
            return rec.attitude;
        }
    },
    color: 'rgba(234,252,255,0.35)',
    opacity: 0.5,
});

const droneMarkerLayer = new PointMarkerLayer({
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
    color: 'rgba(129,137,145,0.8)',
    icon: "./models/predator2.glb",
    iconScale: 0.1,
    opacity: 0.2
});

// create Cesium view
let cesiumView = new CesiumView({
    container: "cesium-container",
    layers: [
        droneMarkerLayer,
        droneFrustumLayer,
    ]
});

cesiumView.viewer.scene.globe.depthTestAgainstTerrain = true;
cesiumView.viewer.camera.setView({
    destination: new Cartesian3(305721.4585559864, -5239510.338378854, 3619622.5459225853),
    orientation: {
        heading: 3.3910351920692143,
        pitch: -0.35343571662519757,
        roll: 0.000021768997500615228
    }
});
cesiumView.first = false;

// select bing maps as default imagery
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];

// connects datasources
dataSynchronizer.connect();
