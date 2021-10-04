<template>
  <div id="video-container"></div>
</template>

<script>
import FFMPEGView from "osh-js/core/ui/view/video/FFMPEGView.js";

export default {
  name: "Video",
  components: {},
  props: ['videoDataSource', 'show'],
  mounted() {
      this.videoElt = document.getElementById("video-container");

      // show it in video view using FFMPEG JS decoder
      let videoView = new FFMPEGView({
      container: "video-container",
      css: "video-h264",
      name: "UAV Video",
      framerate:30,
      showTime: true,
      showStats: true,
      dataSourceId: this.videoDataSource.id
    });
    this.checkVisibility();
  },
  watch: {
    show() {
      this.checkVisibility();
    }
  },
  methods: {
    checkVisibility() {
      if (this.show) {
        this.videoElt.style.display = 'block';
      } else {
        this.videoElt.style.display = 'none';
      }
    }
  }
}
</script>
<!-- optional dialog styles, see example -->
<style scoped>
</style>

<style>
    .video-h264 >  canvas {
        width: 100%;
    }
</style>
