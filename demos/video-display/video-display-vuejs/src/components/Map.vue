<template>
  <div
    id="leafletMap"
    class="map" />
</template>

<script>
    // @ is an alias to /src
import LeafletView from "osh/ui/view/map/LeafletView.js";
import SweJson from "osh/datareceiver/SweJson.js";
import PointMarker from "osh/ui/layer/PointMarker.js";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },

  methods: {
    init() {
      let gpsDataSource = new SweJson("android-GPS", {
        protocol: "ws",
        service: "SOS",
        endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
        offeringID: "urn:android:device:060693280a28e015-sos",
        observedProperty: "http://sensorml.com/ont/swe/property/Location",
        startTime: "2015-02-16T07:58:32Z",
        endTime: "2015-02-16T08:09:00Z",
        replaySpeed: 3
      });

      // style it with a moving point marker
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
        iconAnchor: [16, 65]
      });

      // create Leaflet view
      new LeafletView("leafletMap",
                      [{
                        layer: pointMarker,
                        name: "Android Phone GPS"
                      }], {
          autoZoomOnFirstMarker:true
          }
      );

      // start streaming
      gpsDataSource.connect();
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
