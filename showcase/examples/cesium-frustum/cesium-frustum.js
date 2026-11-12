import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import FrustumLayer from "osh-js/core/ui/layer/FrustumLayer";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer";
import {Cartesian3, Ion} from '@cesium/engine';

import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;
const START_TIME = '2026-11-12T19:53:59.395Z';
const END_TIME = '2026-11-12T19:57:54.030Z';

const apiEndpoint = 'api.georobotix.io/ogc/t18/api';

const droneLocationDataSource = new ConSysApi('MISB UAS - Sensor Location', {
    endpointUrl:  apiEndpoint,
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const droneOrientationDataSource = new ConSysApi('MISB UAS - Platform Orientation', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const droneCameraOrientationDataSource = new ConSysApi('MISB UAS - Sensor Orientation', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/h75dmug8e3sae/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const droneHFovDataSource = new ConSysApi('MISB UAS - Horizontal FoV', {
    endpointUrl: apiEndpoint,
    tls: true,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/nhcs9rp6713ka/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: START_TIME,
    endTime: END_TIME,
    dataSources: [droneLocationDataSource, droneOrientationDataSource, droneCameraOrientationDataSource, droneHFovDataSource]
});

const altitudeOffset = -193;


const droneFrustumLayer = new FrustumLayer({
    dataSourceId: droneLocationDataSource.id,
    getOrigin: {
        dataSourceIds: [droneLocationDataSource.getId()],
        handler: function(rec) {
            console.log('location rec:', JSON.stringify(rec));
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
    dataSourceId: droneLocationDataSource.id,
    getLocation : {
        dataSourceIds: [droneLocationDataSource.getId()],
        handler: function(rec) {
            console.log('rec:', rec);
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
            };
        }
    },
    getOrientation : {
        dataSourceIds : [droneOrientationDataSource.getId()],
        handler : function(rec) {
            return {
                heading : rec.attitude.heading + 180
            };
        }
    },
    color: 'rgba(129,137,145,0.8)',
    labelOffset: [0, 30],
    labelColor: '#ffffff',
    labelSize: 12,
    label: 'MISB UAV',
    icon: "./images/car-location.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    getIconColor: (rec) => (Math.random() < 0.5) ?  'rgba(255,0,0,0.5)' : 'rgba(0,82,255,0.5)',
    iconColor: 'rgba(117,250,40,0.5)',
    description: 'MISB UAV',
    getDescription: (d) => `Alt: ${d.pos.alt}`,
    zIndex: 2
});

// create Cesium view
let cesiumView = new CesiumView({
    container: "cesium-container",
    autoZoomOnFirstMarker: true,
    layers: [
        droneMarkerLayer,
        droneFrustumLayer,
    ],
    cesiumProps: {
        viewerProps: {
            targetFrameRate:10
        }
    }
});


// select bing maps as default imagery
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[0];

// connects datasources
dataSynchronizer.connect();
