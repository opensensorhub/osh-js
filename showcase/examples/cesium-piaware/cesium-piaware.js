import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {
    Cartesian3,
    Ion
} from 'cesium';
// import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import { EllipsoidTerrainProvider } from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';


Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

// create piAware dataSIyrce
let gpsDataSource = new SosGetResult('piaware-GPS', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:PiAware',
    // observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    observedProperty: 'http://sensorml.com/ont/swe/property/sbsOutput',
    startTime: 'now',
    endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

// style it with a moving point marker
const locs = new Map();
const headings = new Map();
// const flights = new Map();
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getMarkerId: (rec) => rec['hexIdent'],
    allowBillboardRotation: true,
    getLocation: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function(rec) {
            if(isNaN(rec.location.lon)) {
                if(!locs.get(rec.hexIdent))
                    return undefined;
                let loc = locs.get(rec.hexIdent);         
                return {
                    x: loc[0],
                    y: loc[1],
                    z: loc[2]
                }
            }
            let loc = [rec.location.lon, rec.location.lat, rec.location.alt];
            if(!locs.get(rec.hexIdent)) {
                console.log('locs size is ' + (locs.size + 1));
            }
            locs.set(rec['hexIdent'], loc);
            return {
                 x: rec.location.lon,
                 y: rec.location.lat,
                 z: rec.location.alt
            };
        }
    },
    getOrientation: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function(rec) {
            if (isNaN(rec.track)) {
                if(!headings.get(rec.hexIdent)) {
                    return undefined;
                }
                return headings.get(rec.hexIdent);
            }
            if(!headings.get(rec.hexIdent)) {
                console.log('headings size is ' + (headings.size + 1));
            }
            headings.set(rec.hexIdent, rec.track);
            return {
                heading: 360 - rec.track
            };
        } 
    },
    icon: 'images/icons8-airplane-64.png',
    iconAnchor: [16, 40]
});

// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    allowBillboardRotation: true,
    layers: [pointMarker]
});

cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

//create Leaflet view
// let leafletMapView = new LeafletView({
//     container: 'leafletMap',
//     layers: [pointMarker],
//     autoZoomOnFirstMarker: true
// });


console.log('connecting to datasource');

// start streaming
gpsDataSource.connect();