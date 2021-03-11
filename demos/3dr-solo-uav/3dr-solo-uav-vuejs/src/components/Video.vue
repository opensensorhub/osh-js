<template>
    <dialog-drag
            id="drag-window-1"
            title="3DR Video H264"
            class="resizable"
            :options="{ width:350,top:100,left:2 }">
        <div id="video-container"></div>
    </dialog-drag>
</template>

<script>
import FFMPEGView from "osh-js/core/ui/view/video/FFMPEGView.js";
import DialogDrag from 'vue-dialog-drag'

export default {
  name: "Video",
  components: {
    DialogDrag
  },
  props: ['videoDataSource'],
  mounted() {
      // show it in video view using FFMPEG JS decoder
      let videoView = new FFMPEGView({
        container: "video-container",
        css: "video-h264",
        name: "UAV Video",
        framerate:25,
        showTime: true,
        showStats: true,
        dataSourceId: this.videoDataSource.id
      });
  }
}
</script>
<style src="vue-dialog-drag/dist/vue-dialog-drag.css"></style>

<!-- optional dialog styles, see example -->
<style scoped>
  .dialog-drag {
    z-index: 10;
  }

  .resizable {
      resize: both;   /* Options: horizontal, vertical, both */
  }
</style>

<style>
    .dialog-drag .dialog-body {
        padding:0;
    }


    .dialog-drag {
        overflow-y: hidden;
        border: 1px solid #5a5a5acc;
        border-radius: 4px;
        box-shadow: 0 0 7px #000000;
        background: #232323cc;
    }

    .dialog-drag .dialog-header {
        background: none;
        color: #fff;
        font-size: 1em;
        padding: .25em 3em .25em 1em;
        position: relative;
        text-align: left;
        width: auto;
        font-family: cursive;
    }

    .video-h264 >  canvas {
        width: 100%;
    }
</style>
