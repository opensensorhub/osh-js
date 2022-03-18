import SosGetResultJson from 'osh-js/core/datasource/sos/SosGetResultJson.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider, Ion} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import EllipseLayer from "osh-js/core/ui/layer/EllipseLayer";

Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ODY0NTkzNS02NzI0LTQwNDktODk4Zi0zZDJjOWI2NTdmYTMiLCJpZCI6MTA1N' +
    'zQsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NTY4NzI1ODJ9.IbAajOLYnsoyKy1BOd7fY1p6GH-wwNVMdMduA2IzGjA';
window.CESIUM_BASE_URL = './';

// create data source for Android phone GPS
let gpsDataSource = new SosGetResultJson('android-GPS', {
    protocol: 'ws',
    service: 'SOS',
    endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
    offeringID: 'urn:android:device:060693280a28e015-sos',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: '2015-02-16T07:58:30Z',
    endTime: '2015-02-16T08:09:00Z',
    replaySpeed: 10
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: 0
    }),
    orientation: {
        heading: 0
    },
    labelOffset: [0, 30],
    labelColor: '#ffffff',
    labelSize: 12,
    label: 'GPS car',
    icon: 'images/car-location.png',
    iconAnchor: [16, 40],
    description: 'Car',
    getDescription: (d) => `Alt: ${d.location.alt}`,
    zIndex: 2
});

// also create a polyline with the last 200 points of the track
let polyline = new PolylineLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    clampToGround: true,
    color: 'rgba(0,0,255,0.5)',
    weight: 10,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Android Phone GPS Path",
    zIndex: 0
});

let ellipse = new EllipseLayer({
    dataSourceId: gpsDataSource.id,
    getPosition: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    color: 'rgba(255,74,22, 0.5)',
    semiMinorAxis: 100,
    semiMajorAxis: 200,
    name: "Android Phone GPS Path",
    zIndex: 1
});

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker, polyline, ellipse],
    autoZoomOnFirstMarker: true,
    cesiumProps: {
        viewerProps: {
            targetFrameRate:10
        }
    }
});

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
gpsDataSource.connect();