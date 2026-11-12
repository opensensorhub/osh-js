// create data source for Android phone GPS

import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView.js';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';
import {Mode} from 'osh-js/core/datasource/Mode';
import DataSynchronizer from 'osh-js/core/timesync/DataSynchronizer';
import ConSysApi from "osh-js/core/datasource/consysapi/ConSysApi.datasource";

const REPLAY_SPEED = 1.0;
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

let pointMarker = new PointMarkerLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => ({
      x: rec.location.lon,
      y: rec.location.lat,
      z: 0
  }),
  icon: './images/car-location.png',
  iconAnchor: [16, 64],
  iconSize: [32, 65],
  iconScale: 1.5,
  label: 'GPS Toulouse'
});

let polyline = new PolylineLayer({
  dataSourceId: gpsDataSource.id,
  getLocation: (rec) => {
      return {
          x: rec.location.lon,
          y: rec.location.lat,
          z: 0
      }
  },
  color: [255, 102, 0, 127],
  weight: 2,
  maxPoints: 200,
  name: "Android Phone GPS"
});

// create Leaflet view
let deckglMapView = new DeckGlView({
      container: "container",
      layers: [pointMarker, polyline],
      deckProps: {
        initialViewState: {
          longitude: -86.63313699088032,
          latitude:  34.71077144512363,
          zoom: 15,
          bearing: 0,
          pitch: 20
        },
        layers: [
          new TileLayer({
            // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
            data: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            minZoom: 0,
            maxZoom: 19,
            tileSize: 256,

            renderSubLayers: props => {
              const {
                bbox: {west, south, east, north}
              } = props.tile;

              return new BitmapLayer(props, {
                data: null,
                image: props.data,
                bounds: [west, south, east, north]
              });
            }
          }),
        ]
      },
      autoZoomOnFirstMarker: false
    }
);

// start streaming
dataSynchronizer.connect();

