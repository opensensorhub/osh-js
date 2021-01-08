<template>
  <div>
    <v-card
            color="#385F73"
            dark
    >
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-container :id="id"></v-container>
    </v-card>
  </div>
</template>

<script>
  import MjpegView from "osh/ui/view/video/MjpegView";
  import {randomUUID} from "osh/utils/Utils";
  import DataLayer from "../../../../../../source/osh/ui/layer/DataLayer";

  export default {
    name: "MjpegVideoVCard",
    props: ['dataSource'],
    data: function () {
      return {
        title: 'Android Mjpeg Video',
        id: randomUUID()
      }
    },
    mounted() {
      // build video
      // show it in video view
      new MjpegView({
        container: this.id,
        css: "video-mjpeg",
        name: "Android Video",
        keepRatio: true,
        showTime: true,
        layers: [
          new DataLayer({
            dataSourceId: this.dataSource.id
          })
        ]
      });
    }
  }
</script>

<style scoped>
  .container {
    padding: 0px;
  }

</style>
<style>
  .container > div.video-mjpeg {
    width: 100%;
    padding: 8px;
    overflow: hidden;
  }
  .container > div.video-mjpeg img {
    width: 100%;
  }
</style>
