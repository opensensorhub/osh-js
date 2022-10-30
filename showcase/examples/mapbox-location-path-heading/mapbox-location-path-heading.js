// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import MapboxView from "osh-js/core/ui/view/map/MapboxView";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import {Mode} from "osh-js/core/datasource/Mode";
import DataSynchronizer from "osh-js/core/timesync/DataSynchronizer";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FrZXdhMzk0MCIsImEiOiJja2I4ZDZkdDAwMzc5MzFwazZubmFhNzVvIn0.i4O5Cls0aaVSVREIzK151w';

let gpsDataSource = new SosGetResult("android-GPS", {
    endpointUrl: 'sensiasoft.net/sensorhub/sos',
    offeringID: 'urn:android:device:060693280a28e015-sos',
    observedProperty: 'http://sensorml.com/ont/swe/property/Location',
    startTime: '2015-02-16T07:58:15.447Z',
    endTime: '2015-02-16T08:09:00Z',
    mode: Mode.REPLAY,
    tls: true,
    timeShift: -16000
});

// create data source for Android phone orientation
let attitudeDataSource = new SosGetResult("android-Att", {
    endpointUrl: "sensiasoft.net/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/OrientationQuaternion",
    startTime: '2015-02-16T07:58:15.447Z',
    endTime: "2015-02-16T08:09:00Z",
    mode: Mode.REPLAY,
    tls: true,
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    startTime: '2015-02-16T07:58:20.00Z',
    endTime: "2015-02-16T08:09:00Z",
    dataSources: [gpsDataSource, attitudeDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
            };
        }
    },
    getOrientation : {
        dataSourceIds : [attitudeDataSource.getId()],
        handler : function(rec) {
            let qx = rec.orient.qx;
            let qy = rec.orient.qy;
            let qz = rec.orient.qz;
            let qw = rec.orient.q0;

            // look dir vector
            let x = 0;
            let y = 0;
            let z = -1;

            // compute quat * vector
            let ix =  qw * x + qy * z - qz * y;
            let iy =  qw * y + qz * x - qx * z;
            let iz =  qw * z + qx * y - qy * x;
            let iw = - qx * x - qy * y - qz * z;

            // compute result * inverse quat
            let xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
            let yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
            let zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

            let yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

            return {
                heading : yaw+70
            };
        }
    },
    icon: './images/car-topview.png',
    iconSize: [32, 60],
    iconAnchor: [16, 56],
    iconColor: '#C86432',
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
    color: 'rgba(200,100,50,0.8)',
    weight: 10,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 20,
    name: "Android Phone GPS Path",
    getColor: d => {
        const max = 255;
        return `rgba(${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)},${Math.floor(Math.random() * max)},0.8)`
    },
    getOpacity: d => (Math.floor(Math.random() * (100 - 50 + 1)) + 50)/100.,
    getWeight: d => Math.floor(Math.random() * (20 - 5 + 1)) + 5,
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
dataSynchronizer.connect();
