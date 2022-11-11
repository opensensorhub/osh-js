// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import LeafletView from 'osh-js/core/ui/view/map/LeafletView.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';

let gpsDataSource = new SosGetResult("android-GPS", {
    endpointUrl: "sensiasoft.net/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: '2015-02-16T07:58:15.447Z',
    endTime: "2015-02-16T08:09:00Z",
    mode: Mode.REPLAY,
    tls: true,
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    masterTimeRefreshRate: 250,
    replaySpeed: 5.0,
    startTime: '2015-02-16T07:58:22.00Z',
    endTime: "2015-02-16T08:09:00Z",
    dataSources: [
        gpsDataSource
    ]
});

function createPointMarker0() {
    return new PointMarkerLayer({
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
}

function createPointMarker1() {
    return new PointMarkerLayer({
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
}

function createPointMarker2() {
    return new PointMarkerLayer({
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
}

function createPolyline() {
    return new PolylineLayer({
        dataSourceId: gpsDataSource.id,
        getLocation: (rec) => ({
            x: rec.location.lon,
            y: rec.location.lat,
            z: rec.location.alt
        }),
        color: 'rgba(0,0,255,0.5)',
        weight: 5,
        opacity: .5,
        smoothFactor: 1,
        maxPoints: 200,
        name: "Android Phone GPS Path"
    });
}

new LeafletView({
    container: 'leafletMap',
    layers: [createPointMarker1(),createPointMarker0(),createPointMarker2(), createPolyline()],
    autoZoomOnFirstMarker:true
});

// create OL view
new OpenLayerView({
    container: 'olMap',
    layers: [createPointMarker1(),createPointMarker0(),createPointMarker2(),  createPolyline()],
    autoZoomOnFirstMarker:true
});

// create DeckGL view
new DeckGlView({
    container: 'deckMap',
    layers: [createPointMarker1(),createPointMarker0(),createPointMarker2(),  createPolyline()],
    autoZoomOnFirstMarker:true
});

// create Cesium view
window.CESIUM_BASE_URL = './';

new CesiumView({
    container: 'cesiumMap',
    layers: [createPointMarker1(),createPointMarker0(),createPointMarker2(),  createPolyline()],
    autoZoomOnFirstMarker:true
});

// start streaming
dataSynchronizer.connect()
