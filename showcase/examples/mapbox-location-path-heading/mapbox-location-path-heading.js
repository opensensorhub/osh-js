// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import MapboxView from "osh-js/core/ui/view/map/MapboxView";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FrZXdhMzk0MCIsImEiOiJja2I4ZDZkdDAwMzc5MzFwazZubmFhNzVvIn0.i4O5Cls0aaVSVREIzK151w';

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
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
    }),
    icon: './images/car-location.png',
    iconSize: [32, 64],
    iconAnchor: [16, 56],
    name: "Android Phone GPS",
    zoomLevel: 17
});

// #region snippet_mapbox_location_polyline
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

// #endregion snippet_mapbox_location_polyline

// create MapboxView
let mapboxView = new MapboxView({
    mapProperties: {
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
        center: [12.550343, 55.665957],
        zoom: 3
    },
    layers: [pointMarker, polyline],
    autoZoomOnFirstMarker: true
});

// start streaming
gpsDataSource.connect();

// setTimeout(() =>  {
//     gpsDataSource.disconnect();
//     mapboxView.removeAllFromLayers()
// },8000);
