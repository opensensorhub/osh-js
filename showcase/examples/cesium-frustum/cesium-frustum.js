import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import FrustumLayer from "osh-js/core/ui/layer/FrustumLayer";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer";
import {Cartesian3, Ion} from "cesium";
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:37:44.033333251Z';

const tls = true;
const sosEndpoint = 'api.georobotix.io/ogc/t18/sos';
const dsReplaySpeed = 1.0;

const droneLocationDataSource = new SosGetResult('MISB UAS - Platform Location', {
    tls: tls,
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorLocation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    mode: Mode.REPLAY
});

const droneOrientationDataSource = new SosGetResult('MISB UAS - Platform Orientation', {
    tls: tls,
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    mode: Mode.REPLAY
});

const droneCameraOrientationDataSource = new SosGetResult('MISB UAS - Sensor Orientation', {
    tls: tls,
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorOrientation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    mode: Mode.REPLAY
});

const droneHFovDataSource = new SosGetResult('MISB UAS - Horizontal FoV', {
    tls: tls,
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://sensorml.com/ont/misb0601/property/HorizontalFov',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    mode: Mode.REPLAY
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
