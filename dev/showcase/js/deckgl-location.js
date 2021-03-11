// create data source for Android phone GPS
import SosGetResultJson from 'osh-js/core/datasource/SosGetResultJson.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView.js';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

let gpsDataSource = new SosGetResultJson("android-GPS", {
  protocol: "ws",
  service: "SOS",
  endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
  offeringID: "urn:android:device:060693280a28e015-sos",
  observedProperty: "http://sensorml.com/ont/swe/property/Location",
  startTime: "2015-02-16T07:58:32Z",
  endTime: "2015-02-16T08:09:00Z",
  replaySpeed: 2
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
  iconScale: 10,
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
          longitude: 1.42376344,
          latitude:  43.6175984,
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
gpsDataSource.connect();

