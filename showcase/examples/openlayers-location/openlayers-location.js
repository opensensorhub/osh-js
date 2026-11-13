// create data source for Android phone GPS

import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import OpenLayerView from 'osh-js/core/ui/view/map/OpenLayerView.js';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

// create data source for Android phone GPS
const REPLAY_SPEED = 1.0;

// create data source for Android phone GPS
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


let orientationDataSource =  new ConSysApi('android-Heading', {
    endpointUrl:  'api.georobotix.io/ogc/t18/api/',
    tls: true,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    minTime: '2023-06-06T14:26:12.031Z',
    maxTime: '2023-06-06T22:23:47Z',
    mode: Mode.REPLAY,
    replaySpeed: REPLAY_SPEED,
    prefetchBatchDuration: 10000,
    prefetchBatchSize: 250,
    resource: '/datastreams/t2fedgd9i3m16/observations',
    responseFormat: 'application/swe+json',
    timeShift: -16000
});


const dataSynchronizer = new DataSynchronizer({
    replaySpeed: REPLAY_SPEED,
    startTime: '2023-06-06T14:26:12.031Z',
    endTime: '2023-06-06T22:23:47Z',
    dataSources: [gpsDataSource, orientationDataSource]
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
    getIconColor: (rec) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return  `rgba(${r}, ${g}, ${b}, .5)`
    },
  getOrientation : {
    dataSourceIds : [orientationDataSource.getId()],
    handler : (rec) => {
        return {
           heading: rec.orient.heading
        }
    }
  },
  icon: 'images/car-location.png',
  iconAnchor: [16, 64],
  iconSize: [32, 64],
  name: "Android Phone GPS"
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
