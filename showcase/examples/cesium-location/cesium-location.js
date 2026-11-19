
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource.js';
import {
    Cartesian3
} from '@cesium/engine';
import {EventType} from 'osh-js/core/event/EventType';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';

window.CESIUM_BASE_URL = './';


let uavDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Sensor Location', {
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/o7pce3e60s0ie/observations',
    responseFormat: 'application/om+json',
    tls: true,
    protocol: 'mqtt',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    mode : Mode.REAL_TIME
});

let attDataSource =  new ConSysApi('Predator UAV (MISB Simulated RT) - Platform Attitude', {
    endpointUrl: 'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/mlme3gtdfepvc/observations',
    responseFormat: 'application/om+json',
    tls: true,
    protocol: 'ws',
    mqttOpts: {
        prefix: '/api',
        endpointUrl: 'api.georobotix.io:443/ogc/t18'
    },
    mode : Mode.REAL_TIME
});

uavDataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

attDataSource.subscribe(msg => {
    //TODO: do something
}, [EventType.DATA]);

// style it with a point marker
let pointMarker = new PointMarkerLayer({
    getLocation: {dataSourceIds: [uavDataSource.getId()],
    handler: (rec) => ({
        x: rec.result.location.lon,
        y: rec.result.location.lat,
        z: rec.result.location.alt
    })},
    defaultToTerrainElevation: true,
    getOrientation: {
        dataSourceIds: [attDataSource.getId()],
        handler: (rec) => {
            return rec.result.attitude.heading - 90.0
        },
    },
    icon: 'images/marker-icon.png',
    iconAnchor: [16, 40],
    iconSize: [32, 65],
    allowBillboardRotation: false

});


// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker]
});

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
uavDataSource.connect();
attDataSource.connect();
