import cesium, {
    Cartesian3, Color, ColorGeometryInstanceAttribute, HeightReference, Ion, GeometryInstance, GroundPrimitive, EllipseGeometry
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
//import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import NexradLayer from "./NexradLayer";
import NexradView from "./NexradView";
import NexradSites from "./NexradSites";


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
        //recoonectTimeout: 1000 * 4000,
        replaySpeed: 1
    })
}

// create  data source
let prevElevation;
let nexradSource = createDataSource();

// sites
let nexradSites = new NexradSites();
console.log(nexradSites);
let siteId = 'KUDX';

let nexradLayer = new NexradLayer({
    dataSourceIds: [nexradSource.id],
    getAzimuth: (rec) => {
        return rec.azimuth;
    },
    getElevation: (rec) => {
        // Check to see if radar has completed a sweep and changed elevation
        if(! (Math.abs(rec.elevation - prevElevation) < 0.3) ) {
            console.log('NexradLayer ts, el, az = ' + new Date(rec.timestamp).toISOString() + ', ' + rec.elevation + ', ' + rec.azimuth );
            prevElevation = rec.elevation;
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
    allowBillboardRotation: true,
    getLocation: (rec) => {  
        var location = nexradSites.getSiteLocation(siteId);
        return location;
    }
});

// create Cesium view
let cesiumView = new NexradView({
    container: 'cesium-container',
    allowBillboardRotation: true,
    layers: [nexradLayer]
});

console.log('connecting to datasources');

// start streaming
nexradSource.connect();

// cesiumView.viewer.camera.flyTo({
//     destination : Cartesian3.fromDegrees(radarLocation.x, radarLocation.y, radarLocation.z),
//     duration : 1.0
// });