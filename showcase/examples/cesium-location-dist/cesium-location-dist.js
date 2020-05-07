const osh = require('./dist-osh/build/main');
// import * as osh from 'osh';

window.CESIUM_BASE_URL = './';

// create data source for Android phone GPS
let gpsDataSource = new osh.Json('android-GPS', {
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
let pointMarker = new osh.PointMarker({
    locationFunc: {
        dataSourceIds: [gpsDataSource.getId()],
        handler: function (rec) {
            return {
                x: rec.location.lon,
                y: rec.location.lat
            };
        }
    },
    orientation: {
        heading: 0
    },
    icon: 'images/car-location.png',
    iconAnchor: [16, 40]
});

// create Cesium view
let cesiumView = new osh.CesiumView('cesium-container',
    [{
        styler: pointMarker,
        name: 'Android Phone GPS'
    }]
);

// start streaming
gpsDataSource.connect();
