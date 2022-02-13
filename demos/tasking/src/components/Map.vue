<template>
  <div>
    <div
        id="map"
        class="map"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
import LeafletView from "osh-js/core/ui/view/map/LeafletView";
import PolylineLayer from "osh-js/core/ui/layer/PolylineLayer";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },
  props: [
    'droneLocationDataSource', 'control'
  ],
  methods: {
    init() {
      let prevTime = 0;
      // style it with a moving point marker
      const pointMarkerLayer = new PointMarkerLayer({
        dataSourceId: this.droneLocationDataSource.id,
        getLocation: (rec) => ({
          x: rec.pos.lon,
          y: rec.pos.lat,
          z: rec.pos.alt
        }),
        name: 'drone',
        description: 'Drone',
        icon: 'images/uav.png',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      let polylineLayer = new PolylineLayer({
        dataSourceId: this.droneLocationDataSource.id,
        getLocation: (rec) => ({
          x: rec.pos.lon,
          y: rec.pos.lat,
          z: rec.pos.alt
        }),
        color: 'rgba(0,0,255,0.5)',
        weight: 5,
        opacity: .5,
        smoothFactor: 1,
        maxPoints: 200,
        name: "Hypersonic drone Path"
      });

      // create Leaflet view
      const leafletMapView = new LeafletView({
        container: 'map',
        layers: [pointMarkerLayer, polylineLayer],
        autoZoomOnFirstMarker: true
      });

      const corrData = new DataView(new ArrayBuffer(4));
      leafletMapView.map.on('click', e => {
        let goToCmd = {
          params: {
            WAYPOINT: {
              position: {
                lat: e.latlng.lat,
                lon: e.latlng.lng,
                alt: 270
              },
              velocity: 100000
            }
          }
        }

        let corrId = Math.floor(Math.random() * 1e9);
        console.log("Correlation ID = " + corrId);
        corrData.setInt32(0, corrId, false);

        this.control.publishCommand(JSON.stringify(goToCmd));
      });

      // send takeoff command
      let takeOffCmd = {
        params: {
          AUTO_TAKEOFF: {
            height: 10.0
          }
        }
      }
      this.control.postCommand(JSON.stringify(takeOffCmd));
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
