<template>
    <v-card>
      <Video
          :modal="true"
          :dataSource="dataSource"
          :options="{top: '50', left: '50'}"
          :showStats="true"
          :showTime="true"
          :frameRate=30
          class="video"
          :codec="dataSource.properties.codec"
      >
      </Video>
    </v-card>
</template>

<script>
import Video from 'vue/components/video/VideoWithControl.vue';

export default {
  name: "VideoCard",
  components: {
    Video
  },
  props: ['dataSource'],
  data () {
    return {
      view: null,
    }
  },
  mounted() {
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
