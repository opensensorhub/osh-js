<template>
  <div
    id="leafletMap"
    class="map" />
</template>

<script>
    // @ is an alias to /src
import LeafletView from "osh-js/core/ui/view/map/LeafletView.js";
import SosGetResultJson from "osh-js/core/datasource/SosGetResultJson.js";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },

  methods: {
    init() {
      let gpsDataSource = new SosGetResultJson("android-GPS", {
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
      let pointMarkerLayer = new PointMarkerLayer({
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
