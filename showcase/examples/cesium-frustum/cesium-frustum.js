import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import FrustumLayer from "osh-js/core/ui/layer/FrustumLayer";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer";
import {Cartesian3, Ion} from "cesium";

window.CESIUM_BASE_URL = './';

const START_TIME = '2012-06-29T14:32:34.099333251Z';
const END_TIME = '2012-06-29T14:37:44.033333251Z';

const tls = true;
const sosEndpoint = 'ogct17.georobotix.io:8443/sensorhub/sos';
const dsReplaySpeed = 1.0;
const timeOut = 3000;
const bufferingTime = 800;

// Init cesium token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4MjczNTA4NS1jNjBhLTQ3OGUtYTQz' +
    'Ni01ZjcxOTNiYzFjZGQiLCJpZCI6MzIzODMsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTY4OTU3MjB9.hT6fWdvIqu4GIHR7' +
    '2WfIX0QHiZcOjVaXI92stjDh4fI';

const droneLocationDataSource = new SosGetResultJson('MISB UAS - Platform Location', {
    protocol: tls ? 'wss' : 'ws',
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorLocation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    timeOut: timeOut,
    bufferingTime: bufferingTime
});

const droneOrientationDataSource = new SosGetResultJson('MISB UAS - Platform Orientation', {
    protocol: tls ? 'wss' : 'ws',
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    timeOut: timeOut,
    bufferingTime: bufferingTime
});

const droneCameraOrientationDataSource = new SosGetResultJson('MISB UAS - Sensor Orientation', {
    protocol: tls ? 'wss' : 'ws',
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://www.opengis.net/def/property/OGC/0/SensorOrientation',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    timeOut: timeOut,
    bufferingTime: bufferingTime
});

const droneHFovDataSource = new SosGetResultJson('MISB UAS - Horizontal FoV', {
    protocol: tls ? 'wss' : 'ws',
    service: 'SOS',
    endpointUrl: sosEndpoint,
    offeringID: 'urn:osh:sensor:uas:predator001',
    observedProperty: 'http://sensorml.com/ont/misb0601/property/HorizontalFov',
    startTime: START_TIME,
    endTime: END_TIME,
    minTime: START_TIME,
    maxTime: END_TIME,
    replaySpeed: dsReplaySpeed,
    timeOut: timeOut,
    bufferingTime: bufferingTime
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
    color: 'rgba(234,252,255,0.35)',
    icon: "./models/predator2.glb",
    iconScale: 0.1
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
    destination: new Cartesian3(305721.4585559864, -5239510.338378854, 3615622.5459225853),
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
droneHFovDataSource.connect();
droneLocationDataSource.connect();
droneCameraOrientationDataSource.connect();
droneOrientationDataSource.connect();
