<template>
  <div
    id="leafletMap"
    class="map" />
</template>

<script>
    // @ is an alias to /src
import LeafletView from "osh/ui/view/map/LeafletView";
import Json from "osh/datareceiver/Json";
import PointMarker from "osh/ui/styler/PointMarker";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },
  props: ['locationDataSource','headingDataSource'],
  methods: {
    init() {
      // style it with a moving point marker
      let marker = new PointMarker({
        locationFunc: {
          dataSourceIds: [this.locationDataSource.getId()],
          handler: function (rec) {
            return {
              x: rec.location.lon,
              y: rec.location.lat,
              z: rec.location.alt
            };
          }
        },
        orientationFunc : {
          dataSourceIds :  [this.headingDataSource.getId()],
          handler : function(rec) {
            let qx = rec.orient.qx;
            let qy = rec.orient.qy;
            let qz = rec.orient.qz;
            let qw = rec.orient.q0;

            // look dir vector
            let x = 0;
            let y = 0;
            let z = -1;

            // compute quat * vector
            let ix =  qw * x + qy * z - qz * y;
            let iy =  qw * y + qz * x - qx * z;
            let iz =  qw * z + qx * y - qy * x;
            let iw = - qx * x - qy * y - qz * z;

            // compute result * inverse quat
            let xp = ix * qw + iw * - qx + iy * - qz - iz * - qy;
            let yp = iy * qw + iw * - qy + iz * - qx - ix * - qz;
            let zp = iz * qw + iw * - qz + ix * - qy - iy * - qx;

            let yaw = 90 - (180/Math.PI*Math.atan2(yp, xp));

            return {
              heading : yaw+70
            };
          }
        },
        icon: './images/car-topview.png',
        iconAnchor: [16, 65]
      });
      // create Leaflet view
      this.view = new LeafletView("leafletMap",
        [{
          styler: marker,
          name: "Android Phone GPS"
        }]);
    },
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
