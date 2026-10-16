import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion, Cartesian3} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data sources
let satelliteDataSource =  new ConSysApi('SPOT-6 Satellite - Platform Location', {
  endpointUrl:  'api.georobotix.io/ogc/demo1/api/',
  tls: true,
  startTime: '2026-02-27T22:51:35.313Z',
  endTime: '2026-02-27T23:01:34Z',
  minTime: '2026-02-27T22:51:35.313Z',
  maxTime: '2026-02-27T23:01:34Z',
  mode: Mode.REPLAY,
  replaySpeed: REPLAY_SPEED,
  prefetchBatchDuration: 10000,
  prefetchBatchSize: 250,
  resource: '/datastreams/28ksb4qmubgfs/observations',
  responseFormat: 'application/swe+json',
  timeShift: -16000
});
console.log('satellite data source created:', satelliteDataSource);

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    dataSources: [satelliteDataSource]
});

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: satelliteDataSource.id,
    getLocation: (rec) => ({
        x: rec.pos.x,
        y: rec.pos.y,
        z: rec.pos.z
    }),
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
    allowBillboardRotation: false
});
console.log('point marker created');

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker]
});
console.log('cesium view done');

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

//cesiumView.viewer.camera.flyTo({
//    destination: Cartesian3.fromDegrees(34.707626376630564, -86.65334130015846, 3047.812619211108)
//});

// start streaming
dataSynchronizer.connect();
