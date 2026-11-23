// create data source for Android phone GPS
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

// create data source for Android phone GPS
const REPLAY_SPEED = 5.0;

// create data source for Android phone GPS
let gpsDataSource =  new ConSysApi("Android Sensors [Office6a]", {
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
});


const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    dataSources: [gpsDataSource]
});

// style it with a moving point marker
let pointMarker = new PointMarkerLayer({
    dataSourceId: gpsDataSource.id,
    getLocation: {
        dataSourceIds : [gpsDataSource.getId()],
        handler: (rec) => {
            return {
                x: rec.location.lon,
                y: rec.location.lat,
                z: rec.location.alt
            }
        }
    },
    iconColor: '#325cc8',
    icon: './images/cellphone-marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    iconScale: 0.15,
    name: "Android Sensors [Office6a]",
    label: "Android Sensors [Office6a]",
    labelOffset: [0, -20]
});

// #region snippet_ol_location_view
// create Cesium view
let olView = new OpenLayerView({
  container: 'ol-map',
  layers: [pointMarker],
  autoZoomOnFirstMarker: true
});
// #endregion snippet_ol_location_view

// start streaming
dataSynchronizer.connect();
