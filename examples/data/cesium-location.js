import Json from "../Toolkit/src/osh/datareceiver/osh-DataReceiver-DataSourceJSON";
import CesiumView from "../Toolkit/src/osh/ui/view/map/osh-UI-CesiumView";
import EllipsoidTerrainProvider from "cesium/Source/Core/EllipsoidTerrainProvider";
import PointMarker from "../Toolkit/src/osh/ui/styler/osh-UI-StylerPointMarker";

/*
window.CESIUM_BASE_URL = 'vendor/';

// create data source for Android phone GPS
var gpsDataSource = new Json("android-GPS", {
    protocol: "ws",
    service: "SOS",
    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
    offeringID: "urn:android:device:060693280a28e015-sos",
    observedProperty: "http://sensorml.com/ont/swe/property/Location",
    startTime: "2015-02-16T07:58:30Z",
    endTime: "2015-02-16T08:09:00Z",
    replaySpeed: 2
});

// style it with a moving point marker
var pointMarker = new PointMarker({
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
var cesiumView = new CesiumView("cesium-container",
    [{
        styler: pointMarker,
        name: "Android Phone GPS"
    }]
);
cesiumView.viewer.terrainProvider = new EllipsoidTerrainProvider();

// start streaming
gpsDataSource.connect();*/
