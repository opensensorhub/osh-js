<template>
    <dialog-drag
            id="drag-window-1"
            title="Video MJPEG"
            class="resizable"
            :options="{ width:450, top:100,left:2 }">
        <div id="video-container"></div>
    </dialog-drag>
</template>

<script>
import DialogDrag from 'vue-dialog-drag';
import SosGetResultVideo from 'osh-js/core/datasource/SosGetResultVideo.js';
import MjpegView from 'osh-js/core/ui/view/video/MjpegView.js';

export default {
  name: "Video",
  components: {
    DialogDrag
  },
  mounted() {

    // create data source for Android phone camera
    let videoDataSource = new SosGetResultVideo("android-Video", {
      protocol: "ws",
      service: "SOS",
      endpointUrl: "sensiasoft.net:8181/sensorhub/sos",
      offeringID: "urn:android:device:060693280a28e015-sos",
      observedProperty: "http://sensorml.com/ont/swe/property/VideoFrame",
      startTime: "2015-02-16T07:58:35Z",
      endTime: "2015-02-16T08:09:00Z",
      replaySpeed: 3
    });

    // show it in video view
    let videoView = new MjpegView({
      container: "video-container",
      css: "video-mjpeg",
      name: "Android Video",
      keepRatio: true,
      showTime: true,
      dataSourceId: videoDataSource.id
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
    .dialog-drag {
        overflow-y: hidden;
        border: 1px solid #bbbbbb;
        border-radius: 4px;
        box-shadow: 0 0 7px #000000;
    }
    .dialog-drag .dialog-header {
      color: #fff;
      font-size: .9em;
      padding: .25em 3em .25em 1em;
      position: relative;
      text-align: left;
      width: auto;
      background-color: #232323cc;
    }

    .osh-view .video-time {
      color: #FFFFFF;
      padding-left:15px;
    }
    .dialog-drag .dialog-body {
        padding:0;

    }

    .dialog-drag {
      background-color: #232323cc;
    }
    .video-mjpeg {
        width: 100%;
        margin-bottom:5px;
    }
</style>
