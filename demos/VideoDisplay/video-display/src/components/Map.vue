<template>
    <div id="leafletMap" class="map">
    </div>
</template>

<script>
    // @ is an alias to /src
    import LeafletView from "../../public/js/osh/source/osh/ui/view/map/LeafletView";
    import Json from "../../public/js/osh/source/osh/datareceiver/Json";
    import PointMarker from "../../public/js/osh/source/osh/ui/styler/PointMarker";

    export default {
        name: "Map",
        components: {},

        methods: {
            init() {
                let gpsDataSource = new Json("android-GPS", {
                    protocol: "ws",
                    service: "SOS",
                    endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
                    offeringID: "urn:android:device:060693280a28e015-sos",
                    observedProperty: "http://sensorml.com/ont/swe/property/Location",
                    startTime: "2015-02-16T07:58:32Z",
                    endTime: "2015-02-16T08:09:00Z",
                    replaySpeed: 2
                });

// style it with a moving point marker
                let pointMarker = new PointMarker({
                    locationFunc: {
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
                        styler: pointMarker,
                        name: "Android Phone GPS"
                    }]
                );

// start streaming
                gpsDataSource.connect();
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
<style>
  .map {
    height: 600px;
  }

  .leaflet-container {
    height: 100%;
  }
</style>
