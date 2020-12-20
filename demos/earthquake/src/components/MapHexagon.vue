<template>
  <div
      id="map"
      class="map">
    <div class="count"><span>Earthquakes {{nFormatter(count,2)}} </span></div>
    <HoverInfo
        :infos="infos"
        class="hover-info"
    ></HoverInfo>
  </div>
</template>

<script>
import {
  TileLayer
} from '@deck.gl/geo-layers';
import {
  BitmapLayer
} from '@deck.gl/layers';
import DeckGlViewHexagon from "../js/DeckGlViewHexagon";
import HoverInfo from "./HoverInfo";

export default {
  name: "MapHexagon",
  components: {HoverInfo},
  props:['datasource'],
  data: function () {
    return {
      viewItems: [],
      count: 0,
      infos: null
    }
  },
  watch: {
    datasource(datasource, oldvalue) {
      this.view = new DeckGlViewHexagon("map",
          [],
          {
            dataSourceId: datasource.id,
            deckProps: {
              onClick: event => {
                this.clicked = event.layer !== null;
                if(this.clicked) {
                  this.infos = event.object.points.map(object => object.data);
                }
              },
              initialViewState: {
                longitude: 0,
                latitude: 0,
                zoom: 2,
                maxZoom: 20,
                pitch: 30,
                bearing: 0
              },
              getTooltip: d => {
                if (!d.picked || this.clicked) {
                  return null;
                }
                // map data
                this.infos = d.object.points.map(object => object.data);
              },
              layers: [
                new TileLayer({
                  data: 'https://a.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png',
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
      this.view.onRender = (values) => {
        this.count += values.length;
      }
    }
 },
  mounted() {
  },
  methods: {
    nFormatter(num, digits) {
      const si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
      ];
      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      let i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    }
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
.count {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 99999;
  background-color: rgb(41, 50, 60);
  padding: 12px 16px 4px;
  color: ghostwhite;
}

.hover-info {
  position: absolute;
  left: 0;
  bottom: 0px;
  width:510px;
  z-index: 99999;
  background-color: rgb(41, 50, 60);
  padding: 12px 16px 4px;
  color: ghostwhite;
}
</style>
<style>
.v-application .map a {
  color: unset;
}
</style>
