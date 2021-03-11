<template>
  <div
      id="map"
      class="map">
    <div class="count"><span>Earthquakes {{ nFormatter(count, 2) }} </span></div>
    <HoverInfo
        :infos="infos"
        class="hover-info"
    ></HoverInfo>
    <div class="legend hide-mobile">
      <div
          class="legend-meaning">
        <div> Great <br> At or near total destruction</div>
        <div> Great <br> Causes damage to most buildings</div>
        <div> Major <br> Causes damage to most buildings</div>
        <div> Strong <br> Can cause moderate damage</div>
        <div> Moderate <br> Can cause light damage</div>
        <div> Light <br> Noticeable shaking</div>
        <div> Minor <br> Felt slightly</div>
        <div> Minor <br> Felt slightly</div>
        <div> Micro <br> Microearthquakes</div>
      </div>
      <div class="legend-colors">
        <div style="background: rgb(125,0,0)">9</div>
        <div style="background: rgb(205,18,0)">8</div>
        <div style="background: rgb(255,44, 0)">7</div>
        <div style="background: rgb(255, 73, 0)">6</div>
        <div style="background: rgb(255, 122, 0)">5</div>
        <div style="background: rgb(255, 139, 0)">4</div>
        <div style="background: rgb(255, 148, 0)">3</div>
        <div style="background: rgb(255, 169, 0)">2</div>
        <div style="background: rgb(255, 195, 0)">1</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  TileLayer
} from '@deck.gl/geo-layers';
import {
  BitmapLayer
} from '@deck.gl/layers';
import DeckGlViewColumn from "../js/DeckGlViewColumn";
import HoverInfo from "./HoverInfo";
import {mapState, mapActions} from 'vuex'
import DataLayer from "osh-js/core/ui/layer/DataLayer";

export default {
  name: "MapColumn",
  components: {HoverInfo},
  props: ['datasource'],
  data: function () {
    return {
      viewItems: [],
      count: 0,
      infos: null
    }
  },
  watch: {
    datasource(datasource, oldvalue) {
      this.view = new DeckGlViewColumn({
            container: "map",
            deckProps: {
              onClick: event => {
                this.clicked = event.layer !== null;
                if (this.clicked) {
                  this.infos = event.object.data;
                } else {
                  this.infos = null;
                }
              },
              initialViewState: {
                longitude: 0,
                latitude: 0,
                zoom: 2,
                maxZoom: 20,
                pitch: 40,
                bearing: 0
              },
              getTooltip: d => {
                if (!d.picked || this.clicked) {
                  return null;
                }
                this.infos = d.object.data;
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
            autoZoomOnFirstMarker: false,
            layers: [
              new DataLayer({
                dataSourceId: datasource.id
              })
            ]
          }
      );
      this.view.onRender = (layer, values) => {
        this.count += values.length;
        // dispatch to TimeRange
        this.$store.dispatch('addData', {
          layer: layer,
          values: values
        });
      }
    },
    filteredIndexes(newValue, oldValue) {
      this.view.renderFilter(newValue);
    }
  },
  mounted() {
  },
  computed: {
    filteredIndexes() {
      return this.$store.state.filteredAll;
    }
  },
  methods: {
    ...mapActions(['addData']
    ),

    nFormatter(num, digits) {
      const si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "k"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
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
  top: 2px;
  z-index: 99999;
  background-color: rgb(41, 50, 60);
  padding: 12px 16px 4px;
  color: ghostwhite;
}

.hover-info {
  position: absolute;
  right: 0;
  top: 2px;
  width: 415px;
  z-index: 99999;
  background-color: rgb(41, 50, 60);
  padding: 4px 4px 0px;
  color: ghostwhite;
}
</style>
<style>
.v-application .map a {
  color: unset;
  cursor: crosshair !important;
}

.legend {
  display: flex;
  position: absolute;
  font-weight: 600;
  height: 408px;
  bottom: 32px;
  right: 0px;
  z-index: 1;
}

.legend-meaning {
  display: flex;
  flex-direction: column;
  margin-right: 8px;
  height: 100%;
  font-size: 10px;
  line-height: 16px;
}

.legend-colors {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 24px;
  padding: 4px 0 4px 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px 0 0 4px;
  font-size: 12px;
}

.legend-meaning > div {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom: 1px solid rgba(201, 203, 209, 0.4);
  text-align: right;
  width: 160px;
  flex-shrink: 0;
  flex-grow: 1;
  opacity: 0;
  color: white;
  transition: opacity 0.2s linear;
}

.legend:hover > div.legend-meaning > * {
  opacity: 1;
}

.legend-colors > div {
  flex-shrink: 0;
  flex-grow: 1;
  text-align: center;
  display: grid;
  align-items: self-end;
}

#deckgl-overlay {
  cursor: crosshair !important;
}
</style>
