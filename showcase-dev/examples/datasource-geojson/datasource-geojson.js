import File from 'osh-js/ext/datasource/file/File.datasource';
import {EventType} from 'osh-js/core/event/EventType';
// create data source for Android phone GPS
import SosGetResult from 'osh-js/core/datasource/sos/SosGetResult.datasource.js';
import PointMarkerLayer from 'osh-js/core/ui/layer/PointMarkerLayer.js';
import PolylineLayer from 'osh-js/core/ui/layer/PolylineLayer.js';
import DeckGlView from 'osh-js/core/ui/view/map/DeckGlView.js';
import {TileLayer} from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';
import {Mode} from 'osh-js/core/datasource/Mode';
import GeoJSON from "osh-js/ext/ui/layer/GeoJSON";
import DeckGlViewGeoJSON from "osh-js/ext/ui/view/DeckGlGeoJSON";


const NB_FILES = 8;
const files = ['./data/data.json'];

const fileDatasource = new File('GeoJSON',{
  paths: files,
  batchSize: 5000
});

let geojsonLayer = new GeoJSON({
  dataSourceId: fileDatasource.id,
  getData: (rec) => {
    console.log(rec);
    return rec.data;
  },
});

let deckglMapView = new DeckGlViewGeoJSON({
      container: "container",
      layers: [geojsonLayer],
      deckProps: {
        initialViewState: {
          longitude: -122.28363249999997,
          latitude:  37.87402129999999,
          zoom: 13,
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

const container = document.getElementById('json-container');
fileDatasource.subscribe(async (message) => {
  let dataEvent;
  for (let i = 0; i < message.values.length; i++) {
    dataEvent = message.values[i];
    const str = JSON.stringify(dataEvent.data,null,2);
    container.innerHTML = str;
  }
}, [EventType.DATA]);


// start streaming onclick
fileDatasource.connect();
