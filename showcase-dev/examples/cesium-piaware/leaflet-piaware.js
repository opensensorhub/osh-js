import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import { EllipsoidTerrainProvider } from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import {EventType} from "../../../source/core/event/EventType";
import LeafletView from "../../../source/core/ui/view/map/LeafletView";

// create piAware data sources
let locationDataSource = new SosGetResult('piaware-location', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: '76.187.247.4:8686/sensorhub/sos',
    // endpointUrl: 'localhost:8181/sensorhub/sos',
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
    endpointUrl: '76.187.247.4:8686/sensorhub/sos',
    // endpointUrl: 'localhost:8181/sensorhub/sos',
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
    dataSourceIds: [locationDataSource.id, trackDataSource.id],
    getMarkerId: (rec) => rec.hexIdent,
    allowBillboardRotation: true,
    getLocation: {
        dataSourceIds: [locationDataSource.getId()],
        handler: function(rec, timestamp, options, instance) {
            console.log(rec.hexIdent + ' , ' + rec.location.lat + "," + rec.location.lon);
            instance.id = rec.hexIdent;
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
           };
        }
    },
    getOrientation: {
        dataSourceIds: [trackDataSource.getId()],
        handler: function(rec, timestamp, options, instance) {
            console.log(rec.hexIdent + ' , ' + rec.track);
            instance.id = rec.hexIdent;
            return {
                heading: 360 - rec.track
            };
        }
    },
    icon: 'images/icons8-airplane-64.png',
    iconAnchor: [16, 40]
});

// create Cesium view
let view = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarker]
});

// start streaming
 locationDataSource.connect();
 trackDataSource.connect();
