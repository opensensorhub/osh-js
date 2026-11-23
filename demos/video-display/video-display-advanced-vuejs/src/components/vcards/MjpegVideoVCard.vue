<template>
  <div>
    <v-card
            color="#385F73"
            dark
    >
      <v-card-title class="tiny">
        {{ title }}
      </v-card-title>
      <v-container :id="id"></v-container>
    </v-card>
  </div>
</template>

<script>
  import VideoView from "osh-js/core/ui/view/video/VideoView";
  import {randomUUID} from "osh-js/core/utils/Utils";
  import VideoDataLayer from "osh-js/core/ui/layer/VideoDataLayer";

  export default {
    name: "H264VideoVCard",
    props: ['dataSource'],
    data: function () {
      return {
        title: 'Android H264 Video',
        id: randomUUID()
      }
    },
    mounted() {
      // build video
      // show it in video view
      new VideoView({
        container: this.id,
        css: "video-h264",
        name: "Android Video",
        keepRatio: true,
        showTime: true,
        showCaption: true,
        layers: [
          new VideoDataLayer({
            dataSourceId: this.dataSource.id,
            getFrameData: (rec) => rec.img,
            getTimestamp: (rec) => rec.timestamp
          })
        ]
      })
    }
  }
</script>

<style scoped>
  .container {
    padding: 0px;
  }

</style>
<style>
  .container > div.video-h264 {
    width: 100%;
    padding: 8px;
    overflow: hidden;
  }
  .container > div.video-h264 img {
    width: 100%;
  }
  .tiny {
    line-height: 1.5;
    font-size: 14px!important;
    padding: 0 0 0 8px !important;
    color: lightgray;
    border-bottom: solid 1px lightslategrey;
  }
</style>
