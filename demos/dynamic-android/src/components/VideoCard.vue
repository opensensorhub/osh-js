<template>
    <v-card>
      <div :id="containerId" class="video"></div>
    </v-card>
</template>

<script>
import VideoView from 'osh-js/core/ui/view/video/VideoView';
import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';

export default {
  name: "VideoCard",
  props: ['dataSource'],
  data () {
    return {
      view: null,
    }
  },
  computed: {
    containerId() {
      return 'video-' + this.dataSource.id;
    }
  },
  mounted() {
    this.view = new VideoView({
      container: this.containerId,
      css: 'video-h264',
      name: this.dataSource.name,
      framerate: 30,
      showTime: true,
      showStats: true,
      layers: [
        new VideoDataLayer({
          dataSourceId: this.dataSource.id,
          getFrameData: (rec) => rec.img,
          getTimestamp: (rec) => rec.timestamp
        })
      ]
    });
  },
  destroyed() {
    this.dataSource.terminate();
  }
}
</script>

<style scoped>
.v-sheet.v-card {
  margin: 15px;
}
</style>
<style>
.video-container  {
  margin:auto;
  height: inherit;
  width: auto;
}

.osh-view {
  margin: auto;
  display: flex;
}

.video, .v-card, .no-dialog {
  width: inherit;
  height: 270px;
  background-color: #000000 !important;
}

.v-card {
  height: 310px;
  min-width: 480px;
}

.v-application .video-h264 .ffmpeg-info {
  padding: 0px;
  padding-top: 5px;
  padding-left: 10px;
}

.v-application .v-dialog {
  margin-left:400px !important;
}
.video-h264 > canvas {
  border-radius: 2px;
}
</style>
