// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';

let gpsDataSource = new SosGetResultJson("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:32Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 2
});

// style it with a moving point marker
let pointMarker0 = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    icon: './images/car-location0.png',
    iconSize: [32,64],
    iconAnchor: [16, 56],
    name: "Marker 0",
    zIndex: 0,
    label: '#0',
    labelOffset: [0, 5],
    labelColor: '#000000',
    labelSize: 12
});

// style it with a moving point marker
let pointMarker1 = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    label: '#1',
    icon: './images/car-location1.png',
    iconSize: [32,64],
    iconAnchor: [38, 55],
    name: "Marker 1",
    zIndex: 1,
    labelOffset: [-20, 5],
    labelColor: '#000000',
    labelSize: 12
});

// style it with a moving point marker
let pointMarker2 = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    icon: './images/car-location2.png',
    iconSize: [32,64],
    iconAnchor: [60, 55],
    name: "Marker 2",
    zIndex: 2,
    label: '#2',
    labelOffset: [-45, 5],
    labelColor: '#000000',
    labelSize: 12
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
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Android Phone GPS Path"
});

// #endregion snippet_leaflet_location_polyline

// create Leaflet view
new LeafletView({
    container: 'leafletMap',
    layers: [pointMarker1,pointMarker0,pointMarker2, polyline],
    autoZoomOnFirstMarker:true
});

// create OL view
new OpenLayerView({
    container: 'olMap',
    layers: [pointMarker1,pointMarker0,pointMarker2, polyline],
    autoZoomOnFirstMarker:true
});

// create DeckGL view
new DeckGlView({
    container: 'deckMap',
    layers: [pointMarker1,pointMarker0,pointMarker2, polyline],
    autoZoomOnFirstMarker:true
});

// create Cesium view
window.CESIUM_BASE_URL = './';

new CesiumView({
    container: 'cesiumMap',
    layers: [pointMarker1,pointMarker0,pointMarker2, polyline],
    autoZoomOnFirstMarker:true
});

// start streaming
gpsDataSource.connect();
