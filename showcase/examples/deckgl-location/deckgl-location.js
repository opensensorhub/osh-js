// create data source for Android phone GPS
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/layer/PointMarker.js";
import DeckGlView from "osh/ui/view/map/DeckGlView.js";
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

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

let pointMarker = new PointMarker({
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
  iconAnchor: [16, 128],
  iconSize: [64, 128],
  label: 'GPS Toulouse'
});

// create Leaflet view
let deckglMapView = new DeckGlView("container",
    [{
      layer: pointMarker,
      name: "Android Phone GPS"
    }], {
      deckProps: {
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
          })
        ]
      },
      mapboxProps: {
        center: [1.42376344, 43.6175984],
        zoom: 2,
        bearing: 0,
        pitch: 0
      },
      autoZoomOnFirstMarker: true
    }
);

// start streaming
gpsDataSource.connect();

