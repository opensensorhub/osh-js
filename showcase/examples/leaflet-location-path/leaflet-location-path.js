// create data source for Android phone GPS

import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "../../../source/core/timesync/DataSynchronizer";
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

// #endregion snippet_leaflet_location_import
const REPLAY_SPEED = 1.0;

// #region snippet_leaflet_location_datasource
let gpsDataSource =  new ConSysApi('android-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12.031Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/frmhs11ofiilm/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    dataSources: [gpsDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    icon: './images/car-location.png',
    iconSize: [32,64],
    iconAnchor: [16, 56],
    name: "Android Phone GPS"
});

// #region snippet_leaflet_location_polyline
// also create a polyline with the last 200 points of the track
let polyline = new PolylineLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    color: 'rgba(0,0,255,0.5)',
    weight: 10,
    opacity: 0.5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Android Phone GPS Path"
});

// #endregion snippet_leaflet_location_polyline

// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarker, polyline],
    autoZoomOnFirstMarker:true
});

// start streaming
dataSynchronizer.connect();
