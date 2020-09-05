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
import Video from 'osh-vue/components/video/VideoWithControl.vue';

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
  height: calc(100% - 10px);
  background-color: #000000 !important;
}

.v-card {
  height: inherit;
  width: inherit;
  min-width: 320px;
}

.video-h264 > canvas {
  border-radius: 2px;
}
</style>
