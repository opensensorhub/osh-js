// create data source for Android phone GPS
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import RangeSlider from 'osh-js/ext/ui/view/rangeslider/RangeSliderView.replay.js';
import LeafletView from "osh-js/core/ui/view/map/LeafletView";
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from 'osh-js/core/datasource/consysapi/ConSysApi.datasource';

const mqttProps = {
    shared: true,
    prefix: '/api',
    endpointUrl: 'api.georobotix.io:443/ogc/t18',
};

let gpsDataSource = new ConSysApi("android-GPS", {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    resource: '/datastreams/rbnag2hrc04mm/observations',
    startTime: '2026-11-10T19:37:59Z.447Z',
    endTime: '2026-11-10T19:48:33.000Z',
    protocol: 'mqtt',
    mqttOpts: mqttProps,
    mode: Mode.REPLAY,
    tls: true,
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: 2,
    startTime: '2015-02-16T07:58:22.00Z',
    endTime: "2015-02-16T08:09:00Z",
    dataSources: [gpsDataSource]
});

// style it with a moving point marker
let pointMarkerLayer = new PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({
        x: rec.location.lon,
        y: rec.location.lat,
        z: rec.location.alt
  }),
  icon: './images/car-location.png',
  iconSize: [32, 64],
  iconAnchor: [16, 65],
  name: 'Car',
  description: 'GPS car Toulouse'
});

// create Leaflet view
let leafletMapView = new LeafletView({
    container: 'leafletMap',
    layers: [pointMarkerLayer],
    autoZoomOnFirstMarker:true
});

let rangeSlider = new RangeSlider({
    container: "rangeSlider",
    startTime: "2015-02-16T07:58:32Z",
    endTime: "2015-02-16T08:20:00Z",
    dataSource: gpsDataSource
});

// start streaming
dataSynchronizer.connect();

