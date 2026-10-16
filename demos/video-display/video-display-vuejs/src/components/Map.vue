<template>
  <div
    id="leafletMap"
    class="map" />
</template>

<script>
    // @ is an alias to /src
import LeafletView from "osh-js/core/ui/view/map/LeafletView.js";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },
  props: ['locationDataSource'],
  methods: {
    init() {
      // style it with a moving point marker
      let pointMarkerLayer = new PointMarkerLayer({
        getLocation: {
          dataSourceIds: [this.locationDataSource.getId()],
          handler: function (rec) {
            return {
              x: rec.location.lon,
              y: rec.location.lat,
              z: rec.location.alt
            };
          }
        },
        icon: './images/car-location.png',
        iconSize: [32, 64],
        iconAnchor: [16, 65],
        name: "Android Phone GPS"
      });

      // create Leaflet view
      new LeafletView({
        container: "leafletMap",
        layers: [pointMarkerLayer],
        autoZoomOnFirstMarker: true
      });
    }
  }
};
</script>
<style>
  .map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 5;
  }

  .leaflet-container {
    height: 100%;
  }
</style>
