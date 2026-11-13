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
const altitudeOffset = -193;
const DTR = Math.PI / 180;
const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:36:54.033333251Z';

const MIN_TIME = '2012-06-29T14:32:34.099333251Z';
const MAX_TIME = '2055-06-29T14:36:54.033333251Z';

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

const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 1.0,
    startTime: START_TIME,
    endTime: END_TIME,
    mode: Mode.REAL_TIME,
    dataSources: [
        droneLocationDataSource,
        droneOrientationDataSource,
        droneCameraOrientationDataSource,
        droneHFovDataSource
    ]
});


const droneFrustumLayer = new FrustumLayer({
    dataSourceId: droneLocationDataSource.id,
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
    getVisible: {
        dataSourceIds: [droneHFovDataSource.getId()],
        handler: function(rec) {
            return true;
        }
    },
    color: 'rgba(255,246,246,0.24)',
    opacity: 0.25,
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
    icon: "./models/predator2.glb",
    iconScale: 0.1
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
