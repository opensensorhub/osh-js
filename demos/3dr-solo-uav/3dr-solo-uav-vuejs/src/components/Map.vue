<template>
  <div
          id="leafletMap"
          class="map" />
</template>

<script>
  // @ is an alias to /src
  import LeafletView from "osh/ui/view/map/LeafletView";
  import SweJsonDataSource from "osh/datareceiver/SweJsonDataSource";
  import PointMarker from "osh/ui/styler/PointMarker";

  export default {
    name: "Map",
    components: {},
    mounted() {
      this.init();
    },

    methods: {
      init() {
        // create data source for Android phone GPS
        let platformLocationDataSource = new Json('android-GPS', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformLocation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        });

        let platformOrientationDataSource = new Json('android-Heading', {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:nav2',
          observedProperty: 'http://www.opengis.net/def/property/OGC/0/PlatformOrientation',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
        });

        // add 3D model marker to Cesium view
        let pointMarker = new PointMarker({
          label: "3DR Solo",
          locationFunc : {
            dataSourceIds : [platformLocationDataSource.getId()],
            handler : function(rec) {
              return {
                x : rec.loc.lon,
                y : rec.loc.lat,
                z : rec.loc.alt - 184 // model offset
              };
            }
          },
          orientationFunc : {
            dataSourceIds : [platformOrientationDataSource.getId()],
            handler : function(rec) {
              return {
                heading : rec.attitude.yaw
              };
            }
          },
          icon: './images/quadcopter.png',
          iconAnchor: [-12, -5]
        });

        // create Leaflet view
        new LeafletView("leafletMap",
          [{
            styler: pointMarker,
            name: "Android Phone GPS"
          }]
        );

        // start streaming
        platformLocationDataSource.connect();
        platformOrientationDataSource.connect();
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
