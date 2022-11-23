import {
    Ion,
    Cartesian3,
    Color,
    HeightReference,
    HorizontalOrigin,
} from 'cesium';
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import { EllipsoidTerrainProvider } from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

// create piAware data sources
let locationDataSource = new SosGetResult('piaware-location', {
    protocol: 'ws',
    service: 'SOS',
    // endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    endpointUrl: 'localhost:8181/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:PiAware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: 'now',
    endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

let trackDataSource = new SosGetResult('piaware-track', {
    protocol: 'ws',
    service: 'SOS',
    // endpointUrl: '76.187.247.4:8181/sensorhub/sos',
    endpointUrl: 'localhost:8181/sensorhub/sos',
    offeringID: 'urn:osh:sensor:aviation:PiAware',
    observedProperty: 'http://sensorml.com/ont/swe/property/Track',
    startTime: 'now',
    endTime: '2022-12-31T00:00:00Z',
    responseFormat: 'application/json',
    replaySpeed: 1
});

function hover(markerId, billboard, event) {
    console.log(markerId + ',' + billboard + ',' + event);
}

// style it with a moving point marker
const locs = new Map();
const headings = new Map();
const planes = new Map();
// const flights = new Map();
let pointMarker = new PointMarkerLayer({
    dataSourceId: locationDataSource.id,
    getMarkerId: (rec) => rec.hexIdent,
    allowBillboardRotation: true,
    onHover: (markerId, billboard, event) => hover(markerId, billboard, event) ,
    getLocation: {
        dataSourceIds: [locationDataSource.getId()],
        handler: function(rec) {
            console.log(rec.hexIdent + ' , ' + rec.location.lat + "," + rec.location.lon);
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
           };
        }
    },
    getOrientation: {
        dataSourceIds: [trackDataSource.getId()],
        handler: function(rec) {
            console.log(rec.hexIdent + ' , ' + rec.track);

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

// ABIA Airport icon
cesiumView.viewer.entities.add({
    position: Cartesian3.fromDegrees(-97.6664, 30.1975),
    billboard: {
      image: "images/icons8-airport-50.png",
      heightReference: HeightReference.CLAMP_TO_GROUND,
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    },
  });


console.log('connecting to datasources');

// start streaming
 locationDataSource.connect();
 trackDataSource.connect();