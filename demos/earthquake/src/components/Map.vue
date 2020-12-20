<template>
  <div
      id="map"
      class="map"/>
</template>

<script>
import {
  TileLayer
} from '@deck.gl/geo-layers';
import {
  BitmapLayer
} from '@deck.gl/layers';
import PointMarkers from "../js/PointMarkers";
import DeckGlViewBatch from "../js/DeckGlViewBatch";


export default {
  name: "Map",
  props:['datasource'],
  data: function () {
    return {
      viewItems: []
    }
  },
  watch: {
    datasource(datasource, oldvalue) {
      this.view.addViewItem({
        name: 'EQ',
        layer: new PointMarkers({
          getValues: {
            dataSourceIds: [datasource.getId()],
            handler: function(rec, timestamp) {
              return {
                ...rec,
                timestamp: timestamp
              };
            }
          },
          icon: './images/quake.png',
          iconAnchor: [16, 32],
          iconSize: [32, 32],
          getIconScale: {
            dataSourceIds: [datasource.getId()],
            handler: function (rec) {
              if(rec.mag <= 2.5) {
                return 4;
              } else if(rec.mag > 2.5 && rec.mag <= 8.0) {
                return 5;
              } else {
                return 9;
              }
            }
          },
          label: 'Quake',
          getIconColor: {
            dataSourceIds: [datasource.getId()],
            handler: function (rec) {
              if(rec.mag <= 2.5) {
                return '#E77000'
              } else if(rec.mag > 2.5 && rec.mag <= 8.0) {
                return '#FF2300'
              } else {
                return '#BB1A00'
              }
            }
          }
        })
      });
    }
 },
  mounted() {
    this.view = new DeckGlViewBatch("map",
        [],
        {
          deckProps: {
            initialViewState: {
              longitude: 0,
              latitude: 0,
              zoom: 1,
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
                    bbox: {
                      west,
                      south,
                      east,
                      north
                    }
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
  },
  methods: {

  }
}
</script>

<style scoped>
.map {
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
}
</style>
<style>
.v-application .map a {
  color: unset;
}
</style>
