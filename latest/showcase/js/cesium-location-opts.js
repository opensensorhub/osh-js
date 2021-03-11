import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import CesiumView from 'osh-js/core/ui/view/map/CesiumView.js';
import {EllipsoidTerrainProvider} from 'cesium';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';

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
    replaySpeed: 2
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat
    }),
    orientation: {
        heading: 0
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40]
});

// #region snippet_cesium_location_view
// create Cesium view
let cesiumView = new CesiumView({
    container: 'cesium-container',
    layers: [pointMarker],
    cesiumProps: {
        viewerProps: {
            geocoder: false,
            fullscreenButton: true,
            navigationHelpButton: true,
            homeButton: true
        }
    }
});

// #endregion snippet_cesium_location_view
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
gpsDataSource.connect();
