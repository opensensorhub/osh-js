<template>
  <div
    id="leafletMap"
    class="map" />
</template>

<script>
    // @ is an alias to /src
import LeafletView from "osh-js/core/ui/view/map/LeafletView.js";
import PointMarkerLayer from "osh-js/core/ui/layer/PointMarkerLayer.js";
import {isDefined} from "osh-js/core/utils/Utils";
import MjpegView from 'osh-js/core/ui/view/video/MjpegView.js';
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";

export default {
  name: "Map",
  components: {},
  mounted() {
    this.init();
  },
  props: ['locationDataSource','videoDataSource'],
  data() {
    return {
      activateVideo: false
    }
  },
  methods: {
    init() {
      let popup = null;
      // style it with a moving point marker
      let pointMarkerLayer = new PointMarkerLayer({
        getLocation: {
          dataSourceIds: [this.locationDataSource.getId()],
          handler: function (rec) {
            if(isDefined(popup)) {
              const latlng = new L.LatLng(rec.location.lat, rec.location.lon);
              // move popup
              popup.setLatLng(latlng);
            }
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
        name: "Android Phone GPS",
        labelOffset: [0,-16],
        onLeftClick: (markerId, markerObject, event) => {
          if(!popup) {
            // create popup and create VideoLayer to inject in
            popup = L.popup({offset: [0, -16]})
                .setLatLng(event.latlng)
                .setContent('<div id="video-data-layer" class="popup-video"></div>')
                .openOn(markerObject._map);
              let videoView = new MjpegView({
                container: "video-data-layer", //PUT Popup div id here
                css: "video-mjpeg",
                name: "Android Video",
                keepRatio: true,
                showTime: true,
                layers: [
                  new VideoDataLayer({
                    dataSourceId: this.videoDataSource.id,
                    getFrameData: (rec) => rec.videoFrame,
                    getTimestamp: (rec) => rec.timestamp
                  })
                ]
              });
            popup.on("remove", function () {
              popup = null;
              videoView.destroy();
              //other instructions
            });
          }
        }
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

  .video-mjpeg {
    width: 100%;
    margin-bottom:5px;
  }

  .popup-video {
    width: 300px;
  }
</style>
