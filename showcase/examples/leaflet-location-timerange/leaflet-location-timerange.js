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

const REPLAY_SPEED = 1.0;

// #region snippet_leaflet_location_datasource
let gpsDataSource =  new ConSysApi('android-GPS', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api',
    tls: true,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12.031Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/frmhs11ofiilm/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});

const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
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
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    dataSource: gpsDataSource
});

// start streaming
dataSynchronizer.connect();

