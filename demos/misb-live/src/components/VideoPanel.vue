<template>
  <v-card class="inspire">
    <v-navigation-drawer
        mini-variant
        permanent
        dark
        floating
        left
    >
      <div class="variant-title">MISB Video</div>
      <v-divider></v-divider>
      <div id="video-container" class="video"></div>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";
import VideoView from "osh-js/core/ui/view/video/VideoView";
import {mapActions} from "vuex";

export default {
  name: "VideoPanel",
  components: {},
  props: ['droneVideoDataSource', 'show'],
  mounted() {
      this.videoElt = document.getElementById("video-container");

      // show it in video view using FFMPEG JS decoder
      let videoView = new VideoView({
        container: "video-container",
        css: "video-h264",
        name: "UAV Video",
        framerate:30,
        showTime: true,
        showStats: true,
          layers: [
            new VideoDataLayer({
              dataSourceId: this.droneVideoDataSource.id,
              getFrameData: (rec) => rec.img,
              getTimestamp: (rec) => rec.timestamp
            })
          ]
      });
      this.updateUiVideoView(videoView);
  },
  methods: {
    ...mapActions(['updateUiVideoView'])
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>

.inspire {
  position: absolute;
  top: 100px;
  left: 0;
  z-index: 10;
  border-radius: 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23) !important;
  background-color: rgba(0,0,0,0.6) !important;
  caret-color: rgba(0, 0, 0, 0);
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -ms-user-select: none;
  /*resize: both;*/
  /*overflow: auto;*/
  max-width: 450px;
}

.inspire > aside {
  width: 450px !important;
  padding-right: 5px;
}

.variant-title {
  color: white;
  padding: 2px;
  text-align: center;
  vertical-align: middle;
}

.video {
}
</style>

<style>
    .video-h264 >  canvas {
        width: 100%;
    }
    .video-container {
      resize: both;
    }
</style>
