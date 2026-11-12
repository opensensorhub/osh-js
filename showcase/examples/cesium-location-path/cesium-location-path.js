import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion, Cartesian3} from '@cesium/engine';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import EllipseLayer from "osh-js/core/ui/layer/EllipseLayer";
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;
// create data source for Sat
let gpsDataSource =  new ConSysApi('sat-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2026-10-15T08:42:16.816Z',
    endTime: '2026-10-15T08:43:28.826Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/ceuaig4rlf746/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: '2026-10-15T08:42:16.816Z',
    endTime: '2026-02-27T23:01:34Z',
    dataSources: [gpsDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: {
        dataSourceIds : [gpsDataSource.getId()],
        handler: (rec) => ({
            x: rec.pos.x,
            y: rec.pos.y,
            z: -(rec.pos.z) //this ex ds is neg
        })
    },
    orientation: {
        heading: 0
    },
    labelOffset: [0, 30],
    labelColor: '#ffffff',
    labelSize: 12,
    label: 'GPS car',
    icon: 'images/marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    getIconColor: (rec) => (Math.random() < 0.5) ?  'rgba(255,0,0,0.5)' : 'rgba(0,82,255,0.5)',
    iconColor: 'rgba(117,250,40,0.5)',
    description: 'Car',
    getDescription: (d) => `Alt: ${d.pos.alt}`,
    zIndex: 2
});

// also create a polyline with the last 200 points of the track
let polyline = new PolylineLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.pos.x,
        y: rec.pos.y,
        z: rec.pos.z
    }),
    clampToGround: true,
    color: 'rgba(0,0,255,0.5)',
    weight: 10,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "GPS Path",
    zIndex: 0
});

let ellipse = new EllipseLayer({
    dataSourceId: gpsDataSource.id,
    getPosition: (rec) => ({
        x: rec.pos.x,
        y: rec.pos.y,
        z: rec.pos.z
    }),
    color: 'rgba(255,74,22, 0.5)',
    semiMinorAxis: 100,
    semiMajorAxis: 200,
    name: "GPS Path",
    zIndex: 1
});

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker, polyline/*, ellipse*/],
    autoZoomOnFirstMarker: true,
    cesiumProps: {
        viewerProps: {
            targetFrameRate:10
        }
    }
});


// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
dataSynchronizer.connect();
