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
import DialogDrag from 'vue-dialog-drag';
import VideoH264 from "osh/datareceiver/VideoH264";
import FFMPEGView from "osh/ui/view/video/FFMPEGView";

export default {
  name: "Video",
  components: {
    DialogDrag
  },
  mounted() {

      // setup video
      // create data source for UAV camera
      let videoDataSource = new VideoH264("drone-Video", {
          protocol: 'ws',
          service: 'SOS',
          endpointUrl: 'sensiasoft.net:8181/sensorhub/sos',
          offeringID: 'urn:mysos:solo:video2',
          observedProperty: 'http://sensorml.com/ont/swe/property/VideoFrame',
          startTime: '2015-12-19T21:04:29.231Z',
          endTime: '2015-12-19T21:09:19.675Z',
          replaySpeed: 1
      });

      // show it in video view using FFMPEG JS decoder
      let videoView = new FFMPEGView("video-container", {
          dataSourceId: videoDataSource.id,
          css: "video-h264",
          name: "UAV Video",
          framerate:25,
          showTime: true
      });

      // start streaming
      videoDataSource.connect();
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
