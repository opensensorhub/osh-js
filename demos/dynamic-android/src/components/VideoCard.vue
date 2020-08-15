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
          :encoding="{bitrate: { use: true, min:100 * 8, max:500 * 8 },
                      scale: {use: true, min:0.5, max:1.0},
                       responseFormat: 'video/'+dataSource.properties.codec}"
      >
      </Video>
    </v-card>
</template>

<script>
import Video from 'osh-vue/components/VideoWithControl.vue';

export default {
  name: "VideoCard",
  components: {
    Video
  },
  props: ['dataSource'],
  data () {
    return {
      view: null,
      encoding: {
        bitrate: {
          use: true,
          min: 0.5,
          max: 1.0
        }
      }
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
  .video {
    width:280px;
  }

</style>
<style>
  .v-card {
    margin:10px;
  }

  .video-container .video-h264 > canvas {
    width: auto;
    max-height: 158px;
    max-width: 280px;
    margin:auto;
  }


  .dialog-container .video-h264 > canvas {
    height:100%;
    width: auto;
  }

  .dialog-container .osh-view {
    width: auto;
    height: 100%;
  }

  .osh-view {
    margin: auto;
    display: flex;
  }
  .dialog-container {
    height: calc(100% - 50px);
  }

  .v-dialog {
    height:100%;
    width: 100%;
    /*overflow: hidden !important;*/
    display:block;
  }

  .v-dialog>* {
    width: 100%;
  }

</style>
