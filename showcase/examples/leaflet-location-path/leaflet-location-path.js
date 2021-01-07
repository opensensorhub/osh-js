// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarkerLayer from "osh/ui/layer/PointMarkerLayer.js";
import LeafletView from "osh/ui/view/map/LeafletView.js";
import PolylineLayer from "osh/ui/layer/PolylineLayer.js";

let gpsDataSource = new SweJson("android-GPS", {
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
    icon: './images/car-location.png',
    iconSize: [32,64],
    iconAnchor: [16, 56],
    name: "Android Phone GPS"
});

// also create a polyline with the last 200 points of the track
let polyline = new PolylineLayer({
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
    color: 'rgba(0,0,255,0.5)',
    weight: 10,
    opacity: .5,
    smoothFactor: 1,
    maxPoints: 200,
    name: "Android Phone GPS Path"
});

// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarker, polyline],
    autoZoomOnFirstMarker:true
});

// start streaming
gpsDataSource.connect();
