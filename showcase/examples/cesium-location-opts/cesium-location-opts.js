
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from '@cesium/engine';
import {Viewer} from '@cesium/widgets';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data source for Android phone GPS
let gpsDataSource =  new ConSysApi('droid-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-06-06T14:26:12.313Z',
    endTime: ' 2023-06-06T22:23:47.34Z',
    minTime: '2023-06-06T14:26:12.313Z',
    maxTime: ' 2023-06-06T22:23:47.34Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/frmhs11ofiilm/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    startTime: '2023-06-06T14:26:12.313Z',
    endTime: '2023-06-06T22:23:47.34Z',
    dataSources: [gpsDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    getLocation: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat
        })
    },
    orientation: {
        heading: 0
    },
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
});

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker],
    options: {
        // can provide either viewer custom properties or full Viewer object
        viewerProps: {
            geocoder: false,
            fullscreenButton: true,
            navigationHelpButton: true,
            homeButton: true
        },
        viewer: new Viewer('cesium-container', {
            baseLayerPicker: true,
            timeline: false,
            homeButton: false,
            navigationInstructionsInitiallyVisible: false,
            navigationHelpButton: false,
            geocoder: true,
            fullscreenButton: false,
            showRenderLoopErrors: true,
            animation: false,
            scene3DOnly: true, // for draw layer
        }),
        location: {
            longitude: -86.63313699088032,
            latitude: 34.71077144512363,
            altitude: 300
        },
        orientation: {
            heading: 150,
            pitch: -35
        },
        layers: ['Bing Maps Aerial', 'Bing Maps Aerial with Labels', 'Bing Maps Roads']
    }
});

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
dataSynchronizer.connect();
