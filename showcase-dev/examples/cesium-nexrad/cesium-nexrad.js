import cesium, {
    Cartesian3, Ion, Color, ColorGeometryInstanceAttribute, HeightReference,
    GeometryInstance, GroundPrimitive, EllipseGeometry
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import NexradLayer from "./NexradLayer";
import NexradView from "./NexradView";
import NexradSites from "./NexradSites";
import './cesium-nexrad.css';


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

function createDataSource() {
    // return new SosGetResult('piaware-location', {
    return new SosGetResult('nexrad-data', {
        protocol: 'ws',
        service: 'SOS',
        // endpointUrl: '76.187.247.4:8282/sensorhub/sos',
        endpointUrl: 'localhost:8282/sensorhub/sos',
        offeringID: 'urn:osh:sensor:weather:nexrad',
        observedProperty: 'http://sensorml.com/ont/swe/propertyx/NexradRadial',
        mode: 'realTime', // default is REAL_TIME
        reconnectTimeout: 1000 * 144000,
        reconnectionInterval: 1000 * 720000,
        //responseFormat: 'application/json',  // binary throws exception parsing text field
        replaySpeed: 1
    })
}

// create  data source
let prevElevation;
let prevElevationNumber;
let nexradSource = createDataSource();

// sites
let nexradSites = new NexradSites();
console.log(nexradSites);
let siteId = 'KILX';

let nexradLayer = new NexradLayer({
    dataSourceIds: [nexradSource.id],
    getSiteId: (rec) => {
        return rec.siteId;
    },
    getElevationNumber: (rec) => {
        return rec.elevationNumber;
    },
    getLocation: (rec) => {  
        return {
            x: rec.location.lon,
            y: rec.location.lat,
            z: rec.location.alt
        };
    },
    getAzimuth: (rec) => {
        return rec.azimuth;
    },
    getElevation: (rec) => {
        // Check to see if radar has completed a sweep and changed elevation
        if(rec.elevationNumber != prevElevationNumber) {
            console.log('cesium-nexrad: ' + new Date(rec.timestamp).toISOString() + ', ' + 
                rec.siteId + ', ' + rec.elevationNumber + ', ' + rec.elevation + ', ' + rec.azimuth );
            prevElevation = rec.elevation;
            prevElevationNumber = rec.elevationNumber;
        }
        return rec.elevation;
    },
    getRangeToCenterOfFirstRefGate: (rec) => {
        return rec.rangeToCenterOfFirstRefGate;
    },
    getRefGateSize: (rec) => {
        return rec.refGateSize;
    },
    getReflectivity: (rec) => {
        return rec.Reflectivity;
    },
    getProductTime: (rec, timestamp) => {
        let isoTime =  new Date(rec.timestamp).toISOString(); // rec.timestamp == timestamp
        //console.log('cesium-nexrad.getProductTime: ' + isoTime + ', ' + timestamp);
        return isoTime;
    },
  
    allowBillboardRotation: true,
});

// create Cesium view
let cesiumView = new NexradView({
    container: 'cesium-container',
    options: {
        layers: ['Bing Maps Aerial', 'Bing Maps Aerial with Labels', 'Bing Maps Roads']
    },
    allowBillboardRotation: true,
    width: '50%',
    height: '50%',
    layers: [nexradLayer]
});

// Default to Bing Maps Roads
const baseLayerPickerViewModel = cesiumView.viewer.baseLayerPicker.viewModel;
baseLayerPickerViewModel.selectedImagery = baseLayerPickerViewModel.imageryProviderViewModels[2];

cesiumView.viewer.camera.setView({
    destination : Cartesian3.fromDegrees(-95.86789455,37.04455315,3750000)
});

//  TODO: Show radar location

//  Start WS connection to driver
console.log('Establishing connection to Nexrad OSH node...');
nexradSource.connect();

// 
let siteMenu = document.getElementById('sites');
siteMenu.onchange = (event) => {
    cesiumView.setActiveSite(event.target.value);
}

let elevationMenu = document.getElementById('elevations');
elevations.onchange = (event) => {
    cesiumView.setElevationNumber(event.target.value);
}

// cesiumView.viewer.camera.flyTo({
//     destination : Cartesian3.fromDegrees(radarLocation.x, radarLocation.y, radarLocation.z),
//     duration : 1.0
// });