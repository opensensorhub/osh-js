import cesium, {
    Cartesian3, Color, ColorGeometryInstanceAttribute, HeightReference, Ion, GeometryInstance, GroundPrimitive, EllipseGeometry
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import NexradLayer from "./NexradLayer";
import Mode from 'osh-js/core/datasource/Mode';
import NexradView from "./NexradView";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

function createDataSource() {
    // return new SosGetResult('piaware-location', {
    return new SosGetResult('nexrad-data', {
        protocol: 'ws',
        service: 'SOS',
        endpointUrl: 'localhost:8282/sensorhub/sos',
        offeringID: 'urn:osh:sensor:weather:nexrad',
        observedProperty: 'http://sensorml.com/ont/swe/propertyx/NexradRadial',
        mode: 'realTime', // default is REAL_TIME
        responseFormat: 'application/json',
        replaySpeed: 1
    })
}

// create  data source
let nexradSource = createDataSource();

let nexradLayer = new NexradLayer({
    dataSourceIds: [nexradSource.id],
    // getMarkerId: (rec) =>  {
    //     aircrafts.set(rec.hexIdent, rec.timestamp);
    //     return rec.hexIdent;
    // },
    // getLabel: (rec) => rec.flightId != null ? rec.flightId : rec.hexIdent,
    // labelSize: 22,
    allowBillboardRotation: true,
    // getLocation: {
    //     dataSourceIds: [locationDataSource.getId()],
    //     handler: function(rec, timestamp, options, instance) {
    //         return {
    //             x: rec.location.lon,
    //             y: rec.location.lat,
    //             z: rec.location.alt
    //         };
    //     }
    // }
});

// create Cesium view
let cesiumView = new NexradView({
    container: 'cesium-container',
    allowBillboardRotation: true,
    // sceneMode : SceneMode.SCENE2D,
    // scene3DOnly: false,
    // autoZoomOnFirstMarker: false,
    layers: [nexradLayer]
});

//cesiumView.viewer.camera.lookAt(Cartesian3.fromDegrees(-97.6664, 30.1975), new Cartesian3(0.0, 0.0, 2//00.0));
console.log('connecting to datasources');

// start streaming
nexradSource.connect();
