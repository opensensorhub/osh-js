import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion, Cartesian3} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import {EventType} from 'osh-js/core/event/EventType';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';

const REPLAY_SPEED = 1.0;

// create data sources
let satellite7DataSource =  new ConSysApi('SPOT-7 Satellite - Platform Location', {
    endpointUrl: 'api.georobotix.io/ogc/demo1/api',
    resource: '/datastreams/9hlba9dv4t9ig/observations',
    responseFormat: 'application/om+json',
    tls: true,
    protocol: 'ws',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/demo1'
    },
    mode : Mode.REAL_TIME
});
console.log('satellite data source created:', satellite7DataSource);

satellite7DataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: satellite7DataSource.id,
    getLocation: (rec) => ({
        x: rec.result.pos.x,
        y: rec.result.pos.y,
        z: rec.result.pos.z
    }),
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
    iconScale:20,
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

// start streaming
satellite7DataSource.connect();